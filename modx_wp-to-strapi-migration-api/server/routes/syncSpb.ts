import { Router } from 'express';
import { StrapiClient } from '../services/strapiClient.js';
import { getSyncConfig, logSyncEvent } from '../services/syncWorker.js';
import { syncSpbDoctors } from '../services/syncSpbDoctors.js';

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

/** Синк врачей СПб → Strapi (add + safe fields) */
router.post('/doctors', async (_req, res) => {
  try {
    const client = await buildStrapiClient();
    const conn = await client.checkConnection();
    if (!conn.success) {
      return res.status(502).json(conn);
    }
    await logSyncEvent('spb', 'info', 'sync doctors started');
    const report = await syncSpbDoctors(client);
    await logSyncEvent('spb', 'success', 'sync doctors finished', report);
    res.json({ ok: true, report });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await logSyncEvent('spb', 'error', 'sync doctors failed', message);
    res.status(500).json({ ok: false, error: message });
  }
});

export default router;
