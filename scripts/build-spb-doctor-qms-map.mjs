#!/usr/bin/env node
/**
 * Строит docs/mappings/spb-doctor-qms-map.json через bridge API.
 * Требует: bridge с доступом к QMS СПб и MODX MySQL.
 *
 *   node scripts/build-spb-doctor-qms-map.mjs
 *   node scripts/build-spb-doctor-qms-map.mjs --bridge https://bridge.istochnik.smitx.ru
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bridgeArg = process.argv.find((a) => a.startsWith('--bridge='));
const bridgeBase = (
  bridgeArg?.split('=')[1] ||
  process.env.BRIDGE_URL ||
  'https://bridge.istochnik.smitx.ru'
).replace(/\/$/, '');

function loadToken() {
  const envPath = path.join(ROOT, 'infra/env/legacy-bridge-istochnik.env');
  if (!fs.existsSync(envPath)) return process.env.BRIDGE_API_TOKEN || '';
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^BRIDGE_API_TOKEN=(.+)$/);
    if (m) return m[1].trim();
  }
  return '';
}

const token = loadToken();
if (!token) {
  console.error('BRIDGE_API_TOKEN не найден');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

console.log('POST', `${bridgeBase}/api/sync/spb/doctors/build-qms-map`);
const res = await fetch(`${bridgeBase}/api/sync/spb/doctors/build-qms-map`, {
  method: 'POST',
  headers,
  signal: AbortSignal.timeout(300_000),
});

const text = await res.text();
if (!res.ok) {
  console.error('HTTP', res.status, text.slice(0, 500));
  process.exit(1);
}

const payload = JSON.parse(text);
if (!payload.ok || !payload.map) {
  console.error('Unexpected response:', text.slice(0, 500));
  process.exit(1);
}

const map = payload.map;
const outDocs = path.join(ROOT, 'docs/mappings/spb-doctor-qms-map.json');
const outServer = path.join(
  ROOT,
  'modx_wp-to-strapi-migration-api/server/mappings/spb-doctor-qms-map.json',
);
const json = JSON.stringify(map, null, 2);
fs.mkdirSync(path.dirname(outDocs), { recursive: true });
fs.mkdirSync(path.dirname(outServer), { recursive: true });
fs.writeFileSync(outDocs, json, 'utf8');
fs.writeFileSync(outServer, json, 'utf8');

console.log('Stats:', map.stats);
console.log('Needs review:', map.needsReview?.length ?? 0);
console.log('Wrote:', outDocs);
console.log('Wrote:', outServer);
