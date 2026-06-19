import {
  DIRECTION_UI,
  type DirectionId,
} from '@/shared/config/designTokens';
import { IMAGES } from '@/shared/config/images';
import type { DirectionContentRecord } from '@/shared/domain/direction/types';
import type { ServiceDirection } from '@/shared/domain/direction/types';
import type { HeroSlideContentRecord } from '@/shared/domain/hero/contentTypes';
import type { HeroSlide } from '@/shared/domain/hero/types';
import type {
  Promotion,
  PromotionContentRecord,
} from '@/shared/domain/promotion/types';

const DIRECTION_ID_TO_UI: Record<string, DirectionId> = {
  vrt: 'vrt',
  adult: 'clinic',
  kids: 'kids',
  cosmetology: 'cosmo',
  ambulance: 'ambulance',
  programs: 'programs',
};

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function resolveHeroDirectionUiKey(
  direction?: HeroSlideContentRecord['direction']
): 'vrt' | 'clinic' | 'cosmo' {
  if (direction === 'vrt') return 'vrt';
  if (direction === 'cosmo') return 'cosmo';
  return 'clinic';
}

function resolveSlideImage(record: HeroSlideContentRecord): string {
  if (record.imageKey && record.imageKey in IMAGES) {
    return IMAGES[record.imageKey as keyof typeof IMAGES];
  }
  return record.image ?? '';
}

export function hydrateDirections(
  records: DirectionContentRecord[]
): ServiceDirection[] {
  return records.map((record) => {
    const uiKey = DIRECTION_ID_TO_UI[record.id] ?? 'clinic';
    const ui = DIRECTION_UI[uiKey];

    return {
      ...record,
      path: `/services/${record.id}`,
      textColor: ui.textColor,
      accentBg: ui.accentBg,
      iconColor: ui.iconColor,
      iconBgLight: ui.iconBgLight,
      iconBgSolid: ui.iconBgSolid,
    };
  });
}

export function hydrateHeroSlides(
  records: HeroSlideContentRecord[]
): HeroSlide[] {
  return records.map((record) => {
    const uiKey = resolveHeroDirectionUiKey(record.direction);
    const ui = DIRECTION_UI[uiKey];
    const { imageKey: _imageKey, image: _image, ...rest } = record;

    return {
      ...rest,
      image: resolveSlideImage(record),
      badgeColor: ui.badgeColor,
      bgLight: ui.bgLight,
    };
  });
}

export function hydratePromotions(
  records: PromotionContentRecord[],
  baseDate: Date = new Date()
): Promotion[] {
  return records.map((record) => ({
    id: record.id,
    title: record.title,
    startDate: addDays(baseDate, record.startDateOffsetDays).toISOString(),
    endDate: addDays(baseDate, record.endDateOffsetDays).toISOString(),
    image: record.image,
    variant: record.variant,
    directionId: record.directionId,
  }));
}
