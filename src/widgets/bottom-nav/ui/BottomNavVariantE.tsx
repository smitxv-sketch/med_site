import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Activity,
  CalendarPlus,
  Stethoscope,
  UserCircle,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BottomNavVariantProps } from './BottomNavRegistry';
import { isContextualBottomNavPage } from '../lib/isContextualPage';
import {
  BOTTOM_NAV_ITEMS_E,
  BOTTOM_NAV_THEME,
} from '../config/bottomNavTheme';

const ICON_MAP: Record<string, LucideIcon> = {
  home: Home,
  activity: Activity,
  'calendar-plus': CalendarPlus,
  stethoscope: Stethoscope,
  'user-circle': UserCircle,
};

export function BottomNavVariantE({ isHidden }: BottomNavVariantProps) {
  const location = useLocation();
  const theme = BOTTOM_NAV_THEME;

  if (isContextualBottomNavPage(location.pathname)) return null;

  return (
    <motion.nav
      data-marketing-block="true"
      data-variant="E"
      variants={{
        visible: { y: 0 },
        hidden: { y: '100%' },
      }}
      initial="visible"
      animate={isHidden ? 'hidden' : 'visible'}
      transition={{
        duration: theme.hideTransitionMs / 1000,
        ease: 'ease',
      }}
      className="fixed bottom-0 left-0 right-[var(--layout-right-inset,0px)] z-[100] md:hidden pb-safe transition-[right] duration-300"
      style={{
        borderTop: theme.borderTop,
        backgroundColor: theme.bg,
      }}
    >
      <div
        className="flex items-end w-full max-w-lg mx-auto"
        style={{ minHeight: theme.barHeight }}
      >
        {BOTTOM_NAV_ITEMS_E.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive = location.pathname === item.path;
          const isCenter = 'isCenter' in item && item.isCenter;

          if (isCenter) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex-1 flex flex-col items-center gap-[3px] pt-0"
                style={{ color: theme.activeColor }}
              >
                <div
                  className="relative flex items-center justify-center rounded-full shadow-md animate-[bottom-nav-pulse_2s_ease-in-out_infinite]"
                  style={{
                    width: theme.centerButtonSize,
                    height: theme.centerButtonSize,
                    marginTop: -theme.centerButtonLift,
                    border: `${theme.centerBorderWidth}px solid ${theme.bg}`,
                    backgroundColor: theme.centerButtonBg,
                    color: theme.centerButtonFg,
                  }}
                >
                  <Icon size={22} strokeWidth={2.5} />
                </div>
                <span
                  className="font-semibold"
                  style={{ fontSize: theme.labelSize }}
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
              className={cn(
                'flex-1 flex flex-col items-center gap-[3px] pt-2 pb-1 transition-colors'
              )}
              style={{
                fontSize: theme.labelSize,
                color: isActive ? theme.activeColor : theme.inactiveColor,
              }}
            >
              <Icon size={theme.iconSize} strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn(isActive && 'font-medium')}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
