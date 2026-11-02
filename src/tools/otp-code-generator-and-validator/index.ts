import { DeviceMobile } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.otp-generator.title'),
  path: '/otp-generator',
  description: translate('tools.otp-generator.description'),
  keywords: [
    'otp',
    'code',
    'generator',
    'validator',
    'one',
    'time',
    'password',
    'authentication',
    'MFA',
    'mobile',
    'device',
    'security',
    'TOTP',
    'Time',
    'HMAC',
    'autenticacao em dois fatores',
    'dois fatores',
    '2fa',
    'codigo',
    'senha temporaria',
    'google authenticator',
    'token',
  ],
  component: () => import('./otp-code-generator-and-validator.vue'),
  icon: DeviceMobile,
});
