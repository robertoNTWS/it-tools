import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { CONSENT_STORAGE_KEY, CONSENT_VERSION, useConsentStore } from './consent.store';

describe('consent store', () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it('começa pendente e com o aviso visível', () => {
    const store = useConsentStore();
    expect(store.status).toBe('pending');
    expect(store.isBannerVisible).toBe(true);
  });

  it('guarda o aceite com a versão do aviso e esconde a barra', async () => {
    const store = useConsentStore();
    store.accept();
    expect(store.status).toBe('granted');
    expect(store.isBannerVisible).toBe(false);
    await new Promise(resolve => setTimeout(resolve, 0));
    const saved = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) ?? '{}');
    expect(saved).toMatchObject({ status: 'granted', version: CONSENT_VERSION });
  });

  it('volta a pedir consentimento quando a versão do aviso muda', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ status: 'granted', version: CONSENT_VERSION - 1, date: '' }));
    const store = useConsentStore();
    expect(store.status).toBe('pending');
  });

  it('reabre a barra para mudar a escolha', () => {
    const store = useConsentStore();
    store.reject();
    expect(store.isBannerVisible).toBe(false);
    store.reopen();
    expect(store.isBannerVisible).toBe(true);
  });
});
