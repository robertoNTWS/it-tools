export { createTrackerService, useTracker };

// Eventos de uso do site. Sem destino até a integração com o GA (fase 5.3), que só envia com consentimento.
function createTrackerService() {
  return {
    trackEvent(_event: { eventName: string }) {},
  };
}

function useTracker() {
  return {
    tracker: createTrackerService(),
  };
}
