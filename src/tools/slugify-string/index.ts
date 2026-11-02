import { AbcRound } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.slugify-string.title'),
  path: '/slugify-string',
  description: translate('tools.slugify-string.description'),
  keywords: ['slugify', 'string', 'escape', 'emoji', 'special', 'character', 'space', 'trim', 'slug', 'url amigavel', 'remover acentos', 'texto', 'link'],
  component: () => import('./slugify-string.vue'),
  icon: AbcRound,
});
