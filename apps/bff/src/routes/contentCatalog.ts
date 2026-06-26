import type { Request, Response } from 'express';
import {
  DEFAULT_TENANT_ID,
  getMockNews,
  getMockPromotions,
  getMockVacancies,
  getTenantById,
  type PromotionKind,
} from '@med-site/contracts';
import { getDataMode } from '../config/env.js';
import {
  fetchNewsBySlugFromStrapi,
  fetchNewsFromStrapi,
  fetchPromotionBySlugFromStrapi,
  fetchPromotionsFromStrapi,
  fetchVacanciesFromStrapi,
  fetchVacancyBySlugFromStrapi,
} from '../services/contentCatalogService.js';
import { fetchPageFromStrapi } from '../services/strapiClient.js';
import { getMockPage } from '../services/strapiClient.js';

function resolveLocale(tenantId: string): string {
  return getTenantById(tenantId)?.strapiLocale ?? 'ru-chel';
}

function parseKind(raw: unknown): PromotionKind | undefined {
  if (raw === 'promotion' || raw === 'special_offer') return raw;
  return undefined;
}

export async function getPromotionsHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? DEFAULT_TENANT_ID);
  const locale = resolveLocale(tenantId);
  const kind = parseKind(req.query.kind);
  const mode = getDataMode();

  try {
    if (mode === 'mock') {
      return res.json({ items: getMockPromotions(locale, kind) });
    }
    let items = await fetchPromotionsFromStrapi(locale, kind);
    if (!items.length && mode === 'hybrid') {
      items = getMockPromotions(locale, kind);
    }
    return res.json({ items });
  } catch (err) {
    if (mode === 'hybrid') {
      return res.json({ items: getMockPromotions(locale, kind) });
    }
    console.error('[bff] promotions list:', err);
    return res.status(502).json({ error: 'Strapi unavailable' });
  }
}

export async function getPromotionBySlugHandler(req: Request, res: Response) {
  const slug = String(req.params.slug);
  const tenantId = String(req.query.tenant ?? DEFAULT_TENANT_ID);
  const locale = resolveLocale(tenantId);
  const mode = getDataMode();

  try {
    if (mode === 'mock') {
      const item = getMockPromotions(locale).find((p) => p.slug === slug);
      return item ? res.json(item) : res.status(404).json({ error: 'Not found' });
    }
    let item = await fetchPromotionBySlugFromStrapi(slug, locale);
    if (!item && mode === 'hybrid') {
      item = getMockPromotions(locale).find((p) => p.slug === slug) ?? null;
    }
    return item ? res.json(item) : res.status(404).json({ error: 'Not found' });
  } catch (err) {
    if (mode === 'hybrid') {
      const item = getMockPromotions(locale).find((p) => p.slug === slug);
      return item ? res.json(item) : res.status(404).json({ error: 'Not found' });
    }
    console.error('[bff] promotion detail:', err);
    return res.status(502).json({ error: 'Strapi unavailable' });
  }
}

export async function getNewsHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? DEFAULT_TENANT_ID);
  const locale = resolveLocale(tenantId);
  const mode = getDataMode();

  try {
    if (mode === 'mock') return res.json({ items: getMockNews(locale) });
    let items = await fetchNewsFromStrapi(locale);
    if (!items.length && mode === 'hybrid') items = getMockNews(locale);
    return res.json({ items });
  } catch (err) {
    if (mode === 'hybrid') return res.json({ items: getMockNews(locale) });
    console.error('[bff] news list:', err);
    return res.status(502).json({ error: 'Strapi unavailable' });
  }
}

