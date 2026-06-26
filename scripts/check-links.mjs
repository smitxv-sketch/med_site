#!/usr/bin/env node
/**
 * Проверка битых ссылок на сайте (внутренние + same-origin).
 *
 * Локально:  npm run test:links
 * Прод:       npm run test:links:prod
 *
 * Переменные:
 *   WEB_URL — базовый URL (по умолчанию localhost:3002 или прод с --prod)
 *   LINK_CHECK_CONCURRENCY — параллельность (по умолчанию 8)
 */
import { LinkChecker, LinkState } from 'linkinator';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const isProd = process.env.SMOKE_ENV === 'prod' || process.argv.includes('--prod');
const baseUrl = process.env.WEB_URL ?? (isProd ? 'https://istochnik.smitx.ru' : 'http://localhost:3002');
const concurrency = Number(process.env.LINK_CHECK_CONCURRENCY ?? 8);

/** Маршруты «в разработке» — не валим CI, пока страницы не созданы (см. qa/link-allowlist.json). */
function loadAllowlist() {
  try {
    const raw = readFileSync(path.join(root, 'qa/link-allowlist.json'), 'utf8');
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

const allowlist = loadAllowlist();

function isAllowlisted(url) {
  try {
    const pathname = new URL(url).pathname;
    return allowlist.has(pathname);
  } catch {
    return false;
  }
}
/** Не проверяем внешние соцсети и tel/mailto — только наш домен. */
function shouldSkip(url) {
  if (isAllowlisted(url)) return true;
  if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('javascript:')) {
    return true;
  }
  try {
    const parsed = new URL(url);
    const origin = new URL(baseUrl).origin;
    // Внешние ссылки пропускаем (иначе ложные срабатывания на VK/Telegram)
    if (parsed.origin !== origin) return true;
  } catch {
    return false;
  }
  return false;
}

console.log(`[links] crawl: ${baseUrl} (concurrency=${concurrency})`);

const checker = new LinkChecker();
const broken = [];

checker.on('link', (result) => {
  const skipped = result.state === LinkState.SKIPPED;
  const ok = result.state === LinkState.OK || skipped;
  const status = result.status ?? 0;
  const tag = ok ? (skipped ? 'SKIP' : 'OK  ') : 'FAIL';
  if (!skipped) console.log(`${tag} ${status} ${result.url}`);
  if (!ok && !isAllowlisted(result.url)) {
    broken.push({ url: result.url, status, parent: result.parent });
  }
});

const result = await checker.check({
  path: baseUrl,
  recurse: true,
  concurrency,
  linksToSkip: async (url) => shouldSkip(url),
});

console.log(`\n[links] scanned=${result.links.length} passed=${result.passed} failed=${broken.length}`);

if (broken.length > 0) {
  console.error('\n[links] Битые ссылки:');
  for (const item of broken) {
    console.error(`  ${item.status} ${item.url}`);
    if (item.parent) console.error(`    найдено на: ${item.parent}`);
  }
  process.exit(1);
}

console.log('[links] OK — битых внутренних ссылок нет');
process.exit(0);
