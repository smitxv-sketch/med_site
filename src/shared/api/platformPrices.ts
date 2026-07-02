import axios from 'axios';
import type { CatalogServiceDetailDto, PriceCatalogDto } from '@med-site/contracts';

/** Каталог прайса СПб — Strapi placements через BFF */
export async function fetchPlatformPrices(tenant: string): Promise<PriceCatalogDto | null> {
  if (tenant !== 'spb') return null;
  const { data } = await axios.get<PriceCatalogDto>('/api/catalog/prices', {
    timeout: 30000,
    params: { tenant },
  });
  return data;
}

/** Карточка услуги/программы по артикулу */
export async function fetchCatalogService(
  article: string,
  tenant = 'spb',
): Promise<CatalogServiceDetailDto | null> {
  try {
    const { data, status } = await axios.get<CatalogServiceDetailDto>(
      `/api/catalog/services/${encodeURIComponent(article)}`,
      { timeout: 15000, params: { tenant }, validateStatus: (s) => s < 500 },
    );
    if (status === 404) return null;
    return data;
  } catch {
    return null;
  }
}
