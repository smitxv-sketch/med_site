'use client';

import { TENANTS } from '@med-site/contracts';
import { Check } from 'lucide-react';
import { useTenant } from '@/shared/tenant/TenantContext';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { Card } from '@/shared/ui/Card';

interface FooterCityPickerProps {
  open: boolean;
}

/** Список городов из SSOT tenants (Strapi locale = tenant) */
export function FooterCityPicker({ open }: FooterCityPickerProps) {
  const { tenantId } = useTenant();
  const openCityModal = () => useUISettingsStore.getState().setIsCitySelectorOpen(true);

  if (!open) return null;

  return (
    <Card className="mt-2 w-full p-2 md:absolute md:left-0 md:top-full md:mt-2 md:w-64">
      <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
        Города
      </div>
      <div className="flex flex-col gap-1">
        {TENANTS.map((tenant) => (
          <button
            key={tenant.id}
            type="button"
            onClick={openCityModal}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              tenantId === tenant.id
                ? 'bg-brand/5 font-bold text-brand'
                : 'font-medium text-gray-600 hover:bg-gray-50 hover:text-brand'
            }`}
          >
            {tenant.displayName}
            {tenantId === tenant.id ? <Check className="h-4 w-4 shrink-0" /> : null}
          </button>
        ))}
      </div>
    </Card>
  );
}
