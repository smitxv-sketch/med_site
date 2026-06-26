import type {
  ContentListPageDto,
  NewsDto,
  PromotionDto,
  PromotionKind,
  VacancyDto,
} from '@med-site/contracts';

const BFF =
  process.env.BFF_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_BFF_URL ??
  'http://127.0.0.1:3001';

async function bffGet<T>(path: string, tenantId: string): Promise<T> {
  const sep = path.includes('?') ? '&' : '?';
  const url = `${BFF}${path}${sep}tenant=${encodeURIComponent(tenantId)}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`BFF ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export async function fetchPromotions(
  tenantId: string,
  kind?: PromotionKind,
): Promise<PromotionDto[]> {
  const qs = kind ? `?kind=${kind}` : '';
  const data = await bffGet<{ items: PromotionDto[] }>(
    `/api/promotions${qs}`,
    tenantId,
  );
  return data.items;
}

export async function fetchNews(tenantId: string): Promise<NewsDto[]> {
  const data = await bffGet<{ items: NewsDto[] }>('/api/news', tenantId);
  return data.items;
}

export async function fetchVacancies(tenantId: string): Promise<VacancyDto[]> {
  const data = await bffGet<{ items: VacancyDto[] }>('/api/vacancies', tenantId);
  return data.items;
}

export async function fetchContentListPage(
  slug: 'vacancies' | 'news' | 'promotions',
  tenantId: string,
): Promise<ContentListPageDto> {
  return bffGet<ContentListPageDto>(`/api/content-pages/${slug}`, tenantId);
}
