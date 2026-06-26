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
        <div className="booking-page mx-auto w-full max-w-5xl px-4 pb-safe pt-4 sm:px-6 sm:pt-8">
          {/*
            Виджет рассчитан на standalone — на сайте прячем второй хедер/дебаг через обёртку.
            Логотип: /logo-icon.png в apps/web/public
          */}
          <div className="booking-embed w-full">
            <div className="relative overflow-hidden rounded-2xl border border-gray-100/90 bg-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--color-primary)]/[0.05] to-transparent" />
              <div className="relative px-2 py-3 sm:px-4 sm:py-5 md:px-6">
                <BookingWidget />
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          .booking-embed .min-h-screen {
            min-height: auto !important;
          }
          .booking-embed .safe-pt {
            padding-top: 0 !important;
          }
          .booking-embed .safe-pb {
            padding-bottom: 0 !important;
          }
          .booking-embed .bg-gray-50\\/30 {
            background: transparent !important;
          }
          /* Дублирующий хедер виджета — на сайте уже есть SiteChrome */
          .booking-embed .sticky.top-0.z-40 {
            display: none !important;
          }
          /* Кнопка Debug */
          .booking-embed .fixed.top-4.right-4.z-50 {
            display: none !important;
          }
          /* Ссылка «Врачи (отладка)» внизу виджета */
          .booking-embed a[href='/booking/test-doctors-links'],
          .booking-embed .mt-8.pb-4.text-center {
            display: none !important;
          }
          /* Строка Debug: services=0... */
          .booking-embed .text-xs.opacity-50 {
            display: none !important;
          }
          /* Пустое состояние — чуть мягче на фоне карточки */
          .booking-embed .text-center.text-gray-400 {
            padding: 2rem 1rem 3rem;
          }
        `}</style>
      </SiteChrome>
    </PrototypeShell>
  );
}
