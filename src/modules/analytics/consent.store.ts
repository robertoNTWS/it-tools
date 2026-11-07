import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

// Mudar a versão faz o aviso aparecer de novo para todos (ex.: quando a política mudar)
export const CONSENT_VERSION = 2;
export const CONSENT_STORAGE_KEY = 'canidev:consentimento';

export type ConsentStatus = 'pending' | 'granted' | 'denied';

// Guarda só a escolha, a versão do aviso e a data (nenhum dado de uso)
export const useConsentStore = defineStore('consent', () => {
  const stored = useStorage<{ status: ConsentStatus; version: number; date: string }>(
    CONSENT_STORAGE_KEY,
    { status: 'pending', version: CONSENT_VERSION, date: '' },
  );
  const isReopened = ref(false);

  const status = computed<ConsentStatus>(() => (stored.value.version === CONSENT_VERSION ? stored.value.status : 'pending'));
  const isBannerVisible = computed(() => status.value === 'pending' || isReopened.value);

  function setStatus(newStatus: Exclude<ConsentStatus, 'pending'>) {
    stored.value = { status: newStatus, version: CONSENT_VERSION, date: new Date().toISOString() };
    isReopened.value = false;
  }

  return {
    status,
    isBannerVisible,
    accept: () => setStatus('granted'),
    reject: () => setStatus('denied'),
    reopen: () => {
      isReopened.value = true;
    },
  };
});
