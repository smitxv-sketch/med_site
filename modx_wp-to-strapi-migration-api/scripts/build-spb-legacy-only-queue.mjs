#!/usr/bin/env node
/** Очередь legacy-only артикулов СПб → docs/mappings/spb-legacy-only-queue.json */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LegacyMysqlGateway } from '../server/legacy/LegacyMysqlGateway.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'docs/mappings/spb-legacy-only-queue.json');

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

const trim = (s) => String(s ?? '').trim();
const normTitle = (s) =>
  trim(s)
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ');

function titleScore(a, b) {
  const ta = new Set(normTitle(a).split(' ').filter((w) => w.length > 2));
  const tb = new Set(normTitle(b).split(' ').filter((w) => w.length > 2));
  if (!ta.size || !tb.size) return 0;
  let inter = 0;
  for (const w of ta) if (tb.has(w)) inter += 1;
  return inter / Math.max(ta.size, tb.size);
}

function findBestQmsAnalog(title, qmsList) {
  let best = null;
  for (const q of qmsList) {
    const score = titleScore(title, q.title);
    if (score < 0.45) continue;
    if (!best || score > best.score) {
      best = {
        article: q.article,
        title: q.title,
        price: q.price,
        score: Math.round(score * 100) / 100,
      };
    }
  }
  return best;
}

const gw = LegacyMysqlGateway.get('spb');
const prefix = gw.getPrefix();

const [lrows] = await gw.query(`
  SELECT TRIM(doc_id) AS article, MAX(name) AS title, MAX(price) AS price,
         GROUP_CONCAT(DISTINCT TRIM(category) ORDER BY category SEPARATOR ' | ') AS categories
  FROM ${prefix}pricelist_items2
  WHERE (deleted IS NULL OR deleted = 0) AND published = 1 AND TRIM(doc_id) != ''
  GROUP BY TRIM(doc_id)
`);

const qmsRes = await fetch('https://bridge.istochnik.smitx.ru/api/qms/pricelist?city=spb', {
  headers: { Authorization: `Bearer ${process.env.BRIDGE_API_TOKEN}` },
});
const qms = await qmsRes.json();
const qmsArticles = new Set();
const qmsList = [];
for (const org of qms.data?.orgs || []) {
  for (const sec of org.sections || []) {
    for (const row of sec.rows || []) {
      const a = trim(row.Duv || row.article);
      if (!a) continue;
      qmsArticles.add(a);
      qmsList.push({ article: a, title: trim(row.u || row.title), price: trim(row.Mr70 || row.price) });
    }
  }
}

const rows = [];
for (const r of lrows) {
  const article = trim(r.article);
  if (!article || qmsArticles.has(article)) continue;
  rows.push({
    article,
    title: trim(r.title),
    modxPrice: trim(r.price),
    legacyOnly: true,
    categories: trim(r.categories).split('|').map((s) => s.trim()).filter(Boolean),
    qmsAnalog: findBestQmsAnalog(trim(r.title), qmsList),
  });
}
rows.sort((a, b) => a.article.localeCompare(b.article, 'ru'));

const queue = {
  generatedAt: new Date().toISOString(),
  count: rows.length,
  rows,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(queue, null, 2));
console.log(
  JSON.stringify(
    { saved: OUT, count: queue.count, withAnalog: rows.filter((r) => r.qmsAnalog).length },
    null,
    2,
  ),
);
