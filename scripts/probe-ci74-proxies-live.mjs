#!/usr/bin/env node
/** Проверка ci74 прокси с реальными ключами (счётчики в stdout, ключи не печатаем) */
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

loadEnv('infra/env/qms-price.env');
loadEnv('infra/env/legacy-bridge-istochnik.env');

async function probeGetPr(label, url, apikey, qqc244) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apikey, unauthorized: 1, qqc244 }),
    signal: AbortSignal.timeout(90_000),
  });
  const text = await res.text();
  let sections = 0;
  let rows = 0;
  let err = null;
  try {
    const data = JSON.parse(text);
    if (data?.data?.sections) {
      sections = data.data.sections.length;
      for (const s of data.data.sections) rows += (s.rows ?? []).length;
    } else {
      err = data?.error ?? data?.message ?? JSON.stringify(data).slice(0, 120);
    }
  } catch {
    err = text.slice(0, 120);
  }
  console.log(JSON.stringify({ label, status: res.status, sections, rows, err }));
}

async function probeBooking(label, url, apikey, qqc244) {
  const body = new URLSearchParams({ apikey, chatid: '999', qqc244: '' });
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      apikey,
      token: apikey,
    },
    body,
    signal: AbortSignal.timeout(90_000),
  });
  const text = await res.text();
  let err = null;
  let specs = 0;
  try {
    const data = JSON.parse(text);
    if (Array.isArray(data?.spec)) specs = data.spec.length;
    else if (data?.error) err = data.error;
    else err = JSON.stringify(data).slice(0, 120);
  } catch {
    err = text.slice(0, 120);
  }
  console.log(JSON.stringify({ label, status: res.status, specs, err }));
}

await probeGetPr(
  'chel-proxy',
  'https://ci74.ru/booking/php/proxy.php?endpoint=getPr',
  process.env.QMS_CHEL_API_KEY,
  process.env.QMS_CHEL_ORG_MAIN,
);

await probeGetPr(
  'spb-proxy-ci74',
  'https://ci74.ru/booking/php/proxy-spb.php?endpoint=getPr',
  process.env.QMS_SPB_API_KEY,
  process.env.QMS_SPB_ORG,
);

await probeBooking(
  'spb-booking-ci74',
  'https://ci74.ru/booking/php/proxy-spb.php?endpoint=spec_list',
  process.env.QMS_SPB_BOOKING_API_KEY || process.env.QMS_SPB_API_KEY,
  process.env.QMS_SPB_ORG,
);
