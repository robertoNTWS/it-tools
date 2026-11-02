import { Phone } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.phone-parser-and-formatter.title'),
  path: '/phone-parser-and-formatter',
  description: translate('tools.phone-parser-and-formatter.description'),
  keywords: [
    'phone',
    'parser',
    'formatter',
    'validate',
    'format',
    'number',
    'telephone',
    'mobile',
    'cell',
    'international',
    'national',
    'telefone',
    'celular',
    'numero',
    'validar',
    'formatar',
    'ddi',
    'ddd',
    'whatsapp',
  ],
  component: () => import('./phone-parser-and-formatter.vue'),
  icon: Phone,
  createdAt: new Date('2023-05-01'),
});
