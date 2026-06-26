import { StrapiClient } from './strapiClient.js';
import { getChelDoctors } from './wpService.js';
import { getSpbDoctorsForSync } from './spbDoctorSource.js';
import {
  doctorCanonicalToStrapiPayload,
  hydrateDoctorFromLegacy,
} from './DoctorHydrator.js';
import {
  generateHash,
  getSyncMap,
  updateSyncMap,
  startSyncRun,
  finishSyncRun,
} from './syncWorker.js';
import type { DoctorCanonical, SyncReport } from '../types/doctorCanonical.js';
import { SAFE_DOCTOR_FIELDS as SAFE_FIELDS } from '../types/doctorCanonical.js';
import { withSyncMutex } from '../lib/syncMutex.js';
import { LEGACY_DB_GUARD } from '../config/legacyDbGuard.js';

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

async function upsertOneDoctor(
  client: StrapiClient,
  city: SyncCity,
  canonical: DoctorCanonical,
  report: SyncReport,
): Promise<void> {
  const cityKey = CITY_KEYS[city];
  const payload = doctorCanonicalToStrapiPayload(canonical);
  const safePayload = { ...payload };
  delete (safePayload as { locale?: string }).locale;

  const existing = await client.findByLegacyId('doctors', canonical.legacyId, canonical.locale);
  const hash = generateHash(safePayload);

  if (!existing) {
    await client.createEntry('doctors', {
      ...safePayload,
      locale: canonical.locale,
      publishedAt: new Date().toISOString(),
    });
    const created = await client.findByLegacyId('doctors', canonical.legacyId, canonical.locale);
    if (created?.documentId) {
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
  for (const key of SAFE_FIELDS) {
    patch[key] = safePayload[key as keyof typeof safePayload];
  }

  await client.updateEntry('doctors', existing.documentId, patch);
  await updateSyncMap(cityKey, 'doctor', canonical.legacyId, existing.documentId, hash);
  report.updated += 1;
}

/**
 * SSOT оркестратор синка врачей: mutex, sync_runs, паузы между upsert.
 */
export async function runDoctorSync(
  city: SyncCity,
  client: StrapiClient,
): Promise<SyncReport> {
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
      const legacyDoctors = await loadLegacyDoctors(city);

      for (const doc of legacyDoctors) {
        const canonical = hydrateDoctorFromLegacy(doc, city);
        if (!canonical) {
          report.skipped += 1;
          continue;
        }

        try {
          await upsertOneDoctor(client, city, canonical, report);
          await sleep(LEGACY_DB_GUARD.syncUpsertDelayMs);
        } catch (e) {
          report.errors.push({
            legacyId: canonical.legacyId,
            message: e instanceof Error ? e.message : String(e),
          });
        }
      }

      await finishSyncRun(runId, 'success', report);
      return report;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      await finishSyncRun(runId, 'error', report, message);
      throw e;
    }
  });
}
