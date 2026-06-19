import { Promotion } from '@/shared/api/contentApi';

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
