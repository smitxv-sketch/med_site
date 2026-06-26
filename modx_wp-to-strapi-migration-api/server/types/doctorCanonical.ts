/**
 * SSOT: каноническая модель врача для синка → Strapi Doctor.
 * @see docs/SYNC_DOCTORS_SPEC.md
 */
export type DoctorCanonical = {
  legacyId: string;
  legacySource: 'chel' | 'spb';
  misId: string;
  fullName: string;
  specialty: string;
  photoUrl: string;
  experienceYears: number;
  degree: string;
  category: string;
  position: string;
  slug: string;
  locale: string;
};

export type SyncReport = {
  entity: string;
  created: number;
  updated: number;
  skipped: number;
  errors: Array<{ legacyId: string; message: string }>;
};

export const SAFE_DOCTOR_FIELDS = [
  'fullName',
  'misId',
  'specialty',
  'photoUrl',
  'experienceYears',
  'degree',
  'category',
  'position',
] as const;
