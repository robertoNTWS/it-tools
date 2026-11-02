import messages from '@intlify/unplugin-vue-i18n/messages';
import { get } from '@vueuse/core';
import type { Plugin } from 'vue';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  messages,
});

export const i18nPlugin: Plugin = {
  install: (app) => {
    app.use(i18n);
  },
};

export const translate = function (localeKey: string) {
  // Considera o idioma de fallback para não exibir a chave crua quando falta tradução
  const hasKey = i18n.global.te(localeKey, get(i18n.global.locale)) || i18n.global.te(localeKey, 'en');
  return hasKey ? i18n.global.t(localeKey) : localeKey;
};
