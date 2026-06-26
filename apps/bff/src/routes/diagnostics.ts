import type { Request, Response } from 'express';
import { getDiagnostics } from '../legacy/diagnosticsService.js';

export async function getDiagnosticsHandler(_req: Request, res: Response) {
  res.json(await getDiagnostics());
}
