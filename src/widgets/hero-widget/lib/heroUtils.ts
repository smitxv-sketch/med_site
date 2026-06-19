import { Promotion } from '@/shared/domain/promotion/types';
import { HERO_THEME } from '../config/heroTheme';

export function getDaysUntilExpiry(endDate: string, now = Date.now()): number {
  const end = new Date(endDate).getTime();
  return Math.max(0, Math.ceil((end - now) / 86_400_000));
}

export function formatDaysLeft(days: number): string {
  if (days === 0) return 'Осталось менее 1 дня';
  if (days === 1) return 'Осталось 1 день';
  if (days >= 2 && days <= 4) return `Осталось ${days} дня`;
  return `Осталось ${days} дней`;
}

/** Активная ВРТ-акция: directionId vrt, ближайший дедлайн */
export function pickActiveVrtPromotion(
  promotions: Promotion[],
  now = Date.now()
): Promotion | null {
  return (
    promotions
      .filter((p) => p.directionId === 'vrt' && new Date(p.endDate).getTime() > now)
      .sort(
        (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      )[0] ?? null
  );
}

export function findPromotionById(
  promotions: Promotion[],
  id?: number
): Promotion | null {
  if (id == null) return null;
  return promotions.find((p) => p.id === id) ?? null;
}

/** Цвет полоски срочности в ВРТ-плашке */
export function getPromoProgressColor(daysLeft: number): string {
  if (daysLeft <= 3) return HERO_THEME.promoProgress.urgent;
  if (daysLeft <= 7) return HERO_THEME.promoProgress.warning;
  return HERO_THEME.promoProgress.neutral;
}

/** Ширина полоски: 100% в начале акции, 0% в конце */
export function getPromoProgressWidth(
  startDate: string,
  endDate: string,
  now = Date.now()
): number {
  const createdAt = new Date(startDate).getTime();
  const expiresAt = new Date(endDate).getTime();
  const total = expiresAt - createdAt;
  if (total <= 0) return 0;
  const elapsed = now - createdAt;
  const remaining = Math.max(0, 1 - elapsed / total);
  return Math.round(remaining * 100);
}
