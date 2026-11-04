import { defineThemes } from '../theme/theme.models';
import { palette } from '@/palette';

export const { useTheme } = defineThemes({
  dark: {
    backgroundColor: palette.dark.surfaceRaised,
    borderColor: palette.dark.border,

    focus: {
      backgroundColor: palette.dark.primaryFaded,
    },
  },
  light: {
    backgroundColor: palette.light.surface,
    borderColor: palette.light.border,

    focus: {
      backgroundColor: '#ffffff',
    },
  },
});
