import net from 'node:net';
import mysql from 'mysql2/promise';

export type SpbMysqlDiagnostic = {
  checkedAt: string;
  publicIp: string | null;
  configured: boolean;
  host: string | null;
  port: number;
  user: string | null;
  database: string | null;
  prefix: string | null;
  tcp: { ok: boolean; latencyMs: number | null; error: string | null };
  mysql: {
    ok: boolean;
    code: string | null;
    message: string | null;
    serverSeenClientAs: string | null;
    doctorCount: number | null;
  };
  begetTicketHint: string;
};

async function fetchPublicIp(): Promise<string | null> {
  try {
    const res = await fetch('https://api.ipify.org', { signal: AbortSignal.timeout(5000) });
    const text = (await res.text()).trim();
    return text || null;
  } catch {
    return null;
  }
}

function parseClientIpFromMysqlError(message: string): string | null {
  const m = message.match(/@'([^']+)'/);
  return m?.[1] ?? null;
}

function tcpProbe(host: string, port: number, timeoutMs = 8000) {
  return new Promise<{ ok: boolean; latencyMs: number | null; error: string | null }>((resolve) => {
    const started = Date.now();
    const socket = net.createConnection({ host, port });
    const done = (ok: boolean, error: string | null = null) => {
      socket.destroy();
      resolve({ ok, latencyMs: ok ? Date.now() - started : null, error });
    };
    socket.setTimeout(timeoutMs);
    socket.on('connect', () => done(true));
    socket.on('timeout', () => done(false, 'TCP timeout'));
    socket.on('error', (err) => done(false, err.message));
  });
}

/** Диагностика MySQL СПб (MODX на Beget) */
export async function runSpbMysqlDiagnostics(): Promise<SpbMysqlDiagnostic> {
  const host = process.env.SPB_DB_HOST?.trim() || null;
  const port = parseInt(process.env.SPB_DB_PORT || '3306', 10);
  const user = process.env.SPB_DB_USER?.trim() || null;
  const database = process.env.SPB_DB_NAME?.trim() || null;
  const prefix = process.env.SPB_DB_PREFIX?.trim() || 'modx_';
  const password = process.env.SPB_DB_PASSWORD || '';
  const publicIp = await fetchPublicIp();

  const base: SpbMysqlDiagnostic = {
    checkedAt: new Date().toISOString(),
    publicIp,
    configured: Boolean(host && user && database && password),
    host,
    port,
    user,
    database,
    prefix,
    tcp: { ok: false, latencyMs: null, error: null },
    mysql: { ok: false, code: null, message: null, serverSeenClientAs: null, doctorCount: null },
    begetTicketHint:
      'Нужен удалённый доступ к MySQL для пользователя cistospb_new с IP publicIp (Coolify ~37.79.254.120).',
  };

  if (!base.configured || !host || !user || !database) {
    base.tcp.error = 'SPB_DB_* не заданы в env';
    return base;
  }

  base.tcp = await tcpProbe(host, port);

  if (!base.tcp.ok) {
    base.mysql.message = 'TCP не установлен — до MySQL не дошли';
    return base;
  }

  try {
    const conn = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      connectTimeout: 12000,
    });
    await conn.query('SELECT 1 AS ok');
    const [rows] = await conn.query(
      `SELECT COUNT(*) AS c FROM ${prefix}site_content WHERE template = 7 AND parent != 209 AND published = 1 AND deleted = 0`,
    );
    const doctorCount = Number((rows as { c: number }[])[0]?.c ?? 0);
    await conn.end();
    base.mysql = {
      ok: true,
      code: null,
      message: null,
      serverSeenClientAs: publicIp,
      doctorCount,
    };
  } catch (e) {
    const err = e as { code?: string; message?: string };
    const message = err.message || String(e);
    base.mysql = {
      ok: false,
      code: err.code || 'ERR',
      message,
      serverSeenClientAs: parseClientIpFromMysqlError(message) || publicIp,
      doctorCount: null,
    };
  }

  return base;
}
