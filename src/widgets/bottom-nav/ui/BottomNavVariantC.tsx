import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { BottomNavActionAnimation } from '@/shared/domain/bottom-nav/types';
import { BOTTOM_NAV_ITEMS_CLASSIC } from '../config/bottomNavItems';
import { BottomNavActionAnimation as ActionAnimation } from './BottomNavActionAnimation';

export interface BottomNavClassicVariantProps {
  actionAnimation: BottomNavActionAnimation;
}

export function BottomNavVariantC({ actionAnimation }: BottomNavClassicVariantProps) {
  const location = useLocation();

  return (
    <div className="max-w-md mx-auto flex items-center justify-between px-6 py-2">
      {BOTTOM_NAV_ITEMS_CLASSIC.map((item) => {
        const isActive = location.pathname === item.path;
        const isBooking = item.path === '/booking';
        const Icon = item.icon;

        if (isBooking) {
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center -mt-4 relative group"
            >
              <div className="relative">
                {!isActive && (
                  <ActionAnimation
                    type={actionAnimation}
                    shape="circle"
                    className="scale-125 opacity-70"
                  />
                )}
                <div
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all z-10 ${
                    isActive
                      ? 'bg-brand text-brand-fg shadow-brand/30 scale-105'
                      : 'bg-white text-brand border-[1.5px] border-transparent bg-clip-padding'
                  }`}
                >
                  <Icon className="w-6 h-6 relative z-10" strokeWidth={2.5} />
                </div>
              </div>
              <span
                className={`text-[10px] font-bold tracking-tight mt-1 ${
                  isActive ? 'text-brand' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors mt-1 ${
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
