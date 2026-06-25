import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const BFF_URL =
  process.env.BFF_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_BFF_URL ??
  'http://localhost:3001';

/** Прокси публичного navigation из BFF для Studio preview */
export async function GET(req: NextRequest) {
  const tenant = req.nextUrl.searchParams.get('tenant') ?? 'chel';
  const url = `${BFF_URL}/api/navigation?tenant=${encodeURIComponent(tenant)}`;

  const res = await fetch(url, { cache: 'no-store' });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
