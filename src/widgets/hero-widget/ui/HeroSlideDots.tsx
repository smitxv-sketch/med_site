import React from 'react';
import { cn } from '@/lib/utils';
import { HERO_THEME } from '../config/heroTheme';

interface HeroSlideDotsProps {
  count: number;
  current: number;
  onSelect: (index: number) => void;
  variant?: 'light' | 'dark';
  className?: string;
  activeWidth?: number;
  inactiveSize?: number;
}

export function HeroSlideDots({
  count,
  current,
  onSelect,
  variant = 'dark',
  className,
  activeWidth = HERO_THEME.dotActiveWidth,
  inactiveSize = HERO_THEME.dotInactiveSize,
}: HeroSlideDotsProps) {
  const inactive =
    variant === 'light' ? 'bg-white/40 hover:bg-white/60' : 'bg-gray-300 hover:bg-gray-400';
  const active = variant === 'light' ? 'bg-white' : 'bg-brand';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelect(idx)}
          aria-label={`Слайд ${idx + 1}`}
          className={cn(
            'rounded-[4px] transition-all duration-theme',
            idx === current
              ? cn('h-2', active)
              : cn('rounded-full', inactive)
          )}
          style={{
            width: idx === current ? activeWidth : inactiveSize,
            height: inactiveSize,
            borderRadius: idx === current ? 3 : undefined,
          }}
        />
      ))}
    </div>
  );
}
