import { useQuery } from '@tanstack/react-query';
import type { PriceCatalogDto } from '@med-site/contracts';
import { fetchPlatformPrices } from '@/shared/api/platformPrices';
import { pricesDb, PRICING_TABS } from '@/shared/api/mocks/pricesDb';
import type { PriceCatalogCategoryDto, PriceCatalogTabDto } from '@med-site/contracts';

function mockAsCatalog(): PriceCatalogDto {
  return {
    tenant: 'chel',
    locale: 'ru-chel',
    placementCount: 0,
    categoryCount: pricesDb.length,
    tabs: PRICING_TABS as PriceCatalogTabDto[],
    quickNav: [],
    categories: pricesDb.map((c) => ({
      id: c.id,
      name: c.name,
      tabId: c.tabId as PriceCatalogCategoryDto['tabId'],
      items: c.items.map((item) => ({
        ...item,
        article: item.id,
        sortOrder: 0,
      })),
    })),
  };
}

export function usePricesCatalog(tenantId: string) {
  return useQuery({
    queryKey: ['prices-catalog', tenantId],
    queryFn: async (): Promise<PriceCatalogDto> => {
      const live = await fetchPlatformPrices(tenantId);
      if (live) return live;
      if (tenantId === 'chel') return mockAsCatalog();
      throw new Error('Каталог прайса недоступен');
    },
    staleTime: 5 * 60_000,
  });
}
