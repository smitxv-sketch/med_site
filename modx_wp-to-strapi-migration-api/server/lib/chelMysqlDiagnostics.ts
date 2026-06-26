import net from 'node:net';
import mysql from 'mysql2/promise';

export type ChelMysqlDiagnostic = {
  checkedAt: string;
  publicIp: string | null;
  configured: boolean;
  host: string | null;
  port: number;
  user: string | null;
  database: string | null;
  tcp: { ok: boolean; latencyMs: number | null; error: string | null };
  mysql: {
    ok: boolean;
    code: string | null;
    message: string | null;
    serverSeenClientAs: string | null;
  };
  begetTicketHint: string;
};

/** Узнать исходящий IP (для тикета Beget) */
async function fetchPublicIp(): Promise<string | null> {
  try {
    const res = await fetch('https://api.ipify.org', { signal: AbortSignal.timeout(5000) });
    const text = (await res.text()).trim();
    return text || null;
  } catch {
    return null;
  }
}

/** Извлечь IP из Access denied for user 'x'@'IP' */
function parseClientIpFromMysqlError(message: string): string | null {
  const m = message.match(/@'([^']+)'/);
  return m?.[1] ?? null;
}

function tcpProbe(host: string, port: number, timeoutMs = 8000): Promise<{ ok: boolean; latencyMs: number | null; error: string | null }> {
  return new Promise((resolve) => {
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

/** Полная диагностика подключения к MySQL Челябинска (без пароля в ответе) */
export async function runChelMysqlDiagnostics(): Promise<ChelMysqlDiagnostic> {
  const host = process.env.CHEL_DB_HOST?.trim() || null;
  const port = parseInt(process.env.CHEL_DB_PORT || '3306', 10);
  const user = process.env.CHEL_DB_USER?.trim() || null;
  const database = process.env.CHEL_DB_NAME?.trim() || null;
  const password = process.env.CHEL_DB_PASSWORD || '';
  const publicIp = await fetchPublicIp();

  const base: ChelMysqlDiagnostic = {
    checkedAt: new Date().toISOString(),
    publicIp,
    configured: Boolean(host && user && database && password),
    host,
    port,
    user,
    database,
    tcp: { ok: false, latencyMs: null, error: null },
    mysql: { ok: false, code: null, message: null, serverSeenClientAs: null },
    begetTicketHint:
      'Нужен удалённый доступ к MySQL для пользователя с IP publicIp. Ошибка Access denied означает, что порт открыт, но IP не в whitelist Beget.',
  };

  if (!base.configured || !host || !user || !database) {
    base.tcp.error = 'CHEL_DB_* не заданы в env';
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
    await conn.end();
    base.mysql = { ok: true, code: null, message: null, serverSeenClientAs: publicIp };
  } catch (e) {
    const err = e as { code?: string; message?: string };
    const message = err.message || String(e);
    base.mysql = {
      ok: false,
      code: err.code || 'ERR',
      message,
      serverSeenClientAs: parseClientIpFromMysqlError(message) || publicIp,
    };
  }

  return base;
}
