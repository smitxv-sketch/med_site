import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { BottomNavActionAnimation } from '@/shared/domain/bottom-nav/types';
import { BOTTOM_NAV_ITEMS_CLASSIC } from '../config/bottomNavItems';
import { BottomNavActionAnimation as ActionAnimation } from './BottomNavActionAnimation';

export interface BottomNavClassicVariantProps {
  actionAnimation: BottomNavActionAnimation;
}

export function BottomNavVariantA({ actionAnimation }: BottomNavClassicVariantProps) {
  const location = useLocation();

  return (
    <div className="max-w-md mx-auto flex items-center justify-between px-6 py-3">
      {BOTTOM_NAV_ITEMS_CLASSIC.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors relative group ${
              isActive ? 'text-brand' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className="relative">
              {item.path === '/booking' && !isActive && (
                <ActionAnimation type={actionAnimation} shape="icon" />
              )}
              <Icon
                className={`w-6 h-6 relative z-10 ${isActive ? 'fill-brand/10' : ''}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </div>
            <span className="text-[10px] font-medium tracking-tight relative z-10">
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
