import type { QmsPriceItem } from '../../types/qmsPrice.js';

type QmsRow = { Duv?: string; u?: string; Mr70?: string };
type QmsSection = { val?: string; rows?: QmsRow[] };

/** Нормализация цены как в PHP update_info2.php */
export function normalizeQmsPrice(raw: string | number | undefined): string {
  if (raw === undefined || raw === null) return '';
  let price = String(raw).trim();
  const m = price.match(/^(.+)(\.|,)(.+)$/);
  if (m && Number.parseInt(m[3], 10) === 0) {
    price = m[1];
  }
  return price;
}

/** sections[] → плоский список; дубли артикула: последний wins (как merge org в ЧЛБ) */
export function flattenQmsSections(
  sections: QmsSection[],
  orgId: string,
  sourceKey: string,
): QmsPriceItem[] {
  const map = new Map<string, QmsPriceItem>();

  for (const section of sections) {
    const sectionVal = String(section.val ?? '').trim();
    for (const row of section.rows ?? []) {
      const article = String(row.Duv ?? '').trim();
      if (!article) continue;
      map.set(article, {
        article,
        title: String(row.u ?? '').trim(),
        price: normalizeQmsPrice(row.Mr70),
        sectionVal,
        orgId,
        sourceKey,
      });
    }
  }

  return [...map.values()];
}
