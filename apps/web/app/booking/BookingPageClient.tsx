'use client';

import type { EngineState, GlobalSettingDto, NavigationDto } from '@med-site/contracts';
import BookingWidget from '@/widget/BookingWidget';
import { SiteChrome } from '@/app/layouts/SiteChrome';
import { PrototypeShell } from '../providers/PrototypeShell';
import { BookingEmbedGate } from './BookingEmbedGate';
import './booking-embed.css';

/**
 * Онлайн-запись на Next-сайте.
 * Виджет из /src/widget — read-only; обёртка скрывает standalone-хедер и debug.
 */
export function BookingPageClient({
  engineState,
  navigation,
  globalSetting,
  tenantId,
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
        <div className="booking-page mx-auto w-full max-w-7xl px-4 pb-safe pt-4 sm:px-6 sm:pt-6 lg:px-8">
          <div className="booking-embed relative w-full overflow-hidden rounded-2xl border border-gray-100/90 bg-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[var(--color-primary)]/[0.04] to-transparent" />
            <div className="relative px-2 py-3 sm:px-4 sm:py-4 md:px-5">
              <BookingEmbedGate globalSetting={globalSetting}>
                <BookingWidget />
              </BookingEmbedGate>
            </div>
          </div>
        </div>
      </SiteChrome>
    </PrototypeShell>
  );
}
