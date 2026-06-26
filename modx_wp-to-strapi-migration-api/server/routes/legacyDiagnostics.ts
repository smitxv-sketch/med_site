import { Router } from 'express';
import { runChelMysqlDiagnostics } from '../lib/chelMysqlDiagnostics.js';
import { runSpbMysqlDiagnostics } from '../lib/spbMysqlDiagnostics.js';

const router = Router();

/**
 * Диагностика MySQL Beget (ЧЛБ + СПб) — SSOT для проверки после разблокировки IP.
 * Без паролей в ответе; для тикета в поддержку.
 */
router.get('/mysql', async (_req, res) => {
  try {
    const [chel, spb] = await Promise.all([
      runChelMysqlDiagnostics(),
      runSpbMysqlDiagnostics(),
    ]);
    res.json({
      checkedAt: new Date().toISOString(),
      coolifyHint: 'Запрос идёт с IP сервера Coolify (см. publicIp в каждом блоке).',
      chel,
      spb,
      readyForSync: {
        chelDoctors: chel.mysql.ok,
        spbDoctors: spb.mysql.ok,
      },
    });
  } catch (e) {
    res.status(500).json({
      error: 'diagnostics_failed',
      message: e instanceof Error ? e.message : String(e),
    });
  }
});

export default router;
