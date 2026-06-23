import type { Request, Response, NextFunction } from 'express';

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

function isLocalHost(req: Request): boolean {
  const host = (req.headers.host || '').split(':')[0].toLowerCase();
  return LOCAL_HOSTS.has(host);
}

function readBearerToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.slice(7).trim();
}

function readBasicCredentials(req: Request): { user: string; password: string } | null {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Basic ')) return null;

  try {
    const decoded = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8');
    const separator = decoded.indexOf(':');
    if (separator < 0) return null;
    return {
      user: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

/**
 * В production нужен хотя бы один секрет: SITE_PASSWORD (UI) или BRIDGE_API_TOKEN (агенты/MCP).
 */
export function assertProductionAuthConfigured(): void {
  if (process.env.NODE_ENV !== 'production') return;

  const hasPassword = Boolean(process.env.SITE_PASSWORD?.trim());
  const hasToken = Boolean(process.env.BRIDGE_API_TOKEN?.trim());

  if (!hasPassword && !hasToken) {
    console.error(
      '[legacy-bridge] FATAL: set SITE_PASSWORD and/or BRIDGE_API_TOKEN before exposing this service.',
    );
    process.exit(1);
  }
}

/**
 * Защита UI и всех /api/*:
 * - Bearer BRIDGE_API_TOKEN — для ИИ, MCP, скриптов
 * - Basic SITE_USER/SITE_PASSWORD — для браузера
 * - Локальный bypass только если явно включён и секреты не заданы
 */
export function createAuthMiddleware() {
  const expectedUser = (process.env.SITE_USER || 'admin').trim();
  const expectedPassword = process.env.SITE_PASSWORD?.trim() || '';
  const bridgeToken = process.env.BRIDGE_API_TOKEN?.trim() || '';
  const allowLocalNoAuth =
    process.env.NODE_ENV !== 'production' &&
    process.env.LEGACY_BRIDGE_ALLOW_LOCAL_NO_AUTH === 'true' &&
    !expectedPassword &&
    !bridgeToken;

  return (req: Request, res: Response, next: NextFunction) => {
    // Docker/Coolify healthcheck без токена
    if (req.path === '/api/health') {
      return next();
    }

    if (bridgeToken && readBearerToken(req) === bridgeToken) {
      return next();
    }

    if (expectedPassword) {
      const basic = readBasicCredentials(req);
      if (basic && basic.user === expectedUser && basic.password === expectedPassword) {
        return next();
      }
    }

    if (allowLocalNoAuth && isLocalHost(req)) {
      return next();
    }

    const acceptsBasic = Boolean(expectedPassword);
    if (acceptsBasic) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Legacy Content Bridge"');
    }

    res.status(401).json({
      error: 'Auth required',
      hint: bridgeToken
        ? 'Use Authorization: Bearer <BRIDGE_API_TOKEN> or Basic auth for the UI.'
        : 'Configure BRIDGE_API_TOKEN or SITE_PASSWORD in .env',
    });
  };
}
