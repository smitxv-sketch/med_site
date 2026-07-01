import { Router } from 'express';
import {
  fetchCityPricelist,
  runQmsPriceSync,
  type QmsCity,
} from '../services/qmsPricelistService.js';
import type { QmsPriceSyncOptions } from '../types/qmsPrice.js';

const router = Router();

function parseCity(raw: unknown): QmsCity | null {
  const city = String(raw ?? 'chel');
  return city === 'chel' || city === 'spb' ? city : null;
}

function parseSyncOptions(query: Record<string, unknown>): Partial<QmsPriceSyncOptions> {
  const bool = (key: string, def: boolean) => {
    const v = query[key];
    if (v === undefined) return def;
    return v === '1' || v === 'true';
  };

  const demo = bool('demo', true);
  const target = String(query.target ?? 'report');
  const validTarget = target === 'legacy' || target === 'strapi' ? target : 'report';

  return {
    demo,
    target: validTarget,
    updatePrice: bool('updatePrice', true),
    updateTitle: bool('updateTitle', false),
    unpublishMissing: bool('unpublishMissing', true),
    publishExisting: bool('publishExisting', false),
  };
}

/**
 * GET /api/qms/pricelist?city=chel|spb
 * Прокси getPr (site_proxy → direct).
 */
router.get('/pricelist', async (req, res) => {
  const city = parseCity(req.query.city);
  if (!city) {
    return res.status(400).json({ error: 'city must be chel or spb' });
  }

  try {
    const data = await fetchCityPricelist(city);
    res.json({
      _meta: {
        city,
        fetchedAt: new Date().toISOString(),
        orgCount: data.orgs.length,
        transport: data.transport,
      },
      data,
      errors: data.errors.length ? data.errors : undefined,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(502).json({ error: 'QMS fetch failed', message });
  }
});

/**
 * POST /api/qms/sync/prices?city=chel|spb&demo=1
 * Универсальный dry-run / legacy-синк цен (как qms_price/update_info*.php).
 */
router.post('/sync/prices', async (req, res) => {
  const city = parseCity(req.query.city ?? req.body?.city);
  if (!city) {
    return res.status(400).json({ error: 'city must be chel or spb' });
  }

  const options = parseSyncOptions({
    ...req.body,
    ...req.query,
  });

  if (!options.demo && options.target === 'legacy') {
    return res.status(403).json({
      error: 'Запись в legacy отключена через API. Используйте demo=1 или target=report.',
      hint: 'Для боевого синка — явный флаг allowWrite=1 (позже) или cron на bridge.',
    });
  }

  try {
    const report = await runQmsPriceSync({ city, options });
    res.json({
      _meta: { fetchedAt: new Date().toISOString(), city },
      report,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(502).json({ error: 'QMS price sync failed', message });
  }
});

export default router;
