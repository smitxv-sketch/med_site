import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { TabQms } from '../../types/serviceSync.js';
import { toStrapiUidSlug } from '../../lib/strapiSlug.js';

const TAB_VALUES: TabQms[] = ['priem', 'diagnostika', 'programmy', 'lechenie'];

type TabMapFile = {
  auto?: Record<string, TabQms>;
  spbTabLegacy?: Record<string, TabQms>;
};

let cached: TabMapFile | null = null;

function loadTabMap(): TabMapFile {
  if (cached) return cached;
  const roots = [
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../docs/mappings/qms-section-to-tab.json'),
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../mappings/qms-section-to-tab.json'),
  ];
  for (const p of roots) {
    if (fs.existsSync(p)) {
      cached = JSON.parse(fs.readFileSync(p, 'utf8')) as TabMapFile;
      return cached;
    }
  }
  cached = {};
  return cached;
}

export function mapSpbLegacyTab(tab: string): TabQms | null {
  const key = tab?.trim();
  if (!key) return null;
  const hit = loadTabMap().spbTabLegacy?.[key];
  return hit && TAB_VALUES.includes(hit) ? hit : null;
}

export function mapQmsSectionVal(sectionVal: string): TabQms | null {
  const key = sectionVal?.trim();
  if (!key) return null;
  const hit = loadTabMap().auto?.[key];
  return hit && TAB_VALUES.includes(hit) ? hit : null;
}

/** ASCII-slug для Strapi (без кириллицы); известные рубрики — как на cispb.com */
export function categorySlug(name: string): string {
  const map: Record<string, string> = {
    Кардиология: 'kardiologiya',
    Гастроэнтерология: 'gastroenterologiya',
    'Частная поликлиника': 'poliklinika',
    Эндокринология: 'endokrinologiya',
    'Услуги по гинекологии': 'ginekologiya',
    'Комплексные программы': 'kompleksnye-programmy',
  };
  const trimmed = name.trim();
  if (map[trimmed]) return map[trimmed];
  return toStrapiUidSlug(trimmed);
}

export function categoryLegacyId(name: string): string {
  return `spb-cat:${name.trim()}`;
}

export function serviceLegacyId(article: string): string {
  return `spb-art:${article.trim()}`;
}

/** Одна строка pricelist_items2 → один placement */
export function placementLegacyId(article: string, category: string, tabLegacy: string): string {
  const a = article.trim();
  const c = category.trim();
  const t = tabLegacy.trim();
  return `spb-place:${a}:${c}:${t}`;
}
