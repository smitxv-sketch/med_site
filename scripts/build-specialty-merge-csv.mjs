#!/usr/bin/env node
/**
 * SSOT специальностей (Яндекс speclist) + приведение СПб specintro к канону.
 *
 * Выход:
 *  - docs/mappings/specialty-ssot.json       — канонический справочник (149 позиций)
 *  - docs/mappings/specialty-merge.csv       — merge ЧЛБ + СПб по SSOT
 *  - docs/mappings/spb-specintro-to-ssot.csv   — сырые строки СПб → SSOT (аудит)
 *  - docs/mappings/spb-doctor-specialty-map.json — врач СПб → [ssot slug]
 *  - docs/mappings/specialty-merge.meta.json
 *
 * Запуск: node scripts/build-specialty-merge-csv.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ACF_PATH,
  extractSsotFromText,
  loadYandexDictionary,
  matchConfidence,
  norm,
  slugFromYandex,
} from './lib/specialtySsot.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'docs', 'mappings');

async function fetchWpSpeclistTerms() {
  const out = [];
  let page = 1;
  for (;;) {
    const res = await fetch(
      `https://ci74.ru/wp-json/wp/v2/speclist?per_page=100&page=${page}`,
    );
    if (res.status === 400) break;
    if (!res.ok) throw new Error(`WP speclist HTTP ${res.status}`);
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    out.push(
      ...batch.map((t) => ({
        termId: t.id,
        name: t.name,
        slug: t.slug,
        count: t.count ?? 0,
      })),
    );
    page += 1;
  }
  return out;
}

async function fetchChelFeedSpecUsage() {
  const res = await fetch('https://ci74.ru/api/rest.php?action=get_doctors');
  if (!res.ok) throw new Error(`get_doctors HTTP ${res.status}`);
  const doctors = await res.json();
  const byTerm = new Map();
  for (const doc of doctors) {
    let meta = {};
    try {
      meta = JSON.parse(doc.raw_meta || '{}');
    } catch {
      /* ignore */
    }
    const ids = meta.feed_spec;
    const list = Array.isArray(ids) ? ids : ids ? [ids] : [];
    for (const raw of list) {
      const id = String(raw);
      if (!byTerm.has(id)) byTerm.set(id, { doctorCount: 0, examples: [] });
      const row = byTerm.get(id);
      row.doctorCount += 1;
      if (row.examples.length < 3) row.examples.push(doc.display_name);
    }
  }
  return { doctorTotal: doctors.length, byTerm };
}

/** Тексты специальности с карточки врача СПб (не блок «похожие») */
function extractSpbDoctorTexts(html, h1) {
  const title = html.match(/<title[^>]*>([^<]+)</i)?.[1]?.trim() || '';

  let fromTitle = '';
  if (title && h1) {
    const afterName = title.replace(h1, '').trim();
    const m = afterName.match(/^(.+?)\s+клиники/i);
    if (m?.[1]) fromTitle = m[1].trim();
  }

  // Берём фрагмент HTML от <h1> до блока отзывов/похожих (~12k символов)
  const h1Idx = html.search(new RegExp(`<h1[^>]*>\\s*${escapeRe(h1)}`, 'i'));
  const slice =
    h1Idx >= 0
      ? html.slice(h1Idx, h1Idx + 12000)
      : html.slice(0, 12000);

  const specLines = [
    ...slice.matchAll(/<strong>Специальность:<\/strong>\s*([^<]+)/gi),
    ...slice.matchAll(/<strong>Специализация:<\/strong>\s*([^<]+)/gi),
  ].map((m) => m[1].replace(/&nbsp;/g, ' ').trim());

  const occ = slice.match(/class="specialist__item-occ"[^>]*>([^<]+)</i)?.[1]?.trim() || '';

  return {
    h1,
    title,
    fromTitle,
    occ,
    specLines,
    /** Все тексты для извлечения SSOT */
    corpus: [fromTitle, occ, ...specLines, title].filter(Boolean).join(' | '),
    rawSpecintro: specLines[0] || occ || fromTitle || '',
  };
}

