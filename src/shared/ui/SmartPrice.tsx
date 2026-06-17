import React from 'react';
import { useUISettingsStore } from '../store/uiSettingsStore';

interface SmartPriceProps {
  price?: number | string;
  className?: string;
  prefixClassName?: string;
  hidePrefix?: boolean; // Sometimes the "from" is part of the layout, we may want to suppress it if we handle it outside
  showValueOnly?: boolean; // Don't render formatting, just return value if needed
}

export function SmartPrice({ price, className = '', prefixClassName = 'text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5', hidePrefix = false }: SmartPriceProps) {
  const { pricingStrategy } = useUISettingsStore();

  if (!price || pricingStrategy === 'hidden') {
    return null;
  }

  // Handle number or string formatting
  let formattedPriceStr = String(price);
  if (typeof price === 'number') {
    formattedPriceStr = new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  } else if (!formattedPriceStr.includes('₽')) {
    formattedPriceStr = `${formattedPriceStr} ₽`;
  }

  if (pricingStrategy === 'from') {
    return (
      <div className="flex flex-col items-end">
        {!hidePrefix && <div className={prefixClassName}>От</div>}
        <div className={className}>{formattedPriceStr}</div>
      </div>
    );
  }

  // open strategy
  return (
    <div className="flex flex-col items-end">
      {!hidePrefix && <div className={prefixClassName}>Цена</div>}
      <div className={className}>{formattedPriceStr}</div>
    </div>
  );
}
