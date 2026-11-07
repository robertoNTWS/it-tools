// Banners de afiliados (fase 6). Um banner por página, no topo das ferramentas.
// Como cadastrar: docs/BANNERS.md. Imagens em public/banners/. Lista vazia = nenhum banner no site.
import type { AffiliateBanner } from '@/modules/banners/banner.types';

export const banners: AffiliateBanner[] = [
  {
    // Desktop: banner oficial do produtor (468x60 em alta resolução, sem a borda branca); celular: banner próprio no estilo do site
    id: 'universidade-dos-dados-clube',
    curso: 'Clube de Assinaturas da Universidade dos Dados',
    href: 'https://go.hotmart.com/R108386262O',
    image: { src: '/banners/universidade-dos-dados-728x95.png', width: 728, height: 95 },
    imageMobile: { src: '/banners/universidade-dos-dados-320x100.png', width: 320, height: 100 },
    alt: { pt: 'Universidade dos Dados: formação em Análise e Ciência de Dados com Python, SQL e Power BI' },
    relevanciaDev: 75,
  },
];
