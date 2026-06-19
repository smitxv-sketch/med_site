import { SEMANTIC } from '@/shared/config/designTokens';

/** Только layout + semantic class keys — без raw HEX */
export const EXAMPLE_WIDGET_THEME = {
  cardGap: 16,
  titleClass: SEMANTIC.textPrimary,
  subtitleClass: SEMANTIC.textSecondary,
} as const;
