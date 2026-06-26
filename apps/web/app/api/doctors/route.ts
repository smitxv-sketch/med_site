import type { NextRequest } from 'next/server';
import { proxyBookingBff } from '../../../lib/bookingBffProxy';

/** Виджет записи: врачи по специальности (QMS) */
export async function GET(req: NextRequest) {
  return proxyBookingBff(req, '/api/doctors', 'GET');
}
