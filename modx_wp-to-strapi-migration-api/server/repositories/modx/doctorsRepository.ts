import { getExcludedIds } from '../../bridgeDb.js';
import { LegacyMysqlGateway } from '../../legacy/LegacyMysqlGateway.js';
import { LEGACY_DB_GUARD } from '../../config/legacyDbGuard.js';

/** MODX: список врачей (template 7) с TV — SSOT для /api/doctors */
export async function fetchModxDoctorsWithTvs() {
  const gw = LegacyMysqlGateway.get('spb');
  const prefix = gw.getPrefix();
  const excludedIds = await getExcludedIds();
  const excludeCondition =
    excludedIds.length > 0 ? `AND c.id NOT IN (${excludedIds.join(',')})` : '';

  const [doctors] = await gw.query(`
    SELECT c.id, c.pagetitle, c.alias, c.parent, p.image, p.thumb
    FROM ${prefix}site_content c
    LEFT JOIN ${prefix}ms2_products p ON p.id = c.id
    WHERE c.template = 7 AND c.parent != 209 AND c.published = 1 AND c.deleted = 0 ${excludeCondition}
  `);

  const [tvValues] = await gw.query(`
    SELECT tvc.contentid as resource_id, tv.name as tv_name, tvc.value
    FROM ${prefix}site_tmplvar_contentvalues tvc
    JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
    WHERE tvc.contentid IN (
      SELECT id FROM ${prefix}site_content WHERE template = 7
    )
  `);

  return (doctors as Array<Record<string, unknown>>).map((doc) => {
    const docTvs = (tvValues as Array<{ resource_id: number; tv_name: string; value: string }>).filter(
      (tv) => tv.resource_id === doc.id,
    );
    const tvMap: Record<string, string> = {};
    docTvs.forEach((tv) => {
      tvMap[tv.tv_name] = tv.value;
    });

    return {
      ...doc,
      name: doc.pagetitle,
      rank: tvMap.rank || '',
      specialization: tvMap.specintro || '',
      experience: tvMap.specExperience || '',
      education: tvMap.education || '',
      description: tvMap.des || '',
      photo: doc.image || tvMap.docImg || '',
      thumb: doc.thumb || '',
      seo: {
        title: tvMap.title || '',
        description: tvMap.des || '',
      },
      tvs: tvMap,
    };
  });
}

/** Chunked fetch врачей СПб для синка — не один тяжёлый SELECT */
export async function fetchModxDoctorsChunked(
  onChunk: (rows: Array<Record<string, unknown>>) => Promise<void>,
): Promise<number> {
  const gw = LegacyMysqlGateway.get('spb');
  const prefix = gw.getPrefix();
  const excludedIds = await getExcludedIds();
  const excludeCondition =
    excludedIds.length > 0 ? `AND c.id NOT IN (${excludedIds.join(',')})` : '';
  const limit = LEGACY_DB_GUARD.maxLimitPerRequest;
  let offset = 0;
  let total = 0;

  for (;;) {
    const [rows] = await gw.query(
      `
      SELECT c.id, c.pagetitle, c.alias, c.parent, p.image, p.thumb
      FROM ${prefix}site_content c
      LEFT JOIN ${prefix}ms2_products p ON p.id = c.id
      WHERE c.template = 7 AND c.parent != 209 AND c.published = 1 AND c.deleted = 0 ${excludeCondition}
      ORDER BY c.id
      LIMIT ? OFFSET ?
    `,
      [limit, offset],
    );

    const batch = rows as Array<Record<string, unknown>>;
    if (batch.length === 0) break;

    await onChunk(batch);
    total += batch.length;
    offset += limit;
    if (batch.length < limit) break;
  }

  return total;
}

async function fetchTvsForDoctorIds(
  gw: LegacyMysqlGateway,
  prefix: string,
  ids: number[],
): Promise<Array<{ resource_id: number; tv_name: string; value: string }>> {
  if (ids.length === 0) return [];
  const placeholders = ids.map(() => '?').join(',');
  const [tvValues] = await gw.query(
    `
    SELECT tvc.contentid as resource_id, tv.name as tv_name, tvc.value
    FROM ${prefix}site_tmplvar_contentvalues tvc
    JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
    WHERE tvc.contentid IN (${placeholders})
  `,
    ids,
  );
  return tvValues as Array<{ resource_id: number; tv_name: string; value: string }>;
}

/** Врачи СПб chunk-by-chunk для синка (anti-Beget) */
export async function loadAllModxDoctorsForSync(): Promise<Array<Record<string, unknown>>> {
  const gw = LegacyMysqlGateway.get('spb');
  const prefix = gw.getPrefix();
  const all: Array<Record<string, unknown>> = [];

  await fetchModxDoctorsChunked(async (batch) => {
    const ids = batch.map((d) => d.id as number);
    const tvValues = await fetchTvsForDoctorIds(gw, prefix, ids);

    for (const doc of batch) {
      const docId = doc.id as number;
      const docTvs = tvValues.filter((tv) => tv.resource_id === docId);
      const tvMap: Record<string, string> = {};
      docTvs.forEach((tv) => {
        tvMap[tv.tv_name] = tv.value;
      });
      all.push({ ...doc, tvMap });
    }
  });

  return all;
}
