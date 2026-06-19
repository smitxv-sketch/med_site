import React from 'react';
import { HERO_THEME } from '../config/heroTheme';
import { getPromoProgressColor, getPromoProgressWidth } from '../lib/heroUtils';

interface HeroPromoProgressProps {
  startDate: string;
  endDate: string;
  daysLeft: number;
}

export function HeroPromoProgress({
  startDate,
  endDate,
  daysLeft,
}: HeroPromoProgressProps) {
  const width = getPromoProgressWidth(startDate, endDate);
  const fillColor = getPromoProgressColor(daysLeft);

  return (
    <div
      className="h-[3px] rounded-sm mt-1.5 overflow-hidden"
      style={{ backgroundColor: HERO_THEME.promoProgress.track }}
    >
      <div
        className="h-full rounded-sm transition-[width] duration-300 ease-out"
        style={{ width: `${width}%`, backgroundColor: fillColor }}
      />
    </div>
  );
}
