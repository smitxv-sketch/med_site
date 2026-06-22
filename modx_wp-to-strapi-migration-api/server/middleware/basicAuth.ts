import type { Request, Response, NextFunction } from 'express';

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

function isLocalHost(req: Request): boolean {
  const host = (req.headers.host || '').split(':')[0].toLowerCase();
  return LOCAL_HOSTS.has(host);
}

/**
 * В production без SITE_PASSWORD сервис не должен стартовать —
 * иначе откроется доступ к сырым данным двух сайтов.
 */
export function assertProductionAuthConfigured(): void {
  if (process.env.NODE_ENV !== 'production') return;

  const password = process.env.SITE_PASSWORD?.trim();
  if (!password) {
    console.error(
      '[legacy-bridge] FATAL: set SITE_PASSWORD in Coolify before exposing this service to the web.',
    );
    process.exit(1);
  }
}

/**
 * Basic Auth для UI и всех /api/* маршрутов.
 * Локально можно отключить через LEGACY_BRIDGE_ALLOW_LOCAL_NO_AUTH=true (только dev).
 */
export function createBasicAuthMiddleware() {
  const expectedUser = (process.env.SITE_USER || 'admin').trim();
  const expectedPassword = process.env.SITE_PASSWORD?.trim() || '';
  const allowLocalNoAuth =
    process.env.NODE_ENV !== 'production' &&
    process.env.LEGACY_BRIDGE_ALLOW_LOCAL_NO_AUTH === 'true';

  return (req: Request, res: Response, next: NextFunction) => {
    if (!expectedPassword) {
      if (allowLocalNoAuth && isLocalHost(req)) {
        return next();
      }
      res.status(503).send('SITE_PASSWORD is not configured');
      return;
    }

    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Basic ')) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Legacy Content Bridge"');
      res.status(401).send('Auth required');
      return;
    }

    try {
      const decoded = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8');
      const separator = decoded.indexOf(':');
      const user = separator >= 0 ? decoded.slice(0, separator) : '';
      const password = separator >= 0 ? decoded.slice(separator + 1) : '';

      if (user === expectedUser && password === expectedPassword) {
        return next();
      }
    } catch {
      // fall through to 401
    }

    res.setHeader('WWW-Authenticate', 'Basic realm="Legacy Content Bridge"');
    res.status(401).send('Auth required');
  };
}
