import type { Request, Response } from 'express';
import { LEGACY_DB_GUARD, guardMetaForClient } from '../config/legacyDbGuard.js';

export type PaginationParams = {
  limit: number;
  offset: number;
};

export type BridgePaginationMeta = {
  limit: number;
  offset: number;
  count: number;
  hasMore: boolean;
  nextOffset: number | null;
  /** true = листайте limit/offset; false = весь набор в одном ответе */
  chunked: boolean;
};

export type BridgeListMeta = {
  city: string;
  entity: string;
  pagination: BridgePaginationMeta;
  guard: ReturnType<typeof guardMetaForClient>;
};

export type BridgeListResponse<T> = {
  _meta: BridgeListMeta;
  data: T[];
};

/** Парсинг limit/offset с жёстким потолком */
export function parsePagination(req: Request): PaginationParams {
  const rawLimit = parseInt(String(req.query.limit ?? ''), 10);
  const rawOffset = parseInt(String(req.query.offset ?? ''), 10);

  const limit = Math.min(
    LEGACY_DB_GUARD.maxLimitPerRequest,
    Math.max(1, Number.isFinite(rawLimit) ? rawLimit : LEGACY_DB_GUARD.defaultLimit),
  );
  const offset = Math.max(0, Number.isFinite(rawOffset) ? rawOffset : 0);

  return { limit, offset };
}

function buildNextUrl(req: Request, limit: number, nextOffset: number): string {
  const url = new URL(req.originalUrl, `${req.protocol}://${req.get('host') || 'localhost'}`);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('offset', String(nextOffset));
  return url.pathname + url.search;
}

/** Единый JSON-конверт для всех list-эндпоинтов моста */
export function sendPaginatedJson<T>(
  res: Response,
  req: Request,
  options: {
    city: string;
    entity: string;
    limit: number;
    offset: number;
    data: T[];
  },
): void {
  const { city, entity, limit, offset, data } = options;
  const count = data.length;
  const hasMore = count === limit;
  const nextOffset = hasMore ? offset + limit : null;

  if (hasMore && nextOffset !== null) {
    res.setHeader('Link', `<${buildNextUrl(req, limit, nextOffset)}>; rel="next"`);
  }

  res.setHeader('X-Legacy-Bridge-Chunked', 'true');
  res.setHeader('X-Legacy-Bridge-Max-Limit', String(LEGACY_DB_GUARD.maxLimitPerRequest));
  res.setHeader('X-Legacy-Bridge-Client-Delay-Ms', String(LEGACY_DB_GUARD.clientRecommendedDelayMs));

  const payload: BridgeListResponse<T> = {
    _meta: {
      city,
      entity,
      pagination: {
        limit,
        offset,
        count,
        hasMore,
        nextOffset,
        chunked: true,
      },
      guard: guardMetaForClient(),
    },
    data,
  };

  res.json(payload);
}

/** Один «блок» без пагинации (врачи REST, справочники) */
export function sendSinglePageJson<T>(
  res: Response,
  options: {
    city: string;
    entity: string;
    data: T[];
  },
): void {
  const { city, entity, data } = options;
  const count = data.length;

  res.setHeader('X-Legacy-Bridge-Chunked', 'false');

  res.json({
    _meta: {
      city,
      entity,
      pagination: {
        limit: count,
        offset: 0,
        count,
        hasMore: false,
        nextOffset: null,
        chunked: false,
      },
      guard: guardMetaForClient(),
    },
    data,
  } satisfies BridgeListResponse<T>);
}

/** Клиент: массив (legacy) или новый конверт */
export function unwrapBridgePayload<T = unknown>(json: unknown): {
  data: T[];
  meta: BridgeListMeta | null;
} {
  if (Array.isArray(json)) {
    return { data: json as T[], meta: null };
  }
  if (json && typeof json === 'object' && 'data' in json) {
    const envelope = json as BridgeListResponse<T>;
    return {
      data: Array.isArray(envelope.data) ? envelope.data : [],
      meta: envelope._meta ?? null,
    };
  }
  return { data: [], meta: null };
}

export const bridgeClientSleep = (ms: number) =>
  new Promise<void>((r) => setTimeout(r, ms));
