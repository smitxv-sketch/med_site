/**
 * SSOT: формат блоков страницы (совместим с прототипом PageBlock).
 */

export interface BlockDesignParams {
  backgroundColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  layoutPattern?: string;
  intent?: string;
  desktopVariant?: string;
  mobileVariant?: string;
  variantOverride?: string;
  [key: string]: unknown;
}

export interface BlockConfigParams {
  hidden?: boolean;
  visibilityTarget?: string;
  visibilityAuth?: string;
  visibilityRule?: string;
  refId?: string;
  [key: string]: unknown;
}

export interface PageBlock {
  id: string;
  type: string;
  content?: Record<string, unknown>;
  design?: BlockDesignParams;
  config?: BlockConfigParams;
  children?: PageBlock[];
  props?: Record<string, unknown>;
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
}

export interface PageDto {
  slug: string;
  title: string;
  seo: SeoFields;
  blocks: PageBlock[];
  locale: string;
}

export interface MenuItemDto {
  label: string;
  url: string;
  children?: MenuItemDto[];
}

export interface NavigationDto {
  headerMenu: MenuItemDto[];
  footerColumns: { title: string; links: MenuItemDto[] }[];
  locale: string;
}

export interface GlobalLayoutDto {
  headerBlocks: PageBlock[];
  footerBlocks: PageBlock[];
  mobileNavBlocks: PageBlock[];
  locale: string;
}
