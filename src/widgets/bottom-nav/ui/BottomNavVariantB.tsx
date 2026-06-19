import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { BottomNavActionAnimation } from '@/shared/domain/bottom-nav/types';
import { BOTTOM_NAV_ITEMS_CLASSIC } from '../config/bottomNavItems';
import { BottomNavActionAnimation as ActionAnimation } from './BottomNavActionAnimation';

export interface BottomNavClassicVariantProps {
  actionAnimation: BottomNavActionAnimation;
}

export function BottomNavVariantB({ actionAnimation }: BottomNavClassicVariantProps) {
  const location = useLocation();

  return (
    <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
      {BOTTOM_NAV_ITEMS_CLASSIC.map((item) => {
        const isActive = location.pathname === item.path;
        const isBooking = item.path === '/booking';
        const Icon = item.icon;

        if (isBooking) {
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl relative transition-colors z-10 ${
                isActive
                  ? 'bg-brand text-brand-fg shadow-md shadow-brand/20'
                  : 'bg-brand/5 text-brand hover:bg-brand/10'
              }`}
            >
              {!isActive && <ActionAnimation type={actionAnimation} shape="rect" />}
              <Icon className="w-6 h-6 relative z-10" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold tracking-tight relative z-10">
                {item.label}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors px-2 ${
              isActive ? 'text-brand' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon
              className={`w-6 h-6 ${isActive ? 'fill-brand/10' : ''}`}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
