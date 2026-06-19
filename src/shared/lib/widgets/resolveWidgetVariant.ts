/**
 * Единый resolver вариантов виджетов (desktop/mobile).
 * Legacy: layoutPattern, variant, variantOverride + global store fallback.
 */

export interface VariantSourceInput {
  desktopVariant?: string | null;
  mobileVariant?: string | null;
  layoutPattern?: string | null;
  variant?: string | null;
  variantOverride?: string | null;
  globalFallback?: string | null;
}

export interface ResolveVariantOptions {
  defaultValue: string;
  /** CMS alias → internal variant id */
  aliasMap?: Record<string, string>;
  /** Прямые internal ids (A, B, grid, carousel…) */
  validValues?: readonly string[];
}

function pickRawSource(
  input: VariantSourceInput,
  platform: 'desktop' | 'mobile'
): string | undefined {
  const platformVariant =
    platform === 'desktop' ? input.desktopVariant : input.mobileVariant;

  const candidates = [
    platformVariant,
    input.layoutPattern,
    input.variant,
    input.variantOverride,
    input.globalFallback,
  ];

  for (const value of candidates) {
    if (value && value !== '-') return value;
  }
  return undefined;
}

export function resolveWidgetVariant(
  raw: string | undefined,
  options: ResolveVariantOptions
): string {
  const { defaultValue, aliasMap = {}, validValues = [] } = options;

  if (!raw || raw === '-') return defaultValue;

  if (aliasMap[raw]) return aliasMap[raw];

  if (validValues.includes(raw)) return raw;

  const internalTargets = new Set(Object.values(aliasMap));
  if (internalTargets.has(raw)) return raw;

  return defaultValue;
}

export function resolveWidgetVariants(
  input: VariantSourceInput,
  desktop: ResolveVariantOptions,
  mobile: ResolveVariantOptions
): { desktop: string; mobile: string } {
  return {
    desktop: resolveWidgetVariant(pickRawSource(input, 'desktop'), desktop),
    mobile: resolveWidgetVariant(pickRawSource(input, 'mobile'), mobile),
  };
}
