import type { MisDoctor } from './interfaces/MisDriver.js';
import { getWpDoctors } from './wpService.js';
import { getStrapiToken, getStrapiUrl } from '../config/env.js';

type CatalogDoctor = {
  misId?: string | null;
  fullName?: string;
  specialty?: string | null;
  photoUrl?: string | null;
  experienceYears?: number | null;
  degree?: string | null;
  category?: string | null;
  legacyId?: string | null;
};

async function loadStrapiCatalogDoctors(city: string): Promise<CatalogDoctor[]> {
  const token = getStrapiToken();
  if (!token) return [];
  const locale = city === 'spb' ? 'ru-spb' : 'ru-chel';
  const base = getStrapiUrl().replace(/\/$/, '');
  const qs = new URLSearchParams({
    locale,
    'filters[legacySource][$eq]': city,
    'pagination[pageSize]': '200',
    publicationState: 'live',
  });
  const res = await fetch(`${base}/api/doctors?${qs}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const json = (await res.json()) as { data?: CatalogDoctor[] };
  return json.data ?? [];
}

/** Обогащение врачей из QMS данными каталога (WP ЧЛБ или Strapi СПб) */
export const hydrateDoctors = async (
  misDoctors: MisDoctor[],
  city = 'chel',
): Promise<unknown[]> => {
  try {
    const normalizeName = (name: string) =>
      (name || '').trim().toLowerCase().split(/\s+/).sort().join(' ');

    const catalogByMis = new Map<string, CatalogDoctor>();
    const catalogByName = new Map<string, CatalogDoctor>();

    if (city === 'spb') {
      const strapiDoctors = await loadStrapiCatalogDoctors('spb');
      for (const d of strapiDoctors) {
        const misRaw = d.misId ? String(d.misId) : '';
        for (const id of misRaw.split(',').map((s) => s.trim()).filter(Boolean)) {
          if (!id.startsWith('spb-legacy-')) catalogByMis.set(id, d);
        }
        catalogByName.set(normalizeName(d.fullName || ''), d);
      }
    } else {
      const wpDoctors = await getWpDoctors();
      for (const d of wpDoctors) {
        if (!d.qms_id) continue;
        const ids = String(d.qms_id).split(',').map((id: string) => id.trim()).filter(Boolean);
        for (const id of ids) {
          catalogByMis.set(id, {
            misId: d.qms_id,
            fullName: d.display_name,
            specialty: d.specialty,
            photoUrl: d.photo_url,
            experienceYears: d.experience_years ? Number(d.experience_years) : undefined,
            degree: d.degree,
            category: d.category,
            legacyId: String(d.ID),
          });
        }
        catalogByName.set(normalizeName(d.display_name), {
          misId: d.qms_id,
          fullName: d.display_name,
          specialty: d.specialty,
          photoUrl: d.photo_url,
          experienceYears: d.experience_years ? Number(d.experience_years) : undefined,
          degree: d.degree,
          category: d.category,
          legacyId: String(d.ID),
        });
      }
    }

    const groupedDoctors = new Map<string, MisDoctor>();

    for (const misDoc of misDoctors) {
      const nameKey = normalizeName(misDoc.name);
      const existing = groupedDoctors.get(nameKey);

      if (existing) {
        if (misDoc.offerings) {
          existing.offerings = existing.offerings || [];
          for (const offering of misDoc.offerings) {
            if (!existing.offerings.find((o) => o.id === offering.id)) {
              existing.offerings.push(offering);
            }
          }
        }
        if (catalogByMis.has(misDoc.id) && !catalogByMis.has(existing.id)) {
          existing.id = misDoc.id;
          existing.specialty = misDoc.specialty;
        }
      } else {
        groupedDoctors.set(nameKey, { ...misDoc });
      }
    }

    const mergedMisDoctors = Array.from(groupedDoctors.values());

    return mergedMisDoctors.map((misDoc) => {
      let cat = catalogByMis.get(misDoc.id);
      if (!cat) {
        cat = catalogByName.get(normalizeName(misDoc.name));
      }

      return {
        ...misDoc,
        id: misDoc.id,
        databaseId: cat?.legacyId ? String(cat.legacyId) : undefined,
        name: cat?.fullName || misDoc.name,
        specialty: cat?.specialty || misDoc.specialty,
        image: cat?.photoUrl || undefined,
        experienceYears: cat?.experienceYears ?? undefined,
        degree: cat?.degree ?? undefined,
        category: cat?.category ?? undefined,
      };
    });
  } catch (error) {
    console.error('Hydration failed:', error);
    return misDoctors;
  }
};
