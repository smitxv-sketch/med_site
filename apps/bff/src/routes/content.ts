import type { Request, Response } from 'express';
import { getTenantById } from '@med-site/contracts';
import { getDataMode } from '../config/env.js';
import {
  fetchGlobalLayoutFromStrapi,
  fetchNavigationFromStrapi,
  fetchPageFromStrapi,
  getMockGlobalLayout,
  getMockNavigation,
  getMockPage,
} from '../services/strapiClient.js';

function resolveLocale(tenantId: string): string {
  const tenant = getTenantById(tenantId);
  return tenant?.strapiLocale ?? 'ru-chel';
}

export async function getPageHandler(req: Request, res: Response) {
  const slug = String(req.params.slug ?? 'home');
  const tenantId = String(req.query.tenant ?? 'chel');
  const locale = resolveLocale(tenantId);
  const mode = getDataMode();

  try {
    if (mode === 'mock') {
      return res.json(getMockPage(slug, locale));
    }

    const page = await fetchPageFromStrapi(slug, locale);
    if (page) return res.json(page);

    // Пока Strapi не засеян — отдаём фикстуру (live/hybrid)
    if (mode === 'hybrid' || mode === 'live') {
      return res.json(getMockPage(slug, locale));
    }

    return res.status(404).json({ error: 'Page not found' });
  } catch (err) {
    if (mode === 'hybrid') {
      return res.json(getMockPage(slug, locale));
    }
    console.error('[bff] getPage error:', err);
    return res.status(502).json({ error: 'Strapi unavailable' });
  }
}

export async function getNavigationHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const locale = resolveLocale(tenantId);
  const mode = getDataMode();

  try {
    if (mode === 'mock') {
      return res.json(getMockNavigation(locale));
    }
    const nav = await fetchNavigationFromStrapi(locale);
    return res.json(nav);
  } catch {
    return res.json(getMockNavigation(locale));
  }
}

export async function getGlobalLayoutHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const locale = resolveLocale(tenantId);
  const mode = getDataMode();

  try {
    if (mode === 'mock') {
      return res.json(getMockGlobalLayout(locale));
    }
    const layout = await fetchGlobalLayoutFromStrapi(locale);
    return res.json(layout);
  } catch {
    return res.json(getMockGlobalLayout(locale));
  }
}
