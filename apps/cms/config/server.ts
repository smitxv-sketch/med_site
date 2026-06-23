import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS=YQq6l1DxtkLPy1oHQRnrRQ==,e/fCcVkt/44DneYQPCkf0w==,5Jzv/N21GQi0DRedan7vbw==,Dqx7c6h+Foua6z8lu3Cyyg=='),	
  },
  mcp: {
    enabled: env.bool('STRAPI_MCP_ENABLED', true),
    connectTimeoutMs: env.int('STRAPI_MCP_CONNECT_TIMEOUT_MS', 10000),
    requestTimeoutMs: env.int('STRAPI_MCP_REQUEST_TIMEOUT_MS', 120000),
  },
});

export default config;