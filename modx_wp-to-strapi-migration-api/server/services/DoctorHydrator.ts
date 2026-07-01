import type { Doctor } from '../../src/types.js';
import type { DoctorCanonical } from '../types/doctorCanonical.js';
import { makeStrapiDoctorSlug } from '../lib/strapiSlug.js';
import type { SsotIndex } from './specialtySsotLoader.js';
import {
  parseBoolMeta,
  resolveChelBranchLegacyIds,
  resolveChelSpecialtySlugs,
  resolveSpbSpecialtySlugs,
  normalizeSpecialtySlugs,
  inferSpecialtySlugsFromText,
  isChelDoctorEnabled,
} from './specialtySsotLoader.js';

const LOCALES = { chel: 'ru-chel', spb: 'ru-spb' } as const;

export type DoctorHydrationContext = {
  ssot: SsotIndex;
  spbSpecialtyMap: Map<string, string[]>;
};

function parseMisId(raw?: string): string {
  if (!raw) return '';
  return String(raw).split(',')[0].trim();
}

function parseExperience(raw: string | number | undefined): number {
  const n = parseInt(String(raw ?? '').replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

function asMeta(doc: Doctor): Record<string, unknown> {
  if (doc.raw_data && typeof doc.raw_data === 'object') return doc.raw_data as Record<string, unknown>;
  return {};
}

function pickPhoto(doc: Doctor, meta: Record<string, unknown>): string {
  const photo = doc.photo || String(meta.photo || '');
  const photoList = String(meta.photo_list || '');
  return photo || photoList || '';
}

function buildSeoTitle(fullName: string, specialty: string, raw: string): string {
  if (raw.trim()) return raw.trim();
  const spec = specialty.trim();
  return spec ? `${fullName} — ${spec} | Клиника «Источник»` : `${fullName} | Клиника «Источник»`;
}

/** WP REST / MODX → единый DoctorCanonical */
export function hydrateDoctorFromLegacy(
  doc: Doctor,
  source: 'chel' | 'spb',
  ctx: DoctorHydrationContext,
): DoctorCanonical | null {
  const legacyId = String(doc.id);
  const misId = parseMisId(doc.qms_id);
  if (!misId) return null;

  const fullName = doc.pagetitle || 'Без имени';
  const meta = asMeta(doc);

  if (source === 'chel' && !isChelDoctorEnabled(meta)) return null;

  const tvs = (doc.tvs || {}) as Record<string, string>;

  let specialtySlugs: string[] = [];
  let branchLegacyIds: string[] = [];

  if (source === 'chel') {
    specialtySlugs = resolveChelSpecialtySlugs(meta, ctx.ssot);
    if (!specialtySlugs.length) {
      specialtySlugs = inferSpecialtySlugsFromText(
        doc.specialization || String(meta.specialty || ''),
        ctx.ssot,
      );
    }
    branchLegacyIds = resolveChelBranchLegacyIds(meta);
  } else {
    const pageSlug = String(doc.alias || '').replace(/^doctor-/, '');
    specialtySlugs = normalizeSpecialtySlugs(
      resolveSpbSpecialtySlugs(ctx.spbSpecialtyMap, fullName, pageSlug),
      ctx.ssot,
    );
    if (!specialtySlugs.length) {
      specialtySlugs = inferSpecialtySlugsFromText(
        doc.specialization || String(tvs.specintro || ''),
        ctx.ssot,
      );
    }
    branchLegacyIds = ['spb-main'];
  }

  const specialtyText = doc.specialization || specialtySlugs.join(', ') || '';

  const seoTitleRaw =
    source === 'chel'
      ? String(meta.seo_title || '')
      : String(tvs.title || '');
  const seoDescRaw =
    source === 'chel'
      ? String(meta.seo_description || '')
      : String(tvs.des || '');

  return {
    legacyId,
    legacySource: source,
    misId,
    fullName,
    specialty: specialtyText,
    specialtySlugs,
    branchLegacyIds,
    photoUrl: pickPhoto(doc, meta),
    experienceYears: parseExperience(doc.experience),
    degree: doc.degree || '',
    category: doc.category || '',
    position: doc.position || '',
    zvanie: doc.zvanie || doc.rank || '',
    slug: makeStrapiDoctorSlug(fullName, legacyId, source),
    locale: LOCALES[source],
    regalia: source === 'chel' ? String(doc.anonce || meta.anonce || '') : '',
    activities: source === 'chel' ? String(doc.activities || meta.activities || '') : '',
    bio:
      source === 'chel'
        ? String(doc.description || '')
        : String(tvs.des || doc.description || ''),
    education:
      source === 'chel'
        ? String(doc.education || '')
        : [tvs.education, tvs.educationDop].filter(Boolean).join('\n\n'),
    extraEducation: source === 'chel' ? String(meta.extraeducation || '') : String(tvs.educationDop || ''),
    conferences: source === 'chel' ? String(meta.conferences || '') : String(tvs.conferences || ''),
    seoTitle: buildSeoTitle(fullName, specialtyText, seoTitleRaw),
    seoDescription: seoDescRaw,
    phone: source === 'chel' ? String(meta.phone || '') : String(tvs.tel || ''),
    sortOrder: source === 'chel' ? parseInt(String(meta.ord || '0'), 10) || 0 : 0,
    allowBooking: source === 'chel' ? parseBoolMeta(meta.signup ?? true) : true,
    isAdultDoctor:
      source === 'chel'
        ? parseBoolMeta(meta.feed_adultdoctor ?? doc.is_adult_doctor ?? true)
        : true,
    isChildDoctor:
      source === 'chel'
        ? parseBoolMeta(meta.feed_childdoctor ?? doc.is_child_doctor ?? false)
        : false,
  };
}

/** Payload для Strapi create/update (без relations) */
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
    zvanie: canonical.zvanie,
    slug: canonical.slug,
    locale: canonical.locale,
    regalia: canonical.regalia,
    activities: canonical.activities,
    bio: canonical.bio,
    education: canonical.education,
    extraEducation: canonical.extraEducation,
    conferences: canonical.conferences,
    seoTitle: canonical.seoTitle,
    seoDescription: canonical.seoDescription,
    phone: canonical.phone,
    sortOrder: canonical.sortOrder,
    allowBooking: canonical.allowBooking,
    isAdultDoctor: canonical.isAdultDoctor,
    isChildDoctor: canonical.isChildDoctor,
  };
}
