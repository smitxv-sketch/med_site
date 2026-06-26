import { createThrottledPool } from './lib/throttledPool.js';

// Пул WordPress (Челябинск) — очередь + пауза между запросами (защита Beget)
const throttled = createThrottledPool('chel', {
  host: process.env.CHEL_DB_HOST || process.env.WP_DB_HOST || 'localhost',
  port: parseInt(process.env.CHEL_DB_PORT || process.env.WP_DB_PORT || '3306'),
  user: process.env.CHEL_DB_USER || process.env.WP_DB_USER || 'root',
  password: process.env.CHEL_DB_PASSWORD || process.env.WP_DB_PASSWORD || '',
  database: process.env.CHEL_DB_NAME || process.env.WP_DB_NAME || 'wordpress',
});

export const dbChel = throttled;
