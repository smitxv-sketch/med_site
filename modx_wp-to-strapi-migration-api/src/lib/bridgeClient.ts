/**
 * Клиент bridge UI / скриптов: читает конверт { _meta, data } и листает страницы с паузой.
 */

export type BridgePagination = {
  limit: number;
  offset: number;
  count: number;
  hasMore: boolean;
  nextOffset: number | null;
  chunked: boolean;
};

export type BridgeGuardHints = {
  clientDelayMs?: number;
  maxLimitPerRequest?: number;
};

export type BridgeEnvelope<T> = {
  _meta?: {
    pagination?: BridgePagination;
    guard?: BridgeGuardHints;
  };
  data?: T[];
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Распаковка ответа: старый массив или новый конверт */
export function unwrapBridgePayload<T>(json: unknown): {
  data: T[];
  pagination: BridgePagination | null;
  guard: BridgeGuardHints | null;
} {
  if (Array.isArray(json)) {
    return {
      data: json as T[],
      pagination: null,
      guard: null,
    };
  }

  const envelope = json as BridgeEnvelope<T>;
  const data = Array.isArray(envelope?.data) ? envelope.data : [];
  return {
    data,
    pagination: envelope._meta?.pagination ?? null,
    guard: envelope._meta?.guard ?? null,
  };
}

/** Одна страница */
export async function fetchBridgePage<T>(
  path: string,
  limit: number,
  offset: number,
): Promise<{ data: T[]; pagination: BridgePagination | null; guard: BridgeGuardHints | null }> {
  const sep = path.includes('?') ? '&' : '?';
  const res = await fetch(`${path}${sep}limit=${limit}&offset=${offset}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || `HTTP ${res.status}`);
  }
  const json = await res.json();
  const { data, pagination, guard } = unwrapBridgePayload<T>(json);
  return { data, pagination, guard };
}

/** Все страницы подряд — с паузой из guard или дефолт 700 мс */
export async function fetchBridgeAll<T>(
  path: string,
  pageSize = 20,
  fallbackDelayMs = 700,
): Promise<T[]> {
  const all: T[] = [];
  let offset = 0;
  let delayMs = fallbackDelayMs;

  while (true) {
    const { data, pagination, guard } = await fetchBridgePage<T>(path, pageSize, offset);
    all.push(...data);

    if (guard?.clientDelayMs) {
      delayMs = guard.clientDelayMs;
    }

    if (!pagination?.hasMore) {
      break;
    }

    offset = pagination.nextOffset ?? offset + pageSize;
    await sleep(delayMs);
  }

  return all;
}

/** Первая страница — для превью в UI без полной выгрузки */
export async function fetchBridgePreview<T>(path: string, limit = 20): Promise<T[]> {
  const { data } = await fetchBridgePage<T>(path, limit, 0);
  return data;
}
