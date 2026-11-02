import { Link } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.url-encoder.title'),
  path: '/url-encoder',
  description: translate('tools.url-encoder.description'),
  keywords: ['url', 'encode', 'decode', 'percent', '%20', 'format', 'codificar', 'decodificar', 'link', 'caracteres especiais'],
  component: () => import('./url-encoder.vue'),
  icon: Link,
});
