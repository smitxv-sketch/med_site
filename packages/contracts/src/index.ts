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

export type {
  PageBlock,
  BlockDesignParams,
  BlockConfigParams,
  SeoFields,
  PageDto,
  MenuItemDto,
  NavigationDto,
  GlobalLayoutDto,
} from './types/page.js';

export {
  mapStrapiBlocks,
  type StrapiBlockEntry,
} from './strapi/mapStrapiBlocks.js';

export {
  DEFAULT_HOME_BLOCKS,
  DEFAULT_HOME_SEO,
} from './fixtures/defaultHomeBlocks.js';

export const CONTRACTS_SCHEMA_VERSION = '1.0.0';
