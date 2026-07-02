/** Парсинг MIGX json_data / uslugiPrice → состав комплекса */

export type ParsedProgramItem = {
  label: string;
  /** MODX resource id позиции (если есть) */
  legacyModxId?: string;
  /** Артикул из MIGX ids (если есть) */
  legacyArticle?: string;
  sortOrder: number;
};

function tryParseJson(raw: string): unknown {
  const t = String(raw ?? '').trim();
  if (!t) return null;
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
}

/** Элементы из TV json_data: [{ id, name }]
 *  Важно: поле `id` в MIGX — это номер строки в таблице, НЕ resource_id MODX.
 */
export function parseJsonDataTv(raw: string): ParsedProgramItem[] {
  const parsed = tryParseJson(raw);
  if (!Array.isArray(parsed)) return [];
  const out: ParsedProgramItem[] = [];
  for (let i = 0; i < parsed.length; i += 1) {
    const row = parsed[i];
    if (!row || typeof row !== 'object') continue;
    const label = String(
      (row as Record<string, unknown>).name
        ?? (row as Record<string, unknown>).title
        ?? '',
    ).trim();
    if (!label) continue;
    out.push({
      label,
      sortOrder: i,
    });
  }
  return out;
}

/** Элементы из TV uslugiPrice: [{ name, ids, price }] */
export function parseUslugiPriceTv(raw: string): ParsedProgramItem[] {
  const parsed = tryParseJson(raw);
  if (!Array.isArray(parsed)) return [];
  const out: ParsedProgramItem[] = [];
  for (let i = 0; i < parsed.length; i += 1) {
    const row = parsed[i];
    if (!row || typeof row !== 'object') continue;
    const label = String(
      (row as Record<string, unknown>).name
        ?? (row as Record<string, unknown>).name2
        ?? '',
    ).trim();
    if (!label) continue;
    const article = String((row as Record<string, unknown>).ids ?? '').trim();
    out.push({
      label,
      legacyArticle: article || undefined,
      sortOrder: i,
    });
  }
  return out;
}

/** Список из TV textContent: <li> или строки <p> с «-» */
export function parseTextContentTv(raw: string): ParsedProgramItem[] {
  const html = String(raw ?? '').trim();
  if (!html) return [];

  const out: ParsedProgramItem[] = [];
  const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match: RegExpExecArray | null;
  while ((match = liRe.exec(html))) {
    const label = match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (label) out.push({ label, sortOrder: out.length });
  }
  if (out.length) return out;

  const pRe = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  while ((match = pRe.exec(html))) {
    const text = match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const label = text.replace(/^[-–•]\s*/, '').trim();
    if (label.length >= 4) out.push({ label, sortOrder: out.length });
  }
  return out;
}

/** Объединить источники: json_data → uslugiPrice → textContent */
export function mergeProgramItems(
  jsonData: ParsedProgramItem[],
  uslugiPrice: ParsedProgramItem[],
  textContent: ParsedProgramItem[] = [],
): ParsedProgramItem[] {
  if (jsonData.length) return jsonData;
  if (uslugiPrice.length) return uslugiPrice;
  return textContent;
}

/** Признак комплекса по строке прайса */
export function isProgramPricelistRow(tab: string, category: string, name: string): boolean {
  const blob = `${tab} ${category} ${name}`.toLowerCase();
  return (
    blob.includes('комплекс')
    || blob.includes('check-up')
    || blob.includes('check up')
    || blob.includes('программ')
  );
}
