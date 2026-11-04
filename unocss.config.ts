import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import { presetScrollbar } from 'unocss-preset-scrollbar';
import { palette } from './src/palette';

export default defineConfig({
  presets: [presetUno(), presetAttributify({ ignoreAttributes: ['size'] }), presetTypography(), presetScrollbar()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      'primary': palette.light.primary,
      'paper': palette.light.surface,
      'paper-dark': palette.dark.surface,
      'raised': palette.light.surfaceRaised,
      'raised-dark': palette.dark.surfaceRaised,
      'line': palette.light.border,
      'line-dark': palette.dark.border,
      'canvas': palette.light.background,
      'canvas-dark': palette.dark.background,
    },
  },
  shortcuts: {
    'pretty-scrollbar': 'scrollbar scrollbar-rounded scrollbar-thumb-color-gray-300 scrollbar-track-color-gray-100 dark:scrollbar-thumb-color-#424242 dark:scrollbar-track-color-#686868',
    'divider': 'h-1px bg-current op-10',
    'bg-surface': 'bg-paper dark:bg-paper-dark',
    'bg-background': 'bg-canvas dark:bg-canvas-dark',
  },
});
