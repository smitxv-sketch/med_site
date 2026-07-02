import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** SSOT-пути к JSON: Docker (server/mappings) → локально (docs/mappings) */
export function resolveSpbMappingPath(filename: string): string | null {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(here, '../../mappings', filename),
    path.resolve(here, '../../../../docs/mappings', filename),
    path.resolve(here, '../../../docs/mappings', filename),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}
