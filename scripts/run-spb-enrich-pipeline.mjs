#!/usr/bin/env node
/**
 * Пост-деплой: enrich рубрик, программы, MODX-тексты услуг по приоритетным рубрикам.
 *   node scripts/run-spb-enrich-pipeline.mjs
 *   node scripts/run-spb-enrich-pipeline.mjs --wait-bridge  (ждать новые routes)
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
    const k = t.slice(0, eq).trim();
    if (!process.env[k]) process.env[k] = t.slice(eq + 1).trim();
  }
}
loadEnv('infra/env/legacy-bridge-istochnik.env');

const BRIDGE = (process.env.BRIDGE_URL || 'https://bridge.istochnik.smitx.ru').replace(/\/$/, '');
const TOKEN = process.env.BRIDGE_API_TOKEN || '';
const waitBridge = process.argv.includes('--wait-bridge');

async function bridgePost(pathname, timeoutMs = 600_000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${BRIDGE}${pathname}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/json' },
      signal: ctrl.signal,
    });
    const text = await res.text();
    let json;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = { raw: text.slice(0, 500) };
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(json)}`);
    return json;
  } finally {
    clearTimeout(timer);
  }
}

async function bridgeGet(pathname) {
  const res = await fetch(`${BRIDGE}${pathname}`, {
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/json' },
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

async function waitForRoutes(maxMin = 15) {
  const deadline = Date.now() + maxMin * 60_000;
  while (Date.now() < deadline) {
    const probe = await bridgeGet('/api/health/live');
    if (probe.json?.status === 'ok') {
      // categories/enrich — POST only; проверим через legacy-only GET (новый route)
      const q = await bridgeGet('/api/sync/spb/legacy-only-queue');
      if (q.status === 200 && q.json?.count != null) {
        console.log('[pipeline] bridge готов, legacy-only-queue OK');
        return;
      }
    }
    console.log('[pipeline] ждём деплой bridge…');
    await new Promise((r) => setTimeout(r, 30_000));
  }
  throw new Error('Таймаут ожидания деплоя bridge');
}

if (!TOKEN) {
  console.error('BRIDGE_API_TOKEN не задан');
  process.exit(1);
}

if (waitBridge) await waitForRoutes();

const log = { startedAt: new Date().toISOString(), steps: [] };

console.log('[1/4] categories/enrich (все рубрики прайса + Strapi)…');
const catReport = await bridgePost('/api/sync/spb/categories/enrich');
log.steps.push({ step: 'categories/enrich', report: catReport.report ?? catReport });
console.log(JSON.stringify(catReport.report ?? catReport, null, 2));

console.log('[2/4] programs…');
const progReport = await bridgePost('/api/sync/spb/programs', 900_000);
log.steps.push({ step: 'programs', report: progReport.report ?? progReport });
console.log(JSON.stringify(progReport.report ?? progReport, null, 2));

console.log('[3/4] MODX enrich услуг (весь прайс, без QMS merge)…');
try {
  const r = await bridgePost(
    '/api/sync/spb/services?category=all&modxEnrich=1&mergeQms=0',
    1_800_000,
  );
  log.steps.push({
    step: 'services:all',
    services: r.report?.services,
    errors: r.report?.errors?.length ?? 0,
  });
  console.log(JSON.stringify(r.report?.services ?? r.report, null, 2));
} catch (e) {
  log.steps.push({ step: 'services:all', error: String(e.message || e) });
  console.error('FAIL', e.message || e);
}

console.log('[4/4] legacy-only-queue write…');
const queue = await bridgeGet('/api/sync/spb/legacy-only-queue?write=1');
log.steps.push({ step: 'legacy-only-queue', count: queue.json?.count });

const outPath = path.join(ROOT, 'docs/mappings/spb-enrich-pipeline-log.json');
fs.writeFileSync(outPath, JSON.stringify({ ...log, finishedAt: new Date().toISOString() }, null, 2));
console.log('Готово →', outPath);
