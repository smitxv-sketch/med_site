#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const envPath = path.join(ROOT, 'infra/env/legacy-bridge-istochnik.env');
for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const eq = t.indexOf('=');
  if (eq < 1) continue;
  const key = t.slice(0, eq).trim();
  if (!process.env[key]) process.env[key] = t.slice(eq + 1).trim();
}

const base = process.env.STRAPI_URL.replace(/\/$/, '');
const headers = { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` };

for (const col of ['service-categories', 'services', 'doctors']) {
  const res = await fetch(`${base}/api/${col}?pagination[pageSize]=1`, { headers });
  console.log(`${col}: ${res.status}`);
}
