import type { AffiliateBanner, ToolCategory } from './banner.types';

// Nota mínima de relevância dev para o 2º nível do sorteio (D46)
export const RELEVANCIA_DEV_MINIMA = 80;

// Sorteia um banner em 3 níveis (D46):
// 1) ligados à ferramenta ou à sua categoria; 2) relevância dev alta; 3) qualquer banner
export function selectBanner({
  banners,
  toolKey,
  category,
  random = Math.random,
}: {
  banners: AffiliateBanner[]
  toolKey?: string
  category?: string
  random?: () => number
}): AffiliateBanner | undefined {
  const related = banners.filter(b => (toolKey && b.ferramentas?.includes(toolKey)) || (category && b.categorias?.includes(category as ToolCategory)));
  const relevant = banners.filter(b => b.relevanciaDev >= RELEVANCIA_DEV_MINIMA);
  const tier = [related, relevant, banners].find(list => list.length > 0);
  return tier ? tier[Math.floor(random() * tier.length)] : undefined;
}
