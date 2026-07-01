import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toStrapiUidSlug } from '../lib/strapiSlug.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export type SsotSpecialtyItem = {
  id: number;
  yandexName: string;
  slug: string;
  chelWpTermId: number | null;
  chelWpName: string | null;
};

export type SsotIndex = {
  items: SsotSpecialtyItem[];
  bySlug: Map<string, SsotSpecialtyItem>;
  byWpTermId: Map<string, string>;
};

export type SpbDoctorSpecialtyRow = {
  slug: string;
  fullName: string;
  ssotSlugs: string[];
};

export type BranchSeedRow = {
  legacyId: string;
  name: string;
  slug: string;
  city: 'chel' | 'spb';
  address?: string;
  /** WP post_type=clinics — направления внутри филиала, не отдельные Branch в Strapi */
  wpClinicAliasIds?: string[];
};

function repoRoot() {
  return path.resolve(__dirname, '../../..');
}

/** Путь к JSON маппинга: в Docker /app/server/mappings, локально docs/mappings */
async function resolveMappingFile(name: string): Promise<string> {
  const candidates = [
    path.join(__dirname, '../mappings', name),
    path.join(__dirname, '../../data/mappings', name),
    path.join(repoRoot(), 'docs/mappings', name),
  ];
  for (const file of candidates) {
    try {
      await fs.access(file);
      return file;
    } catch {
      /* try next */
    }
  }
  throw new Error(`Mapping file not found: ${name}`);
}

/** Загрузка specialty-ssot.json (генерируется scripts/build-specialty-merge-csv.mjs) */
export async function loadSsotIndex(): Promise<SsotIndex> {
  const file = await resolveMappingFile('specialty-ssot.json');
  const raw = JSON.parse(await fs.readFile(file, 'utf8')) as {
    items: Array<{
      yandexName: string;
      slug: string;
      chelWpTermId: number | null;
      chelWpName: string | null;
      id: number;
    }>;
  };

  const items: SsotSpecialtyItem[] = raw.items.map((row) => ({
    id: row.id,
    yandexName: row.yandexName,
    // Strapi UID — только латиница; всегда из yandexName (JSON мог содержать кириллицу из WP)
    slug: toStrapiUidSlug(row.yandexName),
    chelWpTermId: row.chelWpTermId,
    chelWpName: row.chelWpName,
  }));

  const bySlug = new Map(items.map((i) => [i.slug, i]));
  const byWpTermId = new Map<string, string>();
  for (const item of items) {
    if (item.chelWpTermId != null) {
      byWpTermId.set(String(item.chelWpTermId), item.slug);
    }
  }

  return { items, bySlug, byWpTermId };
}

const normKey = (s: string) =>
  String(s || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .trim();

/** Приводит slug/название из маппинга СПб к каноническому slug из SSOT */
export function normalizeSpecialtySlugs(slugs: string[], ssot: SsotIndex): string[] {
  const out = new Set<string>();
  for (const raw of slugs) {
    const candidates = [raw, toStrapiUidSlug(raw)];
    let matched = false;
    for (const key of candidates) {
      if (ssot.bySlug.has(key)) {
        out.add(key);
        matched = true;
        break;
      }
    }
    if (matched) continue;
    const item = ssot.items.find(
      (i) =>
        normKey(i.yandexName) === normKey(raw) ||
        normKey(i.slug) === normKey(raw) ||
        i.slug === toStrapiUidSlug(raw),
    );
    if (item) out.add(item.slug);
  }
  return [...out];
}

/** Маппинг врачей СПб → ssot slug */
export async function loadSpbDoctorSpecialtyMap(): Promise<Map<string, string[]>> {
  const file = await resolveMappingFile('spb-doctor-specialty-map.json');
  const raw = JSON.parse(await fs.readFile(file, 'utf8')) as {
    doctors: SpbDoctorSpecialtyRow[];
  };

  const norm = (s: string) =>
    String(s || '')
      .toLowerCase()
      .replace(/ё/g, 'е')
      .trim();

  const combined = new Map<string, string[]>();
  for (const row of raw.doctors) {
    combined.set(`name:${norm(row.fullName)}`, row.ssotSlugs);
    combined.set(`slug:${row.slug}`, row.ssotSlugs);
  }
  return combined;
}

export function resolveSpbSpecialtySlugs(
  map: Map<string, string[]>,
  fullName: string,
  pageSlug: string,
): string[] {
  const norm = (s: string) =>
    String(s || '')
      .toLowerCase()
      .replace(/ё/g, 'е')
      .trim();
  return (
    map.get(`name:${norm(fullName)}`) ||
    map.get(`slug:${pageSlug}`) ||
    []
  );
}

/** WP speclist term_id вне словаря Яндекс → slug SSOT */
const CHEL_WP_TERM_EXTRA: Record<string, string> = {
  '1296': 'lor', // оториноларинголог → лор (отоларинголог)
  '1297': 'oftalmolog', // офтальмолог → офтальмолог (окулист)
};

/** Извлечь SSOT slug из свободного текста специальности (fallback без feed_spec) */
export function inferSpecialtySlugsFromText(text: string, ssot: SsotIndex): string[] {
  const n = normKey(text);
  if (!n) return [];
  const found: string[] = [];
  const sorted = [...ssot.items].sort(
    (a, b) => b.yandexName.length - a.yandexName.length,
  );
  for (const item of sorted) {
    const yn = normKey(item.yandexName.replace(/\s*\([^)]*\)\s*/g, ' '));
    if (yn.length < 4) continue;
    if (n.includes(yn)) found.push(item.slug);
  }
  return [...new Set(found)];
}

export function isChelDoctorEnabled(rawMeta: Record<string, unknown>): boolean {
  const val = rawMeta.enabled;
  if (val === undefined || val === null || val === '') return true;
  return val === true || val === 1 || val === '1' || val === 'true';
}

export async function loadBranchSeed(): Promise<BranchSeedRow[]> {
  const file = await resolveMappingFile('chel-branches-seed.json');
  return JSON.parse(await fs.readFile(file, 'utf8')) as BranchSeedRow[];
}

/** WP clinics ID → legacyId филиала (245 ЭКО, 246 косметология → 242 Подсолнухи) */
export function buildBranchWpAliasIndex(seeds: BranchSeedRow[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const row of seeds) {
    for (const alias of row.wpClinicAliasIds ?? []) {
      map.set(String(alias), row.legacyId);
    }
  }
  return map;
}

export function resolveChelSpecialtySlugs(
  rawMeta: Record<string, unknown>,
  ssot: SsotIndex,
): string[] {
  const ids = rawMeta.feed_spec;
  const list = Array.isArray(ids) ? ids : ids ? [ids] : [];
  const slugs = new Set<string>();
  for (const id of list) {
    const key = String(id);
    const slug = ssot.byWpTermId.get(key) ?? CHEL_WP_TERM_EXTRA[key];
    if (slug && ssot.bySlug.has(slug)) slugs.add(slug);
  }
  return [...slugs];
}

export function resolveChelBranchLegacyIds(
  rawMeta: Record<string, unknown>,
  wpAliasIndex?: Map<string, string>,
): string[] {
  const clinics = rawMeta.clinics;
  const list = Array.isArray(clinics) ? clinics : clinics ? [clinics] : [];
  const ids = list
    .map((id) => {
      const key = String(id);
      return wpAliasIndex?.get(key) ?? key;
    })
    .filter(Boolean);
  return [...new Set(ids)];
}

export function parseBoolMeta(val: unknown): boolean {
  return val === true || val === 1 || val === '1' || val === 'true';
}
