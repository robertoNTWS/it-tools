<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import { useRoute } from 'vue-router';
import { selectBanner } from '../banner-selection';
import type { AffiliateBanner } from '../banner.types';
import { banners } from '@/banners.config';
import { trackEvent } from '@/modules/analytics/analytics.service';

const route = useRoute();
const { locale } = useI18n();
const themeVars = useThemeVars();

// Sorteia uma vez por página (não a cada atualização da tela)
const banner = ref<AffiliateBanner | undefined>();
watch(
  () => route.path,
  () => {
    banner.value = selectBanner({
      banners,
      toolKey: route.path.replace(/^\//, ''),
      category: route.meta?.category as string | undefined,
    });
  },
  { immediate: true },
);

const alt = computed(() => (banner.value ? (locale.value === 'pt' ? banner.value.alt.pt : banner.value.alt.en ?? banner.value.alt.pt) : ''));

// Clique registrado no GA só se houver consentimento (trackEvent não envia sem o GA carregado)
function onClick() {
  if (banner.value) {
    trackEvent('banner_click', { banner_id: banner.value.id, page_path: route.path });
  }
}
</script>

<template>
  <aside v-if="banner" class="affiliate-banner" :aria-label="$t('banner.label')" data-test-id="affiliate-banner">
    <span class="label">{{ $t('banner.label') }}</span>
    <a :href="banner.href" target="_blank" rel="sponsored noopener noreferrer" class="link" @click="onClick">
      <picture>
        <source
          v-if="banner.imageMobile"
          media="(max-width: 600px)"
          :srcset="banner.imageMobile.src"
          :width="banner.imageMobile.width"
          :height="banner.imageMobile.height"
        >
        <img :src="banner.image.src" :width="banner.image.width" :height="banner.image.height" :alt="alt" class="image">
      </picture>
    </a>
  </aside>
</template>

<style lang="less" scoped>
.affiliate-banner {
  display: grid;
  justify-items: center;
  gap: 4px;
  margin: 16px auto 0;
  max-width: 728px;
}

.label {
  justify-self: start;
  font-size: 11px;
  color: v-bind('themeVars.textColor3');
}

.link {
  display: block;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  line-height: 0;
}

.image {
  display: block;
  width: 100%;
  height: auto;
}
</style>
