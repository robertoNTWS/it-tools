import { trackEvent } from '@/modules/analytics/analytics.service';

export { createTrackerService, useTracker };

// Eventos de uso do site, enviados ao GA4 só quando houver consentimento
function createTrackerService() {
  return {
    trackEvent({ eventName }: { eventName: string }) {
      trackEvent(eventName);
    },
  };
}

function useTracker() {
  return {
    tracker: createTrackerService(),
  };
}
