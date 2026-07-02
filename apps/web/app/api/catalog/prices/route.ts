import type { NextRequest } from 'next/server';
import { proxyBookingBff } from '../../../../lib/bookingBffProxy';

/** Каталог прайса из Strapi (placements + enabled) */
export async function GET(req: NextRequest) {
  return proxyBookingBff(req, '/api/catalog/prices', 'GET');
}
