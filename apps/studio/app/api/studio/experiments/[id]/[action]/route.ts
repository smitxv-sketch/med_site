import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { resolveStudioBffBase } from '../../../../../../lib/studio-bff';

function bffHeaders(): HeadersInit {
  const secret = process.env.STUDIO_API_SECRET;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (secret) headers.Authorization = `Bearer ${secret}`;
  return headers;
}

type Ctx = { params: Promise<{ id: string; action: string }> };

export async function POST(req: NextRequest, ctx: Ctx) {
  const { id, action } = await ctx.params;
  const base = resolveStudioBffBase();
  const qs = req.nextUrl.searchParams.toString();
  const url = qs
    ? `${base}/experiments/${id}/${action}?${qs}`
    : `${base}/experiments/${id}/${action}`;

  const payload = await req.text();
  const res = await fetch(url, {
    method: 'POST',
    headers: bffHeaders(),
    body: payload || undefined,
    cache: 'no-store',
  });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(req: NextRequest, ctx: Ctx) {
  const { id, action } = await ctx.params;
  const base = resolveStudioBffBase();
  const qs = req.nextUrl.searchParams.toString();
  const url = qs
    ? `${base}/experiments/${id}/${action}?${qs}`
    : `${base}/experiments/${id}/${action}`;

  const res = await fetch(url, {
    headers: bffHeaders(),
    cache: 'no-store',
  });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
