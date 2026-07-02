#!/usr/bin/env node
/**
 * Ждёт появления Service в Strapi, деплоит bridge (если нужно), запускает пилоты синка.
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

const STRAPI = (process.env.STRAPI_URL || 'https://cms.istochnik.smitx.ru').replace(/\/$/, '');
const BRIDGE = (process.env.BRIDGE_URL || 'https://bridge.istochnik.smitx.ru').replace(/\/$/, '');
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
const BRIDGE_TOKEN = process.env.BRIDGE_API_TOKEN;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitStrapiServices(maxMs = 900_000) {
  const started = Date.now();
  while (Date.now() - started < maxMs) {
    try {
      const res = await fetch(`${STRAPI}/api/service-categories?pagination[pageSize]=1`, {
        headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
        signal: AbortSignal.timeout(30_000),
      });
      console.log(`[wait] service-categories: ${res.status}`);
      if (res.ok) return true;
    } catch (e) {
      console.log(`[wait] error: ${e instanceof Error ? e.message : e}`);
    }
    await sleep(30_000);
  }
  return false;
}

async function bridgePost(pathname) {
  const url = `${BRIDGE}${pathname}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BRIDGE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(600_000),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 500) };
  }
  return { status: res.status, json };
}

if (!STRAPI_TOKEN || !BRIDGE_TOKEN) {
  console.error('Нужны STRAPI_API_TOKEN и BRIDGE_API_TOKEN в infra/env/legacy-bridge-istochnik.env');
  process.exit(1);
}

console.log('[1/3] Проверяем Strapi Service/ServiceCategory…');
const probe = await fetch(`${STRAPI}/api/service-categories?pagination[pageSize]=1`, {
  headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
});
if (!probe.ok) {
  const ready = await waitStrapiServices();
  if (!ready) {
    console.error('Strapi service-categories не готовы');
    process.exit(1);
  }
} else {
  console.log(`[wait] service-categories: ${probe.status}`);
}

console.log('[2/3] Синк СПб Кардиология…');
const spb = await bridgePost('/api/sync/spb/services?category=' + encodeURIComponent('Кардиология'));
console.log(JSON.stringify({ spb: spb.status, report: spb.json?.report ?? spb.json }, null, 2));

console.log('[3/3] Синк ЧЛБ Анестезиология (569)…');
const chel = await bridgePost('/api/sync/chel/services?directionId=569');
console.log(JSON.stringify({ chel: chel.status, report: chel.json?.report ?? chel.json }, null, 2));

const ok = spb.status < 400 && chel.status < 400;
process.exit(ok ? 0 : 1);
