<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import MemoEn from './regex-memo.content.md';
import MemoPt from './regex-memo.content.pt.md';

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
::v-deep(table) {
  border-collapse: collapse;
}
::v-deep(table), ::v-deep(td), ::v-deep(th) {
  border: 1px solid v-bind('themeVars.textColor1');
  padding: 5px;
}
::v-deep(a) {
  color: v-bind('themeVars.textColor1');
}
</style>
