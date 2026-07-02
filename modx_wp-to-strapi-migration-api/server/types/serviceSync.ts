/** Типы и safe-update поля синка услуг → Strapi */

export type TabQms = 'priem' | 'diagnostika' | 'programmy' | 'lechenie';

export type ServiceSyncReport = {
  entity: 'service-category' | 'service';
  pilotCategory?: string;
  categories: { created: number; updated: number; skipped: number };
  services: { created: number; updated: number; skipped: number };
  relations: { linked: number };
  errors: Array<{ legacyId: string; message: string }>;
  qmsMerged?: number;
};

/** Обновляются при каждом синке (если не contentLocked) */
export const SAFE_SERVICE_CATEGORY_FIELDS = [
  'title',
  'slug',
  'tabQms',
  'tabLegacy',
  'sortOrder',
  'enabled',
  'showInMenu',
  'showFaqs',
  'showReviews',
] as const;

export const SAFE_SERVICE_FIELDS = [
  'article',
  'title',
  'price',
  'tabQms',
  'sortOrder',
  'modxResourceId',
  'legacyOnly',
  'qmsSectionVal',
  'qmsOrgId',
  'misSyncAt',
] as const;

export const SPB_LOCALE = 'ru-spb';
export const CHEL_LOCALE = 'ru-chel';

/** Ключ city в sync_map (как у врачей) */
export const SYNC_MAP_CITY = {
  chel: 'chelyabinsk',
  spb: 'spb',
} as const;
