import { Router } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { StrapiClient } from '../services/strapiClient.js';
import { getSyncConfig, logSyncEvent } from '../services/syncWorker.js';
import { runDoctorSync } from '../services/SyncOrchestrator.js';
import { getSpbDoctorsForSync } from '../services/spbDoctorSource.js';
import { fetchSpbQmsDoctorCatalog } from '../services/spbQmsDoctorCatalog.js';
import { buildSpbDoctorQmsMap } from '../services/spbDoctorQmsMapper.js';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function mappingPaths() {
  const root = path.resolve(__dirname, '../../..');
  return {
    docs: path.join(root, 'docs/mappings/spb-doctor-qms-map.json'),
    server: path.join(__dirname, '../mappings/spb-doctor-qms-map.json'),
  };
}

async function buildStrapiClient() {
  const config = await getSyncConfig();
  const baseUrl = process.env.STRAPI_URL || config.STRAPI_URL;
  const token = process.env.STRAPI_API_TOKEN || config.STRAPI_TOKEN;
  if (!baseUrl || !token) {
    throw new Error('STRAPI_URL и STRAPI_API_TOKEN обязательны (env или sync_config)');
  }
  return new StrapiClient(baseUrl, token);
}

/** Синк врачей СПб → Strapi (MODX MySQL, chunked) */
router.post('/doctors', async (_req, res) => {
  try {
    const client = await buildStrapiClient();
    const conn = await client.checkConnection();
    if (!conn.success) {
      return res.status(502).json(conn);
    }
    await logSyncEvent('spb', 'info', 'sync doctors started');
    const report = await runDoctorSync('spb', client);
    await logSyncEvent('spb', 'success', 'sync doctors finished', report);
    res.json({ ok: true, report });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await logSyncEvent('spb', 'error', 'sync doctors failed', message);
    const status = message.includes('already running') ? 409 : 500;
    res.status(status).json({ ok: false, error: message });
  }
});

/** Каталог врачей из QMS СПб (qqc + ФИО) — только с сервера bridge */
router.get('/qms-doctors', async (_req, res) => {
  try {
    const catalog = await fetchSpbQmsDoctorCatalog();
    res.json({ ok: true, ...catalog });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).json({ ok: false, error: message });
  }
});

/**
 * Построить spb-doctor-qms-map.json (MODX + QMS по ФИО).
 * ?write=1 — сохранить в docs/mappings и server/mappings (локально / в образе).
 */
router.post('/doctors/build-qms-map', async (req, res) => {
  try {
    const modxDoctors = await getSpbDoctorsForSync();
    const qmsCatalog = await fetchSpbQmsDoctorCatalog();
    const map = buildSpbDoctorQmsMap(modxDoctors, qmsCatalog.doctors);

    const write = req.query.write === '1' || req.query.write === 'true';
    if (write) {
      const paths = await mappingPaths();
      const json = JSON.stringify(map, null, 2);
      await fs.mkdir(path.dirname(paths.docs), { recursive: true });
      await fs.mkdir(path.dirname(paths.server), { recursive: true });
      await fs.writeFile(paths.docs, json, 'utf8');
      await fs.writeFile(paths.server, json, 'utf8');
    }

    res.json({ ok: true, map, qmsTransport: qmsCatalog.transport });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).json({ ok: false, error: message });
  }
});

export default router;
