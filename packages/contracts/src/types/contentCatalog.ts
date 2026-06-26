/** SSOT: типы контент-каталога (акции, новости, вакансии) */

export type PromotionKind = 'promotion' | 'special_offer';

export interface CoverImageDto {
  url: string;
  alt?: string;
  /** Мобильная версия — если есть, фронт предпочитает её на узких экранах */
  mobileUrl?: string;
}

export interface PromotionDto {
  id: string;
  slug: string;
  title: string;
  kind: PromotionKind;
  shortDescription?: string;
  content?: string;
  cover?: CoverImageDto;
  startDate?: string;
  endDate?: string;
  autoUnpublishOnEnd: boolean;
  locale: string;
}

export type NewsKind = 'news' | 'anonce' | 'article';

export interface NewsDto {
  id: string;
  slug: string;
  title: string;
  kind: NewsKind;
  excerpt?: string;
  content?: string;
  cover?: CoverImageDto;
  publishedAt: string;
  unpublishAt?: string;
  anonceLink?: string;
  sortOrder?: number;
  showOnHome?: boolean;
  locale: string;
}

export interface VacancyDto {
  id: string;
  slug: string;
  title: string;
  content: string;
  department?: string;
  experience?: string;
  employmentType?: string;
  location?: string;
  locale: string;
}

export interface ContentListPageDto {
  pageTitle: string;
  pageDescription?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}
