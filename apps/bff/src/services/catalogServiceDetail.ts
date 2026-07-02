import type { CatalogServiceDetailDto } from '@med-site/contracts';
import { getStrapiToken, getStrapiUrl } from '../config/env.js';

function formatPrice(raw?: string): string {
  const n = parseFloat(String(raw ?? '').replace(/\s/g, '').replace(',', '.'));
  if (!Number.isFinite(n)) return String(raw ?? '').trim();
  return `${n.toLocaleString('ru-RU')} ₽`;
}

/** Карточка услуги/программы по артикулу или slug */
export async function fetchCatalogServiceDetail(
  key: string,
  locale: string,
): Promise<CatalogServiceDetailDto | null> {
  const token = getStrapiToken();
  const base = getStrapiUrl().replace(/\/$/, '');
  const qs = new URLSearchParams({
    locale,
    'filters[$or][0][article][$eq]': key,
    'filters[$or][1][slug][$eq]': key,
    'pagination[pageSize]': '1',
    publicationState: 'live',
    'populate[includedItems][populate][service][fields][0]': 'article',
    'populate[includedItems][populate][service][fields][1]': 'title',
    'populate[includedItems][populate][service][fields][2]': 'price',
  });

  const res = await fetch(`${base}/api/services?${qs}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Strapi services ${res.status}`);
  const json = await res.json();
  const row = json?.data?.[0];
  if (!row) return null;

  const attrs = row.attributes ?? row;
  const includedRaw = attrs.includedItems ?? [];
  const includedItems = (Array.isArray(includedRaw) ? includedRaw : []).map(
    (comp: Record<string, unknown>, idx: number) => {
      const rel = comp.service as Record<string, unknown> | undefined;
      const relAttrs = (rel?.attributes ?? rel) as Record<string, unknown> | undefined;
      return {
        label: String(comp.label ?? relAttrs?.title ?? '').trim(),
        article: relAttrs?.article ? String(relAttrs.article) : undefined,
        title: relAttrs?.title ? String(relAttrs.title) : undefined,
        price: relAttrs?.price ? formatPrice(String(relAttrs.price)) : undefined,
        sortOrder: Number(comp.sortOrder ?? idx),
      };
    },
  );

  return {
    tenant: 'spb',
    locale,
    article: String(attrs.article ?? key),
    title: String(attrs.title ?? key),
    price: formatPrice(attrs.price),
    slug: attrs.slug ? String(attrs.slug) : undefined,
    summary: attrs.summary ? String(attrs.summary) : undefined,
    description: attrs.description ? String(attrs.description) : undefined,
    isProgram: Boolean(attrs.isProgram),
    includedListTitle: attrs.includedListTitle
      ? String(attrs.includedListTitle)
      : undefined,
    includedItems,
    legacyOnly: Boolean(attrs.legacyOnly),
  };
}
