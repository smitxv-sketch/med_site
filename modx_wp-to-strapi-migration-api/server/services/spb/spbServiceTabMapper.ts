import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { TabQms } from '../../types/serviceSync.js';

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

export function categorySlug(name: string): string {
  const map: Record<string, string> = {
    Кардиология: 'kardiologiya',
  };
  const trimmed = name.trim();
  if (map[trimmed]) return map[trimmed];
  return trimmed
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9а-яё-]/gi, '')
    .slice(0, 80);
}

export function categoryLegacyId(name: string): string {
  return `spb-cat:${name.trim()}`;
}

export function serviceLegacyId(article: string): string {
  return `spb-art:${article.trim()}`;
}
