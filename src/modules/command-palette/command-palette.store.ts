import { defineStore } from 'pinia';
import _ from 'lodash';
import type { PaletteOption } from './command-palette.types';
import { useToolStore } from '@/tools/tools.store';
import { useFuzzySearch } from '@/composable/fuzzySearch';
import { useStyleStore } from '@/stores/style.store';
import { translate } from '@/plugins/i18n.plugin';

import SunIcon from '~icons/mdi/white-balance-sunny';
import GithubIcon from '~icons/mdi/github';
import BugIcon from '~icons/mdi/bug-outline';
import DiceIcon from '~icons/mdi/dice-5';
import InfoIcon from '~icons/mdi/information-outline';

export const useCommandPaletteStore = defineStore('command-palette', () => {
  const toolStore = useToolStore();
  const styleStore = useStyleStore();
  const router = useRouter();
  const searchPrompt = ref('');

  const toolsOptions = toolStore.tools.map(tool => ({
    ...tool,
    to: tool.path,
    toolCategory: tool.category,
    category: translate('commandPalette.categories.tools'),
  }));

  const searchOptions: PaletteOption[] = [
    ...toolsOptions,
    {
      name: translate('commandPalette.randomTool.name'),
      description: translate('commandPalette.randomTool.description'),
      action: () => {
        const { path } = _.sample(toolStore.tools)!;
        router.push(path);
      },
      icon: DiceIcon,
      category: translate('commandPalette.categories.tools'),
      keywords: ['random', 'tool', 'pick', 'choose', 'select', 'aleatoria', 'sortear', 'escolher'],
      closeOnSelect: true,
    },
    {
      name: translate('commandPalette.toggleDarkMode.name'),
      description: translate('commandPalette.toggleDarkMode.description'),
      action: () => styleStore.toggleDark(),
      icon: SunIcon,
      category: translate('commandPalette.categories.actions'),
      keywords: ['dark', 'theme', 'toggle', 'mode', 'light', 'system', 'modo escuro', 'modo claro', 'tema', 'alternar'],
    },
    {
      name: translate('commandPalette.github.name'),
      href: 'https://github.com/CorentinTh/it-tools',
      category: translate('commandPalette.categories.external'),
      description: translate('commandPalette.github.description'),
      keywords: ['github', 'repo', 'repository', 'source', 'code', 'repositorio', 'codigo fonte'],
      icon: GithubIcon,
    },
    {
      name: translate('commandPalette.reportBug.name'),
      description: translate('commandPalette.reportBug.description'),
      href: 'https://github.com/CorentinTh/it-tools/issues/new/choose',
      category: translate('commandPalette.categories.actions'),
      keywords: ['report', 'issue', 'bug', 'problem', 'error', 'relatar', 'erro', 'problema'],
      icon: BugIcon,
    },
    {
      name: translate('commandPalette.about.name'),
      description: translate('commandPalette.about.description'),
      to: '/about',
      category: translate('commandPalette.categories.pages'),
      keywords: ['about', 'learn', 'more', 'info', 'information', 'sobre', 'informacoes'],
      icon: InfoIcon,
    },
  ];

  const { searchResult } = useFuzzySearch({
    search: searchPrompt,
    data: searchOptions,
    options: {
      keys: [{ name: 'name', weight: 2 }, 'description', 'keywords', 'category'],
      threshold: 0.3,
    },
  });

  const filteredSearchResult = computed(() =>
    _.chain(searchResult.value).groupBy('category').mapValues(categoryOptions => _.take(categoryOptions, 5)).value());

  return {
    filteredSearchResult,
    searchPrompt,
  };
});
