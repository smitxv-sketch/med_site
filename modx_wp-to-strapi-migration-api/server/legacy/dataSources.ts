/**
 * SSOT: конфигурация legacy-источников данных bridge.
 * Единая точка для env, префиксов таблиц и политики доступа.
 */
import type { LegacyCity } from '../config/legacyDbGuard.js';

export type LegacySourceKind = 'mysql_wp' | 'mysql_modx' | 'rest';

export type LegacyDataSourceConfig = {
  id: LegacyCity;
  kind: LegacySourceKind;
  label: string;
  /** Переменные окружения (имена, не значения) */
  env: {
    host: string;
    port: string;
    user: string;
    password: string;
    database: string;
    prefix?: string;
  };
  /** REST fallback (Челябинск — врачи без прямого MySQL) */
  restEndpoint?: string;
};

/** Реестр источников — добавление нового города только здесь */
export const LEGACY_DATA_SOURCES: Record<LegacyCity, LegacyDataSourceConfig> = {
  chel: {
    id: 'chel',
    kind: 'mysql_wp',
    label: 'Челябинск (WordPress)',
    env: {
      host: 'CHEL_DB_HOST',
      port: 'CHEL_DB_PORT',
      user: 'CHEL_DB_USER',
      password: 'CHEL_DB_PASSWORD',
      database: 'CHEL_DB_NAME',
      prefix: 'CHEL_DB_PREFIX',
    },
    restEndpoint: 'CHEL_API_ENDPOINT',
  },
  spb: {
    id: 'spb',
    kind: 'mysql_modx',
    label: 'Санкт-Петербург (MODX)',
    env: {
      host: 'SPB_DB_HOST',
      port: 'SPB_DB_PORT',
      user: 'SPB_DB_USER',
      password: 'SPB_DB_PASSWORD',
      database: 'SPB_DB_NAME',
      prefix: 'SPB_DB_PREFIX',
    },
  },
};

export function isLegacySourceConfigured(source: LegacyCity): boolean {
  const cfg = LEGACY_DATA_SOURCES[source];
  const host = process.env[cfg.env.host]?.trim();
  const user = process.env[cfg.env.user]?.trim();
  const database = process.env[cfg.env.database]?.trim();
  const password = process.env[cfg.env.password] || '';
  return Boolean(host && user && database && password);
}

export function getLegacyPrefix(source: LegacyCity): string {
  const cfg = LEGACY_DATA_SOURCES[source];
  const key = cfg.env.prefix;
  if (!key) return source === 'chel' ? 'wp_' : 'modx_';
  return process.env[key]?.trim() || (source === 'chel' ? 'wp_' : 'modx_');
}
