/**
 * Slug для Strapi UID: только [A-Za-z0-9-_.~] (без кириллицы).
 * SSOT для синка врачей chel/spb.
 */

const CYRILLIC_MAP: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
};

function transliterateRu(input: string): string {
  return [...input.toLowerCase()]
    .map((ch) => CYRILLIC_MAP[ch] ?? ch)
    .join('');
}

/** Slug для Strapi UID: только [A-Za-z0-9-_.~] */
export function toStrapiUidSlug(input: string): string {
  const ascii = transliterateRu(input)
    .replace(/[^a-z0-9._~]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return ascii || 'item';
}

/** Человекочитаемый ASCII-slug + legacy id для уникальности */
export function makeStrapiDoctorSlug(
  fullName: string,
  legacyId: string,
  source: 'chel' | 'spb',
): string {
  const ascii = transliterateRu(fullName)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
  const suffix = `${source}-${legacyId}`;
  return ascii ? `${ascii}-${suffix}` : `doctor-${suffix}`;
}
