/**
 * Загрузка env одного приложения Coolify из infra/env/<app>.env
 * Имена файлов = имена приложений в Coolify UI (1:1).
 */
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const INFRA_ENV_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  'env',
);

const loaded = new Set();

export function loadAppEnv(appName) {
  if (loaded.has(appName)) return;
  loaded.add(appName);

  const filePath = path.join(INFRA_ENV_DIR, `${appName}.env`);
  if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath, override: true });
  }
}

export function appEnvPath(appName) {
  return path.join(INFRA_ENV_DIR, `${appName}.env`);
}
