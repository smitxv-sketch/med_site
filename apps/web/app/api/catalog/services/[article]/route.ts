import type { NextRequest } from 'next/server';
import { proxyBookingBff } from '../../../../lib/bookingBffProxy';

/** Карточка услуги/программы из Strapi */
export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ article: string }> },
) {
  const { article } = await ctx.params;
  return proxyBookingBff(req, `/api/catalog/services/${encodeURIComponent(article)}`, 'GET');
}
