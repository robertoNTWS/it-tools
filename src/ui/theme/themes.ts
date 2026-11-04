import { defineThemes } from './theme.models';
import { palette } from '@/palette';

export const { themes: appThemes, useTheme: useAppTheme } = defineThemes({
  light: {
    background: palette.light.surface,
    text: {
      baseColor: palette.light.text,
      mutedColor: palette.light.textMuted,
    },
    default: {
      color: 'rgba(46, 51, 56, 0.05)',
      colorHover: 'rgba(46, 51, 56, 0.09)',
      colorPressed: 'rgba(46, 51, 56, 0.22)',
    },
    primary: {
      color: palette.light.primary,
      colorHover: palette.light.primaryHover,
      colorPressed: palette.light.primaryPressed,
      colorFaded: palette.light.primaryFaded,
    },
    warning: {
      color: '#f59e0b',
      colorHover: '#f59e0b',
      colorPressed: '#f59e0b',
      colorFaded: '#f59e0b2f',
    },
    success: {
      color: '#18a058',
      colorHover: '#36ad6a',
      colorPressed: '#0c7a43',
      colorFaded: '#18a0582f',
    },
    error: {
      color: '#d03050',
      colorHover: '#de576d',
      colorPressed: '#ab1f3f',
      colorFaded: '#d030502a',
    },
  },
  dark: {
    background: palette.dark.surface,
    text: {
      baseColor: palette.dark.text,
      mutedColor: palette.dark.textMuted,
    },
    default: {
      color: 'rgba(255, 255, 255, 0.08)',
      colorHover: 'rgba(255, 255, 255, 0.12)',
      colorPressed: 'rgba(255, 255, 255, 0.24)',
    },
    primary: {
      color: palette.dark.primary,
      colorHover: palette.dark.primaryHover,
      colorPressed: palette.dark.primaryPressed,
      colorFaded: palette.dark.primaryFaded,
    },
    warning: {
      color: '#f59e0b',
      colorHover: '#f59e0b',
      colorPressed: '#f59e0b',
      colorFaded: '#f59e0b2f',
    },
    success: {
      color: '#18a058',
      colorHover: '#36ad6a',
      colorPressed: '#0c7a43',
      colorFaded: '#18a0582f',
    },
    error: {
      color: '#e88080',
      colorHover: '#e98b8b',
      colorPressed: '#e57272',
      colorFaded: '#e8808029',
    },
  },
});
