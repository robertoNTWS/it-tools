<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { SITE_NAME } from '@/brand';

const { t } = useI18n();
useHead({ title: computed(() => `${t('home.nav.aboutLabel')} - ${SITE_NAME}`) });
</script>

<template>
  <c-markdown :markdown="$t('about.content')" mx-auto mt-50px max-w-600px />
</template>
