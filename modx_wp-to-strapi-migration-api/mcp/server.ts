/**
 * MCP-прокси к Legacy Content Bridge.
 * Все list-эндпоинты отдают { _meta, data } — листайте limit/offset.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAppEnv } from '../../infra/loadAppEnv.mjs';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadAppEnv('legacy-bridge-istochnik');

const BASE_URL = (process.env.BRIDGE_BASE_URL || 'http://127.0.0.1:3010').replace(/\/$/, '');
const TOKEN = process.env.BRIDGE_API_TOKEN?.trim() || '';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

async function bridgeFetch(apiPath: string, query?: Record<string, string | number>) {
  if (!TOKEN) {
    throw new Error('BRIDGE_API_TOKEN is not set in env/bridge.auth.env');
  }

  const url = new URL(apiPath.startsWith('/') ? apiPath : `/${apiPath}`, BASE_URL);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Bridge ${res.status}: ${text.slice(0, 500)}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

function unwrapPage(json: unknown): {
  data: unknown[];
  hasMore: boolean;
  nextOffset: number | null;
  clientDelayMs: number;
} {
  if (Array.isArray(json)) {
    return { data: json, hasMore: false, nextOffset: null, clientDelayMs: 700 };
  }
  const envelope = json as {
    data?: unknown[];
    _meta?: {
      pagination?: { hasMore?: boolean; nextOffset?: number | null };
      guard?: { clientDelayMs?: number };
    };
  };
  return {
    data: Array.isArray(envelope.data) ? envelope.data : [],
    hasMore: Boolean(envelope._meta?.pagination?.hasMore),
    nextOffset: envelope._meta?.pagination?.nextOffset ?? null,
    clientDelayMs: envelope._meta?.guard?.clientDelayMs ?? 700,
  };
}

const server = new McpServer({
  name: 'legacy-bridge',
  version: '1.1.0',
});

server.tool(
  'bridge_guard',
  'Контракт пагинации и лимиты bridge — читать перед массовыми запросами',
  {},
  async () => ({
    content: [{ type: 'text', text: JSON.stringify(await bridgeFetch('/api/legacy/guard'), null, 2) }],
  }),
);

server.tool(
  'bridge_openapi',
  'OpenAPI/Swagger спецификация bridge API',
  {},
  async () => ({
    content: [{ type: 'text', text: JSON.stringify(await bridgeFetch('/api/explore/openapi.json'), null, 2) }],
  }),
);

server.tool(
  'bridge_get',
  'Одна страница legacy-данных. Ответ: { _meta.pagination, data }. max limit ≈25.',
  {
    path: z.string().describe('Путь API, начиная с /api/'),
    limit: z.number().int().min(1).max(25).optional(),
    offset: z.number().int().min(0).optional(),
  },
  async ({ path: apiPath, limit, offset }) => {
    const query: Record<string, string | number> = {};
    if (limit !== undefined) query.limit = limit;
    if (offset !== undefined) query.offset = offset;

    const data = await bridgeFetch(apiPath, Object.keys(query).length ? query : undefined);
    const text = JSON.stringify(data, null, 2);
    const clipped = text.length > 120_000 ? `${text.slice(0, 120_000)}\n…[truncated]` : text;

    return { content: [{ type: 'text', text: clipped }] };
  },
);

server.tool(
  'bridge_fetch_all',
  'Собрать все страницы эндпоинта с паузой (безопасно для Beget). Не использовать на /dump.',
  {
    path: z.string().describe('List-эндпоинт, напр. /api/chel/news'),
    limit: z.number().int().min(1).max(25).default(20),
    maxPages: z.number().int().min(1).max(500).default(100),
  },
  async ({ path: apiPath, limit, maxPages }) => {
    const all: unknown[] = [];
    let offset = 0;
    let pages = 0;
    let delayMs = 700;

    while (pages < maxPages) {
      const json = await bridgeFetch(apiPath, { limit, offset });
      const page = unwrapPage(json);
      all.push(...page.data);
      pages += 1;
      delayMs = page.clientDelayMs;

      if (!page.hasMore) break;
      offset = page.nextOffset ?? offset + limit;
      await sleep(delayMs);
    }

    const summary = {
      path: apiPath,
      totalItems: all.length,
      pagesFetched: pages,
      truncated: pages >= maxPages,
    };

    const text = JSON.stringify({ summary, data: all }, null, 2);
    const clipped = text.length > 120_000 ? `${text.slice(0, 120_000)}\n…[truncated]` : text;

    return { content: [{ type: 'text', text: clipped }] };
  },
);

server.tool(
  'bridge_discover',
  'Обзор структуры: MODX templates (СПб) + WP post_types (Челябинск)',
  {},
  async () => {
    const [spb, chel] = await Promise.all([
      bridgeFetch('/api/explore/spb/templates'),
      bridgeFetch('/api/explore/chel/post_types'),
    ]);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ spb_templates: spb, chel_post_types: chel }, null, 2),
        },
      ],
    };
  },
);

server.tool(
  'bridge_health',
  'Проверка подключения к MODX и доступности bridge',
  {},
  async () => {
    const modx = await bridgeFetch('/api/health');
    return { content: [{ type: 'text', text: JSON.stringify(modx, null, 2) }] };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
