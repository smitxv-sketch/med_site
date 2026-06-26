import type { NextRequest } from 'next/server';
import { proxyBookingBff } from '../../../lib/bookingBffProxy';

export async function POST(req: NextRequest) {
  return proxyBookingBff(req, '/api/book', 'POST');
}
