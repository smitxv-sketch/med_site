import type { Request, Response } from 'express';
import { parsePagination, sendPaginatedJson } from './pagination.js';

/** List-эндпоинты /api/explore/* с единым конвертом пагинации */
export function sendExploreList(
  res: Response,
  req: Request,
  city: string,
  entity: string,
  data: unknown[],
): void {
  const { limit, offset } = parsePagination(req);
  sendPaginatedJson(res, req, { city, entity, limit, offset, data });
}
