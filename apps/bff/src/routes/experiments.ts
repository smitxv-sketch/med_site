import type { Request, Response } from 'express';
import { getTenantById, type CreateExperimentDto } from '@med-site/contracts';
import {
  applyExperimentWinner,
  createExperiment,
  getExperiment,
  listExperiments,
  recordExperimentImpression,
  suggestExperimentWinner,
  updateExperimentStatus,
} from '../services/experimentService.js';
import { generateEvolutionInsights } from '../services/evolutionAiService.js';

function resolveLocale(tenantId: string): string {
  const tenant = getTenantById(tenantId);
  return tenant?.strapiLocale ?? 'ru-chel';
}

export async function listExperimentsHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const locale = String(req.query.locale ?? resolveLocale(tenantId));
  return res.json(listExperiments(tenantId, locale));
}

export async function createExperimentHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const locale = String(req.query.locale ?? resolveLocale(tenantId));
  const body = req.body as CreateExperimentDto;

  if (!body?.name?.trim() || !body?.variants?.length) {
    return res.status(400).json({ error: 'name and variants required' });
  }

  const exp = createExperiment(tenantId, locale, body);
  return res.status(201).json(exp);
}

export async function startExperimentHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const locale = String(req.query.locale ?? resolveLocale(tenantId));
  const id = String(req.params.id);

  try {
    return res.json(updateExperimentStatus(tenantId, locale, id, 'running'));
  } catch (err) {
    const status = (err as { status?: number }).status ?? 502;
    return res.status(status).json({ error: (err as Error).message });
  }
}

export async function suggestExperimentHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const locale = String(req.query.locale ?? resolveLocale(tenantId));
  const id = String(req.params.id);

  try {
    const exp = getExperiment(tenantId, locale, id);
    if (!exp) return res.status(404).json({ error: 'Not found' });

    const suggestion = suggestExperimentWinner(tenantId, locale, id);
    const insights = await generateEvolutionInsights(exp);
    return res.json({ suggestion, insights });
  } catch (err) {
    const status = (err as { status?: number }).status ?? 502;
    return res.status(status).json({ error: (err as Error).message });
  }
}

export async function applyWinnerHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const locale = String(req.query.locale ?? resolveLocale(tenantId));
  const id = String(req.params.id);

  try {
    const exp = await applyExperimentWinner(tenantId, locale, id, req.body);
    return res.json(exp);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 502;
    return res.status(status).json({ error: (err as Error).message });
  }
}

/** Публичный трекинг показа/конверсии (с сайта) */
export async function trackExperimentHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const locale = String(req.query.locale ?? resolveLocale(tenantId));
  const id = String(req.params.id);
  const variantId = String(req.body?.variantId ?? '');
  const converted = Boolean(req.body?.converted);

  if (!variantId) return res.status(400).json({ error: 'variantId required' });

  try {
    const exp = recordExperimentImpression(
      tenantId,
      locale,
      id,
      variantId,
      converted,
    );
    return res.json({ ok: true, metrics: exp.metrics });
  } catch (err) {
    const status = (err as { status?: number }).status ?? 400;
    return res.status(status).json({ error: (err as Error).message });
  }
}
