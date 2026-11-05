// Google Analytics 4 carregado só depois do consentimento (LGPD). Sem VITE_GA_ID, nada é carregado.
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const gaId = import.meta.env.VITE_GA_ID;
let isLoaded = false;

export function isAnalyticsConfigured() {
  return Boolean(gaId);
}

export function isAnalyticsLoaded() {
  return isLoaded;
}

export function loadAnalytics() {
  if (!gaId || isLoaded) {
    return;
  }
  isLoaded = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // O gtag.js espera o objeto arguments, não um array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  // Consent Mode v2: só a medição é liberada; anúncios e personalização ficam sempre negados
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  // send_page_view: false porque as visualizações são enviadas manualmente, sem a query string
  window.gtag('config', gaId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  document.head.appendChild(script);
}

// path deve vir sem query string nem hash (ex.: o regex-tester guarda a regex digitada em ?regex=)
export function trackPageView({ path, title }: { path: string; title: string }) {
  if (!isLoaded) {
    return;
  }
  window.gtag?.('event', 'page_view', {
    page_location: `${window.location.origin}${path}`,
    page_path: path,
    page_title: title,
  });
}

export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  if (!isLoaded) {
    return;
  }
  window.gtag?.('event', name, params);
}

// Apaga os cookies do GA (_ga e _ga_*) no domínio atual e nos domínios pai
export function clearAnalyticsCookies() {
  const names = document.cookie.split(';').map(c => c.split('=')[0].trim()).filter(n => n === '_ga' || n.startsWith('_ga_'));
  const parts = window.location.hostname.split('.');
  const domains = parts.map((_, i) => parts.slice(i).join('.'));
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    }
  }
}
