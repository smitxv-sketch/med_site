import type { NextRequest } from 'next/server';
import { proxyBookingBff } from '../../../../lib/bookingBffProxy';

/** Каталог /doctors из Strapi */
export async function GET(req: NextRequest) {
  return proxyBookingBff(req, '/api/catalog/doctors', 'GET');
}
