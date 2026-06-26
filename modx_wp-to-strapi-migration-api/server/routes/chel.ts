import { Router } from 'express';
import {
  getChelDoctors,
  getChelServices,
  getChelReviews,
  getChelNews,
  getChelVacancies,
  getChelClinics,
  getChelArticles,
  getChelFaq,
  getChelAdvantages,
  getChelAnonces,
  getChelDirections,
} from '../services/wpService.js';
import { dbChel } from '../dbChel.js';
import { parsePagination } from '../lib/pagination.js';
import { handleChelDoctors, handleChelList } from '../lib/chelRouteHandlers.js';
import { guardMetaForClient } from '../config/legacyDbGuard.js';

const router = Router();

router.get('/doctors', handleChelDoctors(getChelDoctors));
router.get('/services', handleChelList('services', getChelServices));
router.get('/reviews', handleChelList('reviews', getChelReviews));
router.get('/news', handleChelList('news', getChelNews));
router.get('/vacancies', handleChelList('vacancies', getChelVacancies));
router.get('/clinics', handleChelList('clinics', getChelClinics));
router.get('/articles', handleChelList('articles', getChelArticles));
router.get('/faq', handleChelList('faq', getChelFaq));
router.get('/advantages', handleChelList('advantages', getChelAdvantages));
router.get('/anonces', handleChelList('anonces', getChelAnonces));
router.get('/directions', handleChelList('directions', getChelDirections));

/**
 * Дамп схемы WP — только малыми порциями таблиц (не весь SHOW TABLES разом).
 * ?tableOffset=0&tableBatch=3&limit=2
 */
router.get('/dump', async (req, res) => {
  try {
    const { limit, offset: tableOffset } = parsePagination(req);
    const rowLimit = Math.min(limit, 2);
    const tableBatch = Math.min(
      parseInt(String(req.query.tableBatch ?? '3'), 10) || 3,
      5,
    );

    const [tablesResult] = await dbChel.query('SHOW TABLES');
    const allTables = (tablesResult as Record<string, string>[]).map(
      (row) => Object.values(row)[0] as string,
    );

    const slice = allTables.slice(tableOffset, tableOffset + tableBatch);
    const dump: Record<string, unknown> = {};

    for (const table of slice) {
      const [rows] = await dbChel.query(`SELECT * FROM ?? LIMIT ?`, [table, rowLimit]);
      dump[table] = rows;
    }

    const hasMoreTables = tableOffset + tableBatch < allTables.length;

    res.setHeader('X-Legacy-Bridge-Chunked', 'true');
    res.json({
      _meta: {
        city: 'chel',
        entity: 'schema_dump',
        pagination: {
          limit: tableBatch,
          offset: tableOffset,
          count: slice.length,
          hasMore: hasMoreTables,
          nextOffset: hasMoreTables ? tableOffset + tableBatch : null,
          chunked: true,
        },
        guard: guardMetaForClient(),
      },
      data: {
        tablesInPage: slice,
        rowsPerTable: rowLimit,
        totalTables: allTables.length,
        samples: dump,
      },
    });
  } catch (error) {
    console.error('Error generating Chelyabinsk dump:', error);
    res.status(500).json({
      error: 'Failed to generate dump',
      maxRowLimit: 2,
      guard: { docsPath: '/api/legacy/guard' },
    });
  }
});

export default router;
