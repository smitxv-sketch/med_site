import { NextRequest, NextResponse } from 'next/server';

/** Внутренний BFF в том же контейнере site-ci (см. scripts/start-platform.mjs) */
const BFF_BASE =
  process.env.BFF_INTERNAL_URL ||
  `http://127.0.0.1:${process.env.BFF_PORT ?? '3001'}`;

/** Пути виджета записи и каталога врачей — rewrites в next.config на проде не срабатывали */
const BOOKING_API_PREFIXES = [
  '/api/wp-doctors',
  '/api/branches',
  '/api/theme',
  '/api/text',
  '/api/config',
  '/api/services',
  '/api/slots',
  '/api/book',
  '/api/doctors',
  '/api/catalog/doctors',
  '/api/diagnostics',
] as const;

function isBookingApi(pathname: string): boolean {
  return BOOKING_API_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (!isBookingApi(pathname)) {
    return NextResponse.next();
  }

  const target = `${BFF_BASE}${pathname}${search}`;
  const headers = new Headers();
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);
  const auth = request.headers.get('authorization');
  if (auth) headers.set('authorization', auth);

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: 'no-store',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.text();
  }

  try {
    const res = await fetch(target, init);
    const body = await res.text();
    const outHeaders = new Headers();
    const resCt = res.headers.get('content-type');
    if (resCt) outHeaders.set('content-type', resCt);
    return new NextResponse(body, { status: res.status, headers: outHeaders });
  } catch (error) {
    console.error('[booking-bff-proxy]', target, error);
    return NextResponse.json({ error: 'BFF unavailable' }, { status: 502 });
  }
}

export const config = {
  matcher: [
    '/api/wp-doctors/:path*',
    '/api/branches',
    '/api/theme',
    '/api/text',
    '/api/config',
    '/api/services',
    '/api/slots',
    '/api/book',
    '/api/doctors',
    '/api/catalog/doctors',
    '/api/diagnostics',
    '/api/diagnostics/:path*',
  ],
};
