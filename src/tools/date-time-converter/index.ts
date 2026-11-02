import { Calendar } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.date-converter.title'),
  path: '/date-converter',
  description: translate('tools.date-converter.description'),
  keywords: ['date', 'time', 'converter', 'iso', 'utc', 'timezone', 'year', 'month', 'day', 'minute', 'seconde', 'data', 'hora', 'timestamp', 'unix', 'fuso horario', 'epoch'],
  component: () => import('./date-time-converter.vue'),
  icon: Calendar,
});
