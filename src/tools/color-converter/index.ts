import { Palette } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.color-converter.title'),
  path: '/color-converter',
  description: translate('tools.color-converter.description'),
  keywords: ['color', 'converter', 'cor', 'cores', 'hex', 'rgb', 'hsl', 'paleta'],
  component: () => import('./color-converter.vue'),
  icon: Palette,
  redirectFrom: ['/color-picker-converter'],
});
