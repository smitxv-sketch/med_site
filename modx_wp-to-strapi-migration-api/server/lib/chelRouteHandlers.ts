import type { Request, Response } from 'express';
import { parsePagination, sendPaginatedJson, sendSinglePageJson } from './pagination.js';

/** Общий обработчик list-эндпоинтов Челябинска с пагинацией */
export function handleChelList(
  entity: string,
  fetcher: (limit: number, offset: number) => Promise<unknown[]>,
) {
  return async (req: Request, res: Response) => {
    try {
      const { limit, offset } = parsePagination(req);
      const data = await fetcher(limit, offset);
      sendPaginatedJson(res, req, { city: 'chel', entity, limit, offset, data });
    } catch (error) {
      console.error(`Error fetching Chelyabinsk ${entity}:`, error);
      res.status(500).json({
        error: `Failed to fetch Chelyabinsk ${entity}`,
        guard: { docsPath: '/api/legacy/guard' },
      });
    }
  };
}

/** Врачи — один REST-ответ ci74.ru, без SQL-пагинации */
export function handleChelDoctors(fetcher: () => Promise<unknown[]>) {
  return async (_req: Request, res: Response) => {
    try {
      const data = await fetcher();
      sendSinglePageJson(res, { city: 'chel', entity: 'doctors', data });
    } catch (error) {
      console.error('Error fetching Chelyabinsk doctors:', error);
      res.status(500).json({ error: 'Failed to fetch Chelyabinsk doctors' });
    }
  };
}
