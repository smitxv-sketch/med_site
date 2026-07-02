#!/usr/bin/env node
/**
 * Снимок MODX врачей СПб + (опционально) QMS через прокси для маппинга qms_id.
 * node scripts/probe-spb-doctor-mapping.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadEnv(rel) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 1) continue;
    const k = t.slice(0, eq).trim();
    const v = t.slice(eq + 1).trim();
    if (!process.env[k]) process.env[k] = v;
  }
}

loadEnv('infra/env/legacy-bridge-istochnik.env');

const MIS_KEYS = ['qms_id', 'mis_id', 'misId', 'qqc', 'doctor_qms'];

async function fetchModxDoctors() {
  const pool = mysql.createPool({
    host: process.env.SPB_DB_HOST,
    port: Number(process.env.SPB_DB_PORT || 3306),
    user: process.env.SPB_DB_USER,
    password: process.env.SPB_DB_PASSWORD,
    database: process.env.SPB_DB_NAME,
    connectionLimit: 1,
  });
  const prefix = process.env.SPB_DB_PREFIX || 'modx_';

  const [docs] = await pool.query(`
    SELECT c.id, c.pagetitle, c.alias
    FROM ${prefix}site_content c
    WHERE c.template = 7 AND c.parent != 209 AND c.published = 1 AND c.deleted = 0
    ORDER BY c.pagetitle
  `);

  const ids = docs.map((d) => d.id);
  const [tvs] = ids.length
    ? await pool.query(
        `
    SELECT tvc.contentid AS id, tv.name AS tv_name, tvc.value
    FROM ${prefix}site_tmplvar_contentvalues tvc
    JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
    WHERE tvc.contentid IN (?) AND tv.name IN (?)
  `,
        [ids, MIS_KEYS],
      )
    : [[]];

  const misById = new Map();
  for (const r of tvs) {
    const cur = misById.get(r.id) || {};
    cur[r.tv_name] = r.value;
    misById.set(r.id, cur);
  }

  const doctors = docs.map((d) => {
    const m = misById.get(d.id) || {};
    const mis = MIS_KEYS.map((k) => m[k]).find(Boolean) || '';
    return { legacyId: String(d.id), fullName: d.pagetitle, alias: d.alias, misId: mis || null };
  });

  await pool.end();
  return doctors;
}

async function fetchQmsDoctors() {
  const proxyUrl = process.env.QMS_SPB_SITE_PROXY_URL;
  const apikey = process.env.QMS_SPB_API_KEY;
  const qqc244 = process.env.QMS_SPB_ORG;
  if (!proxyUrl || !apikey || !qqc244) {
    return { error: 'missing QMS_SPB_* env', doctors: [] };
  }

  const endpointUrl = (endpoint) =>
    proxyUrl.includes('endpoint=')
      ? proxyUrl.replace(/endpoint=[^&]+/, `endpoint=${endpoint}`)
      : `${proxyUrl}${proxyUrl.includes('?') ? '&' : '?'}endpoint=${endpoint}`;

  async function post(endpoint, body) {
    const res = await fetch(endpointUrl(endpoint), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(120_000),
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
    return JSON.parse(text);
  }

  const specRes = await post('spec_list', { apikey, unauthorized: 1, qqc244, chatid: '999' });
  const specs = specRes.spec || specRes.data?.spec || [];
  const doctors = new Map();

  for (const spec of specs) {
    try {
      const r = await post('getslotsbyspec', { apikey, unauthorized: 1, qqc244, chatid: '999', spec });
      const blocks = r.slots || r.data?.slots || [];
      for (const b of blocks) {
        const id = b.qqc;
        if (!id) continue;
        if (!doctors.has(id)) {
          doctors.set(id, { misId: id, fullName: b.doctor || b.fio || '', specs: new Set() });
        }
        doctors.get(id).specs.add(spec);
      }
      await new Promise((r) => setTimeout(r, 200));
    } catch (e) {
      console.warn('[qms] spec failed:', spec, e.message);
    }
  }

  return {
    specsCount: specs.length,
    doctors: [...doctors.values()].map((d) => ({
      misId: d.misId,
      fullName: d.fullName,
      specs: [...d.specs],
    })),
  };
}

function normalizeName(s) {
  return (s || '')
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/\s+/g, ' ');
}

function scoreNames(a, b) {
  const aw = normalizeName(a).split(' ').filter(Boolean);
  const bw = normalizeName(b).split(' ').filter(Boolean);
  let matches = 0;
  for (const w of aw) if (bw.includes(w)) matches++;
  return matches / Math.max(aw.length, bw.length, 1);
}

function suggestMatches(modx, qms) {
  const usedQms = new Set();
  const suggestions = [];
  for (const m of modx) {
    let best = null;
    let bestScore = 0;
    for (const q of qms) {
      if (usedQms.has(q.misId)) continue;
      const score = scoreNames(m.fullName, q.fullName);
      if (score > bestScore) {
        bestScore = score;
        best = q;
      }
    }
    if (best && bestScore >= 0.5) {
      usedQms.add(best.misId);
      suggestions.push({
        modxId: m.legacyId,
        modxName: m.fullName,
        qmsId: best.misId,
        qmsName: best.fullName,
        confidence: Math.round(bestScore * 100) / 100,
      });
    }
  }
  return suggestions.sort((a, b) => b.confidence - a.confidence);
}

const modx = await fetchModxDoctors();
const withMis = modx.filter((d) => d.misId).length;
console.log('MODX doctors:', modx.length, '| with MIS TV:', withMis);

let qms = { doctors: [] };
try {
  qms = await fetchQmsDoctors();
  if (qms.error) console.log('QMS skip:', qms.error);
  else console.log('QMS doctors:', qms.doctors.length, '| specs:', qms.specsCount);
} catch (e) {
  console.log('QMS fetch failed:', e.message);
}

if (qms.doctors?.length) {
  const suggestions = suggestMatches(modx, qms.doctors);
  console.log('\nTop match suggestions:');
  for (const s of suggestions.slice(0, 10)) {
    console.log(JSON.stringify(s));
  }
  const ambiguous = suggestions.filter((s) => s.confidence < 0.85);
  console.log('\nNeeds review (<0.85):', ambiguous.length);
}

const out = path.join(ROOT, 'docs/mappings/spb-doctor-qms-probe.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(
  out,
  JSON.stringify({ generatedAt: new Date().toISOString(), modx, qms: qms.doctors || [], error: qms.error }, null, 2),
);
console.log('\nWrote', out);
