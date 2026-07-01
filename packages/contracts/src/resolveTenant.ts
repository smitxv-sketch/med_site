import {
  DEFAULT_TENANT_ID,
  TENANTS,
  type TenantConfig,
  type TenantRouting,
} from './tenants.js';

export interface TenantResolveInput {
  host: string;
  pathname: string;
}

export interface TenantResolveResult {
  tenant: TenantConfig;
  /** Path with tenant prefix stripped (path-prefix mode only). */
  strippedPathname: string;
}

const normalizeHost = (host: string): string =>
  host.toLowerCase().replace(/:\d+$/, '');

const normalizePath = (pathname: string): string => {
  if (!pathname || pathname === '/') return '/';
  const withLeading = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return withLeading.replace(/\/+$/, '') || '/';
};

const matchesDomain = (routing: TenantRouting, host: string): boolean => {
  if (routing.mode !== 'multi-host') return false;
  const normalized = normalizeHost(host);
  return routing.domains.some(
    (domain) => normalizeHost(domain) === normalized,
  );
};

const matchesPathPrefix = (
  routing: TenantRouting,
  pathname: string,
): string | null => {
  if (routing.mode !== 'path-prefix') return null;
  const prefix = routing.pathPrefix.replace(/\/+$/, '');
  const normalized = normalizePath(pathname);
  if (normalized === prefix || normalized.startsWith(`${prefix}/`)) {
    const stripped =
      normalized === prefix
        ? '/'
        : normalized.slice(prefix.length) || '/';
    return normalizePath(stripped);
  }
  return null;
};

/**
 * Resolve tenant from request host + pathname.
 * Priority: exact domain match → path prefix → default tenant.
 * Query params (?city=...) are intentionally ignored (SEO policy).
 */
export function resolveTenant(input: TenantResolveInput): TenantResolveResult {
  const host = normalizeHost(input.host);
  const pathname = normalizePath(input.pathname);

  // Path-prefix (СПб на /spb) важнее domain-match: иначе chel «съедает» тот же хост
  for (const tenant of TENANTS) {
    const stripped = matchesPathPrefix(tenant.routing, pathname);
    if (stripped !== null) {
      return { tenant, strippedPathname: stripped };
    }
  }

  for (const tenant of TENANTS) {
    if (matchesDomain(tenant.routing, host)) {
      return { tenant, strippedPathname: pathname };
    }
  }

  const fallback =
    TENANTS.find((t) => t.id === DEFAULT_TENANT_ID) ?? TENANTS[0];
  return { tenant: fallback, strippedPathname: pathname };
}

export function getTenantById(id: string): TenantConfig | undefined {
  return TENANTS.find((t) => t.id === id);
}
