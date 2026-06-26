import { LEGACY_DB_GUARD, type LegacyCity } from '../config/legacyDbGuard.js';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

let chain: Promise<void> = Promise.resolve();
let lastQueryFinishedAt = 0;

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
      if (took > 5_000) {
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
