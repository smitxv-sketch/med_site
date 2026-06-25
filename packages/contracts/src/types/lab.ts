/** Лабораторная (черновая) страница в Studio — slug вида lab-xxxx */
export interface StudioLabPageDto {
  pageSlug: string;
  tenantId: string;
  locale: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudioLabListDto {
  pages: StudioLabPageDto[];
}

export interface AiLayoutRequestDto {
  prompt: string;
  instruction?: string;
}

export interface AiLayoutResponseDto {
  seo: { title: string; description: string };
  blocks: import('./page.js').PageBlock[];
  source: 'openrouter' | 'mock';
}
