import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const BFF = `http://127.0.0.1:${process.env.BFF_PORT ?? '3001'}`;

type Ctx = { params: Promise<{ id: string }> };

/** Публичный прокси трекинга экспериментов → внутренний BFF */
export async function POST(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const qs = req.nextUrl.searchParams.toString();
  const url = qs
    ? `${BFF}/api/experiments/${id}/track?${qs}`
    : `${BFF}/api/experiments/${id}/track`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: await req.text(),
    cache: 'no-store',
  });

  return new NextResponse(await res.text(), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
