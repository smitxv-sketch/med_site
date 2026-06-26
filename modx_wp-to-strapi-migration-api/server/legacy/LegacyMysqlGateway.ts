/**
 * SSOT: доступ к legacy MySQL (Beget) через throttled pool + глобальную очередь.
 * Единственная точка входа для SQL — защита от блокировки IP.
 */
import type { PoolOptions } from 'mysql2/promise';
import type { LegacyCity } from '../config/legacyDbGuard.js';
import { createThrottledPool, type ThrottledPool } from '../lib/throttledPool.js';
import {
  LEGACY_DATA_SOURCES,
  getLegacyPrefix,
  isLegacySourceConfigured,
} from './dataSources.js';

const gateways = new Map<LegacyCity, LegacyMysqlGateway>();

function readEnv(key: string, fallback = ''): string {
  return process.env[key]?.trim() || fallback;
}

export class LegacyMysqlGateway {
  private pool: ThrottledPool | null = null;

  constructor(private readonly source: LegacyCity) {}

  static get(source: LegacyCity): LegacyMysqlGateway {
    let gw = gateways.get(source);
    if (!gw) {
      gw = new LegacyMysqlGateway(source);
      gateways.set(source, gw);
    }
    return gw;
  }

  isConfigured(): boolean {
    return isLegacySourceConfigured(this.source);
  }

  getPrefix(): string {
    return getLegacyPrefix(this.source);
  }

  /** Ленивый пул — соединение только при первом запросе (не при старте процесса) */
  private ensurePool(): ThrottledPool {
    if (this.pool) return this.pool;

    const cfg = LEGACY_DATA_SOURCES[this.source];
    const options: PoolOptions = {
      host: readEnv(cfg.env.host, 'localhost'),
      port: parseInt(readEnv(cfg.env.port, '3306'), 10),
      user: readEnv(cfg.env.user, 'root'),
      password: process.env[cfg.env.password] || '',
      database: readEnv(cfg.env.database, this.source === 'chel' ? 'wordpress' : 'modx_database'),
      connectTimeout: 8_000,
    };

    this.pool = createThrottledPool(this.source, options);
    return this.pool;
  }

  /** Все SQL-запросы — только через очередь с паузой */
  query: ThrottledPool['query'] = ((...args: unknown[]) =>
    this.ensurePool().query(...(args as Parameters<ThrottledPool['query']>))) as ThrottledPool['query'];

  /** Ping для health/diagnostics — тоже через очередь (не raw) */
  async ping(): Promise<{ ok: boolean; error?: string }> {
    if (!this.isConfigured()) {
      return { ok: false, error: 'not_configured' };
    }
    try {
      await this.ensurePool().query('SELECT 1 AS ok');
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }
}

/** SPB MODX pool (обратная совместимость) */
export const spbGateway = () => LegacyMysqlGateway.get('spb');

/** Chel WP pool */
export const chelGateway = () => LegacyMysqlGateway.get('chel');
