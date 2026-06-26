import { Router } from 'express';
import { LEGACY_DB_GUARD, guardMetaForClient } from '../config/legacyDbGuard.js';
import { getLegacyDbQueueStats } from '../lib/legacyDbQueue.js';

const router = Router();

/** Публичный контракт для клиентов / ИИ: как безопасно читать legacy-данные */
router.get('/guard', (_req, res) => {
  res.json({
    version: 1,
    description:
      'Legacy Bridge отдаёт большие выборки частями. Всегда используйте limit и offset; между страницами делайте паузу clientDelayMs.',
    guard: guardMetaForClient(),
    limits: {
      maxLimitPerRequest: LEGACY_DB_GUARD.maxLimitPerRequest,
      defaultLimit: LEGACY_DB_GUARD.defaultLimit,
      queryDelayMs: LEGACY_DB_GUARD.queryDelayMs,
      httpRateLimitPerMinute: LEGACY_DB_GUARD.httpRateLimitMax,
    },
    responseShape: {
      _meta: {
        city: 'chel | spb',
        entity: 'news | services | ...',
        pagination: {
          limit: 'number',
          offset: 'number',
          count: 'number in this page',
          hasMore: 'boolean',
          nextOffset: 'number | null',
          chunked: 'true',
        },
        guard: 'copy of guard settings',
      },
      data: 'array',
    },
    example: {
      request: 'GET /api/chel/news?limit=20&offset=0',
      next: 'GET /api/chel/news?limit=20&offset=20 while _meta.pagination.hasMore === true',
    },
  });
});

/** Метрики очереди SQL — мониторинг нагрузки на Beget */
router.get('/guard/stats', (_req, res) => {
  res.json({
    queue: getLegacyDbQueueStats(),
    antiBlock: {
      policy: 'One global SQL stream, 450ms+ between queries, connectionLimit=1',
      docs: '/api/legacy/guard',
    },
  });
});

export default router;
