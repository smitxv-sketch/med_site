import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { BottomNavActionAnimation } from '@/shared/domain/bottom-nav/types';
import { BOTTOM_NAV_ITEMS_CLASSIC } from '../config/bottomNavItems';

export interface BottomNavClassicVariantProps {
  actionAnimation: BottomNavActionAnimation;
}

/** Эксперимент «Светофор» — иконки в корпоративных цветах */
export function BottomNavVariantD(_props: BottomNavClassicVariantProps) {
  const location = useLocation();

  return (
    <div className="max-w-md mx-auto flex items-center justify-between px-6 py-3">
      {BOTTOM_NAV_ITEMS_CLASSIC.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        let baseColorClass = 'text-gray-400';
        let activeBgClass = '';

        if (item.path === '/') {
          baseColorClass = 'text-emerald-500';
          activeBgClass = 'fill-emerald-50';
        } else if (item.path === '/doctors') {
          baseColorClass = 'text-blue-500';
          activeBgClass = 'fill-blue-50';
        } else if (item.path === '/booking') {
          baseColorClass = 'text-orange-500';
          activeBgClass = 'fill-orange-50';
        } else if (item.path === '/prices') {
          baseColorClass = 'text-purple-500';
          activeBgClass = 'fill-purple-50';
        } else if (item.path === '/profile') {
          baseColorClass = 'text-cyan-500';
          activeBgClass = 'fill-cyan-50';
        }

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              isActive
                ? `${baseColorClass} opacity-100 scale-110`
                : `${baseColorClass} opacity-60 hover:opacity-80`
            }`}
          >
            <Icon
              className={`w-6 h-6 ${isActive ? activeBgClass : ''}`}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
