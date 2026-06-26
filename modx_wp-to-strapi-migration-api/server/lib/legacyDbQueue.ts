import { LEGACY_DB_GUARD, type LegacyCity } from '../config/legacyDbGuard.js';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

let chain: Promise<void> = Promise.resolve();
let lastQueryFinishedAt = 0;

/** Метрики очереди — для /api/legacy/guard/stats */
const stats = {
  totalQueries: 0,
  slowQueries: 0,
  lastLabel: '',
  lastSource: '' as LegacyCity | '',
  lastDurationMs: 0,
  lastFinishedAt: 0,
};

export function getLegacyDbQueueStats() {
  return {
    ...stats,
    queryDelayMs: LEGACY_DB_GUARD.queryDelayMs,
    connectionLimit: LEGACY_DB_GUARD.connectionLimit,
    policy: 'global_sequential',
    note: 'Chel+SPb на одном Beget-хосте — один поток SQL',
  };
}

/**
 * Глобальная очередь: все запросы к Chel/SPB MySQL идут строго по одному,
 * с паузой между ними — защита Beget от DDoS-подобных паттернов.
 */
export function scheduleLegacyDbQuery<T>(
  source: LegacyCity,
  label: string,
  fn: () => Promise<T>,
): Promise<T> {
  const run = async (): Promise<T> => {
    const elapsed = Date.now() - lastQueryFinishedAt;
    const wait = Math.max(0, LEGACY_DB_GUARD.queryDelayMs - elapsed);
    if (wait > 0) {
      await sleep(wait);
    }

    const started = Date.now();
    try {
      return await fn();
    } finally {
      lastQueryFinishedAt = Date.now();
      const took = lastQueryFinishedAt - started;
      stats.totalQueries += 1;
      stats.lastLabel = label;
      stats.lastSource = source;
      stats.lastDurationMs = took;
      stats.lastFinishedAt = lastQueryFinishedAt;
      if (took > 5_000) {
        stats.slowQueries += 1;
        console.warn(`[legacy-db:${source}] slow query "${label}" ${took}ms`);
      }
    }
  };

  const result = chain.then(run, run);
  chain = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}
