import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { usePromotionsRepository } from '@/shared/di/DIContext';
import { Promotion } from '@/shared/domain/promotion/types';
import {
  formatDaysLeft,
  getDaysUntilExpiry,
} from '../../lib/heroUtils';
import { resolvePromotionDirectionAccent } from '@/shared/lib/design/resolveDirectionAccent';
import { MOBILE_HERO_CONFIG } from '../../config/mobileHeroConfig';

function getTimerColor(daysLeft: number): string {
  const { timerUrgent, timerWarning, timerViolet, textSecondary } =
    MOBILE_HERO_CONFIG.colors;
  if (daysLeft <= 3) return timerUrgent;
  if (daysLeft <= 7) return timerWarning;
  return textSecondary;
}

function PromoMiniCard({
  promo,
  isSingle,
}: {
  promo: Promotion;
  isSingle: boolean;
}) {
  const daysLeft = getDaysUntilExpiry(promo.endDate);
  const borderColor = resolvePromotionDirectionAccent(promo.directionId);

  return (
    <Link
      to={`/promotions/${promo.id}`}
      className="shrink-0 rounded-xl p-3 border-[0.5px] bg-white"
      style={{
        minWidth: isSingle
          ? `${MOBILE_HERO_CONFIG.promoZone.cardSingleWidthPercent}vw`
          : MOBILE_HERO_CONFIG.promoZone.cardMinWidth,
        borderColor: MOBILE_HERO_CONFIG.colors.borderTertiary,
        borderLeftWidth: 3,
        borderLeftColor: borderColor,
      }}
    >
      <p className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2 mb-1.5">
        {promo.title}
      </p>
      <p
        className="flex items-center gap-1 text-[11px]"
        style={{ color: getTimerColor(daysLeft) }}
      >
        <Clock className="w-3 h-3 shrink-0" strokeWidth={2} />
        {formatDaysLeft(daysLeft)}
      </p>
    </Link>
  );
}

export function HeroMobileZonePromos() {
  const promotionsRepository = usePromotionsRepository();
  const { data: promotions = [] } = useQuery({
    queryKey: ['mobileHeroPromos'],
    queryFn: () => promotionsRepository.getPromotions(),
  });

  const now = Date.now();
  const active = promotions
    .filter((p) => new Date(p.endDate).getTime() > now)
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    )
    .slice(0, MOBILE_HERO_CONFIG.promoZone.maxPromos);

  if (active.length === 0) return null;

  const cfg = MOBILE_HERO_CONFIG.promoZone;
  const isSingle = active.length === 1;

  return (
    <div
      style={{
        marginTop: cfg.marginTop,
        marginLeft: cfg.marginX,
        marginRight: cfg.marginX,
      }}
    >
      <p
        className="font-medium uppercase mb-2"
        style={{
          fontSize: cfg.labelSize,
          color: MOBILE_HERO_CONFIG.colors.textSecondary,
          letterSpacing: '0.06em',
        }}
      >
        АКЦИИ
      </p>
      <div
        className="flex overflow-x-auto scrollbar-hide pb-1"
        style={{ gap: cfg.gap }}
      >
        {active.map((promo) => (
          <PromoMiniCard key={promo.id} promo={promo} isSingle={isSingle} />
        ))}
      </div>
    </div>
  );
}
