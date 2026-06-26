import { StrapiClient } from './strapiClient.js';
import { getChelDoctors } from './wpService.js';
import {
  getSyncMap,
  logSyncEvent,
  updateSyncMap,
  generateHash,
} from './syncWorker.js';

export type SyncReport = {
  entity: string;
  created: number;
  updated: number;
  skipped: number;
  errors: Array<{ legacyId: string; message: string }>;
};

const CITY = 'chelyabinsk';
const LOCALE = 'ru-chel';

function slugify(name: string, legacyId: string) {
  const base = name
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
  return base ? `${base}-${legacyId}` : `doctor-${legacyId}`;
}

/** Безопасные поля — обновляются при повторном синке */
const SAFE_DOCTOR_FIELDS = [
  'fullName',
  'misId',
  'specialty',
  'photoUrl',
  'experienceYears',
  'degree',
  'category',
  'position',
] as const;

export async function syncChelDoctors(client: StrapiClient): Promise<SyncReport> {
  const report: SyncReport = {
    entity: 'doctor',
    created: 0,
    updated: 0,
    skipped: 0,
    errors: [],
  };

  const legacyDoctors = await getChelDoctors();

  for (const doc of legacyDoctors) {
    const legacyId = String(doc.id);
    const misId = doc.qms_id ? String(doc.qms_id).split(',')[0].trim() : '';

    if (!misId) {
      report.skipped += 1;
      continue;
    }

    const safePayload = {
      fullName: doc.pagetitle || 'Без имени',
      misId,
      legacyId,
      legacySource: 'chel' as const,
      specialty: doc.specialization || '',
      photoUrl: doc.photo || '',
      experienceYears: Number(doc.experience) || 0,
      degree: doc.degree || doc.zvanie || '',
      category: doc.category || '',
      position: doc.position || '',
      slug: slugify(doc.pagetitle || 'doctor', legacyId),
      locale: LOCALE,
    };

    try {
      const existing = await client.findByLegacyId('doctors', legacyId, LOCALE);
      const hash = generateHash(safePayload);

      if (!existing) {
        await client.createEntry('doctors', {
          ...safePayload,
          publishedAt: new Date().toISOString(),
        });
        const created = await client.findByLegacyId('doctors', legacyId, LOCALE);
        if (created?.documentId) {
          await updateSyncMap(CITY, 'doctor', legacyId, String(created.documentId), hash);
        }
        report.created += 1;
        continue;
      }

      if (existing.contentLocked) {
        report.skipped += 1;
        continue;
      }

      const mapRow = await getSyncMap(CITY, 'doctor', legacyId);
      if (mapRow?.data_hash === hash) {
        report.skipped += 1;
        continue;
      }

      const patch: Record<string, unknown> = {};
      for (const key of SAFE_DOCTOR_FIELDS) {
        patch[key] = safePayload[key];
      }

      await client.updateEntry('doctors', existing.documentId, patch);
      await updateSyncMap(CITY, 'doctor', legacyId, existing.documentId, hash);
      report.updated += 1;
    } catch (e) {
      report.errors.push({
        legacyId,
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  return report;
}
