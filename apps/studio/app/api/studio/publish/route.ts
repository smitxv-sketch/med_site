import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const BFF_URL =
  process.env.BFF_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_BFF_URL ??
  'http://localhost:3001';

function bffHeaders(): HeadersInit {
  const secret = process.env.STUDIO_API_SECRET;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (secret) headers.Authorization = `Bearer ${secret}`;
  return headers;
}

export async function POST(req: NextRequest) {
  const tenant = req.nextUrl.searchParams.get('tenant') ?? 'chel';
  const page = req.nextUrl.searchParams.get('page') ?? 'home';
  const locale = req.nextUrl.searchParams.get('locale');
  const qs = new URLSearchParams({ tenant, page });
  if (locale) qs.set('locale', locale);

  const res = await fetch(`${BFF_URL}/studio/publish?${qs}`, {
    method: 'POST',
    headers: bffHeaders(),
    cache: 'no-store',
  });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
