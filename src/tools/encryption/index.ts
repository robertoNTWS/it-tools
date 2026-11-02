import { Lock } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.encryption.title'),
  path: '/encryption',
  description: translate('tools.encryption.description'),
  keywords: ['cypher', 'encipher', 'text', 'AES', 'TripleDES', 'Rabbit', 'RC4', 'criptografar', 'descriptografar', 'cifrar', 'decifrar', 'criptografia', 'senha', 'chave'],
  component: () => import('./encryption.vue'),
  icon: Lock,
  redirectFrom: ['/cypher'],
});
