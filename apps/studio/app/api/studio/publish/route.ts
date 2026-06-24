import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { studioBffUrl } from '../../../../lib/studio-bff';

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
  const res = await fetch(studioBffUrl('/publish', req), {
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
