#!/usr/bin/env node
/**
 * Локальный запуск маппинга (MODX MySQL + QMS API).
 * Если QMS с локальной машины недоступен — используйте scripts/build-spb-doctor-qms-map.mjs через bridge.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAppEnv } from '../infra/loadAppEnv.mjs';
import { getSpbDoctorsForSync } from '../modx_wp-to-strapi-migration-api/server/services/spbDoctorSource.ts';
import { fetchSpbQmsDoctorCatalog } from '../modx_wp-to-strapi-migration-api/server/services/spbQmsDoctorCatalog.ts';
import { buildSpbDoctorQmsMap } from '../modx_wp-to-strapi-migration-api/server/services/spbDoctorQmsMapper.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
loadAppEnv('legacy-bridge-istochnik');

const modxDoctors = await getSpbDoctorsForSync();
console.log('MODX doctors:', modxDoctors.length);

let qmsDoctors = [];
try {
  const catalog = await fetchSpbQmsDoctorCatalog();
  qmsDoctors = catalog.doctors;
  console.log('QMS doctors:', qmsDoctors.length, 'transport:', catalog.transport);
} catch (e) {
  console.error('QMS fetch failed:', e.message);
  console.error('→ Запустите: node scripts/build-spb-doctor-qms-map.mjs (через bridge на Coolify)');
  process.exit(1);
}

const map = buildSpbDoctorQmsMap(modxDoctors, qmsDoctors);
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
console.log('Wrote', outDocs);
