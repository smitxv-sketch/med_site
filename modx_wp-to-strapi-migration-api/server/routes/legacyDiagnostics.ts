import { Router } from 'express';
import { runChelMysqlDiagnostics } from '../lib/chelMysqlDiagnostics.js';

const router = Router();

/** Диагностика MySQL Beget — для скринов в техподдержку (без пароля) */
router.get('/mysql', async (_req, res) => {
  try {
    const report = await runChelMysqlDiagnostics();
    res.json(report);
  } catch (e) {
    res.status(500).json({
      error: 'diagnostics_failed',
      message: e instanceof Error ? e.message : String(e),
    });
  }
});

export default router;
