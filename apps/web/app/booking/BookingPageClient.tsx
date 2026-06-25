'use client';

import type { EngineState, GlobalSettingDto, NavigationDto } from '@med-site/contracts';
import BookingWidget from '@/widget/BookingWidget';
import { SiteChrome } from '@/app/layouts/SiteChrome';
import { PrototypeShell } from '../providers/PrototypeShell';

/**
 * Онлайн-запись на Next-сайте (раньше была только в Vite SPA).
 * Виджет из /src/widget — read-only по правилам проекта, только монтируем.
 */
export function BookingPageClient({
  engineState,
  navigation,
  globalSetting,
}: {
  engineState: EngineState;
  navigation: NavigationDto | null;
  globalSetting: GlobalSettingDto | null;
  tenantId: string;
}) {
  return (
    <PrototypeShell
      engineState={engineState}
      navigation={navigation}
      globalSetting={globalSetting}
      tenantId={tenantId}
    >
      <SiteChrome hideBottomNav>
        <div className="relative flex min-h-[100svh] items-start justify-center overflow-hidden bg-white sm:bg-gray-50/50 sm:p-6 md:p-12">
          <div className="pointer-events-none absolute left-0 top-0 hidden h-96 w-full bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent sm:block" />
          <div className="pointer-events-none absolute -right-40 -top-40 hidden h-96 w-96 rounded-full bg-[var(--color-primary)]/10 blur-3xl sm:block" />
          <div className="pointer-events-none absolute -left-20 top-40 hidden h-72 w-72 rounded-full bg-blue-400/5 blur-3xl sm:block" />

          <div className="relative z-10 w-full max-w-5xl px-4 py-6 sm:overflow-hidden sm:rounded-[32px] sm:border sm:border-gray-100/50 sm:bg-white sm:p-10 sm:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]">
            <BookingWidget />
          </div>
        </div>
      </SiteChrome>
    </PrototypeShell>
  );
}
