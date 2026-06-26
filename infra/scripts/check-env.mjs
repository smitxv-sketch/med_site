#!/usr/bin/env node
/**
 * Проверка infra/env/*.env: дубликаты ключей, рассинхрон STUDIO_API_SECRET, пустые обязательные поля.
 * Запуск: node infra/scripts/check-env.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ENV_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../env');

const APPS = {
  'strapi-istochnik.env': {
    coolify: 'strapi-istochnik',
    required: [
      'HOST', 'PORT', 'NODE_ENV', 'APP_KEYS', 'API_TOKEN_SALT', 'ADMIN_JWT_SECRET',
      'TRANSFER_TOKEN_SALT', 'JWT_SECRET', 'ENCRYPTION_KEY', 'DATABASE_CLIENT',
      'DATABASE_HOST', 'DATABASE_PORT', 'DATABASE_NAME', 'DATABASE_USERNAME', 'DATABASE_PASSWORD',
    ],
    forbidden: [],
  },
  'site-ci.env': {
    coolify: 'site-ci',
    required: [
      'NODE_ENV', 'PORT', 'BFF_PORT', 'BFF_INTERNAL_URL', 'DATA_MODE', 'STRAPI_URL',
      'STRAPI_API_TOKEN', 'STUDIO_API_SECRET', 'WEB_REVALIDATE_URL',
      'REVALIDATE_SECRET', 'REVALIDATE_TOKEN', 'QMS_CHEL_ADDRESS', 'QMS_CHEL_API_KEY',
      'CHEL_API_ENDPOINT',
    ],
    forbidden: ['WP_DB_', 'WP_API_', 'CHEL_DB_'],
  },
  'studio-istochnik.env': {
    coolify: 'studio-istochnik',
    required: ['NODE_ENV', 'PORT', 'STUDIO_API_SECRET', 'BFF_PROXY_URL', 'NEXT_PUBLIC_PREVIEW_URL'],
    forbidden: ['STRAPI_API_TOKEN', 'WEB_REVALIDATE_URL', 'CHEL_DB_'],
    shared: { STUDIO_API_SECRET: 'site-ci.env' },
  },
  'legacy-bridge-istochnik.env': {
    coolify: 'legacy-bridge-istochnik',
    required: [
      'NODE_ENV', 'PORT', 'HOST', 'BRIDGE_API_TOKEN', 'SITE_USER', 'SITE_PASSWORD',
      'CHEL_DB_HOST', 'CHEL_DB_PASSWORD', 'CHEL_API_ENDPOINT', 'STRAPI_URL', 'STRAPI_API_TOKEN',
      'BRIDGE_PG_HOST', 'BRIDGE_PG_PASSWORD',
    ],
    forbidden: ['WP_DB_', 'WP_API_'],
  },
};

function parseEnvFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const entries = [];
  const seen = new Map();
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 1) continue;
    const key = t.slice(0, eq).trim();
    const value = t.slice(eq + 1);
    entries.push({ key, value });
    seen.set(key, (seen.get(key) ?? 0) + 1);
  }
  return { entries, seen, map: Object.fromEntries(entries.map((e) => [e.key, e.value])) };
}

let failed = false;

for (const [file, spec] of Object.entries(APPS)) {
  const filePath = path.join(ENV_DIR, file);
  console.log(`\n=== ${file} → Coolify: ${spec.coolify} ===`);
  if (!fs.existsSync(filePath)) {
    console.error('  FAIL: файл не найден');
    failed = true;
    continue;
  }

  const { seen, map } = parseEnvFile(filePath);
  const dups = [...seen.entries()].filter(([, n]) => n > 1).map(([k]) => k);
  if (dups.length) {
    console.error(`  FAIL: дубликаты ключей: ${dups.join(', ')}`);
    failed = true;
  } else {
    console.log('  OK: без дубликатов');
  }

  const missing = spec.required.filter((k) => !(k in map));
  if (missing.length) {
    console.error(`  FAIL: нет ключей: ${missing.join(', ')}`);
    failed = true;
  } else {
    console.log(`  OK: все ${spec.required.length} обязательных ключей на месте`);
  }

  const empty = spec.required.filter((k) => !String(map[k] ?? '').trim());
  if (empty.length) {
    console.warn(`  WARN: пустые значения: ${empty.join(', ')}`);
  }

  for (const prefix of spec.forbidden ?? []) {
    const bad = Object.keys(map).filter((k) => k.startsWith(prefix.replace(/_$/, '')) || k.includes(prefix));
    if (bad.length) {
      console.error(`  FAIL: устаревшие ключи (${prefix}): ${bad.join(', ')}`);
      failed = true;
    }
  }

  if (spec.shared) {
    for (const [key, otherFile] of Object.entries(spec.shared)) {
      const otherPath = path.join(ENV_DIR, otherFile);
      const other = parseEnvFile(otherPath).map;
      if (map[key] !== other[key]) {
        console.error(`  FAIL: ${key} не совпадает с ${otherFile}`);
        failed = true;
      } else {
        console.log(`  OK: ${key} совпадает с ${otherFile}`);
      }
    }
  }

  if (map.REVALIDATE_SECRET && map.REVALIDATE_TOKEN && map.REVALIDATE_SECRET !== map.REVALIDATE_TOKEN) {
    console.error('  FAIL: REVALIDATE_SECRET ≠ REVALIDATE_TOKEN');
    failed = true;
  }
}

console.log(failed ? '\nИТОГ: есть ошибки' : '\nИТОГ: OK');
process.exit(failed ? 1 : 0);
