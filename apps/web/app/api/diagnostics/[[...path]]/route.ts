import type { NextRequest } from 'next/server';
import { proxyBookingBff } from '../../../../lib/bookingBffProxy';

type Ctx = { params: Promise<{ path?: string[] }> };

async function proxy(req: NextRequest, ctx: Ctx, method: string) {
  const { path = [] } = await ctx.params;
  const suffix = path.length ? `/${path.join('/')}` : '';
  return proxyBookingBff(req, `/api/diagnostics${suffix}`, method);
}

export async function GET(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx, 'GET');
}

export async function POST(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx, 'POST');
}
