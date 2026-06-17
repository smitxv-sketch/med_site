import React from 'react';
import { Promotion } from '../../model/types';
import { useUISettingsStore } from '../../../../shared/store/uiSettingsStore';

interface PromotionsListProps {
  promotions: Promotion[];
  title?: string;
}

export function PromotionsList({ promotions, title = 'Акции' }: PromotionsListProps) {
  const { promotionsSectionVariant } = useUISettingsStore();

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button className="text-xs font-bold text-brand">Все</button>
      </div>
      
      {promotionsSectionVariant === 'C' ? (
        <div className="grid grid-cols-2 gap-3">
          {promotions.map((promo) => (
            <div 
              key={promo.id} 
              className="relative aspect-square overflow-hidden shrink-0 shadow-[var(--app-shadow)] cursor-pointer group"
              style={{ borderRadius: 'var(--app-radius)', border: 'var(--app-border)' }}
            >
              <img src={promo.bgUrl} alt={promo.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 p-3 flex flex-col justify-end h-full">
                <h4 className="text-white font-bold text-sm leading-tight mb-1">{promo.title}</h4>
              </div>
            </div>
          ))}
        </div>
      ) : promotionsSectionVariant === 'B' ? (
        <div className="flex flex-col gap-3">
          {promotions.map((promo) => (
            <div 
              key={promo.id} 
              className="relative w-full aspect-[21/9] min-h-[120px] overflow-hidden shrink-0 shadow-[var(--app-shadow)] cursor-pointer group flex flex-col"
              style={{ borderRadius: 'var(--app-radius)', border: 'var(--app-border)' }}
            >
              <img src={promo.bgUrl} alt={promo.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5 w-2/3 sm:w-1/2">
                <h4 className="text-white font-bold text-lg leading-tight mb-1">{promo.title}</h4>
                <p className="text-white/80 text-xs font-medium leading-snug line-clamp-2">{promo.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x">
          {promotions.map((promo) => (
            <div 
              key={promo.id} 
              className="relative w-[280px] sm:w-[320px] aspect-[2/1] min-h-[140px] snap-center overflow-hidden shrink-0 shadow-[var(--app-shadow)] cursor-pointer group flex flex-col"
              style={{ borderRadius: 'var(--app-radius)', border: 'var(--app-border)' }}
            >
              <img src={promo.bgUrl} alt={promo.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5 w-2/3 sm:w-3/4">
                <h4 className="text-white font-bold text-lg leading-tight mb-1">{promo.title}</h4>
                <p className="text-white/80 text-xs font-medium leading-snug line-clamp-2">{promo.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
