/**
 * Прокси к QMS API getPr (прайс-лист).
 * Транспорт: site_proxy (хостинг в whitelist) → direct (IP bridge).
 */
export type QmsCity = 'chel' | 'spb';

export { orgConfigsForCity, fetchQmsSections } from './qms/qmsTransport.js';
export { fetchQmsPriceItems, runQmsPriceSync } from './qms/syncQmsPrices.js';

import { fetchQmsPriceItems } from './qms/syncQmsPrices.js';

/** Сырой ответ getPr по org (для GET /api/qms/pricelist) */
export async function fetchCityPricelist(city: QmsCity) {
  const { items, transport, errors } = await fetchQmsPriceItems(city);

  const byOrg = new Map<string, typeof items>();
  for (const item of items) {
    const list = byOrg.get(item.sourceKey) ?? [];
    list.push(item);
    byOrg.set(item.sourceKey, list);
  }

  const orgs = [...byOrg.entries()].map(([sourceKey, rows]) => ({
    sourceKey,
    org: rows[0]?.orgId ?? sourceKey,
    label: sourceKey,
    itemCount: rows.length,
    sections: groupBySection(rows),
  }));

  return { city, orgs, errors, transport };
}

function groupBySection(items: Array<{ sectionVal: string; article: string; title: string; price: string }>) {
  const map = new Map<string, Array<{ Duv: string; u: string; Mr70: string }>>();
  for (const item of items) {
    const key = item.sectionVal || '(без раздела)';
    const rows = map.get(key) ?? [];
    rows.push({ Duv: item.article, u: item.title, Mr70: item.price });
    map.set(key, rows);
  }
  return [...map.entries()].map(([val, rows]) => ({ val, rows }));
}
