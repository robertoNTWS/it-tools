// Paleta Cobalto do Canidev Suíço: fonte única das cores do tema (decisão D31).
// Usada pelos temas do naive-ui (src/themes.ts), pelos componentes base (src/ui) e pelo UnoCSS.
// Contrastes medidos (WCAG): texto ≥ 14:1, texto de apoio ≥ 6:1, destaque e botão ≥ 5,2:1.

export const palette = {
  light: {
    background: '#F7F8FB',
    surface: '#FFFFFF',
    surfaceRaised: '#F0F2F7',
    border: '#E2E5EE',
    text: '#121521',
    textMuted: '#5B6275',
    primary: '#2F5BEA',
    primaryHover: '#4A71EE',
    primaryPressed: '#2447C2',
    primaryFaded: '#2F5BEA1F',
    onPrimary: '#FFFFFF',
  },
  dark: {
    background: '#0D1018',
    surface: '#151925',
    surfaceRaised: '#1E2433',
    border: '#252B3B',
    text: '#E6E9F2',
    textMuted: '#979FB3',
    primary: '#7895FF',
    primaryHover: '#93AAFF',
    primaryPressed: '#5C7AF0',
    primaryFaded: '#7895FF29',
    onPrimary: '#0D1018',
  },
} as const;

// Gradiente da marca, igual nos dois temas: botão de apoio, aviso de cookies e banners próprios
// (docs/scripts/gerar-banner.cjs repete estes valores, porque gera as imagens fora do app).
export const brand = {
  deep: '#1B2A6B',
  mid: '#2447C2',
  bright: '#2F5BEA',
  onBrand: '#FFFFFF',
} as const;

export function brandGradient(angle: number) {
  return `linear-gradient(${angle}deg, ${brand.deep} 0%, ${brand.mid} 62%, ${brand.bright} 100%)`;
}
