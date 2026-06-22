import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'web',
    dataMode: process.env.DATA_MODE ?? 'mock',
  });
}
