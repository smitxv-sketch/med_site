#!/usr/bin/env node
/**
 * Проверка туннеля СПб: ci74.ru/booking/php/proxy-spb.php?endpoint=getPr
 * Перед запуском залейте proxy-spb.php + config.spb.php на хостинг.
 *
 *   node scripts/test-qms-spb-proxy.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadEnvFile(relPath) {
  const envPath = path.join(ROOT, relPath);
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 1) continue;
    const key = t.slice(0, eq).trim();
    const val = t.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile('infra/env/qms-price.env');
loadEnvFile('infra/env/legacy-bridge-istochnik.env');

const proxyUrl =
  process.env.QMS_SPB_SITE_PROXY_URL ??
  'https://ci74.ru/booking/php/proxy-spb.php?endpoint=getPr';
const apikey = process.env.QMS_SPB_API_KEY;
const qqc244 = process.env.QMS_SPB_ORG;

if (!apikey || !qqc244) {
  console.error('Нужны QMS_SPB_API_KEY и QMS_SPB_ORG в infra/env/qms-price.env');
  process.exit(1);
}

console.log('POST', proxyUrl);

const res = await fetch(proxyUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ apikey, unauthorized: 1, qqc244 }),
  signal: AbortSignal.timeout(120_000),
});

const text = await res.text();
console.log('HTTP', res.status);

if (!res.ok) {
  console.error(text.slice(0, 500));
  process.exit(1);
}

let data;
try {
  data = JSON.parse(text);
} catch {
  console.error('Не JSON (прокси ещё не залит или старая версия?):', text.slice(0, 200));
  process.exit(1);
}

const sections = data?.data?.sections;
if (!sections) {
  console.error('Нет data.sections:', text.slice(0, 300));
  process.exit(1);
}

let rows = 0;
for (const s of sections) rows += (s.rows ?? []).length;
console.log('OK: sections =', sections.length, ', позиций =', rows);
