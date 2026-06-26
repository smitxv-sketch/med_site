import { createThrottledPool } from './lib/throttledPool.js';

// Пул MySQL MODX (СПб) — все запросы через глобальную очередь + пауза
const throttled = createThrottledPool('spb', {
  host: process.env.SPB_DB_HOST || 'localhost',
  port: parseInt(process.env.SPB_DB_PORT || '3306', 10),
  user: process.env.SPB_DB_USER || 'root',
  password: process.env.SPB_DB_PASSWORD || '',
  database: process.env.SPB_DB_NAME || 'modx_database',
  connectTimeout: 5000,
});

/** Throttled pool для MODX — используйте вместо прямого mysql.createPool */
export const pool = throttled;

export const getPrefix = () => process.env.SPB_DB_PREFIX || 'modx_';

export { getExcludedIds } from './bridgeDb.js';
