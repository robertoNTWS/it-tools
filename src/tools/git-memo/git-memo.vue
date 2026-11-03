<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import MemoEn from './git-memo.content.md';
import MemoPt from './git-memo.content.pt.md';

const themeVars = useThemeVars();
const { locale } = useI18n();

// Um arquivo .md por idioma; o inglês é o padrão para os demais idiomas
const Memo = computed(() => (locale.value === 'pt' ? MemoPt : MemoEn));
</script>

<template>
  <div>
    <component :is="Memo" />
  </div>
</template>

<style lang="less" scoped>
::v-deep(pre) {
  margin: 0;
  padding: 15px 22px;
  background-color: v-bind('themeVars.cardColor');
  border-radius: 4px;
  overflow: auto;
}
</style>
