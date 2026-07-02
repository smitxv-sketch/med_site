import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  PriceCatalogDto,
  PriceCatalogTabDto,
  PriceQuickNavDto,
  PriceTabId,
} from '@med-site/contracts';
import { getStrapiToken, getStrapiUrl } from '../config/env.js';

type StrapiPlacement = {
  documentId?: string;
  enabled?: boolean;
  sortOrder?: number;
  tabQms?: string;
  service?: {
    documentId?: string;
    article?: string;
    title?: string;
    price?: string;
    isProgram?: boolean;
    summary?: string;
    slug?: string;
    legacyOnly?: boolean;
  };
  category?: {
    title?: string;
    slug?: string;
    tabQms?: string;
    expertIntro?: string;
    aboutText?: string;
    seoTitle?: string;
    seoDescription?: string;
  };
};

const TAB_QMS_TO_ID: Record<string, PriceTabId> = {
  priem: 'consultation',
  diagnostika: 'diagnostics',
  programmy: 'programs',
  lechenie: 'treatment',
};

function tabIdFromQms(tabQms?: string): PriceTabId {
  if (!tabQms) return 'all';
  return TAB_QMS_TO_ID[tabQms] ?? 'all';
}

function formatPrice(raw?: string): string {
  const n = parseFloat(String(raw ?? '').replace(/\s/g, '').replace(',', '.'));
  if (!Number.isFinite(n)) return String(raw ?? '').trim();
  return `${n.toLocaleString('ru-RU')} ₽`;
}

function loadJsonConfig<T>(filename: string): T {
  const roots = [
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../config'),
    path.resolve(process.cwd(), 'apps/bff/config'),
  ];
  for (const root of roots) {
    const p = path.join(root, filename);
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8')) as T;
  }
  return {} as T;
}

function loadTabs(): PriceCatalogTabDto[] {
  const raw = loadJsonConfig<{ tabs?: PriceCatalogTabDto[] }>('priceCatalogTabs.json');
  return raw.tabs?.length
    ? raw.tabs
    : [
        { id: 'all', label: 'Все услуги' },
        { id: 'consultation', label: 'Приём врачей', tabQms: 'priem' },
      ];
}

function loadQuickNav(tenant: string): PriceQuickNavDto[] {
  const raw = loadJsonConfig<{ shortcuts?: PriceQuickNavDto[] }>(`pricesQuickNav.${tenant}.json`);
  return raw.shortcuts ?? [];
}

type CategoryContentFields = {
  expertIntro?: string;
  aboutText?: string;
  aboutHeader?: string;
  seoTitle?: string;
  seoDescription?: string;
};

/** Дочерние рубрики без текста → подставляем контент родителя на витрине */
function loadCategoryContentParents(): Map<string, string> {
  const raw = loadJsonConfig<Record<string, string>>('spbCategoryContentParents.json');
  const out = new Map<string, string>();
  for (const [child, parent] of Object.entries(raw)) {
    if (child.startsWith('_')) continue;
    const c = child.trim();
    const p = String(parent ?? '').trim();
    if (c && p) out.set(c, p);
  }
  return out;
}

function applyInheritedCategoryContent(
  categories: Array<PriceCatalogDto['categories'][number]>,
): void {
  const parents = loadCategoryContentParents();
  if (!parents.size) return;

  const byName = new Map(categories.map((c) => [c.name, c]));
  const pickFields = (src: CategoryContentFields): CategoryContentFields => ({
    expertIntro: src.expertIntro,
    aboutText: src.aboutText,
    aboutHeader: src.aboutHeader,
    seoTitle: src.seoTitle,
    seoDescription: src.seoDescription,
  });

  for (const [childName, parentName] of parents) {
    const child = byName.get(childName);
    const parent = byName.get(parentName);
    if (!child || !parent) continue;

    const src = pickFields(parent);
    if (!String(child.expertIntro ?? '').trim() && src.expertIntro) {
      child.expertIntro = src.expertIntro;
    }
    if (!String(child.aboutText ?? '').trim() && src.aboutText) {
      child.aboutText = src.aboutText;
    }
    if (!String(child.aboutHeader ?? '').trim() && src.aboutHeader) {
      child.aboutHeader = src.aboutHeader;
    }
    if (!String(child.seoTitle ?? '').trim() && src.seoTitle) {
      child.seoTitle = src.seoTitle;
    }
    if (!String(child.seoDescription ?? '').trim() && src.seoDescription) {
      child.seoDescription = src.seoDescription;
    }
  }
}

