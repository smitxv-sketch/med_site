#!/usr/bin/env node
/**
 * Глубокий probe связей и «хвостов» услуг ЧЛБ:
 * - сколько directions на пост
 * - FAQ / отзывы / другие post_type
 * - полный список meta_key (включая _)
 * - item_view детальные страницы
 * - post_parent / menu_order
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dbChel } from '../server/dbChel.js';
import { LEGACY_DB_GUARD } from '../server/config/legacyDbGuard.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'docs/mappings/chel-services-relations-audit.json');
const DELAY = LEGACY_DB_GUARD.queryDelayMs;

function loadEnv(rel) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 1) continue;
    const k = t.slice(0, eq).trim();
    if (!process.env[k]) process.env[k] = t.slice(eq + 1).trim();
  }
}
loadEnv('infra/env/legacy-bridge-istochnik.env');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- 1. Распределение: сколько directions на услугу ---
const [dirPerPost] = await dbChel.query(`
  SELECT direction_count, COUNT(*) AS posts
  FROM (
    SELECT p.ID,
      COUNT(DISTINCT CASE WHEN tt.taxonomy = 'directions' THEN t.term_id END) AS direction_count
    FROM wp_posts p
    LEFT JOIN wp_term_relationships tr ON tr.object_id = p.ID
    LEFT JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
    LEFT JOIN wp_terms t ON tt.term_id = t.term_id
    WHERE p.post_type = 'services' AND p.post_status = 'publish'
    GROUP BY p.ID
  ) x
  GROUP BY direction_count
  ORDER BY direction_count
`);

// --- 2. Все taxonomies на services (не только directions) ---
const [allTax] = await dbChel.query(`
  SELECT tt.taxonomy, COUNT(DISTINCT tr.object_id) AS posts, COUNT(*) AS links
  FROM wp_term_relationships tr
  JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
  JOIN wp_posts p ON p.ID = tr.object_id
  WHERE p.post_type = 'services' AND p.post_status = 'publish'
  GROUP BY tt.taxonomy
  ORDER BY links DESC
`);
await sleep(DELAY);

// --- 3. Глобальный реестр meta_key на services (все статусы publish) ---
const [metaKeys] = await dbChel.query(`
  SELECT pm.meta_key,
    SUM(CASE WHEN pm.meta_value IS NOT NULL AND pm.meta_value != '' AND pm.meta_value != '0' THEN 1 ELSE 0 END) AS filled,
    COUNT(*) AS total
  FROM wp_postmeta pm
  JOIN wp_posts p ON p.ID = pm.post_id
  WHERE p.post_type = 'services' AND p.post_status = 'publish'
  GROUP BY pm.meta_key
  ORDER BY pm.meta_key
`);

// --- 4. post_parent / menu_order ---
const [parentStats] = await dbChel.query(`
  SELECT
    SUM(CASE WHEN post_parent > 0 THEN 1 ELSE 0 END) AS with_parent,
    SUM(CASE WHEN menu_order > 0 THEN 1 ELSE 0 END) AS with_menu_order,
    COUNT(*) AS total
  FROM wp_posts WHERE post_type = 'services' AND post_status = 'publish'
`);

// --- 5. FAQ: есть ли post_type faq и связь с services/directions ---
const [faqTypes] = await dbChel.query(`
  SELECT post_type, COUNT(*) c FROM wp_posts
  WHERE post_type LIKE '%faq%' OR post_type IN ('faq', 'faqs', 'vopros')
  GROUP BY post_type
`);
const [faqMeta] = await dbChel.query(`
  SELECT meta_key, COUNT(DISTINCT post_id) c
  FROM wp_postmeta
  WHERE meta_key LIKE '%service%' OR meta_key LIKE '%direction%' OR meta_key LIKE '%faq%'
  GROUP BY meta_key
  ORDER BY c DESC
  LIMIT 40
`);
await sleep(DELAY);

// --- 6. Отзывы: meta связь с услугами ---
const [reviewMeta] = await dbChel.query(`
  SELECT meta_key, COUNT(DISTINCT post_id) c
  FROM wp_postmeta pm
  JOIN wp_posts p ON p.ID = pm.post_id
  WHERE p.post_type = 'otzivi' AND p.post_status = 'publish'
    AND (meta_key LIKE '%service%' OR meta_key LIKE '%direction%' OR meta_key LIKE '%doctor%')
  GROUP BY meta_key
  ORDER BY c DESC
  LIMIT 30
`);

// --- 7. Детальные страницы item_view=1 — полный meta dump (до 10) ---
const [detailPosts] = await dbChel.query(`
  SELECT p.ID, p.post_title, p.post_name
  FROM wp_posts p
  JOIN wp_postmeta m ON m.post_id = p.ID AND m.meta_key = 'item_view' AND m.meta_value = '1'
  WHERE p.post_type = 'services' AND p.post_status = 'publish'
  LIMIT 10
`);
const detailSamples = [];
for (const post of detailPosts) {
  const [meta] = await dbChel.query(
    `SELECT meta_key, meta_value FROM wp_postmeta WHERE post_id = ? AND meta_key NOT LIKE '_edit_%'`,
    [post.ID],
  );
  const [tax] = await dbChel.query(
    `SELECT t.term_id, t.name, tt.taxonomy
     FROM wp_term_relationships tr
     JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
     JOIN wp_terms t ON tt.term_id = t.term_id
     WHERE tr.object_id = ?`,
    [post.ID],
  );
  const contentMeta = {};
  for (const m of meta) {
    if (!m.meta_key.startsWith('_')) contentMeta[m.meta_key] = m.meta_value;
  }
  detailSamples.push({
    id: post.ID,
    title: post.post_title,
    slug: post.post_name,
    contentMetaKeys: Object.keys(contentMeta),
    taxonomies: tax,
    contentMeta,
  });
  await sleep(DELAY);
}

// --- 8. Услуги с text_list (комплексы) — sample ---
const [complexPosts] = await dbChel.query(`
  SELECT p.ID, p.post_title, m.meta_value AS text_list
  FROM wp_posts p
  JOIN wp_postmeta m ON m.post_id = p.ID AND m.meta_key = 'text_list'
  WHERE p.post_type = 'services' AND p.post_status = 'publish'
    AND m.meta_value IS NOT NULL AND m.meta_value != ''
  LIMIT 5
`);

// --- 9. dextra_id vs article расхождения ---
const [dextraMismatch] = await dbChel.query(`
  SELECT COUNT(*) AS c FROM wp_posts p
  JOIN wp_postmeta a ON a.post_id = p.ID AND a.meta_key = 'article'
  JOIN wp_postmeta d ON d.post_id = p.ID AND d.meta_key = 'dextra_id'
  WHERE p.post_type = 'services' AND p.post_status = 'publish'
    AND a.meta_value != '' AND d.meta_value != ''
`);

const [[noArticle]] = await dbChel.query(`
  SELECT COUNT(*) c FROM wp_posts p
  LEFT JOIN wp_postmeta a ON a.post_id = p.ID AND a.meta_key = 'article'
  WHERE p.post_type = 'services' AND p.post_status = 'publish'
    AND (a.meta_value IS NULL OR a.meta_value = '')
`);

// --- 10. Черновики services — отличаются ли meta? ---
const [draftMetaKeys] = await dbChel.query(`
  SELECT pm.meta_key, COUNT(DISTINCT pm.post_id) c
  FROM wp_postmeta pm
  JOIN wp_posts p ON p.ID = pm.post_id
  WHERE p.post_type = 'services' AND p.post_status = 'draft'
  GROUP BY pm.meta_key
  HAVING c > 5
  ORDER BY c DESC
  LIMIT 30
`);

const out = {
  generatedAt: new Date().toISOString(),
  directionsPerService: dirPerPost,
  taxonomiesOnServices: allTax,
  metaKeyRegistry: metaKeys.map((r) => ({
    key: r.meta_key,
    filled: Number(r.filled),
    total: Number(r.total),
    pct: Math.round((Number(r.filled) / Number(r.total)) * 100),
  })),
  postStructure: parentStats[0],
  faqPostTypes: faqTypes,
  faqRelatedMetaKeys: faqMeta,
  reviewRelatedMetaKeys: reviewMeta,
  detailPageSamples: detailSamples,
  complexListSamples: complexPosts.map((p) => ({
    id: p.ID,
    title: p.post_title,
    textListPreview: String(p.text_list).slice(0, 500),
  })),
  dextra: {
    postsWithBothArticleAndDextra: Number(dextraMismatch[0]?.c ?? 0),
    publishWithoutArticle: Number(noArticle?.c ?? 0),
  },
  draftMetaKeysTop: draftMetaKeys,
  gaps: {
    note: 'FAQ на ЧЛБ — через faqs_view флаг + отдельные сущности; проверить faq post_type и termmeta faqs',
    exploreBug: "explore.ts использует post_type 'service' вместо 'services'",
  },
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log('saved', OUT);
console.log('directions per post:', dirPerPost);
console.log('taxonomies:', allTax);
console.log('meta keys count:', metaKeys.length);
