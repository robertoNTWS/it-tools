<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import { useConsentStore } from '../consent.store';
import { isAnalyticsConfigured } from '../analytics.service';

const consentStore = useConsentStore();
const themeVars = useThemeVars();
// Sem GA configurado não há cookies, então o aviso não aparece
const isVisible = computed(() => isAnalyticsConfigured() && consentStore.isBannerVisible);
</script>

<template>
  <div v-if="isVisible" class="consent-banner" role="region" :aria-label="$t('consent.label')" data-test-id="consent-banner">
    <p class="consent-text">
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
  border: 1px solid v-bind('themeVars.borderColor');
  background: v-bind('themeVars.cardColor');
  color: v-bind('themeVars.textColor1');
  box-shadow: 0 8px 24px rgba(13, 16, 24, 0.18);
}

.consent-text {
  margin: 0;
  flex: 1 1 320px;
  font-size: 14px;
  line-height: 1.5;
}

.consent-text a {
  color: v-bind('themeVars.primaryColor');
}

.consent-actions {
  display: flex;
  gap: 8px;
}
</style>
