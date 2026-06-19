import {
  DIRECTION_TOKENS,
  type DirectionId,
} from '@/shared/config/designTokens';

/** Алиасы directionId из CMS/промо → канонический DirectionId */
const PROMO_DIRECTION_ALIAS: Record<string, DirectionId> = {
  adult: 'clinic',
  clinic: 'clinic',
  vrt: 'vrt',
  kids: 'kids',
  cosmo: 'cosmo',
  ambulance: 'ambulance',
  programs: 'programs',
};

/** CSS-акцент направления для бордеров/плашек промо */
export function resolvePromotionDirectionAccent(directionId?: string): string {
  const key =
    directionId && directionId in PROMO_DIRECTION_ALIAS
      ? PROMO_DIRECTION_ALIAS[directionId]
      : 'clinic';
  return DIRECTION_TOKENS[key].cssAccent;
}
