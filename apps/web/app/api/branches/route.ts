import type { NextRequest } from 'next/server';
import { proxyBookingBff } from '../../../lib/bookingBffProxy';

const path = '/api/branches';
export async function GET(req: NextRequest) {
  return proxyBookingBff(req, path, 'GET');
}
