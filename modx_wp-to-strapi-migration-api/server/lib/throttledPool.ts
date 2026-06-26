import mysql from 'mysql2/promise';
import type { Pool, PoolOptions } from 'mysql2/promise';
import { LEGACY_DB_GUARD, type LegacyCity } from '../config/legacyDbGuard.js';
import { scheduleLegacyDbQuery } from './legacyDbQueue.js';

export type ThrottledPool = {
  query: Pool['query'];
  /** Прямой пул — только для health-check SELECT 1 */
  raw: Pool;
};

export function createThrottledPool(
  source: LegacyCity,
  options: PoolOptions,
): ThrottledPool {
  const raw = mysql.createPool({
    ...options,
    waitForConnections: true,
    connectionLimit: LEGACY_DB_GUARD.connectionLimit,
    queueLimit: 0,
  });

  const query: Pool['query'] = ((...args: unknown[]) => {
    const first = args[0];
    const sqlPreview =
      typeof first === 'string'
        ? first.replace(/\s+/g, ' ').slice(0, 80)
        : 'query';
    return scheduleLegacyDbQuery(source, sqlPreview, () =>
      raw.query(...(args as Parameters<Pool['query']>)),
    );
  }) as Pool['query'];

  return { query, raw };
}
