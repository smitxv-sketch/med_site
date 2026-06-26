import type {
  NewsDto,
  PromotionDto,
  PromotionKind,
  VacancyDto,
} from '../types/contentCatalog.js';
import { mapStrapiCover } from './mapStrapiMedia.js';

interface StrapiEntityBase {
  id?: number | string;
  documentId?: string;
  slug?: string;
  title?: string;
  locale?: string;
  content?: string;
}

export function mapStrapiPromotion(
  raw: StrapiEntityBase & {
    kind?: PromotionKind;
    shortDescription?: string;
    startDate?: string;
    endDate?: string;
    autoUnpublishOnEnd?: boolean;
    coverImage?: unknown;
    coverImageMobile?: unknown;
  },
  locale: string,
): PromotionDto {
  const id = String(raw.documentId ?? raw.id ?? raw.slug ?? '');
  return {
    id,
    slug: raw.slug ?? id,
    title: raw.title ?? '',
    kind: raw.kind ?? 'promotion',
    shortDescription: raw.shortDescription,
    content: raw.content,
    cover: mapStrapiCover(
      raw.coverImage as never,
      raw.coverImageMobile as never,
    ),
    startDate: raw.startDate,
    endDate: raw.endDate,
    autoUnpublishOnEnd: raw.autoUnpublishOnEnd !== false,
    locale: raw.locale ?? locale,
  };
}

export function mapStrapiNews(
  raw: StrapiEntityBase & {
    excerpt?: string;
    publishedAt?: string;
    unpublishAt?: string;
    coverImage?: unknown;
    coverImageMobile?: unknown;
  },
  locale: string,
): NewsDto {
  const id = String(raw.documentId ?? raw.id ?? raw.slug ?? '');
  return {
    id,
    slug: raw.slug ?? id,
    title: raw.title ?? '',
    excerpt: raw.excerpt,
    content: raw.content,
    cover: mapStrapiCover(
      raw.coverImage as never,
      raw.coverImageMobile as never,
    ),
    publishedAt: raw.publishedAt ?? new Date().toISOString(),
    unpublishAt: raw.unpublishAt,
    locale: raw.locale ?? locale,
  };
}

export function mapStrapiVacancy(
  raw: StrapiEntityBase & {
    department?: string;
    experience?: string;
    employmentType?: string;
    location?: string;
  },
  locale: string,
): VacancyDto {
  const id = String(raw.documentId ?? raw.id ?? raw.slug ?? '');
  return {
    id,
    slug: raw.slug ?? id,
    title: raw.title ?? '',
    content: raw.content ?? '',
    department: raw.department,
    experience: raw.experience,
    employmentType: raw.employmentType,
    location: raw.location,
    locale: raw.locale ?? locale,
  };
}

/** Акция видна на сайте с учётом дат и флага autoUnpublishOnEnd */
export function isPromotionVisible(
  item: PromotionDto,
  now = new Date(),
): boolean {
  const ts = now.getTime();
  if (item.startDate && ts < new Date(item.startDate).getTime()) return false;
  if (
    item.endDate &&
    item.autoUnpublishOnEnd &&
    ts > new Date(item.endDate).getTime()
  ) {
    return false;
  }
  return true;
}

/** Новость видна: дата публикации наступила, дата снятия не прошла */
export function isNewsVisible(item: NewsDto, now = new Date()): boolean {
  const ts = now.getTime();
  if (item.publishedAt && ts < new Date(item.publishedAt).getTime()) return false;
  if (item.unpublishAt && ts > new Date(item.unpublishAt).getTime()) return false;
  return true;
}
