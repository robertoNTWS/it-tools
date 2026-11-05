import type { Plugin } from 'vue';
import type { Router } from 'vue-router';
import { useConsentStore } from './consent.store';
import { clearAnalyticsCookies, isAnalyticsLoaded, loadAnalytics, trackPageView } from './analytics.service';

// Liga o GA4 ao consentimento e às trocas de página
export function createAnalyticsPlugin({ router }: { router: Router }): Plugin {
  return {
    install() {
      const consentStore = useConsentStore();

      // Espera o título da página ser aplicado (o @vueuse/head atualiza logo após a renderização)
      const sendCurrentPage = () => setTimeout(() => trackPageView({ path: router.currentRoute.value.path, title: document.title }), 150);

      watch(
        () => consentStore.status,
        (status, previous) => {
          if (status === 'granted') {
            const wasLoaded = isAnalyticsLoaded();
            loadAnalytics();
            if (!wasLoaded) {
              sendCurrentPage();
            }
          }
          // Revogação depois de aceitar: apaga os cookies e recarrega para descarregar o script do Google
          if (status === 'denied' && previous === 'granted') {
            clearAnalyticsCookies();
            window.location.reload();
          }
        },
        { immediate: true },
      );

      router.afterEach((to, from) => {
        if (to.path !== from.path) {
          sendCurrentPage();
        }
      });
    },
  };
}
