<script setup lang="ts">
import { format } from 'prettier';
import htmlParser from 'prettier/plugins/html';
import Editor from './editor/editor.vue';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

// Não salva no navegador o texto digitado (LGPD); preferências continuam salvas
const html = ref(`<h1>${t('tools.html-wysiwyg-editor.greeting')}</h1><p>${t('tools.html-wysiwyg-editor.welcome')}</p>`);

const formattedHtml = asyncComputed(() => format(html.value, { parser: 'html', plugins: [htmlParser] }), '');
</script>

<template>
  <Editor v-model:html="html" />
  <TextareaCopyable :value="formattedHtml" language="html" />
</template>
