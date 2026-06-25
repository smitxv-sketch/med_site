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

export async function GET() {
  const secret = process.env.STUDIO_API_SECRET;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (secret) headers.Authorization = `Bearer ${secret}`;

  const res = await fetch(`${resolveStudioBffBase()}/presets`, {
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
  const res = await fetch(`${resolveStudioBffBase()}/presets`, {
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
