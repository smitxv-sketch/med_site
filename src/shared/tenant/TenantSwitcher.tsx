'use client';

import { TENANTS } from '@med-site/contracts';
import { useSearchParams } from 'react-router-dom';
import { useTenant } from './TenantContext';

/** Переключатель города/тенанта в Studio (query ?tenant=) */
export function TenantSwitcher() {
  const { tenantId } = useTenant();
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (nextTenant: string) => {
    const page = searchParams.get('page') ?? 'home';
    setSearchParams({ tenant: nextTenant, page });
  };

  return (
    <select
      value={tenantId}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700"
      title="Город (tenant)"
      aria-label="Выбор города"
    >
      {TENANTS.map((t) => (
        <option key={t.id} value={t.id}>
          {t.displayName}
        </option>
      ))}
    </select>
  );
}
