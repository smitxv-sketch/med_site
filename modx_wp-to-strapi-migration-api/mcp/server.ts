/**
 * MCP-прокси к Legacy Content Bridge (localhost:3010).
 * Cursor вызывает инструменты → этот сервер → HTTP API с Bearer-токеном.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const BASE_URL = (process.env.BRIDGE_BASE_URL || 'http://127.0.0.1:3010').replace(/\/$/, '');
const TOKEN = process.env.BRIDGE_API_TOKEN?.trim() || '';

async function bridgeFetch(apiPath: string, query?: Record<string, string | number>) {
  if (!TOKEN) {
    throw new Error('BRIDGE_API_TOKEN is not set in modx_wp-to-strapi-migration-api/.env');
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

const server = new McpServer({
  name: 'legacy-bridge',
  version: '1.0.0',
});

server.tool(
  'bridge_openapi',
  'OpenAPI/Swagger спецификация bridge API — карта всех эндпоинтов для миграции в Strapi',
  {},
  async () => ({
    content: [{ type: 'text', text: JSON.stringify(await bridgeFetch('/api/explore/openapi.json'), null, 2) }],
  }),
);

server.tool(
  'bridge_get',
  'GET-запрос к Legacy Bridge API (путь от /api/..., например /api/explore/chel/post_types)',
  {
    path: z.string().describe('Путь API, начиная с /api/'),
    limit: z.number().int().min(1).max(100).optional(),
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
  'bridge_discover',
  'Быстрый обзор структуры обоих сайтов: MODX templates (СПб) + WP post_types (Челябинск)',
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
  'Проверка подключения к MODX (СПб) и доступности bridge',
  {},
  async () => {
    const modx = await bridgeFetch('/api/health');
    return { content: [{ type: 'text', text: JSON.stringify(modx, null, 2) }] };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
