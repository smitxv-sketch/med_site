import type { PageBlock } from '../types/page.js';

/** Strapi Dynamic Zone entry */
export interface StrapiBlockEntry {
  id?: number | string;
  __component: string;
  widgetType?: string;
  content?: Record<string, unknown> | null;
  design?: Record<string, unknown> | null;
  config?: Record<string, unknown> | null;
  children?: StrapiBlockEntry[] | null;
}

const COMPONENT_TO_WIDGET: Record<string, string> = {
  'blocks.generic-widget': '', // resolved via widgetType
  'blocks.hero': 'HeroWidget',
  'blocks.promotions': 'PromotionsWidget',
  'blocks.special-offers': 'SpecialOffersWidget',
  'blocks.directions': 'DirectionsWidget',
  'blocks.doctors': 'DoctorsWidget',
  'blocks.reviews': 'ReviewsWidget',
};

function resolveWidgetType(entry: StrapiBlockEntry): string {
  if (entry.widgetType) return entry.widgetType;
  const mapped = COMPONENT_TO_WIDGET[entry.__component];
  if (mapped) return mapped;
  // blocks.hero → HeroWidget fallback
  const slug = entry.__component.replace(/^blocks\./, '');
  return slug
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('') + (slug.includes('-') ? 'Widget' : 'Widget');
}

function mapEntry(entry: StrapiBlockEntry, index: number): PageBlock {
  const id = String(entry.id ?? `block-${index}`);
  const type = resolveWidgetType(entry);

  const block: PageBlock = {
    id,
    type,
    content: (entry.content as Record<string, unknown>) ?? {},
    design: (entry.design as PageBlock['design']) ?? {},
    config: (entry.config as PageBlock['config']) ?? {},
  };

  if (entry.children?.length) {
    block.children = entry.children.map((c, i) => mapEntry(c, i));
  }

  return block;
}

/** Нормализация Dynamic Zone Strapi → PageBlock[] */
export function mapStrapiBlocks(
  entries: StrapiBlockEntry[] | null | undefined,
): PageBlock[] {
  if (!entries?.length) return [];
  return entries.map((e, i) => mapEntry(e, i));
}
