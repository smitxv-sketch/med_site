/**
 * SSOT: каноническая модель врача для синка → Strapi Doctor.
 * @see docs/SYNC_DOCTORS_SPEC.md
 */
export type DoctorCanonical = {
  legacyId: string;
  legacySource: 'chel' | 'spb';
  misId: string;
  fullName: string;
  /** Текстовая специальность с legacy (для карточки / fallback) */
  specialty: string;
  /** Slug из справочника Specialty (SSOT Яндекс) */
  specialtySlugs: string[];
  /** legacyId филиалов (post clinics ЧЛБ или spb-main) */
  branchLegacyIds: string[];
  photoUrl: string;
  experienceYears: number;
  degree: string;
  category: string;
  position: string;
  zvanie: string;
  slug: string;
  locale: string;
  regalia: string;
  activities: string;
  bio: string;
  education: string;
  extraEducation: string;
  conferences: string;
  seoTitle: string;
  seoDescription: string;
  phone: string;
  sortOrder: number;
  allowBooking: boolean;
  isAdultDoctor: boolean;
  isChildDoctor: boolean;
};

export type SyncReport = {
  entity: string;
  created: number;
  updated: number;
  skipped: number;
  errors: Array<{ legacyId: string; message: string }>;
};

/** Поля, обновляемые при каждом safe-синке */
export const SAFE_DOCTOR_FIELDS = [
  'fullName',
  'misId',
  /** Чинит записи с пустым slug после раннего синка */
  'slug',
  'specialty',
  'photoUrl',
  'experienceYears',
  'degree',
  'category',
  'position',
  'zvanie',
  'seoTitle',
  'seoDescription',
  'phone',
  'sortOrder',
  'allowBooking',
  'isAdultDoctor',
  'isChildDoctor',
] as const;

/** Импорт один раз при создании (если не contentLocked) */
export const IMPORT_ONCE_DOCTOR_FIELDS = [
  'regalia',
  'activities',
  'bio',
  'education',
  'extraEducation',
  'conferences',
] as const;
