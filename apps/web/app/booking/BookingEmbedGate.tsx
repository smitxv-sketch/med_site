'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { GlobalSettingDto } from '@med-site/contracts';
import { Phone, Stethoscope, Loader2 } from 'lucide-react';
import bookingCopy from '../../config/booking-page.json';

type GateStatus = 'loading' | 'ready' | 'unavailable' | 'empty';

/**
 * Проверяем API до монтирования виджета — иначе пользователь видит «Нет услуг» и debug-строку.
 */
export function BookingEmbedGate({
  children,
  globalSetting,
}: {
  children: ReactNode;
  globalSetting: GlobalSettingDto | null;
}) {
  const [status, setStatus] = useState<GateStatus>('loading');
  const phone = globalSetting?.contactPhone ?? '+7 (351) 778-88-87';
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, '')}`;

  useEffect(() => {
    let cancelled = false;

    async function probe() {
      try {
        // Сначала быстрые эндпоинты — services из QMS может отвечать 10–15 с
        const [configRes, doctorsRes] = await Promise.all([
          fetch('/api/config', { cache: 'no-store' }),
          fetch('/api/wp-doctors', { cache: 'no-store' }),
        ]);

        if (!configRes.ok || !doctorsRes.ok) {
          if (!cancelled) setStatus('unavailable');
          return;
        }

        const doctors = await doctorsRes.json();
        const hasDoctors = Array.isArray(doctors) && doctors.length > 0;

        if (hasDoctors) {
          if (!cancelled) setStatus('ready');
          return;
        }

        // Нет врачей в REST — смотрим услуги QMS (медленнее)
        const servicesRes = await fetch('/api/services?city=chel', { cache: 'no-store' });
        const services = servicesRes.ok ? await servicesRes.json() : [];
        const hasServices = Array.isArray(services) && services.length > 0;

        if (!cancelled) setStatus(hasServices ? 'ready' : 'empty');
      } catch {
        if (!cancelled) setStatus('unavailable');
      }
    }

    probe();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-[var(--color-primary)]" aria-hidden />
        <div>
          <p className="text-lg font-semibold text-gray-900">{bookingCopy.loadingTitle}</p>
          <p className="mt-1 text-sm text-gray-500">{bookingCopy.loadingHint}</p>
        </div>
      </div>
    );
  }

  if (status === 'unavailable' || status === 'empty') {
    const title =
      status === 'unavailable' ? bookingCopy.unavailableTitle : bookingCopy.emptyTitle;
    const hint =
      status === 'unavailable' ? bookingCopy.unavailableHint : bookingCopy.emptyHint;

    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-6 px-6 py-14 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10">
          <Stethoscope className="h-8 w-8 text-[var(--color-primary)]" aria-hidden />
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm leading-relaxed text-gray-500">{hint}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {bookingCopy.callCta}
            <span className="font-normal opacity-90">{phone}</span>
          </a>
          <a
            href={bookingCopy.doctorsHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
          >
            {bookingCopy.doctorsCta}
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
