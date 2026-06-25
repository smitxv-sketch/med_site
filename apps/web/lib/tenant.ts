import { headers } from 'next/headers';
import { DEFAULT_TENANT_ID, resolveTenant } from '@med-site/contracts';

/** Определяем tenant по домену запроса (multi-host). Path-prefix — позже через middleware. */
export async function getWebTenantId(): Promise<string> {
  try {
    const h = await headers();
    const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost';
    return resolveTenant({ host, pathname: '/' }).tenant.id;
  } catch {
    return DEFAULT_TENANT_ID;
  }
}
