<script setup lang="ts">
import { useConsentStore } from '../consent.store';
import { isAnalyticsConfigured } from '../analytics.service';
import { brand, brandGradient, palette } from '@/palette';

const consentStore = useConsentStore();
// Modelo 2 (D49): cartão com o gradiente da marca, para se destacar do fundo nos dois temas
const background = brandGradient(100);
const buttonHover = palette.light.surfaceRaised;
// Sem GA configurado não há cookies, então o aviso não aparece
const isVisible = computed(() => isAnalyticsConfigured() && consentStore.isBannerVisible);
</script>

<template>
  <div v-if="isVisible" class="consent-banner" role="region" :aria-label="$t('consent.label')" data-test-id="consent-banner">
    <p class="consent-text">
      <span class="consent-icon" aria-hidden="true">🍪</span>
      {{ $t('consent.message') }}
      <RouterLink to="/privacidade">
        {{ $t('consent.privacy') }}
      </RouterLink>
    </p>
    <div class="consent-actions">
      <c-button data-test-id="consent-reject" @click="consentStore.reject()">
        {{ $t('consent.reject') }}
      </c-button>
      <c-button data-test-id="consent-accept" @click="consentStore.accept()">
        {{ $t('consent.accept') }}
      </c-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.consent-banner {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  z-index: 1000;
  max-width: 760px;
  margin-inline: auto;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 20px;
  padding: 14px 18px;
  border-radius: 10px;
  border: none;
  background: v-bind('brand.deep');
  background: v-bind(background);
  color: v-bind('brand.onBrand');
  box-shadow: 0 12px 32px rgba(13, 16, 24, 0.35);
}

.consent-icon {
  font-size: 20px;
  margin-right: 8px;
  vertical-align: -3px;
}

.consent-text {
  margin: 0;
  flex: 1 1 320px;
  font-size: 14px;
  line-height: 1.5;
}

.consent-text a {
  color: v-bind('brand.onBrand');
  text-decoration: underline;
}

// Recusar e Aceitar com o mesmo peso visual (guia de cookies da ANPD)
.consent-actions :deep(.c-button) {
  background: v-bind('brand.onBrand');
  color: v-bind('brand.deep');
  font-weight: 600;

  // O hover padrão do c-button deixaria o botão translúcido sobre o gradiente
  &:hover {
    background: v-bind(buttonHover) !important;
    color: v-bind('brand.deep') !important;
  }
}

.consent-actions {
  display: flex;
  gap: 8px;
}
</style>
