/**
 * SSOT специальностей = словарь Яндекс.Врачи (ACF feed_spec / taxonomy speclist).
 * Утилиты: нормализация, slug, извлечение специальностей из свободного текста СПб.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ACF_PATH = path.resolve(__dirname, '../../acf/acf-export-2026-07-01.json');

const CYRILLIC_MAP = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
};

function transliterateRu(input) {
  return [...String(input).toLowerCase()].map((ch) => CYRILLIC_MAP[ch] ?? ch).join('');
}

/** Синонимы СПб/сайта → каноническое имя Яндекс (если в тексте нет точного вхождения) */
export const SPB_TEXT_ALIASES = [
  { patterns: ['оториноларинголог', 'отоларинголог', 'лор ', ' лор,', 'лор)'], yandex: 'лор (отоларинголог)' },
  { patterns: ['колопроктолог', 'проктолог'], yandex: 'колопроктолог (проктолог)' },
  { patterns: ['окулист'], yandex: 'офтальмолог (окулист)' },
  { patterns: ['ультразвуковой диагностики', 'узи-специалист', 'узи специалист', 'узи-диагност'], yandex: 'узи-специалист' },
  { patterns: ['репродуктолог'], yandex: 'репродуктолог' },
  { patterns: ['гемостазиолог'], yandex: 'гемостазиолог' },
  { patterns: ['маммолог'], yandex: 'маммолог' },
  { patterns: ['диетолог'], yandex: 'диетолог' },
  { patterns: ['гастроэнтеролог'], yandex: 'гастроэнтеролог' },
  { patterns: ['дерматовенеролог'], yandex: 'дерматовенеролог' },
  { patterns: ['функциональной диагностики'], yandex: 'врач функциональной диагностики' },
  { patterns: ['лазерный хирург'], yandex: 'лазерный хирург' },
  { patterns: ['педиатр'], yandex: 'педиатр' },
  { patterns: ['кардиолог'], yandex: 'кардиолог' },
  { patterns: ['онколог'], yandex: 'онколог' },
  { patterns: ['уролог'], yandex: 'уролог' },
  { patterns: ['андролог'], yandex: 'андролог' },
  { patterns: ['невролог'], yandex: 'невролог' },
  { patterns: ['терапевт'], yandex: 'терапевт' },
  { patterns: ['ревматолог'], yandex: 'ревматолог' },
  { patterns: ['травматолог-ортопед', 'ортопед'], yandex: 'ортопед' },
  { patterns: ['травматолог'], yandex: 'травматолог' },
  { patterns: ['эндокринолог'], yandex: 'эндокринолог' },
  { patterns: ['акушер-гинеколог', 'акушер гинеколог'], yandex: 'акушер-гинеколог' },
  { patterns: ['офтальмолог', 'офтальмо'], yandex: 'офтальмолог (окулист)' },
  { patterns: ['психолог'], yandex: 'психолог' },
];

export function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/[^a-zа-я0-9\s\-()]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** URL-slug для Strapi UID (латиница, без скобок) */
export function slugFromYandex(name) {
  return transliterateRu(
    norm(name)
      .replace(/\s*\([^)]*\)\s*/g, ' ')
      .trim(),
  )
    .replace(/[^a-z0-9._~]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function parseYandexDictionaryFromAcf(acfJson) {
  const group = acfJson.find((g) => g.title === 'Врачи');
  const feedSpec = group?.fields?.find((f) => f.name === 'feed_spec');
  const html = feedSpec?.instructions || '';
  const plain = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ');
  return [...new Set(plain.split('\n').map((l) => l.trim()).filter(Boolean))].filter(
    (line) =>
      !line.toLowerCase().includes('можно использовать варианты') && !line.endsWith(':'),
  );
}

export async function loadYandexDictionary() {
  const raw = await fs.readFile(ACF_PATH, 'utf8');
  return parseYandexDictionaryFromAcf(JSON.parse(raw));
}

/**
 * Находит канонические специальности Яндекс в произвольном тексте (specintro СПб).
 * Длинные фразы приоритетнее; убираем вложенные ложные совпадения.
 */
export function extractSsotFromText(text, yandexDict) {
  const n = norm(text);
  if (!n) return [];

  const padded = ` ${n} `;
  const sorted = [...yandexDict].sort((a, b) => b.length - a.length);
  const found = [];

  for (const yandex of sorted) {
    const yn = norm(yandex);
    if (yn.length < 4) continue;
    // Граница слова: пробел/скобка/дефис/начало/конец
    const escaped = yn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(?:^|[\\s(,;])${escaped}(?:$|[\\s),;.])`, 'i');
    if (re.test(padded) || padded.includes(` ${yn} `) || padded.includes(`-${yn} `) || padded.includes(` ${yn}-`)) {
      found.push(yandex);
    }
  }

  for (const { patterns, yandex } of SPB_TEXT_ALIASES) {
    if (found.includes(yandex)) continue;
    for (const p of patterns) {
      const pn = norm(p);
      if (pn.length < 4) continue;
      if (padded.includes(pn)) {
        found.push(yandex);
        break;
      }
    }
  }

  return refineSsotMatches(found, yandexDict);
}

/** Убираем «акушер», если есть «акушер-гинеколог»; «онколог» внутри офтальмоонкологии и т.п. */
export function refineSsotMatches(found, yandexDict) {
  const set = new Set(found);
  const sorted = [...set].sort((a, b) => b.length - a.length);

  const drop = new Set();
  for (const long of sorted) {
    for (const short of sorted) {
      if (long === short || drop.has(short)) continue;
      const ln = norm(long);
      const sn = norm(short);
      if (sn.length < 5) continue;
      if (ln.includes(sn) && long !== short) drop.add(short);
    }
  }

  // «онколог» только если нет более точной офтальмо-специальности в тексте — убираем если единственный триггер офтальмоонколог
  if (set.has('онколог') && set.has('офтальмолог (окулист)')) {
    drop.add('онколог');
  }
  if (set.has('хирург') && (set.has('лазерный хирург') || set.has('офтальмохирург'))) {
    drop.add('хирург');
  }
  if (set.has('психолог') && set.has('психотерапевт')) {
    drop.add('психолог');
  }
  if (set.has('акушер') && set.has('акушер-гинеколог')) {
    drop.add('акушер');
  }
  if (set.has('гинеколог') && set.has('акушер-гинеколог')) {
    drop.add('гинеколог');
  }
  if (set.has('травматолог') && set.has('ортопед')) {
    drop.add('травматолог');
  }

  return sorted.filter((s) => !drop.has(s));
}

/** Уверенность автосопоставления */
export function matchConfidence(rawText, ssotList) {
  if (!ssotList.length) return 'none';
  if (ssotList.length === 1 && norm(rawText).includes(norm(ssotList[0]))) return 'high';
  if (ssotList.length <= 2) return 'medium';
  return 'low';
}
