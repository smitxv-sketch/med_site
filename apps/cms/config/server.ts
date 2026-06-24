import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    // Читаем из Coolify/.env (comma-separated). Не хардкодим секреты в коде.
    keys: env.array('APP_KEYS'),
  },
  mcp: {
    enabled: env.bool('STRAPI_MCP_ENABLED', true),
    connectTimeoutMs: env.int('STRAPI_MCP_CONNECT_TIMEOUT_MS', 10000),
    requestTimeoutMs: env.int('STRAPI_MCP_REQUEST_TIMEOUT_MS', 120000),
  },
});

export default config;