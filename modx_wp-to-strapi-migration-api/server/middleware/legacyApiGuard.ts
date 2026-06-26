import type { Request, Response, NextFunction } from 'express';
import { LEGACY_DB_GUARD, guardMetaForClient } from '../config/legacyDbGuard.js';

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Пути, которые бьют по legacy MySQL или тяжёлым выгрузкам */
function isLegacyDataRequest(req: Request): boolean {
  const p = req.path;
  if (req.method !== 'GET' && req.method !== 'POST') return false;
  if (p.startsWith('/chel')) return true;
  if (p.startsWith('/explore/spb') || p.startsWith('/explore/chel')) return true;
  if (p.startsWith('/qa/')) return true;
  if (p === '/doctors' || p === '/services' || p.startsWith('/sync/full-graph')) return true;
  if (p.startsWith('/export/')) return true;
  return false;
}

function clientKey(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    typeof forwarded === 'string'
      ? forwarded.split(',')[0]?.trim()
      : req.socket.remoteAddress || 'unknown';
  return ip;
}

/**
 * HTTP rate limit + заголовки контракта «данные частями».
 */
export function legacyApiGuardMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!isLegacyDataRequest(req)) {
    return next();
  }

  res.setHeader('X-Legacy-Bridge-Chunked', 'true');
  res.setHeader('X-Legacy-Bridge-Max-Limit', String(LEGACY_DB_GUARD.maxLimitPerRequest));
  res.setHeader('X-Legacy-Bridge-Client-Delay-Ms', String(LEGACY_DB_GUARD.clientRecommendedDelayMs));

  const key = clientKey(req);
  const now = Date.now();
  let bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    bucket = {
      count: 0,
      resetAt: now + LEGACY_DB_GUARD.httpRateLimitWindowMs,
    };
    buckets.set(key, bucket);
  }

  bucket.count += 1;

  const remaining = Math.max(0, LEGACY_DB_GUARD.httpRateLimitMax - bucket.count);
  const resetSec = Math.ceil((bucket.resetAt - now) / 1000);

  res.setHeader('X-RateLimit-Limit', String(LEGACY_DB_GUARD.httpRateLimitMax));
  res.setHeader('X-RateLimit-Remaining', String(remaining));
  res.setHeader('X-RateLimit-Reset', String(resetSec));

  if (bucket.count > LEGACY_DB_GUARD.httpRateLimitMax) {
    res.setHeader('Retry-After', String(resetSec));
    res.status(429).json({
      error: 'Too many legacy data requests. Use pagination and wait between pages.',
      guard: guardMetaForClient(),
      retryAfterSeconds: resetSec,
    });
    return;
  }

  next();
}
