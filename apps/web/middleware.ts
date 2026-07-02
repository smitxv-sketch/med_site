import { NextRequest, NextResponse } from 'next/server';

/** Внутренний BFF в том же контейнере site-ci */
const BFF_BASE =
  process.env.BFF_INTERNAL_URL ||
  `http://127.0.0.1:${process.env.BFF_PORT ?? '3001'}`;

const SPB_PATH_PREFIX = '/spb';

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
  '/api/catalog/prices',
  '/api/catalog/services',
  '/api/diagnostics',
] as const;

function isBookingApi(pathname: string): boolean {
  return BOOKING_API_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  ) || pathname.startsWith('/api/catalog/services/');
}

/** Edge-safe tenant (без импорта @med-site/contracts в middleware) */
function resolveTenantForMiddleware(pathname: string): {
  tenantId: string;
  strippedPathname: string;
} {
  if (pathname === SPB_PATH_PREFIX || pathname.startsWith(`${SPB_PATH_PREFIX}/`)) {
    const stripped =
      pathname === SPB_PATH_PREFIX
        ? '/'
        : pathname.slice(SPB_PATH_PREFIX.length) || '/';
    return { tenantId: 'spb', strippedPathname: stripped };
  }
  return { tenantId: 'chel', strippedPathname: pathname };
}

async function proxyBookingBff(request: NextRequest): Promise<NextResponse> {
  const { pathname, search } = request.nextUrl;
  const target = `${BFF_BASE}${pathname}${search}`;
  const headers = new Headers();
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);
  const auth = request.headers.get('authorization');
  if (auth) headers.set('authorization', auth);
  const tenantId = request.headers.get('x-tenant-id');
  if (tenantId) headers.set('x-tenant-id', tenantId);

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

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { tenantId, strippedPathname } = resolveTenantForMiddleware(pathname);

  if (isBookingApi(pathname)) {
    const reqHeaders = new Headers(request.headers);
    reqHeaders.set('x-tenant-id', tenantId);
    return proxyBookingBff(
      new NextRequest(request.url, { headers: reqHeaders, method: request.method }),
    );
  }

  if (strippedPathname !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = strippedPathname;
    const reqHeaders = new Headers(request.headers);
    reqHeaders.set('x-tenant-id', tenantId);
    return NextResponse.rewrite(url, { request: { headers: reqHeaders } });
  }

  const reqHeaders = new Headers(request.headers);
  reqHeaders.set('x-tenant-id', tenantId);
  return NextResponse.next({ request: { headers: reqHeaders } });
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
    '/api/catalog/prices',
    '/api/catalog/services/:path*',
    '/api/diagnostics',
    '/api/diagnostics/:path*',
    '/spb',
    '/spb/:path*',
  ],
};
