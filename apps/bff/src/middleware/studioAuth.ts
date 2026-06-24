import type { Request, Response, NextFunction } from 'express';
import { getStudioApiSecret } from '../config/env.js';

/** Минимальная защита Studio API: Bearer STUDIO_API_SECRET */
export function studioAuth(req: Request, res: Response, next: NextFunction) {
  const secret = getStudioApiSecret();

  // Локальная разработка без секрета — пропускаем с предупреждением
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(503).json({ error: 'Studio API not configured' });
    }
    return next();
  }

  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (token !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}
