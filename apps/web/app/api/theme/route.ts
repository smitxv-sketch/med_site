import type { NextRequest } from 'next/server';
import { proxyBookingBff } from '../../../lib/bookingBffProxy';

export async function GET(req: NextRequest) {
  return proxyBookingBff(req, '/api/theme', 'GET');
}
