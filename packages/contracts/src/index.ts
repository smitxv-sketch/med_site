export {
  TENANTS,
  DEFAULT_TENANT_ID,
  type TenantConfig,
  type TenantRouting,
} from './tenants.js';

export {
  resolveTenant,
  getTenantById,
  type TenantResolveInput,
  type TenantResolveResult,
} from './resolveTenant.js';

/** Placeholder for Wave 1 — PageBlock / API contracts will live here. */
export const CONTRACTS_SCHEMA_VERSION = '0.0.1';
