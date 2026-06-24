import { z } from 'zod';
import type { PageBlock } from '../types/page.js';
import { engineStatePatchSchema, engineStateSchema } from './engine.js';

export const pageBlockSchema: z.ZodType<PageBlock> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.string(),
    content: z.record(z.unknown()).optional(),
    design: z.record(z.unknown()).optional(),
    config: z.record(z.unknown()).optional(),
    children: z.array(pageBlockSchema).optional(),
    props: z.record(z.unknown()).optional(),
  }),
);

export const studioDraftPatchSchema = z.object({
  revision: z.number().int().nonnegative().optional(),
  engineState: engineStatePatchSchema.optional(),
  pageBlocks: z.array(pageBlockSchema).optional(),
  activePresetId: z.string().nullable().optional(),
});

export const designPresetSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  emoji: z.string(),
  tenant: z.enum(['chel', 'spb', 'all']),
  isSystem: z.boolean(),
  engineState: engineStatePatchSchema,
  pageBlocks: z.array(pageBlockSchema).optional(),
});

export const siteThemeSchema = z.object({
  locale: z.string(),
  engineState: engineStateSchema,
  activePresetId: z.string().nullable(),
  draftRevision: z.number().int().nonnegative(),
});
