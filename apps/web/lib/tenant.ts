import { headers } from 'next/headers';
import { DEFAULT_TENANT_ID, resolveTenant } from '@med-site/contracts';

/** Tenant страницы: middleware выставляет x-tenant-id; fallback — host + pathname */
export async function getWebTenantId(): Promise<string> {
  try {
    const h = await headers();
    const fromMiddleware = h.get('x-tenant-id');
    if (fromMiddleware) return fromMiddleware;

    const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost';
    const pathname = h.get('x-pathname') ?? h.get('x-invoke-path') ?? '/';
    return resolveTenant({ host, pathname }).tenant.id;
  } catch {
    return DEFAULT_TENANT_ID;
  }
}
