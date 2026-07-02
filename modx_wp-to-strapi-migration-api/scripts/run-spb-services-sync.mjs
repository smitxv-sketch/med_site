#!/usr/bin/env node
/**
 * Локальный запуск синка услуг СПб → Strapi (без HTTP bridge).
 *
 *   npx tsx scripts/run-spb-services-sync.mjs
 *   npx tsx scripts/run-spb-services-sync.mjs "Кардиология" --no-qms --no-modx
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { StrapiClient } from '../server/services/strapiClient.ts';
import { syncSpbServices } from '../server/services/syncSpbServices.ts';
import { getSyncConfig } from '../server/services/syncWorker.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

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

const args = process.argv.slice(2);
const categoryFilter = args.find((a) => !a.startsWith('--'))?.trim() || 'Кардиология';
const mergeQms = !args.includes('--no-qms');
const modxEnrich = !args.includes('--no-modx');

let config = {};
try {
  config = await getSyncConfig();
} catch {
  // локально без bridge Postgres — только env
}
const baseUrl = process.env.STRAPI_URL || config.STRAPI_URL;
const token = process.env.STRAPI_API_TOKEN || config.STRAPI_TOKEN;

if (!baseUrl || !token) {
  console.error('Нужны STRAPI_URL и STRAPI_API_TOKEN (env или sync_config в БД bridge)');
  process.exit(1);
}

const client = new StrapiClient(baseUrl, token);
const conn = await client.checkConnection();
if (!conn.success) {
  console.error('Strapi:', conn.message);
  process.exit(1);
}

// Проверяем, что content-types задеплоены
const probe = await fetch(
  `${baseUrl.replace(/\/$/, '')}/api/service-categories?pagination[pageSize]=1`,
  { headers: { Authorization: `Bearer ${token}` } },
);
if (probe.status === 404) {
  console.error('Коллекция service-categories не найдена — задеплойте apps/cms с Service/ServiceCategory');
  process.exit(1);
}

console.log('Синк СПб услуг…', { categoryFilter, mergeQms, modxEnrich });
const report = await syncSpbServices(client, { categoryFilter, mergeQms, modxEnrich });
console.log(JSON.stringify({ ok: true, report }, null, 2));
