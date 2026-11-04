import { defineThemes } from '../theme/theme.models';
import { appThemes } from '../theme/themes';
import { palette } from '@/palette';

const sizes = {
  small: {
    height: '28px',
    fontSize: '12px',
  },
  medium: {
    height: '34px',
    fontSize: '14px',
  },
  large: {
    height: '40px',
    fontSize: '16px',
  },
};

export const { useTheme } = defineThemes({
  dark: {
    sizes,

    backgroundColor: palette.dark.surfaceRaised,
    borderColor: palette.dark.border,
    dropdownShadow: 'rgba(0, 0, 0, 0.2) 0px 8px 24px',

    option: {
      hover: {
        backgroundColor: palette.dark.border,
      },
      active: {
        textColor: appThemes.dark.primary.color,
      },
    },

    focus: {
      backgroundColor: palette.dark.primaryFaded,
    },
  },
  light: {
    sizes,

    backgroundColor: palette.light.surface,
    borderColor: palette.light.border,
    dropdownShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',

    option: {
      hover: {
        backgroundColor: palette.light.surfaceRaised,
      },
      active: {
        textColor: appThemes.light.primary.color,
      },
    },

    focus: {
      backgroundColor: '#ffffff',
    },
  },
});
