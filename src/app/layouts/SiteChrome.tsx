'use client';

import type { ReactNode } from 'react';
import React from 'react';
import { Header } from '@/widgets/header/ui/Header';
import { BottomNav } from '@/widgets/bottom-nav/ui/BottomNav';
import { MobileMenu } from '@/widgets/mobile-menu/ui/MobileMenu';
import { Footer } from '@/widgets/footer/ui/Footer';
import { CitySelectorModal } from '@/widgets/city-selector/ui/CitySelectorModal';
import { useLayoutBottomInset } from '@/shared/hooks/useLayoutBottomInset';

interface SiteChromeProps {
  children: ReactNode;
  /** Для страниц с собственным action bar (например booking) */
  hideBottomNav?: boolean;
}

/**
 * Единый shell сайта для web и Studio preview.
 * Важно: shell не зависит от конкретной клиники — контент подмешаем из Strapi (фаза platform-content).
 */
export function SiteChrome({ children, hideBottomNav = false }: SiteChromeProps) {
  useLayoutBottomInset();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-teal-200 flex flex-col overflow-x-hidden">
      <Header />

      <main className="flex-1 pt-[80px] sm:pt-[96px] pb-[var(--layout-bottom-inset,env(safe-area-inset-bottom))] w-full flex flex-col">
        {children}
      </main>

      <Footer />
      {hideBottomNav ? null : <BottomNav />}
      <MobileMenu />
      <CitySelectorModal />
    </div>
  );
}

