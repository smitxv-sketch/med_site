export type PromotionVariant = 'horizontal' | 'circular';

export interface Promotion {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  image: string;
  variant: PromotionVariant;
  directionId?: string;
}

/** Запись в content JSON (относительные даты) */
export interface PromotionContentRecord {
  id: number;
  title: string;
  startDateOffsetDays: number;
  endDateOffsetDays: number;
  image: string;
  variant: PromotionVariant;
  directionId?: string;
}
