import type { GlobalThemeOverrides } from 'naive-ui';
import { palette } from './palette';

const { light, dark } = palette;

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: light.primary,
    primaryColorHover: light.primaryHover,
    primaryColorPressed: light.primaryPressed,
    primaryColorSuppl: light.primaryHover,
    bodyColor: light.background,
    cardColor: light.surface,
    modalColor: light.surface,
    popoverColor: light.surface,
    borderColor: light.border,
    dividerColor: light.border,
    textColorBase: light.text,
    textColor1: light.text,
    textColor2: light.text,
    textColor3: light.textMuted,
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: {
    color: light.background,
    siderColor: light.surface,
    siderBorderColor: light.border,
  },

  Card: {
    color: light.surface,
    borderColor: light.border,
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: dark.primary,
    primaryColorHover: dark.primaryHover,
    primaryColorPressed: dark.primaryPressed,
    primaryColorSuppl: dark.primaryHover,
    bodyColor: dark.background,
    cardColor: dark.surface,
    modalColor: dark.surface,
    popoverColor: dark.surfaceRaised,
    borderColor: dark.border,
    dividerColor: dark.border,
    textColorBase: dark.text,
    textColor1: dark.text,
    textColor2: dark.text,
    textColor3: dark.textMuted,
  },

  // Azul claro do tema escuro pede texto escuro no botão principal (contraste ≥ 4,5:1)
  Button: {
    textColorPrimary: dark.onPrimary,
    textColorHoverPrimary: dark.onPrimary,
    textColorPressedPrimary: dark.onPrimary,
    textColorFocusPrimary: dark.onPrimary,
  },

  Notification: {
    color: dark.surfaceRaised,
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: dark.surface },
    },
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: {
    color: dark.background,
    siderColor: dark.surface,
    siderBorderColor: 'transparent',
  },

  Card: {
    color: dark.surface,
    borderColor: dark.border,
  },

  Table: {
    tdColor: dark.surface,
    thColor: dark.surfaceRaised,
  },
};
