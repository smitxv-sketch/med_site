#!/usr/bin/env node
/**
 * Dry-run пилота синка ЧЛБ: рубрика directions + услуги (без Strapi).
 *
 *   npx tsx scripts/probe-chel-services-sync-dry.mjs
 *   npx tsx scripts/probe-chel-services-sync-dry.mjs 569
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadChelDirection, loadChelServicesForDirection } from '../server/services/chel/chelServicesSource.ts';
import { chelCategoryLegacyId, chelServiceLegacyId } from '../server/services/chel/chelServiceIds.ts';

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

const directionId = Number.parseInt(process.argv[2] ?? '569', 10);

const direction = await loadChelDirection(directionId);
if (!direction) {
  console.error(JSON.stringify({ ok: false, error: `direction ${directionId} not found` }));
  process.exit(1);
}

const services = await loadChelServicesForDirection(directionId);

console.log(JSON.stringify({
  ok: true,
  directionId,
  category: {
    legacyId: chelCategoryLegacyId(directionId),
    title: direction.name,
    slug: direction.slug,
    hasExpertIntro: Boolean(direction.contentMeta.text?.trim()),
    doctorId: direction.contentMeta.doctor_id ?? null,
  },
  servicesCount: services.length,
  sample: services.slice(0, 5).map((s) => ({
    legacyId: chelServiceLegacyId(s.postId),
    postId: s.postId,
    title: s.title,
    article: s.meta.article ?? '',
    price: s.meta.price ?? '',
    directionTermIds: s.directionTermIds,
  })),
}, null, 2));
