import { defineThemes } from '../theme/theme.models';
import { palette } from '@/palette';

export const { useTheme } = defineThemes({
  dark: {
    backgroundColor: palette.dark.surface,
    borderColor: palette.dark.border,
  },
  light: {
    backgroundColor: palette.light.surface,
    borderColor: palette.light.border,
  },
});
