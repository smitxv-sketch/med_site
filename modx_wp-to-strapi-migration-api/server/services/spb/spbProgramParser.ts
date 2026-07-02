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

/** Элементы из TV json_data: [{ id, name }] */
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
    const modxId = String(
      (row as Record<string, unknown>).id
        ?? (row as Record<string, unknown>).MIGX_id
        ?? '',
    ).trim();
    out.push({
      label,
      legacyModxId: modxId || undefined,
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

/** Объединить источники: json_data приоритетнее uslugiPrice */
export function mergeProgramItems(
  jsonData: ParsedProgramItem[],
  uslugiPrice: ParsedProgramItem[],
): ParsedProgramItem[] {
  if (jsonData.length) return jsonData;
  return uslugiPrice;
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
