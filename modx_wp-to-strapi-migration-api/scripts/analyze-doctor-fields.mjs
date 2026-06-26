#!/usr/bin/env node
/**
 * Аудит заполненности полей врачей: ЧЛБ (REST) и СПб (bridge /api/doctors).
 * Запуск: node scripts/analyze-doctor-fields.mjs
 */
import fs from 'fs/promises';

const CHEL_URL = process.env.CHEL_API_ENDPOINT || 'https://ci74.ru/api/rest.php?action=get_doctors';
const BRIDGE_URL = process.env.BRIDGE_URL || 'https://bridge.istochnik.smitx.ru';
const BRIDGE_TOKEN = process.env.BRIDGE_API_TOKEN || '';

function isFilled(val) {
  if (val === null || val === undefined) return false;
  if (typeof val === 'boolean') return val;
  if (typeof val === 'number') return val > 0;
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === 'object') return Object.keys(val).length > 0;
  const s = String(val).trim();
  if (!s || s === '0' || s === 'false' || s === '[]' || s === '{}') return false;
  return true;
}

function parseJsonField(val) {
  if (!val) return null;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return null;
  }
}

function statsForRows(rows, fieldDefs) {
  const total = rows.length;
  const result = { total, fields: {} };
  for (const { key, getter, label } of fieldDefs) {
    let filled = 0;
    const samples = [];
    for (const row of rows) {
      const val = getter(row);
      if (isFilled(val)) {
        filled += 1;
        if (samples.length < 2) {
          const preview =
            typeof val === 'string' && val.length > 80 ? `${val.slice(0, 80)}…` : val;
          samples.push(preview);
        }
      }
    }
    result.fields[key] = {
      label: label || key,
      filled,
      empty: total - filled,
      pct: total ? Math.round((filled / total) * 100) : 0,
      samples,
    };
  }
  return result;
}

const CHEL_FIELDS = [
  { key: 'wp_user_id', getter: (d) => d.wp_user_id, label: 'ID WordPress' },
  { key: 'display_name', getter: (d) => d.display_name, label: 'ФИО' },
  { key: 'qms_id', getter: (d) => d.qms_id, label: 'ID МИС (qms_id)' },
  { key: 'specialty', getter: (d) => d.specialty, label: 'Специальность' },
  { key: 'photo_url', getter: (d) => d.photo_url, label: 'Фото URL' },
  { key: 'experience_years', getter: (d) => d.experience_years, label: 'Стаж (лет)' },
  { key: 'degree', getter: (d) => d.degree, label: 'Учёная степень' },
  { key: 'category', getter: (d) => d.category, label: 'Категория' },
  { key: 'zvanie', getter: (d) => d.zvanie, label: 'Звание' },
  { key: 'position', getter: (d) => d.position, label: 'Должность' },
  { key: 'education_text', getter: (d) => d.education_text, label: 'Образование (текст)' },
  {
    key: 'education_history',
    getter: (d) => parseJsonField(d.education_history),
    label: 'Образование (JSON история)',
  },
  { key: 'description', getter: (d) => d.description, label: 'Описание / био' },
  { key: 'anonce', getter: (d) => d.anonce, label: 'Анонс' },
  { key: 'activities', getter: (d) => d.activities, label: 'Деятельность' },
  { key: 'price', getter: (d) => d.price, label: 'Цена приёма' },
  { key: 'duration', getter: (d) => d.duration, label: 'Длительность (мин)' },
  { key: 'is_child_doctor', getter: (d) => d.is_child_doctor, label: 'Детский врач' },
  { key: 'is_adult_doctor', getter: (d) => d.is_adult_doctor, label: 'Взрослый врач' },
  { key: 'badges', getter: (d) => parseJsonField(d.badges), label: 'Бейджи (JSON)' },
  { key: 'raw_meta', getter: (d) => parseJsonField(d.raw_meta), label: 'Сырые meta (JSON)' },
];

/** Все уникальные ключи REST (для полей вне whitelist) */
function discoverExtraKeys(rows) {
  const counts = {};
  for (const row of rows) {
    for (const k of Object.keys(row)) {
      if (!counts[k]) counts[k] = { filled: 0, total: rows.length };
      if (isFilled(row[k])) counts[k].filled += 1;
    }
  }
  const known = new Set(CHEL_FIELDS.map((f) => f.key));
  return Object.entries(counts)
    .filter(([k]) => !known.has(k))
    .map(([k, v]) => ({ key: k, filled: v.filled, pct: Math.round((v.filled / v.total) * 100) }))
    .sort((a, b) => b.filled - a.filled);
}

const SPB_TV_FIELDS = [
  { key: 'specintro', label: 'Специальность (specintro)' },
  { key: 'specExperience', label: 'Опыт (specExperience)' },
  { key: 'rank', label: 'Звание (rank)' },
  { key: 'education', label: 'Образование (education)' },
  { key: 'des', label: 'Описание (des)' },
  { key: 'docImg', label: 'Фото (docImg TV)' },
  { key: 'title', label: 'SEO title' },
  { key: 'uslugiPrice', label: 'Услуги+цены (MIGX uslugiPrice)' },
  { key: 'directions', label: 'Направления (directions)' },
  { key: 'uslugi', label: 'Услуги (uslugi)' },
  { key: 'qms_id', label: 'MIS ID (qms_id TV)' },
  { key: 'mis_id', label: 'MIS ID (mis_id TV)' },
  { key: 'misId', label: 'MIS ID (misId TV)' },
  { key: 'qqc', label: 'MIS ID (qqc TV)' },
  { key: 'degree', label: 'Степень (degree TV)' },
  { key: 'category', label: 'Категория (category TV)' },
  { key: 'position', label: 'Должность (position TV)' },
  { key: 'zvanie', label: 'Звание (zvanie TV)' },
  { key: 'prodoctorov', label: 'ПроДокторов' },
  { key: 'docPrice', label: 'Цена (docPrice)' },
];

