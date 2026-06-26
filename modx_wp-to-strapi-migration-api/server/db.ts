import { createThrottledPool } from './lib/throttledPool.js';

// Пул MySQL MODX (СПб) — все запросы через глобальную очередь + пауза
const throttled = createThrottledPool('spb', {
  host: process.env.SPB_DB_HOST || process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.SPB_DB_PORT || process.env.DB_PORT || '3306'),
  user: process.env.SPB_DB_USER || process.env.DB_USER || 'root',
  password: process.env.SPB_DB_PASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.SPB_DB_NAME || process.env.DB_NAME || 'modx_database',
});

/** Throttled pool для MODX — используйте вместо прямого mysql.createPool */
export const pool = throttled;

export const getPrefix = () =>
  process.env.SPB_DB_PREFIX || process.env.DB_PREFIX || 'modx_';

export { getExcludedIds } from './bridgeDb.js';
