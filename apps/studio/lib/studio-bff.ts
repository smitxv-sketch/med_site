import type { NextRequest } from 'next/server';

/** BFF Studio API: локально напрямую, на проде — через site-ci proxy */
export function resolveStudioBffBase(): string {
  if (process.env.BFF_INTERNAL_URL) {
    const base = process.env.BFF_INTERNAL_URL.replace(/\/$/, '');
    return base.endsWith('/studio') ? base : `${base}/studio`;
  }
  if (process.env.BFF_PROXY_URL) {
    return process.env.BFF_PROXY_URL.replace(/\/$/, '');
  }
  const port = process.env.BFF_PORT ?? '3001';
  return `http://127.0.0.1:${port}/studio`;
}

export function studioBffUrl(path: string, req: NextRequest): string {
  const base = resolveStudioBffBase();
  const qs = req.nextUrl.searchParams.toString();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return qs ? `${base}${normalized}?${qs}` : `${base}${normalized}`;
}
