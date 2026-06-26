import type { Doctor } from '../../src/types.js';
import { loadAllModxDoctorsForSync } from '../repositories/modx/doctorsRepository.js';

const MIS_ID_TV_KEYS = ['qms_id', 'mis_id', 'misId', 'qqc', 'doctor_qms'] as const;

function pickMisId(tvMap: Record<string, string>): string {
  for (const key of MIS_ID_TV_KEYS) {
    const val = tvMap[key]?.trim();
    if (val) return val.split(',')[0].trim();
  }
  return '';
}

function parseExperience(raw: string): number {
  const n = parseInt(String(raw).replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

/** Врачи СПб из MODX (chunked) для синка в Strapi */
export async function getSpbDoctorsForSync(): Promise<Doctor[]> {
  const rows = await loadAllModxDoctorsForSync();

  return rows.map((doc) => {
    const docId = doc.id as number;
    const tvMap = (doc.tvMap as Record<string, string>) || {};
    const rank = tvMap.rank || '';
    const rankParts = [tvMap.position, tvMap.zvanie, tvMap.degree, rank].filter(Boolean);

    return {
      id: docId,
      city: 'spb' as const,
      qms_id: pickMisId(tvMap),
      pagetitle: String(doc.pagetitle || 'Без имени'),
      alias: String(doc.alias || `doctor-${docId}`),
      photo: String(doc.image || tvMap.docImg || ''),
      specialization: tvMap.specintro || '',
      rank: rankParts.join(', ') || rank,
      degree: tvMap.degree || '',
      category: tvMap.category || '',
      position: tvMap.position || '',
      zvanie: tvMap.zvanie || rank,
      experience: parseExperience(tvMap.specExperience || ''),
      education: tvMap.education || '',
      description: tvMap.des || '',
      tvs: tvMap,
    };
  });
}
