<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { NGlobalStyle, NMessageProvider, NNotificationProvider, darkTheme, dateEnUS, datePtBR, enUS, ptBR } from 'naive-ui';
import { useHead } from '@vueuse/head';
import { darkThemeOverrides, lightThemeOverrides } from './themes';
import { layouts } from './layouts';
import { useStyleStore } from './stores/style.store';
import { palette } from './palette';
import { SITE_URL } from './brand';

const route = useRoute();
const layout = computed(() => route?.meta?.layout ?? layouts.base);
const styleStore = useStyleStore();

const theme = computed(() => (styleStore.isDarkTheme ? darkTheme : null));
const themeOverrides = computed(() => (styleStore.isDarkTheme ? darkThemeOverrides : lightThemeOverrides));

const { locale } = useI18n();

// Endereço canônico de cada página (SEO): sem isso, todas as ferramentas apontavam para a Home
useHead({
  link: computed(() => [{ rel: 'canonical', href: `${SITE_URL}${route.path}` }]),
  meta: computed(() => [{ property: 'og:url', content: `${SITE_URL}${route.path}` }]),
});

// Textos internos do naive-ui (placeholders, datas) no idioma da interface
const naiveLocale = computed(() => (locale.value === 'pt' ? ptBR : enUS));
const naiveDateLocale = computed(() => (locale.value === 'pt' ? datePtBR : dateEnUS));

// Cor do contorno de foco (acessibilidade: foco visível ao navegar pelo teclado)
watchEffect(() => {
  document.documentElement.style.setProperty('--focus-ring', styleStore.isDarkTheme ? palette.dark.primary : palette.light.primary);
});

syncRef(
  locale,
  useStorage('locale', locale),
);
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides" :locale="naiveLocale" :date-locale="naiveDateLocale">
    <NGlobalStyle />
    <NMessageProvider placement="bottom">
      <NNotificationProvider placement="bottom-right">
        <component :is="layout">
          <RouterView />
        </component>
      </NNotificationProvider>
    </NMessageProvider>
  </n-config-provider>
</template>

<style>
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

/* O naive-ui remove o contorno dos links do menu; destaca o item inteiro quando o link tem foco */
.n-menu .n-menu-item-content:has(a:focus-visible) {
  outline: 2px solid var(--focus-ring);
  outline-offset: -2px;
}

body {
  min-height: 100%;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
