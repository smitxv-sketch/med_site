import type { Core } from '@strapi/strapi';

// Strapi 5 ships i18n built-in. Locales are configured via admin (Settings → Internationalization)
// and optional env STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE — see apps/cms/.env.example.
// City tenant locale codes (ru-chel, ru-spb) align with packages/contracts SSOT (Wave 1).

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({});

export default config;
