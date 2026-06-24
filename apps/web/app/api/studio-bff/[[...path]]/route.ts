import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const BFF_STUDIO = `http://127.0.0.1:${process.env.BFF_PORT ?? '3001'}/studio`;

type RouteContext = { params: Promise<{ path?: string[] }> };

async function proxy(req: NextRequest, ctx: RouteContext, method: string) {
  const { path: segments } = await ctx.params;
  const suffix = segments?.length ? `/${segments.join('/')}` : '';
  const url = new URL(`${BFF_STUDIO}${suffix}`);
  req.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  const headers: Record<string, string> = {};
  const auth = req.headers.get('authorization');
  if (auth) headers.Authorization = auth;

  const init: RequestInit = { method, headers, cache: 'no-store' };
  if (method !== 'GET' && method !== 'HEAD') {
    init.body = await req.text();
    headers['Content-Type'] =
      req.headers.get('content-type') ?? 'application/json';
  }

  const res = await fetch(url.toString(), init);
  return new NextResponse(await res.text(), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Публичный прокси Studio → внутренний BFF (для apps/studio на отдельном контейнере) */
export async function GET(req: NextRequest, ctx: RouteContext) {
  return proxy(req, ctx, 'GET');
}

export async function PATCH(req: NextRequest, ctx: RouteContext) {
  return proxy(req, ctx, 'PATCH');
}

export async function POST(req: NextRequest, ctx: RouteContext) {
  return proxy(req, ctx, 'POST');
}
