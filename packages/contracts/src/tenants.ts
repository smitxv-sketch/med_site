/**
 * SSOT: site tenants (cities). Strapi i18n locales map 1:1 to tenants, not languages.
 * Wave 1 will wire this into Next middleware and BFF routing.
 */

export type TenantRouting =
  | { mode: 'multi-host'; domains: string[] }
  | { mode: 'path-prefix'; pathPrefix: string };

export interface TenantConfig {
  id: string;
  displayName: string;
  strapiLocale: string;
  publicBaseUrl: string;
  routing: TenantRouting;
}

export const TENANTS: readonly TenantConfig[] = [
  {
    id: 'chel',
    displayName: 'Челябинск',
    strapiLocale: 'ru-chel',
    publicBaseUrl: 'https://istochnik.smitx.ru',
    routing: {
      mode: 'multi-host',
      domains: ['istochnik.smitx.ru', 'studio.istochnik.smitx.ru', 'localhost'],
    },
  },
  {
    id: 'spb',
    displayName: 'Санкт-Петербург',
    strapiLocale: 'ru-spb',
    publicBaseUrl: 'https://istochnik.smitx.ru/spb',
    routing: {
      mode: 'path-prefix',
      pathPrefix: '/spb',
    },
  },
] as const;

export const DEFAULT_TENANT_ID = 'chel';
