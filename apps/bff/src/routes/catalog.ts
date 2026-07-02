import type { Request, Response } from 'express';
import { getStrapiToken, getStrapiUrl } from '../config/env.js';

/** Вкладки прайса (совместимо с PRICING_TABS на фронте) */
const TAB_LABELS: Record<string, string> = {
  priem: 'Приём врачей',
  diagnostika: 'Диагностика',
  programmy: 'Комплексные программы',
  lechenie: 'Лечение',
};

type StrapiPlacement = {
  documentId?: string;
  enabled?: boolean;
  sortOrder?: number;
  tabQms?: string;
  tabLegacy?: string;
  service?: {
    documentId?: string;
    article?: string;
    title?: string;
    price?: string;
    isProgram?: boolean;
    summary?: string;
    slug?: string;
    publishedAt?: string | null;
  };
  category?: {
    documentId?: string;
    title?: string;
    slug?: string;
    tabQms?: string;
    expertIntro?: string;
    aboutText?: string;
    seoTitle?: string;
    seoDescription?: string;
    enabled?: boolean;
  };
};

function tabIdFromQms(tabQms?: string): string {
  if (tabQms === 'priem') return 'consultation';
  if (tabQms === 'diagnostika') return 'diagnostics';
  if (tabQms === 'programmy') return 'programs';
  if (tabQms === 'lechenie') return 'treatment';
  return 'all';
}

function formatPrice(raw?: string): string {
  const n = parseFloat(String(raw ?? '').replace(/\s/g, '').replace(',', '.'));
  if (!Number.isFinite(n)) return String(raw ?? '');
  return `${n.toLocaleString('ru-RU')} ₽`;
}

/**
 * Каталог прайса: только enabled placements + опубликованные услуги.
 * Не отдаёт «голые» Service без размещения на витрине.
 */
export async function getCatalogPricesHandler(req: Request, res: Response) {
  const tenant =
    (req.query.tenant as string) ||
    (req.headers['x-tenant-id'] as string) ||
    'spb';
  if (tenant !== 'spb') {
    return res.status(400).json({ error: 'Пока поддерживается только tenant=spb' });
  }

  const locale = 'ru-spb';
  const token = getStrapiToken();
  if (!token) {
    return res.status(503).json({ error: 'STRAPI_API_TOKEN not configured' });
  }

  const categorySlug = typeof req.query.category === 'string' ? req.query.category.trim() : '';
  const tabQms = typeof req.query.tab === 'string' ? req.query.tab.trim() : '';

  try {
    const base = getStrapiUrl().replace(/\/$/, '');
    const placements: StrapiPlacement[] = [];
    let page = 1;

    for (;;) {
      const qs = new URLSearchParams({
        locale,
        'filters[enabled][$eq]': 'true',
        'pagination[page]': String(page),
        'pagination[pageSize]': '100',
        publicationState: 'live',
        'populate[service][fields][0]': 'article',
        'populate[service][fields][1]': 'title',
        'populate[service][fields][2]': 'price',
        'populate[service][fields][3]': 'isProgram',
        'populate[service][fields][4]': 'summary',
        'populate[service][fields][5]': 'slug',
        'populate[category][fields][0]': 'title',
        'populate[category][fields][1]': 'slug',
        'populate[category][fields][2]': 'tabQms',
        'populate[category][fields][3]': 'expertIntro',
        'populate[category][fields][4]': 'aboutText',
        'populate[category][fields][5]': 'seoTitle',
        'populate[category][fields][6]': 'seoDescription',
        'populate[category][fields][7]': 'enabled',
      });
      if (tabQms) qs.set('filters[tabQms][$eq]', tabQms);
      if (categorySlug) qs.set('filters[category][slug][$eq]', categorySlug);

      const url = `${base}/api/service-placements?${qs}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        cache: 'no-store',
      });
      if (!response.ok) throw new Error(`Strapi ${response.status}`);
      const json = (await response.json()) as {
        data?: StrapiPlacement[];
        meta?: { pagination?: { pageCount?: number } };
      };
      placements.push(...(json.data ?? []));
      if (page >= (json.meta?.pagination?.pageCount ?? 1)) break;
      page += 1;
    }

    // Только опубликованные услуги с размещением
    const live = placements.filter((p) => p.service?.article && p.category?.slug);

    const categoryMap = new Map<
      string,
      {
        id: string;
        name: string;
        tabId: string;
        tabQms?: string;
        expertIntro?: string;
        aboutText?: string;
        seoTitle?: string;
        seoDescription?: string;
        items: Array<{
          id: string;
          article: string;
          name: string;
          price: string;
          sortOrder: number;
          isProgram?: boolean;
          summary?: string;
          slug?: string;
        }>;
      }
    >();

    for (const p of live) {
      const cat = p.category!;
      const svc = p.service!;
      const slug = String(cat.slug);
      if (!categoryMap.has(slug)) {
        categoryMap.set(slug, {
          id: slug,
          name: String(cat.title ?? slug),
          tabId: tabIdFromQms(p.tabQms ?? cat.tabQms),
          tabQms: p.tabQms ?? cat.tabQms,
          expertIntro: cat.expertIntro,
          aboutText: cat.aboutText,
          seoTitle: cat.seoTitle,
          seoDescription: cat.seoDescription,
          items: [],
        });
      }
      const bucket = categoryMap.get(slug)!;
      bucket.items.push({
        id: `${slug}:${svc.article}:${p.documentId}`,
        article: String(svc.article),
        name: String(svc.title ?? svc.article),
        price: formatPrice(svc.price),
        sortOrder: Number(p.sortOrder ?? 0),
        isProgram: Boolean(svc.isProgram),
        summary: svc.summary,
        slug: svc.slug,
      });
    }

    for (const cat of categoryMap.values()) {
      cat.items.sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, 'ru'));
    }

    const categories = [...categoryMap.values()].sort((a, b) =>
      a.name.localeCompare(b.name, 'ru'),
    );

    res.json({
      tenant,
      locale,
      placementCount: live.length,
      categoryCount: categories.length,
      tabs: Object.entries(TAB_LABELS).map(([id, label]) => ({ id, label })),
      categories,
    });
  } catch (error) {
    console.error('catalog/prices failed:', error);
    res.status(500).json({ error: 'Failed to fetch prices catalog' });
  }
}
