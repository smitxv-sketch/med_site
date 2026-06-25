import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { resolveStudioBffBase } from '../../../../../lib/studio-bff';

function bffHeaders(): HeadersInit {
  const secret = process.env.STUDIO_API_SECRET;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (secret) headers.Authorization = `Bearer ${secret}`;
  return headers;
}

type Ctx = { params: Promise<{ slug: string }> };

/** Обновление кастомного пресета в Strapi через BFF */
export async function PUT(req: NextRequest, ctx: Ctx) {
  const { slug } = await ctx.params;
  const payload = await req.text();
  const res = await fetch(
    `${resolveStudioBffBase()}/presets/${encodeURIComponent(slug)}`,
    {
      method: 'PUT',
      headers: bffHeaders(),
      body: payload,
      cache: 'no-store',
    },
  );
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Удаление кастомного пресета из Strapi через BFF */
export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { slug } = await ctx.params;
  const res = await fetch(
    `${resolveStudioBffBase()}/presets/${encodeURIComponent(slug)}`,
    {
      method: 'DELETE',
      headers: bffHeaders(),
      cache: 'no-store',
    },
  );
  if (res.status === 204) {
    return new NextResponse(null, { status: 204 });
  }
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
