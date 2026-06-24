#!/usr/bin/env node
/**
 * Agent-first smoke: health + BFF page + optional Strapi.
 * Запуск: node scripts/smoke-platform.mjs
 */
const BFF = process.env.BFF_URL ?? 'http://localhost:3001';
const WEB = process.env.WEB_URL ?? 'http://localhost:3002';
const STRAPI = process.env.STRAPI_URL ?? 'https://cms.istochnik.smitx.ru';

async function check(name, url, expectOk = true) {
  try {
    const res = await fetch(url);
    const ok = expectOk ? res.ok : res.status < 500;
    const body = await res.text();
    console.log(ok ? 'PASS' : 'FAIL', name, res.status, url);
    if (!ok) console.log('  body:', body.slice(0, 200));
    return ok;
  } catch (e) {
    console.log('FAIL', name, String(e));
    return false;
  }
}

let passed = 0;
let total = 0;

async function run(name, fn) {
  total++;
  if (await fn()) passed++;
}

await run('bff-health', () => check('bff-health', `${BFF}/health`));
await run('bff-page-mock', () => check('bff-page', `${BFF}/api/pages/home?tenant=chel`));
await run('web-health', () => check('web-health', `${WEB}/api/health`));
await run('strapi-admin', () => check('strapi-admin', `${STRAPI}/admin`, true));

console.log(`\nSmoke: ${passed}/${total} passed`);
process.exit(passed === total ? 0 : 1);
