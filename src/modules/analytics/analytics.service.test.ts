import { afterEach, describe, expect, it, vi } from 'vitest';

async function loadService(gaId?: string) {
  vi.resetModules();
  vi.stubEnv('VITE_GA_ID', gaId ?? '');
  return import('./analytics.service');
}

describe('analytics service', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    document.head.querySelectorAll('script').forEach(s => s.remove());
    delete window.gtag;
    delete window.dataLayer;
  });

  it('não carrega nada sem VITE_GA_ID', async () => {
    const service = await loadService();
    service.loadAnalytics();
    expect(service.isAnalyticsConfigured()).toBe(false);
    expect(document.head.querySelector('script[src*="googletagmanager"]')).toBeNull();
  });

  it('não envia eventos antes de carregar (sem consentimento)', async () => {
    const service = await loadService('G-TESTE');
    service.trackPageView({ path: '/json-prettify', title: 'x' });
    expect(window.dataLayer).toBeUndefined();
  });

  it('carrega o gtag com anúncios negados e envia a página sem query string', async () => {
    const service = await loadService('G-TESTE');
    service.loadAnalytics();
    expect(document.head.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-TESTE"]')).not.toBeNull();
    const consent = (window.dataLayer as IArguments[]).map(a => [...a]).find(a => a[0] === 'consent');
    expect(consent?.[2]).toMatchObject({ ad_storage: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });

    service.trackPageView({ path: '/regex-tester', title: 'Testador' });
    const pageView = (window.dataLayer as IArguments[]).map(a => [...a]).find(a => a[1] === 'page_view');
    expect(pageView?.[2]).toMatchObject({ page_path: '/regex-tester' });
    expect(String((pageView?.[2] as Record<string, string>).page_location)).not.toContain('?');
  });
});
