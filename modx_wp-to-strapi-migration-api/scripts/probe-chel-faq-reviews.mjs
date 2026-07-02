#!/usr/bin/env node
/** Probe FAQ и отзывов ЧЛБ — отдельные post_type и связи service_id */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dbChel } from '../server/dbChel.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'docs/mappings/chel-faq-reviews-probe.json');

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

const [postTypes] = await dbChel.query(`
  SELECT post_type, post_status, COUNT(*) c
  FROM wp_posts
  WHERE post_type LIKE '%faq%' OR post_type LIKE '%vopr%' OR post_type LIKE '%otziv%'
     OR post_type IN ('faq', 'faqs', 'vopros', 'voprosy', 'otzivi', 'review', 'reviews')
  GROUP BY post_type, post_status
  ORDER BY c DESC
`);

const [serviceIdPosts] = await dbChel.query(`
  SELECT p.post_type, COUNT(DISTINCT p.ID) posts
  FROM wp_posts p
  JOIN wp_postmeta m ON m.post_id = p.ID AND m.meta_key = 'service_id'
  WHERE m.meta_value IS NOT NULL AND m.meta_value != ''
  GROUP BY p.post_type
  ORDER BY posts DESC
  LIMIT 20
`);

const [ids] = await dbChel.query(`
  SELECT post_id FROM wp_postmeta
  WHERE meta_key = 'service_id' AND meta_value IS NOT NULL AND meta_value != ''
  LIMIT 5
`);
const idList = ids.map((r) => r.post_id);
let faqSample = [];
if (idList.length) {
  const [rows] = await dbChel.query(
    `SELECT p.ID, p.post_type, p.post_title, p.post_status,
      MAX(CASE WHEN m.meta_key = 'service_id' THEN m.meta_value END) AS service_id,
      MAX(CASE WHEN m.meta_key = 'direction_id' THEN m.meta_value END) AS direction_id
     FROM wp_posts p
     LEFT JOIN wp_postmeta m ON m.post_id = p.ID
     WHERE p.ID IN (?)
     GROUP BY p.ID, p.post_type, p.post_title, p.post_status`,
    [idList],
  );
  faqSample = rows;
}

const [reviewSample] = await dbChel.query(`
  SELECT p.ID, p.post_title,
    MAX(CASE WHEN m.meta_key = 'doctor_id' THEN m.meta_value END) AS doctor_id,
    MAX(CASE WHEN m.meta_key = 'service_id' THEN m.meta_value END) AS service_id,
    MAX(CASE WHEN m.meta_key = 'direction_id' THEN m.meta_value END) AS direction_id
  FROM wp_posts p
  LEFT JOIN wp_postmeta m ON m.post_id = p.ID
  WHERE p.post_type = 'otzivi' AND p.post_status = 'publish'
  GROUP BY p.ID, p.post_title
  LIMIT 8
`);

const out = {
  generatedAt: new Date().toISOString(),
  faqLikePostTypes: postTypes,
  postTypesWithServiceIdMeta: serviceIdPosts,
  faqLinkSamples: faqSample,
  reviewLinkSamples: reviewSample,
};

fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log('saved', OUT);
console.log(JSON.stringify(out, null, 2));
