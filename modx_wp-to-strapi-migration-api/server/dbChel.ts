import { createThrottledPool } from './lib/throttledPool.js';

// Пул WordPress (Челябинск) — очередь + пауза между запросами (защита Beget)
const throttled = createThrottledPool('chel', {
  host: process.env.CHEL_DB_HOST || 'localhost',
  port: parseInt(process.env.CHEL_DB_PORT || '3306', 10),
  user: process.env.CHEL_DB_USER || 'root',
  password: process.env.CHEL_DB_PASSWORD || '',
  database: process.env.CHEL_DB_NAME || 'wordpress',
});

/** Префикс таблиц WP (SSOT: CHEL_DB_PREFIX в env) */
export const chelDbPrefix = process.env.CHEL_DB_PREFIX || 'wp_';

export const dbChel = throttled;
