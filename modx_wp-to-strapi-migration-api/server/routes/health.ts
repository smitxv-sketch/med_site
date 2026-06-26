import { Router } from 'express';
import { getBridgePool } from '../bridgeDb.js';
import { runCheck } from '../lib/healthChecks.js';
import { getCachedLegacyCheck } from '../lib/legacyHealthCache.js';
import { LegacyMysqlGateway } from '../legacy/LegacyMysqlGateway.js';

const router = Router();

router.get('/live', (_req, res) => {
  res.json({ status: 'ok', service: 'legacy-bridge' });
});

router.get('/', async (_req, res) => {
  const checks: Record<string, string> = {};

  checks.bridge = await runCheck(
    () => getBridgePool().query('SELECT 1'),
    3000,
    'bridge-pg',
  );
  if (checks.bridge !== 'connected') {
    return res.status(503).json({ status: 'error', checks });
  }

  const spbGw = LegacyMysqlGateway.get('spb');
  if (!spbGw.isConfigured()) {
    checks.modx = 'not_configured';
  } else {
    checks.modx = await getCachedLegacyCheck('spb', () =>
      runCheck(async () => {
        const r = await spbGw.ping();
        if (!r.ok) throw new Error(r.error || 'ping failed');
      }, 4000, 'modx-spb'),
    );
  }

  const chelGw = LegacyMysqlGateway.get('chel');
  checks.chel = chelGw.isConfigured()
    ? await getCachedLegacyCheck('chel', () =>
        runCheck(async () => {
          const r = await chelGw.ping();
          if (!r.ok) throw new Error(r.error || 'ping failed');
        }, 4000, 'wp-chel'),
      )
    : 'not_configured';

  const legacyOk =
    checks.modx === 'connected' ||
    checks.modx === 'not_configured' ||
    checks.modx === 'timeout';

  res.status(legacyOk ? 200 : 207).json({
    status: legacyOk ? 'ok' : 'degraded',
    checks,
    hint: 'Use /api/health/live for orchestrator probes. Legacy checks cached.',
  });
});

export default router;
