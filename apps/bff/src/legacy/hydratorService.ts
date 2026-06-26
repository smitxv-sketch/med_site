import type { MisDoctor } from './interfaces/MisDriver.js';
import { getWpDoctors } from './wpService.js';

/** Обогащение врачей из QMS данными из WP REST (фото, стаж, тексты) */
export const hydrateDoctors = async (misDoctors: MisDoctor[]): Promise<unknown[]> => {
  try {
    const wpDoctors = await getWpDoctors();
    const wpDoctorsMap = new Map<string, (typeof wpDoctors)[number]>();
    for (const d of wpDoctors) {
      if (d.qms_id) {
        const ids = String(d.qms_id).split(',').map((id: string) => id.trim()).filter(Boolean);
        for (const id of ids) {
          wpDoctorsMap.set(id, d);
        }
      }
    }

    const normalizeName = (name: string) =>
      (name || '').trim().toLowerCase().split(/\s+/).sort().join(' ');

    const wpDoctorsByName = new Map(
      wpDoctors.map((d) => [normalizeName(d.display_name), d]),
    );

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
        if (wpDoctorsMap.has(misDoc.id) && !wpDoctorsMap.has(existing.id)) {
          existing.id = misDoc.id;
          existing.specialty = misDoc.specialty;
        }
      } else {
        groupedDoctors.set(nameKey, { ...misDoc });
      }
    }

    const mergedMisDoctors = Array.from(groupedDoctors.values());

    return mergedMisDoctors.map((misDoc) => {
      let wpDoc = wpDoctorsMap.get(misDoc.id);
      if (!wpDoc) {
        wpDoc = wpDoctorsByName.get(normalizeName(misDoc.name));
      }

      return {
        ...misDoc,
        id: misDoc.id,
        databaseId: wpDoc ? String(wpDoc.ID) : undefined,
        name: wpDoc ? wpDoc.display_name : misDoc.name,
        specialty: wpDoc ? wpDoc.specialty || misDoc.specialty : misDoc.specialty,
        image: wpDoc ? wpDoc.photo_url : undefined,
        experienceYears:
          wpDoc && wpDoc.experience_years ? parseInt(String(wpDoc.experience_years), 10) : undefined,
        price: wpDoc ? wpDoc.price : undefined,
        duration: wpDoc ? wpDoc.duration : undefined,
        badges: wpDoc ? wpDoc.badges || [] : [],
        description: wpDoc ? wpDoc.description : undefined,
        anonce: wpDoc ? wpDoc.anonce : undefined,
        activities: wpDoc ? wpDoc.activities : undefined,
        educationText: wpDoc ? wpDoc.educationText : undefined,
        educationHistory: wpDoc ? wpDoc.educationHistory : undefined,
        degree: wpDoc ? wpDoc.degree : undefined,
        zvanie: wpDoc ? wpDoc.zvanie : undefined,
        category: wpDoc ? wpDoc.category : undefined,
        position: wpDoc ? wpDoc.position : undefined,
        isChildDoctor: wpDoc ? wpDoc.isChildDoctor : undefined,
        isAdultDoctor: wpDoc ? wpDoc.isAdultDoctor : undefined,
        rawMeta: wpDoc ? wpDoc.rawMeta : undefined,
      };
    });
  } catch (error) {
    console.error('Hydration failed:', error);
    return misDoctors;
  }
};
