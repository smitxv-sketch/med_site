import React from 'react';
import { Check, X, MapPin } from 'lucide-react';
import { TENANTS } from '@med-site/contracts';
import { DEFAULT_FOOTER_CONTENT } from '@med-site/contracts';
import { useSearchParams } from 'react-router-dom';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { useSiteStore } from '@/shared/store/siteStore';
import { useTenant } from '@/shared/tenant/TenantContext';
import { isStudioApp } from '@/shared/config/appTarget';

/** Переключение tenant при выборе города на публичном сайте */
function navigateToTenant(tenantId: string) {
  const target = TENANTS.find((t) => t.id === tenantId);
  if (!target) return;

  if (target.routing.mode === 'multi-host' && target.publicBaseUrl) {
    const url = new URL(target.publicBaseUrl);
    if (url.host !== window.location.host) {
      window.location.href = target.publicBaseUrl;
      return;
    }
  }

  if (target.routing.mode === 'path-prefix') {
    window.location.href = `${target.routing.pathPrefix}/`;
  }
}

export function CitySelectorModal() {
  const { isCitySelectorOpen, setIsCitySelectorOpen } = useUISettingsStore();
  const globalSetting = useSiteStore((s) => s.globalSetting);
  const { tenantId } = useTenant();
  const [searchParams, setSearchParams] = useSearchParams();

  const hint =
    globalSetting?.citySelectorHint ?? DEFAULT_FOOTER_CONTENT.citySelectorHint;

  if (!isCitySelectorOpen) return null;

  const onSelect = (nextTenantId: string) => {
    if (isStudioApp()) {
      const page = searchParams.get('page') ?? 'home';
      setSearchParams({ tenant: nextTenantId, page });
    } else {
      navigateToTenant(nextTenantId);
    }
    setIsCitySelectorOpen(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 right-[var(--layout-right-inset,0px)] z-[120] bg-black/40 backdrop-blur-sm animate-in fade-in transition-[right] duration-300"
        onClick={() => setIsCitySelectorOpen(false)}
      />
      <div className="fixed bottom-0 left-0 right-[var(--layout-right-inset,0px)] z-[130] flex w-full flex-col rounded-t-3xl bg-white p-6 pb-safe shadow-2xl animate-in slide-in-from-bottom-full duration-theme md:bottom-auto md:left-[calc((100%-var(--layout-right-inset,0px))/2)] md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:rounded-3xl md:slide-in-from-bottom-5 md:zoom-in-95 transition-[right,left] duration-300">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-black text-gray-900">
            <MapPin className="h-5 w-5 text-brand" />
            Выберите город
          </h2>
          <button
            type="button"
            onClick={() => setIsCitySelectorOpen(false)}
            className="rounded-full bg-gray-50 p-2 text-gray-500 transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-gray-500">{hint}</p>

        <div className="custom-scrollbar -mr-2 flex max-h-[50vh] flex-col gap-2 overflow-y-auto pr-2">
          {TENANTS.map((tenant) => (
            <button
              key={tenant.id}
              type="button"
              onClick={() => onSelect(tenant.id)}
              className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                tenantId === tenant.id
                  ? 'border-brand bg-brand/5'
                  : 'border-gray-100 bg-white hover:border-brand/30 hover:bg-gray-50 hover:shadow-sm'
              }`}
            >
              <span
                className={`text-[15px] font-bold ${tenantId === tenant.id ? 'text-brand' : 'text-gray-800'}`}
              >
                {tenant.displayName}
              </span>
              {tenantId === tenant.id ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-brand-fg shadow-md">
                  <Check className="h-4 w-4" />
                </div>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
