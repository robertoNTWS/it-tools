import { describe, expect, it } from 'vitest';
import { selectBanner } from './banner-selection';
import type { AffiliateBanner } from './banner.types';

function banner(id: string, extra: Partial<AffiliateBanner> = {}): AffiliateBanner {
  return {
    id,
    curso: id,
    href: `https://go.hotmart.com/${id}`,
    image: { src: `/banners/${id}.webp`, width: 728, height: 90 },
    alt: { pt: id },
    relevanciaDev: 50,
    ...extra,
  };
}

describe('selectBanner', () => {
  it('não retorna banner quando a lista está vazia', () => {
    expect(selectBanner({ banners: [], toolKey: 'json-prettify', category: 'Development' })).toBeUndefined();
  });

  it('prioriza banners ligados à ferramenta ou à categoria', () => {
    const lista = [banner('python', { categorias: ['Development'] }), banner('ia', { relevanciaDev: 100 }), banner('qualquer')];
    for (const r of [0, 0.5, 0.99]) {
      expect(selectBanner({ banners: lista, toolKey: 'json-prettify', category: 'Development', random: () => r })?.id).toBe('python');
    }
    expect(selectBanner({ banners: [banner('json', { ferramentas: ['json-prettify'] }), banner('outro', { relevanciaDev: 90 })], toolKey: 'json-prettify', category: 'Development' })?.id).toBe('json');
  });

  it('sem banner relacionado, usa os de relevância dev alta', () => {
    const lista = [banner('front', { categorias: ['Web'] }), banner('ia', { relevanciaDev: 90 }), banner('baixa', { relevanciaDev: 40 })];
    expect(selectBanner({ banners: lista, toolKey: 'uuid-generator', category: 'Crypto', random: () => 0.99 })?.id).toBe('ia');
  });

  it('sem relacionados nem relevantes, sorteia entre todos', () => {
    const lista = [banner('a', { categorias: ['Web'] }), banner('b')];
    expect(selectBanner({ banners: lista, toolKey: 'uuid-generator', category: 'Crypto', random: () => 0 })?.id).toBe('a');
    expect(selectBanner({ banners: lista, toolKey: 'uuid-generator', category: 'Crypto', random: () => 0.99 })?.id).toBe('b');
  });
});
