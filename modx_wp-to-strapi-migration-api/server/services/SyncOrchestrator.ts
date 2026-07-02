import { StrapiClient } from './strapiClient.js';
import { getChelDoctors } from './wpService.js';
import { getSpbDoctorsForSync } from './spbDoctorSource.js';
import {
  doctorCanonicalToStrapiPayload,
  hydrateDoctorFromLegacy,
  type DoctorHydrationContext,
} from './DoctorHydrator.js';
import {
  generateHash,
  getSyncMap,
  updateSyncMap,
  startSyncRun,
  finishSyncRun,
} from './syncWorker.js';
import type { DoctorCanonical, SyncReport } from '../types/doctorCanonical.js';
import {
  SAFE_DOCTOR_FIELDS,
} from '../types/doctorCanonical.js';
import { withSyncMutex } from '../lib/syncMutex.js';
import { LEGACY_DB_GUARD } from '../config/legacyDbGuard.js';
import {
  buildBranchLegacyIndex,
  buildSpecialtySlugIndex,
  slugsToDocumentIds,
  syncReferenceCatalogs,
} from './syncCatalogs.js';
import {
  loadSpbDoctorSpecialtyMap,
  loadSpbDoctorQmsMap,
  loadSsotIndex,
  loadBranchSeed,
  buildBranchWpAliasIndex,
} from './specialtySsotLoader.js';

export type SyncCity = 'chel' | 'spb';

const CITY_KEYS: Record<SyncCity, string> = {
  chel: 'chelyabinsk',
  spb: 'spb',
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

async function loadLegacyDoctors(city: SyncCity) {
  if (city === 'chel') return getChelDoctors();
  return getSpbDoctorsForSync();
}

type RelationIndexes = {
  specialtyBySlug: Map<string, string>;
  branchByLegacyId: Map<string, string>;
};

function branchIdsForCanonical(
  canonical: DoctorCanonical,
  branchIndex: Map<string, string>,
): string[] {
  const ids: string[] = [];
  for (const legacyId of canonical.branchLegacyIds) {
    const docId = branchIndex.get(legacyId);
    if (docId) ids.push(docId);
  }
  return [...new Set(ids)];
}

async function applyDoctorRelations(
  client: StrapiClient,
  documentId: string,
  canonical: DoctorCanonical,
  indexes: RelationIndexes,
): Promise<void> {
  const specialtyIds = slugsToDocumentIds(canonical.specialtySlugs, indexes.specialtyBySlug);
  const branchIds = branchIdsForCanonical(canonical, indexes.branchByLegacyId);

  await client.setRelations(
    'doctors',
    documentId,
    {
      specialties: specialtyIds,
      branches: branchIds,
    },
    canonical.locale,
  );
}

async function upsertOneDoctor(
  client: StrapiClient,
  city: SyncCity,
  canonical: DoctorCanonical,
  report: SyncReport,
  indexes: RelationIndexes,
): Promise<void> {
  const cityKey = CITY_KEYS[city];
  const payload = doctorCanonicalToStrapiPayload(canonical);
  const safePayload = { ...payload };
  delete (safePayload as { locale?: string }).locale;

  const existing = await client.findByLegacyId('doctors', canonical.legacyId, canonical.locale);
  const hash = generateHash({
    ...safePayload,
    specialtySlugs: canonical.specialtySlugs,
    branchLegacyIds: canonical.branchLegacyIds,
  });

  if (!existing) {
    await client.createEntry('doctors', {
      ...safePayload,
      locale: canonical.locale,
      publishedAt: new Date().toISOString(),
    });
    const created = await client.findByLegacyId('doctors', canonical.legacyId, canonical.locale);
    if (created?.documentId) {
      await applyDoctorRelations(client, created.documentId, canonical, indexes);
      await updateSyncMap(cityKey, 'doctor', canonical.legacyId, String(created.documentId), hash);
    }
    report.created += 1;
    return;
  }

  if (existing.contentLocked) {
    report.skipped += 1;
    return;
  }

  const mapRow = await getSyncMap(cityKey, 'doctor', canonical.legacyId);
  if (mapRow?.data_hash === hash) {
    report.skipped += 1;
    return;
  }

  const patch: Record<string, unknown> = {};
  for (const key of SAFE_DOCTOR_FIELDS) {
    patch[key] = safePayload[key as keyof typeof safePayload];
  }

  await client.updateEntry('doctors', existing.documentId, {
    ...patch,
    locale: canonical.locale,
  });
  await applyDoctorRelations(client, existing.documentId, canonical, indexes);
  await updateSyncMap(cityKey, 'doctor', canonical.legacyId, existing.documentId, hash);
  report.updated += 1;
}

/**
 * SSOT оркестратор синка врачей: справочники → mutex → upsert + relations.
 */
export async function runDoctorSync(
  city: SyncCity,
  client: StrapiClient,
): Promise<SyncReport & { catalogs?: Awaited<ReturnType<typeof syncReferenceCatalogs>> }> {
  return withSyncMutex(`doctors:${city}`, async () => {
    const runId = await startSyncRun(CITY_KEYS[city], 'doctor', 'full');
    const report: SyncReport = {
      entity: 'doctor',
      created: 0,
      updated: 0,
      skipped: 0,
      errors: [],
    };

    try {
      const catalogs = await syncReferenceCatalogs(client);
      const [ssot, spbSpecialtyMap, spbQmsMap, branchSeeds] = await Promise.all([
        loadSsotIndex(),
        loadSpbDoctorSpecialtyMap(),
        city === 'spb' ? loadSpbDoctorQmsMap() : Promise.resolve(new Map()),
        loadBranchSeed(),
      ]);
      const hydrationCtx: DoctorHydrationContext = {
        ssot,
        spbSpecialtyMap,
        spbQmsMap,
        branchWpAliasIndex: buildBranchWpAliasIndex(branchSeeds),
      };

      const indexes: RelationIndexes = {
        specialtyBySlug: await buildSpecialtySlugIndex(client),
        branchByLegacyId: await buildBranchLegacyIndex(client),
      };

      const legacyDoctors = await loadLegacyDoctors(city);

      for (const doc of legacyDoctors) {
        const canonical = hydrateDoctorFromLegacy(doc, city, hydrationCtx);
        if (!canonical) {
          report.skipped += 1;
          continue;
        }

        try {
          await upsertOneDoctor(client, city, canonical, report, indexes);
          await sleep(LEGACY_DB_GUARD.syncUpsertDelayMs);
        } catch (e) {
          report.errors.push({
            legacyId: canonical.legacyId,
            message: e instanceof Error ? e.message : String(e),
          });
        }
      }

      await finishSyncRun(runId, 'success', report);
      return { ...report, catalogs };
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      await finishSyncRun(runId, 'error', report, message);
      throw e;
    }
  });
}
