import type { Request, Response } from 'express';
import {
  DEFAULT_ENGINE_STATE,
  DEFAULT_TENANT_ID,
  SYSTEM_DESIGN_PRESETS,
  getTenantById,
} from '@med-site/contracts';
import { getDataMode } from '../config/env.js';
import {
  fetchGlobalLayoutFromStrapi,
  fetchGlobalSettingFromStrapi,
  fetchNavigationFromStrapi,
  fetchPageFromStrapi,
  getMockGlobalLayout,
  getMockGlobalSetting,
  getMockNavigation,
  getMockPage,
} from '../services/strapiClient.js';
import { fetchSiteThemeFromStrapi } from '../services/studioDraftService.js';
import {
  evaluateMarketingRules,
  marketingContextFromQuery,
  mergeEngineState,
} from '../services/marketingRulesService.js';
import {
  applyBlockAbTests,
  parseAbForceQuery,
} from '../services/blockAbService.js';
import { isLabSlug } from '../services/studioLabService.js';

function resolveLocale(tenantId: string): string {
  const tenant = getTenantById(tenantId);
  return tenant?.strapiLocale ?? 'ru-chel';
}

export async function getPageHandler(req: Request, res: Response) {
  const slug = String(req.params.slug ?? 'home');
  const tenantId = String(req.query.tenant ?? DEFAULT_TENANT_ID);
  const locale = resolveLocale(tenantId);
  const mode = getDataMode();

  // Лабораторные страницы не отдаются публично
  if (isLabSlug(slug)) {
    return res.status(404).json({ error: 'Page not found' });
  }

  const abSeed = String(req.query.ab_seed ?? req.headers['x-ab-seed'] ?? 'guest');
  const abForce = parseAbForceQuery(String(req.query.ab ?? ''));

  try {
    let page;
    if (mode === 'mock') {
      page = getMockPage(slug, locale);
    } else {
      page = await fetchPageFromStrapi(slug, locale);
      if (!page && (mode === 'hybrid' || mode === 'live')) {
        page = getMockPage(slug, locale);
      }
      if (!page) return res.status(404).json({ error: 'Page not found' });
    }

    return res.json({
      ...page,
      blocks: applyBlockAbTests(page.blocks, abSeed, abForce),
    });
  } catch (err) {
    if (mode === 'hybrid') {
      const page = getMockPage(slug, locale);
      return res.json({
        ...page,
        blocks: applyBlockAbTests(page.blocks, abSeed, abForce),
      });
    }
    console.error('[bff] getPage error:', err);
    return res.status(502).json({ error: 'Strapi unavailable' });
  }
}

export async function getNavigationHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? DEFAULT_TENANT_ID);
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
  const tenantId = String(req.query.tenant ?? DEFAULT_TENANT_ID);
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

export async function getGlobalSettingHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? DEFAULT_TENANT_ID);
  const locale = resolveLocale(tenantId);
  const mode = getDataMode();

  try {
    if (mode === 'mock') {
      return res.json(getMockGlobalSetting(locale));
    }
    const setting = await fetchGlobalSettingFromStrapi(locale);
    return res.json(setting);
  } catch {
    return res.json(getMockGlobalSetting(locale));
  }
}

/** Публичная тема сайта (read-only) + UTM rules (Wave 2) */
export async function getSiteThemeHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? DEFAULT_TENANT_ID);
  const locale = resolveLocale(tenantId);
  const mode = getDataMode();

  const marketing = evaluateMarketingRules(marketingContextFromQuery(req.query));

  const fallback = {
    locale,
    engineState: DEFAULT_ENGINE_STATE,
    activePresetId: null,
    draftRevision: 0,
    marketing,
  };

  try {
    if (mode === 'mock') {
      return res.json(applyMarketingToTheme(fallback, marketing));
    }

    const theme = await fetchSiteThemeFromStrapi(locale);
    const base = theme ?? fallback;

    return res.json(applyMarketingToTheme(base, marketing));
  } catch (err) {
    if (mode === 'hybrid') {
      return res.json(applyMarketingToTheme(fallback, marketing));
    }
    console.error('[bff] getSiteTheme error:', err);
    return res.status(502).json({ error: 'Strapi unavailable' });
  }
}

function applyMarketingToTheme(
  theme: {
    locale: string;
    engineState: typeof DEFAULT_ENGINE_STATE;
    activePresetId: string | null;
    draftRevision: number;
  },
  marketing: ReturnType<typeof evaluateMarketingRules>,
) {
  let engineState = theme.engineState;
  let activePresetId = theme.activePresetId;

  if (marketing.engineStateOverrides) {
    engineState = mergeEngineState(engineState, marketing.engineStateOverrides);
  }

  if (marketing.appliedPresetId) {
    const preset = SYSTEM_DESIGN_PRESETS.find(
      (p) => p.slug === marketing.appliedPresetId,
    );
    if (preset?.engineState) {
      engineState = mergeEngineState(engineState, preset.engineState);
      activePresetId = marketing.appliedPresetId;
    }
  }

  return {
    ...theme,
    engineState,
    activePresetId,
    marketing,
  };
}

/** Публичный контекст маркетинга (для отладки UTM) */
export async function getMarketingContextHandler(req: Request, res: Response) {
  const marketing = evaluateMarketingRules(marketingContextFromQuery(req.query));
  return res.json({ marketing });
}
