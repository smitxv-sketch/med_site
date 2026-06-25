import type { DesignPresetDto } from '@med-site/contracts';

/** Кастомные пресеты из Studio (до записи в Strapi) */
const customPresets = new Map<string, DesignPresetDto>();

export function listCustomPresets(): DesignPresetDto[] {
  return [...customPresets.values()];
}

export function createCustomPreset(
  input: Omit<DesignPresetDto, 'id' | 'isSystem'> & { slug?: string },
): DesignPresetDto {
  const slug =
    input.slug ??
    `custom-${Date.now().toString(36)}`;

  const preset: DesignPresetDto = {
    id: slug,
    slug,
    name: input.name,
    description: input.description,
    emoji: input.emoji,
    tenant: input.tenant ?? 'chel',
    isSystem: false,
    engineState: input.engineState ?? {},
    pageBlocks: input.pageBlocks,
  };

  customPresets.set(slug, preset);
  return preset;
}

export function mergePresets(
  system: DesignPresetDto[],
  custom: DesignPresetDto[],
): DesignPresetDto[] {
  const bySlug = new Map<string, DesignPresetDto>();
  for (const p of system) bySlug.set(p.slug, p);
  for (const p of custom) bySlug.set(p.slug, p);
  return [...bySlug.values()];
}
