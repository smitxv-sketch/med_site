import type { StrapiClient } from './strapiClient.js';
import { loadBranchSeed, loadSsotIndex } from './specialtySsotLoader.js';

export type CatalogSyncReport = {
  specialties: { created: number; updated: number; skipped: number };
  branches: { created: number; updated: number; skipped: number; archived: number };
};

/** Идемпотентный seed справочника Specialty из specialty-ssot.json */
export async function syncSpecialtiesCatalog(client: StrapiClient): Promise<CatalogSyncReport['specialties']> {
  const ssot = await loadSsotIndex();
  const report = { created: 0, updated: 0, skipped: 0 };

  for (const item of ssot.items) {
    const title =
      item.chelWpName ||
      item.yandexName.charAt(0).toUpperCase() + item.yandexName.slice(1);
    const payload = {
      title,
      slug: item.slug,
      yandexName: item.yandexName,
      chelWpTermId: item.chelWpTermId ?? undefined,
    };

    const existing = await client.findBySlug('specialties', item.slug);
    if (!existing) {
      await client.createEntry('specialties', {
        ...payload,
        publishedAt: new Date().toISOString(),
      });
      report.created += 1;
      continue;
    }

    await client.updateEntry('specialties', existing.documentId, payload);
    report.updated += 1;
  }

  return report;
}

/** Seed филиалов ЧЛБ + тех. филиал СПб */
export async function syncBranchesCatalog(client: StrapiClient): Promise<CatalogSyncReport['branches']> {
  const seeds = await loadBranchSeed();
  const report = { created: 0, updated: 0, skipped: 0, archived: 0 };
  const seedLegacyIds = new Set(seeds.map((row) => row.legacyId));

  for (const row of seeds) {
    const payload = {
      name: row.name,
      slug: row.slug,
      city: row.city,
      legacyId: row.legacyId,
      address: row.address || undefined,
    };

    const existing = await client.findByLegacyId('branches', row.legacyId);
    if (!existing) {
      await client.createEntry('branches', {
        ...payload,
        publishedAt: new Date().toISOString(),
      });
      report.created += 1;
      continue;
    }

    await client.updateEntry('branches', existing.documentId, payload);
    report.updated += 1;
  }

  // Снять с публикации устаревшие филиалы (245 ЭКО, 246 косметология → алиасы 242)
  const allBranches = await client.listAll('branches', { pageSize: 50 });
  for (const row of allBranches) {
    const legacyId = String(row.legacyId || '');
    if (!legacyId || seedLegacyIds.has(legacyId)) continue;
    try {
      await client.deleteEntry('branches', row.documentId);
      report.archived += 1;
    } catch (e) {
      console.warn('[syncBranchesCatalog] failed to delete orphan branch', legacyId, e);
    }
  }

  return report;
}

/** Кэш slug → documentId для relations */
export async function buildSpecialtySlugIndex(client: StrapiClient): Promise<Map<string, string>> {
  const rows = await client.listAll('specialties', { pageSize: 200 });
  const map = new Map<string, string>();
  for (const row of rows) {
    const slug = String(row.slug || '');
    if (slug) map.set(slug, row.documentId);
  }
  return map;
}

export async function buildBranchLegacyIndex(client: StrapiClient): Promise<Map<string, string>> {
  const rows = await client.listAll('branches', { pageSize: 50 });
  const map = new Map<string, string>();
  for (const row of rows) {
    const legacyId = String(row.legacyId || '');
    if (legacyId) map.set(legacyId, row.documentId);
  }
  return map;
}

export function slugsToDocumentIds(slugs: string[], index: Map<string, string>): string[] {
  const ids: string[] = [];
  for (const slug of slugs) {
    const id = index.get(slug);
    if (id) ids.push(id);
  }
  return [...new Set(ids)];
}

export async function syncReferenceCatalogs(client: StrapiClient): Promise<CatalogSyncReport> {
  const specialties = await syncSpecialtiesCatalog(client);
  const branches = await syncBranchesCatalog(client);
  return { specialties, branches };
}