export async function getNewsBySlugHandler(req: Request, res: Response) {
  const slug = String(req.params.slug);
  const tenantId = String(req.query.tenant ?? DEFAULT_TENANT_ID);
  const locale = resolveLocale(tenantId);
  const mode = getDataMode();

  try {
    if (mode === 'mock') {
      const item = getMockNews(locale).find((n) => n.slug === slug);
      return item ? res.json(item) : res.status(404).json({ error: 'Not found' });
    }
    let item = await fetchNewsBySlugFromStrapi(slug, locale);
    if (!item && mode === 'hybrid') {
      item = getMockNews(locale).find((n) => n.slug === slug) ?? null;
    }
    return item ? res.json(item) : res.status(404).json({ error: 'Not found' });
  } catch (err) {
    if (mode === 'hybrid') {
      const item = getMockNews(locale).find((n) => n.slug === slug);
      return item ? res.json(item) : res.status(404).json({ error: 'Not found' });
    }
    console.error('[bff] news detail:', err);
    return res.status(502).json({ error: 'Strapi unavailable' });
  }
}

export async function getVacanciesHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? DEFAULT_TENANT_ID);
  const locale = resolveLocale(tenantId);
  const mode = getDataMode();

  try {
    if (mode === 'mock') return res.json({ items: getMockVacancies(locale) });
    let items = await fetchVacanciesFromStrapi(locale);
    if (!items.length && mode === 'hybrid') items = getMockVacancies(locale);
    return res.json({ items });
  } catch (err) {
    if (mode === 'hybrid') return res.json({ items: getMockVacancies(locale) });
    console.error('[bff] vacancies list:', err);
    return res.status(502).json({ error: 'Strapi unavailable' });
  }
}

export async function getVacancyBySlugHandler(req: Request, res: Response) {
  const slug = String(req.params.slug);
  const tenantId = String(req.query.tenant ?? DEFAULT_TENANT_ID);
  const locale = resolveLocale(tenantId);
  const mode = getDataMode();

  try {
    if (mode === 'mock') {
      const item = getMockVacancies(locale).find((v) => v.slug === slug);
      return item ? res.json(item) : res.status(404).json({ error: 'Not found' });
    }
    let item = await fetchVacancyBySlugFromStrapi(slug, locale);
    if (!item && mode === 'hybrid') {
      item = getMockVacancies(locale).find((v) => v.slug === slug) ?? null;
    }
    return item ? res.json(item) : res.status(404).json({ error: 'Not found' });
  } catch (err) {
    if (mode === 'hybrid') {
      const item = getMockVacancies(locale).find((v) => v.slug === slug);
      return item ? res.json(item) : res.status(404).json({ error: 'Not found' });
    }
    console.error('[bff] vacancy detail:', err);
    return res.status(502).json({ error: 'Strapi unavailable' });
  }
}

/** SEO/intro для листингов: slug vacancies | news | promotions */
export async function getContentListPageHandler(req: Request, res: Response) {
  const slug = String(req.params.slug);
  const tenantId = String(req.query.tenant ?? DEFAULT_TENANT_ID);
  const locale = resolveLocale(tenantId);
  const mode = getDataMode();

  const fallbacks: Record<string, { title: string; description: string }> = {
    vacancies: {
      title: 'Вакансии',
      description: 'Присоединяйтесь к команде профессионалов клиники «Источник».',
    },
    news: {
      title: 'Новости',
      description: 'Актуальные новости и события клиники.',
    },
    promotions: {
      title: 'Акции и спецпредложения',
      description: 'Специальные предложения для заботы о вашем здоровье.',
    },
  };

  const fallback = fallbacks[slug];
  if (!fallback) return res.status(404).json({ error: 'Unknown list page' });

  try {
    if (mode === 'mock') {
      const page = getMockPage(slug, locale);
      return res.json({
        pageTitle: page?.title ?? fallback.title,
        pageDescription: page?.seo?.metaDescription ?? fallback.description,
        seo: page?.seo,
      });
    }
    const page = await fetchPageFromStrapi(slug, locale);
    return res.json({
      pageTitle: page?.title ?? fallback.title,
      pageDescription: page?.seo?.metaDescription ?? fallback.description,
      seo: page?.seo,
    });
  } catch {
    return res.json({
      pageTitle: fallback.title,
      pageDescription: fallback.description,
    });
  }
}
