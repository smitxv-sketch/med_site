/** Alias maps: CMS layoutPattern / semantic name → internal variant id */

export const PROMOTIONS_VARIANT_ALIASES: Record<string, string> = {
  grid: 'D',
  carousel: 'B',
  compact: 'E',
  classic: 'A',
};

export const PROMOTIONS_VALID_VARIANTS = ['A', 'B', 'C', 'D', 'E'] as const;

export const DIRECTIONS_VARIANT_ALIASES: Record<string, string> = {
  grid: 'A',
  accordion: 'A',
  bento: 'B',
  list: 'C',
};

export const DIRECTIONS_VALID_VARIANTS = ['A', 'B', 'C'] as const;

export const DOCTORS_VARIANT_ALIASES: Record<string, string> = {
  grid: 'A',
  carousel: 'A',
  compact: 'B',
  stack: 'C',
  tabs: 'D',
  split: 'A',
};

export const DOCTORS_VALID_VARIANTS = ['A', 'B', 'C', 'D'] as const;

export const REVIEWS_VARIANT_ALIASES: Record<string, string> = {
  A: 'grid',
  grid: 'grid',
  B: 'carousel',
  carousel: 'carousel',
  stack: 'carousel',
  C: 'masonry',
  masonry: 'masonry',
  split: 'masonry',
  D: 'slider-filtered',
  'slider-filtered': 'slider-filtered',
  fluid: 'slider-filtered',
};

export const REVIEWS_VALID_VARIANTS = [
  'grid',
  'carousel',
  'masonry',
  'slider-filtered',
] as const;

export const FAQ_VARIANT_ALIASES: Record<string, string> = {
  A: 'grid',
  grid: 'grid',
  fluid: 'grid',
  B: 'accordion',
  accordion: 'accordion',
  stack: 'accordion',
  C: 'split',
  split: 'split',
};

export const FAQ_VALID_VARIANTS = ['grid', 'accordion', 'split'] as const;

export const FEATURES_VARIANT_ALIASES: Record<string, string> = {
  A: 'grid',
  grid: 'grid',
  fluid: 'grid',
  B: 'list',
  list: 'list',
  stack: 'list',
  C: 'bento',
  bento: 'bento',
  split: 'bento',
};

export const FEATURES_VALID_VARIANTS = ['grid', 'list', 'bento', 'stack'] as const;

export const TIMELINE_VARIANT_ALIASES: Record<string, string> = {
  A: 'vertical',
  vertical: 'vertical',
  stack: 'vertical',
  B: 'carousel',
  carousel: 'carousel',
  horizontal: 'carousel',
  fluid: 'carousel',
  grid: 'carousel',
};

export const TIMELINE_VALID_VARIANTS = ['vertical', 'carousel'] as const;
