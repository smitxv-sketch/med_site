import type { Request, Response } from 'express';
import {
  getTenantById,
  studioDraftPatchSchema,
  type StudioDraftPatchDto,
} from '@med-site/contracts';
import { getStudioDraft, patchStudioDraft } from '../services/studioDraftService.js';
import { publishStudioDraft } from '../services/studioPublishService.js';
import { generateAiLayout } from '../services/aiLayoutService.js';
import {
  createPresetInStrapi,
  deletePresetFromStrapi,
  listPresetsFromStrapi,
  updatePresetInStrapi,
} from '../services/presetStrapiService.js';
import {
  createLabPage,
  listLabPages,
  touchLabPage,
} from '../services/studioLabService.js';
import { designPresetSchema } from '@med-site/contracts';

/** Частичное обновление кастомного пресета (slug в URL) */
const presetUpdateSchema = designPresetSchema
  .omit({ slug: true, tenant: true, isSystem: true })
  .partial();

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
    if (pageSlug.startsWith('lab-')) {
      touchLabPage(tenantId, locale, pageSlug);
    }
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
    const presets = await listPresetsFromStrapi();
    return res.json({ presets });
  } catch (err) {
    console.error('[bff] getPresets error:', err);
    return res.status(502).json({ error: 'Failed to load presets' });
  }
}

export async function createPresetHandler(req: Request, res: Response) {
  const parsed = designPresetSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid preset',
      details: parsed.error.flatten(),
    });
  }

  try {
    const preset = await createPresetInStrapi(
      parsed.data as Parameters<typeof createPresetInStrapi>[0],
    );
    return res.status(201).json(preset);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 502;
    console.error('[bff] createPreset error:', err);
    return res.status(status).json({
      error: err instanceof Error ? err.message : 'Failed to save preset',
    });
  }
}

export async function updatePresetHandler(req: Request, res: Response) {
  const slug = String(req.params.slug ?? '');
  if (!slug) {
    return res.status(400).json({ error: 'slug is required' });
  }

  const parsed = presetUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid preset update',
      details: parsed.error.flatten(),
    });
  }

  try {
    const preset = await updatePresetInStrapi(
      slug,
      parsed.data as Parameters<typeof updatePresetInStrapi>[1],
    );
    return res.json(preset);
  } catch (err) {
    const status = (err as { status?: number }).status ?? 502;
    console.error('[bff] updatePreset error:', err);
    return res.status(status).json({
      error: err instanceof Error ? err.message : 'Failed to update preset',
    });
  }
}

export async function deletePresetHandler(req: Request, res: Response) {
  const slug = String(req.params.slug ?? '');
  if (!slug) {
    return res.status(400).json({ error: 'slug is required' });
  }

  try {
    await deletePresetFromStrapi(slug);
    return res.status(204).send();
  } catch (err) {
    const status = (err as { status?: number }).status ?? 502;
    console.error('[bff] deletePreset error:', err);
    return res.status(status).json({
      error: err instanceof Error ? err.message : 'Failed to delete preset',
    });
  }
}

export async function publishDraftHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const pageSlug = String(req.query.page ?? 'home');
  const locale = String(req.query.locale ?? resolveLocale(tenantId));

  if (pageSlug.startsWith('lab-')) {
    return res.status(400).json({
      error: 'Lab pages cannot be published directly. Copy to home or a production slug first.',
    });
  }

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

export async function aiLayoutHandler(req: Request, res: Response) {
  const prompt = String(req.body?.prompt ?? '');
  const instruction = req.body?.instruction
    ? String(req.body.instruction)
    : undefined;

  if (!prompt.trim()) {
    return res.status(400).json({ error: 'prompt is required' });
  }

  try {
    const layout = await generateAiLayout(prompt, instruction);
    return res.json(layout);
  } catch (err) {
    console.error('[bff] aiLayout error:', err);
    return res.status(502).json({ error: 'AI layout failed' });
  }
}

export async function listLabHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const locale = String(req.query.locale ?? resolveLocale(tenantId));
  return res.json(listLabPages(tenantId, locale));
}

export async function createLabHandler(req: Request, res: Response) {
  const tenantId = String(req.query.tenant ?? 'chel');
  const locale = String(req.query.locale ?? resolveLocale(tenantId));
  const title = String(req.body?.title ?? 'Лаборатория');

  try {
    const page = await createLabPage(tenantId, locale, title);
    return res.status(201).json(page);
  } catch (err) {
    console.error('[bff] createLab error:', err);
    return res.status(502).json({ error: 'Failed to create lab page' });
  }
}