function analyzeSpb(doctors) {
  const total = doctors.length;
  const fields = {};
  for (const def of SPB_TV_FIELDS) {
    let filled = 0;
    const samples = [];
    for (const doc of doctors) {
      const tvVal = doc.tvs?.[def.key] ?? doc[def.key];
      const val =
        def.key === 'photo'
          ? doc.photo || doc.image
          : tvVal;
      if (isFilled(val)) {
        filled += 1;
        if (samples.length < 2) {
          const preview =
            typeof val === 'string' && val.length > 80
              ? `${val.slice(0, 80)}…`
              : Array.isArray(val)
                ? `[array ${val.length}]`
                : val;
          samples.push(preview);
        }
      }
    }
    fields[def.key] = {
      label: def.label,
      filled,
      empty: total - filled,
      pct: total ? Math.round((filled / total) * 100) : 0,
      samples,
    };
  }

  // ms2 image
  let imageFilled = 0;
  for (const doc of doctors) {
    if (isFilled(doc.image)) imageFilled += 1;
  }
  fields.ms2_image = {
    label: 'Фото (ms2_products.image)',
    filled: imageFilled,
    empty: total - imageFilled,
    pct: total ? Math.round((imageFilled / total) * 100) : 0,
    samples: [],
  };

  // Все TV на врачах
  const tvCounts = {};
  for (const doc of doctors) {
    const tvs = doc.tvs || {};
    for (const [name, val] of Object.entries(tvs)) {
      if (!tvCounts[name]) tvCounts[name] = 0;
      if (isFilled(val)) tvCounts[name] += 1;
    }
  }
  const allTvs = Object.entries(tvCounts)
    .map(([name, filled]) => ({ name, filled, pct: Math.round((filled / total) * 100) }))
    .sort((a, b) => b.filled - a.filled);

  return { total, fields, allTvs };
}

async function fetchChel() {
  const local = process.argv.includes('--local-chel');
  let raw;
  if (local) {
    raw = await fs.readFile(new URL('../../tmp-chel-doctors.json', import.meta.url), 'utf8');
  } else {
    const res = await fetch(CHEL_URL);
    if (!res.ok) throw new Error(`Chel API ${res.status}`);
    raw = await res.text();
  }
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) throw new Error('Chel: expected array');
  return data;
}

async function fetchSpb() {
  const headers = BRIDGE_TOKEN ? { Authorization: `Bearer ${BRIDGE_TOKEN}` } : {};
  const res = await fetch(`${BRIDGE_URL}/api/doctors`, { headers });
  if (!res.ok) {
    return { error: `HTTP ${res.status}`, doctors: [] };
  }
  const doctors = await res.json();
  return { doctors: Array.isArray(doctors) ? doctors : [] };
}

async function main() {
  console.log('Fetching Chel doctors…');
  const chelRows = await fetchChel();
  const chelStats = statsForRows(chelRows, CHEL_FIELDS);
  const chelExtra = discoverExtraKeys(chelRows);

  const withQms = chelRows.filter((d) => isFilled(d.qms_id)).length;
  const multiQms = chelRows.filter((d) => String(d.qms_id || '').includes(',')).length;

  console.log('Fetching SPb doctors…');
  const spbResult = await fetchSpb();
  const spbAnalysis = spbResult.doctors.length
    ? analyzeSpb(spbResult.doctors)
    : { total: 0, fields: {}, allTvs: [], error: spbResult.error };

  const report = {
    generatedAt: new Date().toISOString(),
    chelyabinsk: {
      source: CHEL_URL,
      ...chelStats,
      withQmsId: withQms,
      multiQmsId: multiQms,
      extraApiKeys: chelExtra,
    },
    spb: {
      source: `${BRIDGE_URL}/api/doctors`,
      ...spbAnalysis,
    },
  };

  const outPath = new URL('../public/export/doctor_fields_audit.json', import.meta.url);
  await fs.mkdir(new URL('../public/export/', import.meta.url), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(report, null, 2));

  console.log('\n=== ЧЕЛЯБИНСК ===');
  console.log(`Всего врачей: ${chelStats.total}, с qms_id: ${withQms}`);
  for (const [key, s] of Object.entries(chelStats.fields)) {
    console.log(`  ${s.label}: ${s.filled}/${chelStats.total} (${s.pct}%)`);
  }
  if (chelExtra.length) {
    console.log('  Доп. ключи API:', chelExtra.slice(0, 10).map((e) => `${e.key}=${e.pct}%`).join(', '));
  }

  console.log('\n=== САНКТ-ПЕТЕРБУРГ ===');
  if (spbAnalysis.error) {
    console.log(`  Ошибка: ${spbAnalysis.error}`);
  } else {
    console.log(`Всего врачей: ${spbAnalysis.total}`);
    for (const [key, s] of Object.entries(spbAnalysis.fields)) {
      console.log(`  ${s.label}: ${s.filled}/${spbAnalysis.total} (${s.pct}%)`);
    }
    console.log('  Все TV (top):', spbAnalysis.allTvs.slice(0, 15).map((t) => `${t.name}=${t.pct}%`).join(', '));
  }

  console.log(`\nJSON: ${outPath.pathname}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
