import type { PageDto, StudioPageSeoDto } from '@med-site/contracts';
import { DEFAULT_HOME_SEO } from '@med-site/contracts';

/** Strapi seo → формат Command Center */
export function pageSeoFromStrapi(page: PageDto | null): StudioPageSeoDto {
  return {
    title: page?.seo?.metaTitle ?? page?.title ?? DEFAULT_HOME_SEO.metaTitle ?? '',
    description:
      page?.seo?.metaDescription ?? DEFAULT_HOME_SEO.metaDescription ?? '',
  };
}

/** Command Center seo → Strapi component */
export function pageSeoToStrapi(seo: StudioPageSeoDto) {
  return {
    metaTitle: seo.title,
    metaDescription: seo.description,
  };
}
