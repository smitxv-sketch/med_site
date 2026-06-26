import type { LegacyCity } from '../config/legacyDbGuard.js';
import type { CheckStatus } from './healthChecks.js';

function readInt(name: string, fallback: number): number {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

/** Кэш ping legacy MySQL — не бьём Beget на каждый /api/health */
const TTL_MS = readInt('LEGACY_HEALTH_CACHE_MS', 120_000);

const cache = new Map<LegacyCity, { status: CheckStatus; at: number }>();

export async function getCachedLegacyCheck(
  source: LegacyCity,
  probe: () => Promise<CheckStatus>,
): Promise<CheckStatus> {
  const hit = cache.get(source);
  const now = Date.now();
  if (hit && now - hit.at < TTL_MS) {
    return hit.status;
  }
  const status = await probe();
  cache.set(source, { status, at: now });
  return status;
}

export function invalidateLegacyHealthCache(source?: LegacyCity): void {
  if (source) cache.delete(source);
  else cache.clear();
}
