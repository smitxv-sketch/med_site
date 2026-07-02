#!/usr/bin/env node
/**
 * Глубокий аудит полей услуг ЧЛБ (WP post_type=services) + termmeta рубрик directions.
 * Throttle Beget: chunk + delay между запросами.
 *
 * Запуск:
 *   npx tsx scripts/analyze-chel-services-fields.mjs
 *   npx tsx scripts/analyze-chel-services-fields.mjs --directions-only
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dbChel } from '../server/dbChel.js';
import { LEGACY_DB_GUARD } from '../server/config/legacyDbGuard.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT_SERVICES = path.join(ROOT, 'docs/mappings/chel-services-fields-audit.json');
const OUT_DIRECTIONS = path.join(ROOT, 'docs/mappings/chel-directions-termmeta-audit.json');

const CHUNK = 50;
const DELAY_MS = LEGACY_DB_GUARD.queryDelayMs;

function loadEnv(rel) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 1) continue;
    const key = t.slice(0, eq).trim();
    if (!process.env[key]) process.env[key] = t.slice(eq + 1).trim();
  }
}

loadEnv('infra/env/legacy-bridge-istochnik.env');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isFilled(val) {
  if (val === null || val === undefined) return false;
  const s = String(val).trim();
  if (!s || s === '0' || s === 'false' || s === '[]' || s === '{}') return false;
  return true;
}

function classifyMetaKey(key) {
  if (key.startsWith('_') && key !== '_thumbnail_id') return 'acf_ref';
  if (key.startsWith('dextra')) return 'dextra';
  if (key.startsWith('_edit_') || key.startsWith('_oembed_')) return 'system';
  return 'content';
}

function updateFieldStats(stats, key, value, postId) {
  if (!stats[key]) {
    stats[key] = {
      filled: 0,
      empty: 0,
      maxLen: 0,
      samples: [],
      looksJson: 0,
      looksHtml: 0,
    };
  }
  const row = stats[key];
  if (isFilled(value)) {
    row.filled += 1;
    const s = String(value);
    row.maxLen = Math.max(row.maxLen, s.length);
    if (s.startsWith('[') || s.startsWith('{')) row.looksJson += 1;
    if (/<[a-z][\s\S]*>/i.test(s)) row.looksHtml += 1;
    if (row.samples.length < 3) {
      row.samples.push({
        postId,
        preview: s.length > 120 ? `${s.slice(0, 120)}…` : s,
      });
    }
  } else {
    row.empty += 1;
  }
}

async function countServices() {
  const [rows] = await dbChel.query(
    `SELECT post_status, COUNT(*) AS c
     FROM wp_posts WHERE post_type = 'services'
     GROUP BY post_status`,
  );
  const byStatus = {};
  let total = 0;
  for (const r of rows) {
    byStatus[r.post_status] = Number(r.c);
    total += Number(r.c);
  }
  return { total, byStatus };
}

async function auditServices() {
  const counts = await countServices();
  const totalPublished = counts.byStatus.publish ?? 0;
  console.log(`Услуги ЧЛБ: всего ${counts.total}, publish ${totalPublished}`);

  const postFieldStats = {
    post_content: { filled: 0, empty: 0, maxLen: 0 },
    post_excerpt: { filled: 0, empty: 0, maxLen: 0 },
  };
  const metaByClass = { content: {}, acf_ref: {}, dextra: {}, system: {} };
  const taxonomyStats = {};
  const allTaxonomies = new Set();

  let offset = 0;
  let scanned = 0;

  while (offset < totalPublished) {
    const [posts] = await dbChel.query(
      `SELECT ID, post_title, post_name, post_content, post_excerpt, post_status, post_parent, menu_order
       FROM wp_posts
       WHERE post_type = 'services' AND post_status = 'publish'
       ORDER BY ID ASC
       LIMIT ? OFFSET ?`,
      [CHUNK, offset],
    );
    if (!posts.length) break;

    const ids = posts.map((p) => p.ID);

    for (const p of posts) {
      for (const field of ['post_content', 'post_excerpt']) {
        const val = p[field];
        const st = postFieldStats[field];
        if (isFilled(val)) {
          st.filled += 1;
          st.maxLen = Math.max(st.maxLen, String(val).length);
        } else {
          st.empty += 1;
        }
      }
    }

    const [meta] = await dbChel.query(
      `SELECT post_id, meta_key, meta_value FROM wp_postmeta WHERE post_id IN (?)`,
      [ids],
    );

    for (const m of meta) {
      const cls = classifyMetaKey(m.meta_key);
      if (cls === 'system') continue;
      updateFieldStats(metaByClass[cls], m.meta_key, m.meta_value, m.post_id);
    }

    const [tax] = await dbChel.query(
      `SELECT tr.object_id, tt.taxonomy, t.term_id, t.name, t.slug
       FROM wp_term_relationships tr
       JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
       JOIN wp_terms t ON tt.term_id = t.term_id
       WHERE tr.object_id IN (?)`,
      [ids],
    );

    for (const t of tax) {
      allTaxonomies.add(t.taxonomy);
      if (!taxonomyStats[t.taxonomy]) taxonomyStats[t.taxonomy] = { posts: 0, uniqueTerms: new Set() };
      taxonomyStats[t.taxonomy].posts += 1;
      taxonomyStats[t.taxonomy].uniqueTerms.add(t.term_id);
    }

    scanned += posts.length;
    offset += CHUNK;
    process.stdout.write(`\rУслуги: ${scanned}/${totalPublished}`);
    await sleep(DELAY_MS);
  }

  console.log('\nГотово по услугам.');

  const serializeMeta = (bucket) =>
    Object.fromEntries(
      Object.entries(bucket)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, st]) => [
          key,
          {
            ...st,
            pct: scanned ? Math.round((st.filled / scanned) * 100) : 0,
          },
        ]),
    );

  const taxOut = {};
  for (const [tax, st] of Object.entries(taxonomyStats)) {
    taxOut[tax] = { postLinks: st.posts, uniqueTerms: st.uniqueTerms.size };
  }

  return {
    generatedAt: new Date().toISOString(),
    postType: 'services',
    counts,
    scannedPublished: scanned,
    postFields: Object.fromEntries(
      Object.entries(postFieldStats).map(([k, st]) => [
        k,
        { ...st, pct: scanned ? Math.round((st.filled / scanned) * 100) : 0 },
      ]),
    ),
    metaContent: serializeMeta(metaByClass.content),
    metaAcfRefs: serializeMeta(metaByClass.acf_ref),
    metaDextra: serializeMeta(metaByClass.dextra),
    taxonomies: taxOut,
    taxonomyList: [...allTaxonomies].sort(),
  };
}

async function auditDirectionsTermmeta() {
  const [[{ total }]] = await dbChel.query(
    `SELECT COUNT(*) AS total FROM wp_terms t
     JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
     WHERE tt.taxonomy = 'directions'`,
  );

  console.log(`Рубрики directions: ${total} терминов`);

  const metaStats = { content: {}, acf_ref: {} };
  const termWithMeta = { any: 0, doctor_id: 0, text: 0, seo: 0, about: 0 };

  let offset = 0;
  let scanned = 0;

  while (offset < total) {
    const [terms] = await dbChel.query(
      `SELECT t.term_id AS id, t.name, t.slug, tt.parent, tt.description
       FROM wp_terms t
       JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
       WHERE tt.taxonomy = 'directions'
       ORDER BY t.term_id ASC
       LIMIT ? OFFSET ?`,
      [CHUNK, offset],
    );
    if (!terms.length) break;

    const ids = terms.map((t) => t.id);
    const [meta] = await dbChel.query(
      `SELECT term_id, meta_key, meta_value FROM wp_termmeta WHERE term_id IN (?)`,
      [ids],
    );

    const byTerm = new Map();
    for (const m of meta) {
      if (!byTerm.has(m.term_id)) byTerm.set(m.term_id, []);
      byTerm.get(m.term_id).push(m);
    }

    for (const term of terms) {
      const rows = byTerm.get(term.id) || [];
      if (rows.length) termWithMeta.any += 1;

      const content = {};
      for (const m of rows) {
        const cls = classifyMetaKey(m.meta_key);
        if (cls === 'system' || cls === 'dextra') continue;
        if (cls === 'content') content[m.meta_key] = m.meta_value;
        updateFieldStats(metaStats[cls === 'acf_ref' ? 'acf_ref' : 'content'], m.meta_key, m.meta_value, term.id);
      }

      if (isFilled(content.doctor_id)) termWithMeta.doctor_id += 1;
      if (isFilled(content.text)) termWithMeta.text += 1;
      if (isFilled(content.seo_title) || isFilled(content.seo_description)) termWithMeta.seo += 1;
      if (isFilled(content.about_text) || isFilled(content.about_header)) termWithMeta.about += 1;
    }

    scanned += terms.length;
    offset += CHUNK;
    process.stdout.write(`\rDirections: ${scanned}/${total}`);
    await sleep(DELAY_MS);
  }

  console.log('\nГотово по directions termmeta.');

  const serialize = (bucket) =>
    Object.fromEntries(
      Object.entries(bucket)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, st]) => [
          key,
          { ...st, pct: scanned ? Math.round((st.filled / scanned) * 100) : 0 },
        ]),
    );

  return {
    generatedAt: new Date().toISOString(),
    taxonomy: 'directions',
    totalTerms: total,
    scannedTerms: scanned,
    termWithMeta,
    metaContent: serialize(metaStats.content),
    metaAcfRefs: serialize(metaStats.acf_ref),
  };
}

const directionsOnly = process.argv.includes('--directions-only');
const servicesOnly = process.argv.includes('--services-only');

if (!directionsOnly) {
  const servicesAudit = await auditServices();
  fs.mkdirSync(path.dirname(OUT_SERVICES), { recursive: true });
  fs.writeFileSync(OUT_SERVICES, JSON.stringify(servicesAudit, null, 2));
  console.log('saved', OUT_SERVICES);
}

if (!servicesOnly) {
  const directionsAudit = await auditDirectionsTermmeta();
  fs.writeFileSync(OUT_DIRECTIONS, JSON.stringify(directionsAudit, null, 2));
  console.log('saved', OUT_DIRECTIONS);
}
