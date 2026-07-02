/** DTO каталога прайса (BFF → фронт). SSOT для /prices */

export type PriceTabId = 'all' | 'consultation' | 'diagnostics' | 'programs' | 'treatment';

export type PriceCatalogTabDto = {
  id: PriceTabId;
  label: string;
  /** QMS section (priem, diagnostika…) — для фильтра на бэке */
  tabQms?: string;
};

export type PriceQuickNavDto = {
  tabId: PriceTabId;
  label: string;
  categorySlug?: string;
  tone?: string;
};

export type PriceCatalogItemDto = {
  id: string;
  article: string;
  name: string;
  price: string;
  sortOrder: number;
  isProgram?: boolean;
  summary?: string;
  slug?: string;
  legacyOnly?: boolean;
};

export type PriceCatalogCategoryDto = {
  id: string;
  name: string;
  tabId: PriceTabId;
  tabQms?: string;
  expertIntro?: string;
  aboutText?: string;
  seoTitle?: string;
  seoDescription?: string;
  items: PriceCatalogItemDto[];
};

export type PriceCatalogDto = {
  tenant: string;
  locale: string;
  placementCount: number;
  categoryCount: number;
  tabs: PriceCatalogTabDto[];
  quickNav: PriceQuickNavDto[];
  categories: PriceCatalogCategoryDto[];
};

export type ServiceIncludedItemDto = {
  label: string;
  article?: string;
  title?: string;
  price?: string;
  sortOrder: number;
};

export type CatalogServiceDetailDto = {
  tenant: string;
  locale: string;
  article: string;
  title: string;
  price: string;
  slug?: string;
  summary?: string;
  description?: string;
  isProgram: boolean;
  includedListTitle?: string;
  includedItems: ServiceIncludedItemDto[];
  legacyOnly?: boolean;
};
