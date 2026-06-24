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

export { mapPageBlocksToStrapi } from './strapi/mapPageBlocksToStrapi.js';

export {
  DEFAULT_HOME_BLOCKS,
  DEFAULT_HOME_SEO,
} from './fixtures/defaultHomeBlocks.js';

export {
  DEFAULT_ENGINE_STATE,
} from './fixtures/defaultEngineState.js';

export {
  SYSTEM_DESIGN_PRESETS,
} from './fixtures/systemDesignPresets.js';

export type {
  EngineState,
  EngineStatePatch,
  ColorTheme,
  ColorIntensity,
  FontFamily,
  ShadowStyle,
  AnimationTheme,
  SocialProofLevel,
  PricingStrategy,
  UrgencyLevel,
} from './types/engine.js';

export type {
  StudioDraftDto,
  StudioDraftPatchDto,
  DesignPresetDto,
  SiteThemeDto,
} from './types/studio.js';

export {
  engineStateSchema,
  engineStatePatchSchema,
} from './schemas/engine.js';

export {
  studioDraftPatchSchema,
  designPresetSchema,
  siteThemeSchema,
} from './schemas/studio.js';

export const CONTRACTS_SCHEMA_VERSION = '1.1.0';
