import { NextResponse } from 'next/server';
import { resolveStudioBffBase } from '../../../../lib/studio-bff';

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
