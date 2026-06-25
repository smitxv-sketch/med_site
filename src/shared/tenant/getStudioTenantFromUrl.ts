import { DEFAULT_TENANT_ID } from '@med-site/contracts';

/** Tenant из query Studio (?tenant=chel) — без React hooks (для Zustand). */
export function getStudioTenantFromUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_TENANT_ID;
  return new URLSearchParams(window.location.search).get('tenant') ?? DEFAULT_TENANT_ID;
}
