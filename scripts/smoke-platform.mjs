#!/usr/bin/env node
/**
 * Agent-first smoke: health + BFF page + optional Strapi.
 * Запуск: node scripts/smoke-platform.mjs
 */
const BFF = process.env.BFF_URL ?? 'http://localhost:3001';
const WEB = process.env.WEB_URL ?? 'http://localhost:3002';
const STRAPI = process.env.STRAPI_URL ?? 'https://cms.istochnik.smitx.ru';

// BFF на проде слушает только 127.0.0.1:3001 внутри контейнера site-ci
const skipBff =
  process.env.SMOKE_SKIP_BFF === '1' ||
  (Boolean(process.env.WEB_URL) && !process.env.BFF_URL);

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

await run('bff-health', () => {
  if (skipBff) {
    console.log('SKIP bff-health (BFF internal only on prod)');
    return true;
  }
  return check('bff-health', `${BFF}/health`);
});
await run('bff-page-mock', () => {
  if (skipBff) {
    console.log('SKIP bff-page (BFF internal only on prod)');
    return true;
  }
  return check('bff-page', `${BFF}/api/pages/home?tenant=chel`);
});
await run('web-health', () => check('web-health', `${WEB}/api/health`));
await run('web-home', () => check('web-home', `${WEB}/`));
await run('strapi-admin', () => check('strapi-admin', `${STRAPI}/admin`, true));
await run('strapi-pages', async () => {
  const url = `${STRAPI}/api/pages?filters[slug][$eq]=home&locale=ru-chel&publicationState=live`;
  try {
    const res = await fetch(url);
    const text = await res.text();
    const ok = res.ok;
    console.log(ok ? 'PASS' : 'FAIL', 'strapi-pages', res.status, url);
    if (!ok) console.log('  body:', text.slice(0, 200));
    else if (!text.includes('"data"')) console.log('  warn: unexpected body', text.slice(0, 120));
    return ok;
  } catch (e) {
    console.log('FAIL', 'strapi-pages', String(e));
    return false;
  }
});

console.log(`\nSmoke: ${passed}/${total} passed`);
process.exit(passed === total ? 0 : 1);