async function fetchPlacements(opts: {
  locale: string;
  categorySlug?: string;
  tabQms?: string;
}): Promise<StrapiPlacement[]> {
  const token = getStrapiToken();
  const base = getStrapiUrl().replace(/\/$/, '');
  const out: StrapiPlacement[] = [];
  let page = 1;

  for (;;) {
    const qs = new URLSearchParams({
      locale: opts.locale,
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
      'populate[service][fields][6]': 'legacyOnly',
      'populate[category][fields][0]': 'title',
      'populate[category][fields][1]': 'slug',
      'populate[category][fields][2]': 'tabQms',
      'populate[category][fields][3]': 'expertIntro',
      'populate[category][fields][4]': 'aboutText',
      'populate[category][fields][5]': 'seoTitle',
      'populate[category][fields][6]': 'seoDescription',
    });
    if (opts.tabQms) qs.set('filters[tabQms][$eq]', opts.tabQms);
    if (opts.categorySlug) qs.set('filters[category][slug][$eq]', opts.categorySlug);

    const res = await fetch(`${base}/api/service-placements?${qs}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Strapi placements ${res.status}`);
    const json = (await res.json()) as {
      data?: StrapiPlacement[];
      meta?: { pagination?: { pageCount?: number } };
    };
    out.push(...(json.data ?? []));
    if (page >= (json.meta?.pagination?.pageCount ?? 1)) break;
    page += 1;
  }
  return out;
}

/** Собрать каталог: placements → рубрики; дедуп артикула внутри рубрики */
export async function buildPriceCatalog(opts: {
  tenant: string;
  locale: string;
  categorySlug?: string;
  tabQms?: string;
}): Promise<PriceCatalogDto> {
  const placements = await fetchPlacements({
    locale: opts.locale,
    categorySlug: opts.categorySlug,
    tabQms: opts.tabQms,
  });

  const live = placements.filter((p) => p.service?.article && p.category?.slug);

  type CatBucket = PriceCatalogDto['categories'][number] & {
    itemKeys: Map<string, PriceCatalogDto['categories'][number]['items'][number]>;
  };

  const categoryMap = new Map<string, CatBucket>();

  for (const p of live) {
    const cat = p.category!;
    const svc = p.service!;
    const slug = String(cat.slug);
    const article = String(svc.article);
    const sortOrder = Number(p.sortOrder ?? 0);

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
        itemKeys: new Map(),
      });
    }

    const bucket = categoryMap.get(slug)!;
    const existing = bucket.itemKeys.get(article);
    const item = {
      id: `${slug}:${article}`,
      article,
      name: String(svc.title ?? article),
      price: formatPrice(svc.price),
      sortOrder,
      isProgram: Boolean(svc.isProgram),
      summary: svc.summary,
      slug: svc.slug,
      legacyOnly: Boolean(svc.legacyOnly),
    };

    // Один артикул в рубрике — одна строка (разные вкладки/дубли placement)
    if (!existing || sortOrder < existing.sortOrder) {
      bucket.itemKeys.set(article, item);
    }
  }

  const categories = [...categoryMap.values()]
    .map(({ itemKeys, ...cat }) => ({
      ...cat,
      items: [...itemKeys.values()].sort(
        (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, 'ru'),
      ),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  if (opts.tenant === 'spb') applyInheritedCategoryContent(categories);

  return {
    tenant: opts.tenant,
    locale: opts.locale,
    placementCount: live.length,
    categoryCount: categories.length,
    tabs: loadTabs(),
    quickNav: loadQuickNav(opts.tenant),
    categories,
  };
}

export function resolveTenantLocale(tenant: string): { locale: string } | null {
  if (tenant === 'spb') return { locale: 'ru-spb' };
  return null;
}
