import { getExcludedIds } from '../../bridgeDb.js';
import { LegacyMysqlGateway } from '../../legacy/LegacyMysqlGateway.js';
import { LEGACY_DB_GUARD } from '../../config/legacyDbGuard.js';

/** MODX: услуги (templates 6, 32) */
export async function fetchModxServicesWithDetails() {
  const gw = LegacyMysqlGateway.get('spb');
  const prefix = gw.getPrefix();
  const excludedIds = await getExcludedIds();
  const excludeCondition =
    excludedIds.length > 0 ? `AND id NOT IN (${excludedIds.join(',')})` : '';

  const [services] = await gw.query(`
    SELECT id, pagetitle, longtitle, description, introtext, content, parent as parent_id, alias
    FROM ${prefix}site_content
    WHERE template IN (6, 32) AND published = 1 AND deleted = 0 ${excludeCondition}
  `);

  const [categories] = await gw.query(`
    SELECT id, pagetitle
    FROM ${prefix}site_content
    WHERE id IN (SELECT DISTINCT parent FROM ${prefix}site_content WHERE template IN (6, 32))
  `);

  let priceItems: Array<Record<string, unknown>> = [];
  try {
    const [prices] = await gw.query(`SELECT * FROM ${prefix}pricelist_items2`);
    priceItems = prices as Array<Record<string, unknown>>;
  } catch (e) {
    console.warn('Table pricelist_items2 might not exist yet:', e);
  }

  const [tvValues] = await gw.query(`
    SELECT tvc.contentid as resource_id, tv.name as tv_name, tvc.value
    FROM ${prefix}site_tmplvar_contentvalues tvc
    JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
    WHERE tvc.contentid IN (
      SELECT id FROM ${prefix}site_content WHERE template IN (6, 32)
    )
  `);

  return (services as Array<Record<string, unknown>>).map((s) => {
    const category = (categories as Array<{ id: number; pagetitle: string }>).find(
      (c) => c.id === s.parent_id,
    );
    const servicePrices = priceItems.filter((p) => p.resource_id === s.id);
    const srvTvs = (tvValues as Array<{ resource_id: number; tv_name: string; value: string }>).filter(
      (tv) => tv.resource_id === s.id,
    );
    const tvMap: Record<string, string> = {};
    srvTvs.forEach((tv) => {
      tvMap[tv.tv_name] = tv.value;
    });

    return {
      ...s,
      category,
      price_items: servicePrices,
      description: tvMap.des || '',
      image: tvMap.img || '',
      seo: {
        title: tvMap.title || '',
        description: tvMap.des || '',
      },
      tvs: tvMap,
      doctors: [],
      locations: [],
    };
  });
}