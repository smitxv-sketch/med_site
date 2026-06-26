import type { Doctor } from '../../src/types.js';
import type { DoctorCanonical } from '../types/doctorCanonical.js';
import { makeStrapiDoctorSlug } from '../lib/strapiSlug.js';

const LOCALES = { chel: 'ru-chel', spb: 'ru-spb' } as const;

function parseMisId(raw?: string): string {
  if (!raw) return '';
  return String(raw).split(',')[0].trim();
}

function parseExperience(raw: string | number | undefined): number {
  const n = parseInt(String(raw ?? '').replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

/** WP REST / MODX → единый DoctorCanonical */
export function hydrateDoctorFromLegacy(
  doc: Doctor,
  source: 'chel' | 'spb',
): DoctorCanonical | null {
  const legacyId = String(doc.id);
  const misId = parseMisId(doc.qms_id);
  if (!misId) return null;

  const fullName = doc.pagetitle || 'Без имени';

  return {
    legacyId,
    legacySource: source,
    misId,
    fullName,
    specialty: doc.specialization || '',
    photoUrl: doc.photo || '',
    experienceYears: parseExperience(doc.experience),
    degree: doc.degree || doc.zvanie || '',
    category: doc.category || '',
    position: doc.position || '',
    slug: makeStrapiDoctorSlug(fullName, legacyId, source),
    locale: LOCALES[source],
  };
}

/** Payload для Strapi create/update */
export function doctorCanonicalToStrapiPayload(canonical: DoctorCanonical) {
  return {
    fullName: canonical.fullName,
    misId: canonical.misId,
    legacyId: canonical.legacyId,
    legacySource: canonical.legacySource,
    specialty: canonical.specialty,
    photoUrl: canonical.photoUrl,
    experienceYears: canonical.experienceYears,
    degree: canonical.degree,
    category: canonical.category,
    position: canonical.position,
    slug: canonical.slug,
    locale: canonical.locale,
  };
}