function escapeRe(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function fetchSpbDoctorsWithSsot(yandexDict) {
  const res = await fetch('https://cispb.com/sitemap.xml');
  if (!res.ok) throw new Error(`sitemap HTTP ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]*\/sotrudniki\/[^<]+)<\/loc>/gi)].map((m) => m[1]);

  const doctors = [];
  const rawVariantMap = new Map();

  for (const url of urls) {
    try {
      const pageRes = await fetch(url);
      if (!pageRes.ok) continue;
      const html = await pageRes.text();
      const h1 = html.match(/<h1[^>]*>([^<]+)</i)?.[1]?.trim() || '';
      const parsed = extractSpbDoctorTexts(html, h1);
      const ssot = extractSsotFromText(parsed.corpus, yandexDict);
      const slug = url.replace(/\/$/, '').split('/').pop() || '';

      const entry = {
        slug,
        url,
        fullName: h1,
        rawSpecintro: parsed.rawSpecintro,
        corpus: parsed.corpus,
        ssot,
        ssotSlugs: ssot.map(slugFromYandex),
        confidence: matchConfidence(parsed.corpus, ssot),
      };
      doctors.push(entry);

      const variantKey = parsed.rawSpecintro || parsed.corpus.slice(0, 200);
      if (!rawVariantMap.has(variantKey)) {
        rawVariantMap.set(variantKey, {
          rawText: variantKey,
          corpusSample: parsed.corpus.slice(0, 300),
          ssot: new Set(),
          ssotSlugs: new Set(),
          doctors: [],
          confidence: 'high',
        });
      }
      const v = rawVariantMap.get(variantKey);
      for (const s of ssot) v.ssot.add(s);
      for (const s of entry.ssotSlugs) v.ssotSlugs.add(s);
      v.doctors.push(h1);
      if (entry.confidence === 'low' || (entry.confidence === 'none' && ssot.length === 0)) {
        v.confidence = 'needs_review';
      } else if (entry.confidence === 'medium' && v.confidence === 'high') {
        v.confidence = 'medium';
      }
    } catch {
      /* skip */
    }
    await new Promise((r) => setTimeout(r, 80));
  }

  const variants = [...rawVariantMap.values()].map((v) => ({
    rawText: v.rawText,
    corpusSample: v.corpusSample,
    ssot: [...v.ssot],
    ssotSlugs: [...v.ssotSlugs],
    doctorCount: v.doctors.length,
    examples: v.doctors.slice(0, 3),
    confidence: v.confidence,
    manual_merge: v.confidence === 'needs_review' ? '' : [...v.ssot].join('; '),
  }));

  return { doctors, variants, staffPages: urls.length };
}

function csvEscape(val) {
  const s = String(val ?? '');
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function buildSsotCatalog(yandexDict, wpTerms, chelUsage) {
  const wpByNorm = new Map(wpTerms.map((t) => [norm(t.name), t]));

  return yandexDict.map((yandexName, index) => {
    const wp = wpByNorm.get(norm(yandexName));
    const termId = wp?.termId;
    const usage = termId ? chelUsage.byTerm.get(String(termId)) : undefined;
    return {
      id: index + 1,
      yandexName,
      slug: slugFromYandex(yandexName),
      chelWpTermId: termId ?? null,
      chelWpName: wp?.name ?? null,
      chelDoctorsCount: usage?.doctorCount ?? 0,
      spbDoctorsCount: 0,
      spbRawVariants: [],
    };
  });
}

function applySpbToCatalog(ssotCatalog, spbDoctors) {
  const bySlug = new Map(ssotCatalog.map((r) => [r.slug, r]));
  const byYandex = new Map(ssotCatalog.map((r) => [r.yandexName, r]));

  for (const doc of spbDoctors) {
    for (const yandex of doc.ssot) {
      const row = byYandex.get(yandex);
      if (!row) continue;
      row.spbDoctorsCount += 1;
      if (doc.rawSpecintro && !row.spbRawVariants.includes(doc.rawSpecintro)) {
        row.spbRawVariants.push(doc.rawSpecintro);
      }
    }
    // если SSOT не найден — не теряем врача (попадёт в needs_review)
    if (!doc.ssot.length) {
      /* handled in variants */
    }
    void bySlug;
  }
  return ssotCatalog;
}

function buildMergeCsvRows(ssotCatalog) {
  return ssotCatalog.map((row) => {
    const hasChel = row.chelWpTermId != null;
    const hasSpb = row.spbDoctorsCount > 0;
    let mergeStatus = 'yandex_only';
    if (hasChel && hasSpb) mergeStatus = 'chel_spb';
    else if (hasChel) mergeStatus = 'chel_only';
    else if (hasSpb) mergeStatus = 'spb_only';

    return {
      ssot_slug: row.slug,
      yandex_name: row.yandexName,
      chel_wp_term_id: row.chelWpTermId ?? '',
      chel_wp_name: row.chelWpName ?? '',
      chel_doctors_count: row.chelDoctorsCount,
      spb_doctors_count: row.spbDoctorsCount,
      spb_raw_variants: row.spbRawVariants.join(' || '),
      manual_merge: '', // правки человека, если auto неверно
      merge_status: mergeStatus,
      notes: '',
    };
  });
}

async function main() {
  console.log('SSOT: словарь Яндекс (ACF)…');
  const yandexDict = await loadYandexDictionary();
  console.log(`  ${yandexDict.length} позиций`);

  console.log('ЧЛБ: WP speclist + feed_spec…');
  const [wpTerms, chelUsage] = await Promise.all([
    fetchWpSpeclistTerms(),
    fetchChelFeedSpecUsage(),
  ]);
  console.log(`  WP terms: ${wpTerms.length}, врачей: ${chelUsage.doctorTotal}`);

  console.log('СПб: карточки /sotrudniki/ → SSOT…');
  const spb = await fetchSpbDoctorsWithSsot(yandexDict);
  const mapped = spb.doctors.filter((d) => d.ssot.length > 0).length;
  const needsReview = spb.doctors.filter((d) => !d.ssot.length).length;
  console.log(
    `  страниц: ${spb.staffPages}, врачей: ${spb.doctors.length}, с SSOT: ${mapped}, без match: ${needsReview}`,
  );

  let ssotCatalog = buildSsotCatalog(yandexDict, wpTerms, chelUsage);
  ssotCatalog = applySpbToCatalog(ssotCatalog, spb.doctors);

  // WP-термины вне словаря Яндекс
  const yandexNorms = new Set(yandexDict.map(norm));
  const wpExtras = wpTerms.filter((t) => !yandexNorms.has(norm(t.name)));

  await fs.mkdir(OUT_DIR, { recursive: true });

  const ssotJson = {
    version: 1,
    ssot: 'yandex_speclist',
    description:
      'Единый справочник специальностей. Канон = словарь Яндекс.Врачи (ACF feed_spec). СПб specintro приводится к этим slug при синке.',
    generatedAt: new Date().toISOString(),
    sources: {
      acf: 'acf/acf-export-2026-07-01.json',
      chelWp: 'https://ci74.ru/wp-json/wp/v2/speclist',
      spbPages: 'https://cispb.com/sitemap.xml → /sotrudniki/*',
    },
    items: ssotCatalog,
    wpExtras,
    stats: {
      total: ssotCatalog.length,
      chelUsed: ssotCatalog.filter((r) => r.chelDoctorsCount > 0).length,
      spbUsed: ssotCatalog.filter((r) => r.spbDoctorsCount > 0).length,
      bothCities: ssotCatalog.filter((r) => r.chelDoctorsCount > 0 && r.spbDoctorsCount > 0).length,
      spbDoctorsMapped: mapped,
      spbDoctorsNeedsReview: needsReview,
    },
  };
  await fs.writeFile(path.join(OUT_DIR, 'specialty-ssot.json'), JSON.stringify(ssotJson, null, 2), 'utf8');

  const mergeRows = buildMergeCsvRows(ssotCatalog);
  const mergeHeaders = [
    'ssot_slug',
    'yandex_name',
    'chel_wp_term_id',
    'chel_wp_name',
    'chel_doctors_count',
    'spb_doctors_count',
    'spb_raw_variants',
    'manual_merge',
    'merge_status',
    'notes',
  ];
  const mergeCsv =
    mergeHeaders.join(',') +
    '\n' +
    mergeRows.map((r) => mergeHeaders.map((h) => csvEscape(r[h])).join(',')).join('\n') +
    '\n';
  await fs.writeFile(path.join(OUT_DIR, 'specialty-merge.csv'), mergeCsv, 'utf8');

  const spbMapHeaders = [
    'spb_raw_specintro',
    'spb_doctors_count',
    'auto_ssot',
    'auto_ssot_slugs',
    'confidence',
    'manual_merge',
    'examples',
    'corpus_sample',
  ];
  const spbVariants = spb.variants.sort((a, b) => b.doctorCount - a.doctorCount);
  const spbCsv =
    spbMapHeaders.join(',') +
    '\n' +
    spbVariants
      .map((v) =>
        [
          csvEscape(v.rawText),
          v.doctorCount,
          csvEscape(v.ssot.join('; ')),
          csvEscape(v.ssotSlugs.join('; ')),
          v.confidence,
          csvEscape(v.manual_merge),
          csvEscape(v.examples.join('; ')),
          csvEscape(v.corpusSample),
        ].join(','),
      )
      .join('\n') +
    '\n';
  await fs.writeFile(path.join(OUT_DIR, 'spb-specintro-to-ssot.csv'), spbCsv, 'utf8');

  const doctorMap = {
    generatedAt: new Date().toISOString(),
    ssot: 'yandex_speclist',
    doctors: spb.doctors.map((d) => ({
      slug: d.slug,
      fullName: d.fullName,
      url: d.url,
      rawSpecintro: d.rawSpecintro,
      ssot: d.ssot,
      ssotSlugs: d.ssotSlugs,
      confidence: d.confidence,
    })),
  };
  await fs.writeFile(
    path.join(OUT_DIR, 'spb-doctor-specialty-map.json'),
    JSON.stringify(doctorMap, null, 2),
    'utf8',
  );

  const meta = {
    generatedAt: new Date().toISOString(),
    ssotFile: 'specialty-ssot.json',
    instructions: {
      merge: 'manual_merge в specialty-merge.csv — только если auto неверно',
      spb: 'spb-specintro-to-ssot.csv: confidence=needs_review требует ручной правки manual_merge',
      sync: 'При синке СПб: Doctor.specialties = ssotSlugs из spb-doctor-specialty-map.json',
    },
    stats: ssotJson.stats,
    needsReview: spb.doctors.filter((d) => !d.ssot.length || d.confidence === 'low'),
  };
  await fs.writeFile(path.join(OUT_DIR, 'specialty-merge.meta.json'), JSON.stringify(meta, null, 2), 'utf8');

  // legacy filename для совместимости
  await fs.writeFile(path.join(OUT_DIR, 'specialty-spb-specintro.csv'), spbCsv, 'utf8');

  console.log('\nГотово:');
  console.log(`  ${path.join(OUT_DIR, 'specialty-ssot.json')}`);
  console.log(`  ${path.join(OUT_DIR, 'specialty-merge.csv')}`);
  console.log(`  ${path.join(OUT_DIR, 'spb-specintro-to-ssot.csv')}`);
  console.log(`  ${path.join(OUT_DIR, 'spb-doctor-specialty-map.json')}`);
  console.log(`\nСПб → SSOT: ${mapped}/${spb.doctors.length} врачей`);
  console.log(`SSOT позиций с врачами СПб: ${ssotJson.stats.spbUsed}`);
  console.log(`Общих ЧЛБ+СПб: ${ssotJson.stats.bothCities}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
