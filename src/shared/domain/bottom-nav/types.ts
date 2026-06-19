export type BottomNavVariant = 'A' | 'B' | 'C' | 'D' | 'E';

export type BottomNavActionAnimation =
  | 'pulse'
  | 'border-beam'
  | 'shimmer'
  | 'neon';

export const BOTTOM_NAV_VARIANTS: readonly BottomNavVariant[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
] as const;
