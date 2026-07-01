import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
};

function repoRoot() {
  return path.resolve(__dirname, '../../..');
}

/** Путь к JSON маппинга: в Docker /app/data/mappings, локально docs/mappings */
async function resolveMappingFile(name: string): Promise<string> {
  const candidates = [
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
    slug: row.slug,
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
    if (ssot.bySlug.has(raw)) {
      out.add(raw);
      continue;
    }
    const item = ssot.items.find(
      (i) => normKey(i.yandexName) === normKey(raw) || normKey(i.slug) === normKey(raw),
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

export async function loadBranchSeed(): Promise<BranchSeedRow[]> {
  const file = await resolveMappingFile('chel-branches-seed.json');
  return JSON.parse(await fs.readFile(file, 'utf8')) as BranchSeedRow[];
}

export function resolveChelSpecialtySlugs(
  rawMeta: Record<string, unknown>,
  ssot: SsotIndex,
): string[] {
  const ids = rawMeta.feed_spec;
  const list = Array.isArray(ids) ? ids : ids ? [ids] : [];
  const slugs = new Set<string>();
  for (const id of list) {
    const slug = ssot.byWpTermId.get(String(id));
    if (slug) slugs.add(slug);
  }
  return [...slugs];
}

export function resolveChelBranchLegacyIds(rawMeta: Record<string, unknown>): string[] {
  const clinics = rawMeta.clinics;
  const list = Array.isArray(clinics) ? clinics : clinics ? [clinics] : [];
  return list.map((id) => String(id)).filter(Boolean);
}

export function parseBoolMeta(val: unknown): boolean {
  return val === true || val === 1 || val === '1' || val === 'true';
}
