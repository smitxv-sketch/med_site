import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { resolveStudioBffBase } from '../../../../lib/studio-bff';

function bffHeaders(): HeadersInit {
  const secret = process.env.STUDIO_API_SECRET;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (secret) headers.Authorization = `Bearer ${secret}`;
  return headers;
}

export async function GET(req: NextRequest) {
  const secret = process.env.STUDIO_API_SECRET;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (secret) headers.Authorization = `Bearer ${secret}`;

  const url = new URL(`${resolveStudioBffBase()}/presets`);
  const tenant = req.nextUrl.searchParams.get('tenant');
  if (tenant) url.searchParams.set('tenant', tenant);

  const res = await fetch(url.toString(), {
    headers,
    cache: 'no-store',
  });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const url = new URL(`${resolveStudioBffBase()}/presets`);
  const tenant = req.nextUrl.searchParams.get('tenant');
  if (tenant) url.searchParams.set('tenant', tenant);
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: bffHeaders(),
    body: payload,
    cache: 'no-store',
  });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
