import { pool, getPrefix } from '../db.js';
import { getExcludedIds } from '../bridgeDb.js';
import type { Doctor } from '../../src/types.js';

/** TV-ключи, где может лежать ID врача в МИС (пока ищем по whitelist) */
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

/** Врачи СПб из MODX (template 7) для синка в Strapi */
export async function getSpbDoctorsForSync(): Promise<Doctor[]> {
  const prefix = getPrefix();
  const excludedIds = await getExcludedIds();
  const excludeCondition =
    excludedIds.length > 0 ? `AND c.id NOT IN (${excludedIds.join(',')})` : '';

  const [doctors] = await pool.query(`
    SELECT c.id, c.pagetitle, c.alias, c.parent, p.image, p.thumb
    FROM ${prefix}site_content c
    LEFT JOIN ${prefix}ms2_products p ON p.id = c.id
    WHERE c.template = 7 AND c.parent != 209 AND c.published = 1 AND c.deleted = 0 ${excludeCondition}
  `);

  const [tvValues] = await pool.query(`
    SELECT tvc.contentid as resource_id, tv.name as tv_name, tvc.value
    FROM ${prefix}site_tmplvar_contentvalues tvc
    JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
    WHERE tvc.contentid IN (
      SELECT id FROM ${prefix}site_content WHERE template = 7 AND parent != 209
    )
  `);

  return (doctors as Array<Record<string, unknown>>).map((doc) => {
    const docId = doc.id as number;
    const docTvs = (tvValues as Array<{ resource_id: number; tv_name: string; value: string }>).filter(
      (tv) => tv.resource_id === docId,
    );
    const tvMap: Record<string, string> = {};
    docTvs.forEach((tv) => {
      tvMap[tv.tv_name] = tv.value;
    });

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
