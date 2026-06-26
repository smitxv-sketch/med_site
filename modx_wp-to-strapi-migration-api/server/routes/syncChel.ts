import { Router } from 'express';
import { StrapiClient } from '../services/strapiClient.js';
import { getSyncConfig, logSyncEvent } from '../services/syncWorker.js';
import { runDoctorSync } from '../services/SyncOrchestrator.js';
import { syncChelNewsContent } from '../services/syncChelContent.js';

const router = Router();

async function buildStrapiClient() {
  const config = await getSyncConfig();
  const baseUrl = process.env.STRAPI_URL || config.STRAPI_URL;
  const token = process.env.STRAPI_API_TOKEN || config.STRAPI_TOKEN;
  if (!baseUrl || !token) {
    throw new Error('STRAPI_URL и STRAPI_API_TOKEN обязательны (env или sync_config)');
  }
  return new StrapiClient(baseUrl, token);
}

/** Синк врачей Челябинска → Strapi (REST ci74.ru, без MySQL) */
router.post('/doctors', async (_req, res) => {
  try {
    const client = await buildStrapiClient();
    const conn = await client.checkConnection();
    if (!conn.success) {
      return res.status(502).json(conn);
    }
    await logSyncEvent('chelyabinsk', 'info', 'sync doctors started');
    const report = await runDoctorSync('chel', client);
    await logSyncEvent('chelyabinsk', 'success', 'sync doctors finished', report);
    res.json({ ok: true, report });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await logSyncEvent('chelyabinsk', 'error', 'sync doctors failed', message);
    const status = message.includes('already running') ? 409 : 500;
    res.status(status).json({ ok: false, error: message });
  }
});

/** Синк новостей/анонсов (требует MySQL Beget) */
router.post('/content', async (_req, res) => {
  try {
    const client = await buildStrapiClient();
    const conn = await client.checkConnection();
    if (!conn.success) {
      return res.status(502).json(conn);
    }
    await logSyncEvent('chelyabinsk', 'info', 'sync content started');
    const reports = await syncChelNewsContent(client);
    await logSyncEvent('chelyabinsk', 'success', 'sync content finished', reports);
    res.json({ ok: true, reports });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await logSyncEvent('chelyabinsk', 'error', 'sync content failed', message);
    res.status(500).json({ ok: false, error: message });
  }
});

export default router;
