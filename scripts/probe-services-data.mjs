#!/usr/bin/env node
/**
 * Глубокий аудит данных услуг/цен: QMS + legacy ЧЛБ/СПб через bridge.
 * Запуск: node scripts/probe-services-data.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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
loadEnv('infra/env/qms-price.env');

const TOKEN = process.env.BRIDGE_API_TOKEN || process.env.LEGACY_BRIDGE_TOKEN;
const BASE = process.env.BRIDGE_URL || 'https://bridge.istochnik.smitx.ru';

async function api(pathname, { paginate = false, limit = 100, delayMs = 500 } = {}) {
  const items = [];
  let offset = 0;

  while (true) {
    const sep = pathname.includes('?') ? '&' : '?';
    const url = `${BASE}${pathname}${sep}limit=${limit}&offset=${offset}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      signal: AbortSignal.timeout(120_000),
    });
    const json = await res.json();
    if (json.error) throw new Error(`${pathname}: ${json.error}`);

    if (!paginate) return json;

    const chunk = Array.isArray(json) ? json : json.data ?? json.items ?? [];
    items.push(...chunk);
    if (chunk.length < limit) break;
    offset += limit;
    await new Promise((r) => setTimeout(r, delayMs));
  }

  return items;
}

function summarizeSpbPrices(rows) {
  const tabs = new Map();
  let published = 0;
  let hidden = 0;
  let noArt = 0;
  const artSet = new Set();

  for (const r of rows) {
    const tab = String(r.tab ?? '(пусто)').trim();
    tabs.set(tab, (tabs.get(tab) ?? 0) + 1);
    if (Number(r.published) === 1) published++;
    else hidden++;
    const art = String(r.doc_id ?? '').trim();
    if (!art) noArt++;
    else artSet.add(art);
  }

  return {
    total: rows.length,
    published,
    hidden,
    noArt,
    uniqueArticles: artSet.size,
    topTabs: [...tabs.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20),
  };
}

function summarizeChelServices(rows) {
  let withArticle = 0;
  let withPrice = 0;
  const artSet = new Set();
  const taxCounts = new Map();
  const metaKeys = new Map();

  for (const r of rows) {
    const meta = r.meta ?? r;
    const art = String(r.article ?? meta.article ?? '').trim();
    if (art) {
      withArticle++;
      artSet.add(art);
    }
    const price = String(r.price ?? meta.price ?? '').trim();
    if (price) withPrice++;

    for (const t of r.taxonomies ?? []) {
      taxCounts.set(t.taxonomy, (taxCounts.get(t.taxonomy) ?? 0) + 1);
    }
    for (const k of Object.keys(meta)) {
      if (!k.startsWith('_')) metaKeys.set(k, (metaKeys.get(k) ?? 0) + 1);
    }
  }

  return {
    total: rows.length,
    withArticle,
    uniqueArticles: artSet.size,
    withPrice,
    taxonomies: [...taxCounts.entries()],
    topMetaKeys: [...metaKeys.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15),
  };
}

function collectQmsArticles(qmsJson) {
  const arts = new Set();
  let count = 0;
  for (const org of qmsJson.data?.orgs ?? []) {
    count += org.itemCount ?? 0;
    for (const sec of org.sections ?? []) {
      for (const row of sec.rows ?? []) {
        if (row.Duv) arts.add(String(row.Duv).trim());
      }
    }
  }
  return { count, arts };
}

async function main() {
  if (!TOKEN) {
    console.error('Нет BRIDGE_API_TOKEN в infra/env/legacy-bridge-istochnik.env');
    process.exit(1);
  }

  const report = { generatedAt: new Date().toISOString(), sections: {} };

  // --- QMS ---
  for (const city of ['spb', 'chel']) {
    try {
      const j = await api(`/api/qms/pricelist?city=${city}`);
      const { count, arts } = collectQmsArticles(j);
      report.sections[`qms_${city}`] = {
        orgCount: j._meta?.orgCount,
        itemCount: count,
        uniqueArticles: arts.size,
        transport: j._meta?.transport ?? j.data?.transport,
        errors: j.errors ?? j.data?.errors,
      };
    } catch (e) {
      report.sections[`qms_${city}`] = { error: e.message };
    }
  }

  // --- SPB pricelist_items2 ---
  try {
    const rows = await api('/api/explore/spb/pricelist', { paginate: true, limit: 100 });
    const summary = summarizeSpbPrices(rows);
    const cardio = rows.filter(
      (r) => /кардиолог/i.test(r.tab ?? '') || /кардиолог/i.test(r.name ?? ''),
    );
    report.sections.spb_pricelist = {
      ...summary,
      cardioRows: cardio.length,
      cardioPublished: cardio.filter((r) => Number(r.published) === 1).length,
      cardioSample: cardio.slice(0, 3).map((r) => ({
        tab: r.tab,
        name: r.name,
        doc_id: r.doc_id,
        price: r.price,
        published: r.published,
      })),
    };
    report._spbPricesRaw = rows;
  } catch (e) {
    report.sections.spb_pricelist = { error: e.message };
  }

  // --- SPB services / programs ---
  try {
    const services = await api('/api/explore/spb/services', { paginate: true, limit: 50 });
    report.sections.spb_services = {
      total: services.length,
      template6: services.filter((r) => r.template === 6).length,
      template32: services.filter((r) => r.template === 32).length,
      uniqueParents: new Set(services.map((r) => r.parent)).size,
    };
  } catch (e) {
    report.sections.spb_services = { error: e.message };
  }

  try {
    const programs = await api('/api/explore/spb/programs', { paginate: true, limit: 50 });
    report.sections.spb_programs = {
      total: programs.length,
      sample: programs.slice(0, 2).map((p) => ({
        id: p.id,
        pagetitle: p.pagetitle,
        tvKeys: Object.keys(p.tvs ?? {}),
      })),
    };
  } catch (e) {
    report.sections.spb_programs = { error: e.message };
  }

  // --- CHEL services (throttle: chunk 25) ---
  try {
    const rows = await api('/api/explore/chel/services', { paginate: true, limit: 25, delayMs: 600 });
    report.sections.chel_services = summarizeChelServices(rows);
    report._chelServicesRaw = rows;
  } catch (e) {
    report.sections.chel_services = { error: e.message };
  }

  try {
    const dirs = await api('/api/explore/chel/directions?limit=200');
    const list = Array.isArray(dirs) ? dirs : dirs.data ?? [];
    const roots = list.filter((d) => !d.parent || d.parent === '0' || d.parent === 0);
    report.sections.chel_directions = {
      total: list.length,
      roots: roots.length,
      rootSample: roots.slice(0, 8).map((d) => ({
        id: d.term_id ?? d.ID,
        name: d.name,
        count: d.count,
        child_count: d.child_count,
      })),
    };
  } catch (e) {
    report.sections.chel_directions = { error: e.message };
  }

  // --- Overlap SPB ---
  try {
    const qmsJ = await api('/api/qms/pricelist?city=spb');
    const legacy = report._spbPricesRaw ?? (await api('/api/explore/spb/pricelist', { paginate: true }));
    const { arts: qmsArts } = collectQmsArticles(qmsJ);
    const legArts = new Set(legacy.map((r) => String(r.doc_id ?? '').trim()).filter(Boolean));
    const legPubArts = new Set(
      legacy
        .filter((r) => Number(r.published) === 1)
        .map((r) => String(r.doc_id ?? '').trim())
        .filter(Boolean),
    );
    let matched = 0;
    let pubMatched = 0;
    for (const a of legArts) if (qmsArts.has(a)) matched++;
    for (const a of legPubArts) if (qmsArts.has(a)) pubMatched++;

    report.sections.overlap_spb = {
      qmsUnique: qmsArts.size,
      legacyUnique: legArts.size,
      legacyPublishedRows: legacy.filter((r) => Number(r.published) === 1).length,
      legacyPublishedArticles: legPubArts.size,
      matchedArticles: matched,
      publishedMatched: pubMatched,
      inQmsNotOnSite: [...qmsArts].filter((a) => !legArts.has(a)).length,
      onSiteNotInQms: [...legArts].filter((a) => !qmsArts.has(a)).length,
      onSiteNotInQmsSample: [...legArts].filter((a) => !qmsArts.has(a)).slice(0, 10),
    };
  } catch (e) {
    report.sections.overlap_spb = { error: e.message };
  }

  // --- Overlap CHEL ---
  try {
    const qmsJ = await api('/api/qms/pricelist?city=chel');
    const legacy = report._chelServicesRaw ?? [];
    const { arts: qmsArts } = collectQmsArticles(qmsJ);
    const legArts = new Set();
    for (const r of legacy) {
      const art = String(r.article ?? r.meta?.article ?? '').trim();
      if (art) legArts.add(art);
    }
    let matched = 0;
    for (const a of legArts) if (qmsArts.has(a)) matched++;

    report.sections.overlap_chel = {
      qmsUnique: qmsArts.size,
      legacyServices: legacy.length,
      legacyWithArticle: legArts.size,
      matchedArticles: matched,
      inQmsNotOnSite: [...qmsArts].filter((a) => !legArts.has(a)).length,
      onSiteNotInQms: [...legArts].filter((a) => !qmsArts.has(a)).length,
    };
  } catch (e) {
    report.sections.overlap_chel = { error: e.message };
  }

  delete report._spbPricesRaw;
  delete report._chelServicesRaw;

  const outPath = path.join(ROOT, 'docs', 'mappings', 'service-data-probe.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  console.log('\nSaved:', outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
