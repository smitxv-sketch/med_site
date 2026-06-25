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
  BlockAbVariant,
  BlockDesignParams,
  BlockConfigParams,
  SeoFields,
  PageDto,
  MenuItemDto,
  NavigationDto,
  GlobalLayoutDto,
} from './types/page.js';

export type {
  GlobalSettingDto,
} from './types/globalSetting.js';

export type {
  SocialLinkDto,
  SocialPlatform,
} from './types/socialLink.js';

export {
  DEFAULT_CHEL_SOCIAL_LINKS,
} from './fixtures/defaultSocialLinks.js';

export {
  DEFAULT_FOOTER_CONTENT,
} from './fixtures/defaultFooterContent.js';

export type {
  MarketingCondition,
  MarketingRuleDto,
  MarketingContextDto,
} from './types/marketing.js';

export type {
  StudioLabPageDto,
  StudioLabListDto,
  AiLayoutRequestDto,
  AiLayoutResponseDto,
} from './types/lab.js';

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
  StudioPageSeoDto,
  DesignPresetDto,
  SiteThemeDto,
} from './types/studio.js';

export type {
  ExperimentStatus,
  ExperimentVariantDto,
  ExperimentMetricsDto,
  ExperimentDto,
  ExperimentListDto,
  CreateExperimentDto,
  EvolutionSuggestionDto,
  ApplyExperimentWinnerDto,
} from './types/experiment.js';

export {
  engineStateSchema,
  engineStatePatchSchema,
} from './schemas/engine.js';

export {
  DEFAULT_BRAND_VOICE,
} from './fixtures/defaultBrandVoice.js';

export {
  studioDraftPatchSchema,
  studioPageSeoSchema,
  designPresetSchema,
  siteThemeSchema,
} from './schemas/studio.js';

export const CONTRACTS_SCHEMA_VERSION = '1.4.0';
