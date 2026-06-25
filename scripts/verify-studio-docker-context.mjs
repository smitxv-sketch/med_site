#!/usr/bin/env node
/**
 * Проверка: попадёт ли apps/studio в Docker build context для studio-istochnik.
 * Логи → debug-76a2e2.log (NDJSON) + ingest endpoint.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const logPath = path.join(root, 'debug-76a2e2.log');
const endpoint = 'http://127.0.0.1:7817/ingest/6ca6bb65-969c-4412-9f5c-f6dfe5a18df2';
const sessionId = '76a2e2';

function agentLog(hypothesisId, location, message, data) {
  const entry = {
    sessionId,
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
    runId: process.env.DEBUG_RUN_ID ?? 'pre-fix',
  };
  fs.appendFileSync(logPath, `${JSON.stringify(entry)}\n`);
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': sessionId },
    body: JSON.stringify(entry),
  }).catch(() => {});
}

const dockerignorePath = path.join(root, '.dockerignore');
const dockerignore = fs.readFileSync(dockerignorePath, 'utf8');
const lines = dockerignore.split('\n').map((l) => l.trim()).filter(Boolean);

// H1: apps/studio в .dockerignore блокирует COPY в Dockerfile studio
const excludesStudio = lines.includes('apps/studio');
const studioPkgExists = fs.existsSync(path.join(root, 'apps/studio/package.json'));
const studioDockerfileExists = fs.existsSync(path.join(root, 'apps/studio/Dockerfile'));

agentLog('H1', 'verify-studio-docker-context.mjs:35', 'dockerignore studio exclusion', {
  excludesStudio,
  dockerignoreLines: lines,
});

agentLog('H2', 'verify-studio-docker-context.mjs:42', 'studio source files on disk', {
  studioPkgExists,
  studioDockerfileExists,
});

// H3: site-ci Dockerfile не требует apps/studio — site-ci может собираться при excludesStudio=true
const platformDockerfile = fs.readFileSync(path.join(root, 'apps/platform/Dockerfile'), 'utf8');
const siteCiNeedsStudio = platformDockerfile.includes('apps/studio');

agentLog('H3', 'verify-studio-docker-context.mjs:52', 'site-ci needs apps/studio in context', {
  siteCiNeedsStudio,
});

const wouldFailStudioBuild = excludesStudio || !studioPkgExists;
const summary = wouldFailStudioBuild
  ? 'BLOCKED: studio Docker build will fail (apps/studio missing from context)'
  : 'OK: apps/studio should be available in Docker build context';

agentLog('H1', 'verify-studio-docker-context.mjs:62', 'verdict', { wouldFailStudioBuild, summary });

console.log(summary);
console.log(`  excludesStudio=${excludesStudio}  studioPkgExists=${studioPkgExists}`);
process.exit(wouldFailStudioBuild ? 1 : 0);
