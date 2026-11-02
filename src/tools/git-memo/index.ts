import { BrandGit } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.git-memo.title'),
  path: '/git-memo',
  description: translate('tools.git-memo.description'),
  keywords: ['git', 'push', 'force', 'pull', 'commit', 'amend', 'rebase', 'merge', 'reset', 'soft', 'hard', 'lease', 'comandos', 'guia', 'colinha', 'versionamento', 'branch'],
  component: () => import('./git-memo.vue'),
  icon: BrandGit,
});
