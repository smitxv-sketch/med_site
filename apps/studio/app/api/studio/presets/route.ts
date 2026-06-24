import { NextResponse } from 'next/server';

const BFF_URL =
  process.env.BFF_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_BFF_URL ??
  'http://localhost:3001';

export async function GET() {
  const secret = process.env.STUDIO_API_SECRET;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (secret) headers.Authorization = `Bearer ${secret}`;

  const res = await fetch(`${BFF_URL}/studio/presets`, {
    headers,
    cache: 'no-store',
  });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
