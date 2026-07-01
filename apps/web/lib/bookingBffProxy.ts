import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const BFF_BASE =
  process.env.BFF_INTERNAL_URL ||
  `http://127.0.0.1:${process.env.BFF_PORT ?? '3001'}`;

/** Прокси виджета записи → внутренний BFF (надёжнее rewrites/middleware на Coolify) */
export async function proxyBookingBff(
  req: NextRequest,
  apiPath: string,
  method: string,
) {
  const url = new URL(`${BFF_BASE}${apiPath}`);
  req.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });
  const tenantId = req.headers.get('x-tenant-id');
  if (tenantId && !url.searchParams.has('tenant')) {
    url.searchParams.set('tenant', tenantId);
  }

  const headers: Record<string, string> = {};
  const contentType = req.headers.get('content-type');
  if (contentType) headers['Content-Type'] = contentType;
  const auth = req.headers.get('authorization');
  if (auth) headers.Authorization = auth;

  const tenantId = req.headers.get('x-tenant-id');
  if (tenantId) url.searchParams.set('tenant', tenantId);
  if (method !== 'GET' && method !== 'HEAD') {
    init.body = await req.text();
  }

  try {
    const res = await fetch(url.toString(), init);
    const body = await res.text();
    const outHeaders = new Headers();
    const resCt = res.headers.get('content-type');
    if (resCt) outHeaders.set('content-type', resCt);
    return new NextResponse(body, { status: res.status, headers: outHeaders });
  } catch (error) {
    console.error('[booking-bff-proxy]', apiPath, error);
    return NextResponse.json({ error: 'BFF unavailable' }, { status: 502 });
  }
}
