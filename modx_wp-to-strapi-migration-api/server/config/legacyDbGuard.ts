/**
 * SSOT: защита legacy MySQL (Beget / MODX) от шквала запросов.
 * Все тайминги с запасом; переопределяются через env на Coolify.
 */
function readInt(name: string, fallback: number): number {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const LEGACY_DB_GUARD = {
  /** Пауза между SQL-запросами к legacy БД (мс) */
  queryDelayMs: readInt('LEGACY_DB_QUERY_DELAY_MS', 450),
  /** Макс. записей за один HTTP-запрос */
  maxLimitPerRequest: readInt('LEGACY_DB_MAX_LIMIT', 25),
  /** Дефолт limit, если клиент не передал */
  defaultLimit: readInt('LEGACY_DB_DEFAULT_LIMIT', 20),
  /** Рекомендуемая пауза клиенту между страницами (мс) */
  clientRecommendedDelayMs: readInt('LEGACY_CLIENT_DELAY_MS', 700),
  /** HTTP: окно rate limit (мс) */
  httpRateLimitWindowMs: readInt('LEGACY_HTTP_RATE_WINDOW_MS', 60_000),
  /** HTTP: макс. запросов к legacy-данным за окно (на IP) */
  httpRateLimitMax: readInt('LEGACY_HTTP_RATE_LIMIT', 35),
  /** Одно соединение к каждой legacy БД */
  connectionLimit: 1,
} as const;

export type LegacyCity = 'chel' | 'spb';

export function guardMetaForClient() {
  return {
    chunked: true,
    maxLimitPerRequest: LEGACY_DB_GUARD.maxLimitPerRequest,
    defaultLimit: LEGACY_DB_GUARD.defaultLimit,
    clientDelayMs: LEGACY_DB_GUARD.clientRecommendedDelayMs,
    queryDelayMs: LEGACY_DB_GUARD.queryDelayMs,
    contract: 'Responses use { _meta, data }. Paginate with limit & offset until hasMore is false.',
    docsPath: '/api/legacy/guard',
  };
}
