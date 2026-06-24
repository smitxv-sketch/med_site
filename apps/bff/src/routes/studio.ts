import type { Request, Response } from 'express';
import {
  getTenantById,
  studioDraftPatchSchema,
  type StudioDraftPatchDto,
} from '@med-site/contracts';
import {
  fetchDesignPresetsFromStrapi,
  getStudioDraft,
  patchStudioDraft,
} from '../services/studioDraftService.js';
import { publishStudioDraft } from '../services/studioPublishService.js';

function resolveLocale(tenantId: string): string {
  const tenant = getTenantById(tenantId);
  return tenant?.strapiLocale ?? 'ru-chel';
}

export async function getDraftHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const pageSlug = String(req.query.page ?? 'home');
  const locale = String(req.query.locale ?? resolveLocale(tenantId));

  try {
    const draft = await getStudioDraft(tenantId, locale, pageSlug);
    return res.json(draft);
  } catch (err) {
    console.error('[bff] getDraft error:', err);
    return res.status(502).json({ error: 'Failed to load draft' });
  }
}

export async function patchDraftHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const pageSlug = String(req.query.page ?? 'home');
  const locale = String(req.query.locale ?? resolveLocale(tenantId));

  const parsed = studioDraftPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid draft patch',
      details: parsed.error.flatten(),
    });
  }

  try {
    const draft = await patchStudioDraft(
      tenantId,
      locale,
      pageSlug,
      parsed.data as StudioDraftPatchDto,
    );
    return res.json(draft);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 502;
    const message =
      status === 409 ? 'Revision conflict' : 'Failed to save draft';
    console.error('[bff] patchDraft error:', err);
    return res.status(status).json({ error: message });
  }
}

export async function getPresetsHandler(_req: Request, res: Response) {
  try {
    const presets = await fetchDesignPresetsFromStrapi();
    return res.json({ presets });
  } catch (err) {
    console.error('[bff] getPresets error:', err);
    return res.status(502).json({ error: 'Failed to load presets' });
  }
}

export async function publishDraftHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const pageSlug = String(req.query.page ?? 'home');
  const locale = String(req.query.locale ?? resolveLocale(tenantId));

  try {
    const published = await publishStudioDraft(tenantId, locale, pageSlug);
    return res.json({ ok: true, draft: published });
  } catch (err) {
    const status = (err as { status?: number }).status ?? 502;
    console.error('[bff] publish error:', err);
    return res.status(status).json({
      error: err instanceof Error ? err.message : 'Publish failed',
    });
  }
}
