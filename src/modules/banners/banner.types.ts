// Categorias das ferramentas, como definidas em src/tools/index.ts
export type ToolCategory = 'Crypto' | 'Converter' | 'Web' | 'Images and videos' | 'Development' | 'Network' | 'Math' | 'Measurement' | 'Text' | 'Data';

export interface BannerImage {
  src: string // caminho em public/, ex.: '/banners/curso-x-728x90.webp'
  width: number
  height: number
}

export interface AffiliateBanner {
  id: string // único, sem espaços; aparece no GA (evento banner_click)
  curso: string // nome do curso, só para referência
  href: string // link de afiliado (hotlink da Hotmart)
  image: BannerImage // desktop, ex.: 728x90
  imageMobile?: BannerImage // celular, ex.: 320x100
  alt: { pt: string; en?: string } // descrição da imagem para leitores de tela
  categorias?: ToolCategory[] // aparece com prioridade nessas categorias
  ferramentas?: string[] // aparece com prioridade nessas ferramentas (chave da rota, ex.: 'json-prettify')
  relevanciaDev: number // "Nota aderência dev" da planilha de afiliados (0 a 100)
}
