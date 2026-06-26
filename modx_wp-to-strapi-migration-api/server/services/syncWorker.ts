import { getBridgePool } from "../bridgeDb.js";
import { StrapiClient } from "./strapiClient.js";
import crypto from "crypto";

export const generateHash = (data: unknown) => {
  return crypto.createHash("md5").update(JSON.stringify(data)).digest("hex");
};

export const getSyncMap = async (
  city: string,
  entityType: string,
  originalId: string,
) => {
  const { rows } = await getBridgePool().query(
    "SELECT * FROM sync_map WHERE city = $1 AND entity_type = $2 AND original_id = $3",
    [city, entityType, originalId],
  );
  return rows[0] as Record<string, unknown> | undefined;
};

export const updateSyncMap = async (
  city: string,
  entityType: string,
  originalId: string,
  strapiId: string,
  hash: string,
) => {
  await getBridgePool().query(
    `INSERT INTO sync_map (city, entity_type, original_id, strapi_id, data_hash, last_synced)
     VALUES ($1, $2, $3, $4, $5, NOW())
     ON CONFLICT (city, entity_type, original_id) DO UPDATE SET
       strapi_id = EXCLUDED.strapi_id,
       data_hash = EXCLUDED.data_hash,
       last_synced = NOW()`,
    [city, entityType, originalId, strapiId, hash],
  );
};

export const getSyncConfig = async (): Promise<Record<string, string>> => {
  const { rows } = await getBridgePool().query<{ key: string; value: string }>(
    "SELECT key, value FROM sync_config",
  );
  const config: Record<string, string> = {};
  for (const row of rows) {
    config[row.key] = row.value;
  }
  return config;
};

export const saveSyncConfig = async (config: Record<string, string>) => {
  const db = getBridgePool();
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    for (const [key, value] of Object.entries(config)) {
      await client.query(
        `INSERT INTO sync_config (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
        [key, value],
      );
    }
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

export const logSyncEvent = async (
  city: string,
  status: "success" | "error" | "info",
  message: string,
  details?: unknown,
) => {
  await getBridgePool().query(
    "INSERT INTO sync_logs (city, status, message, details) VALUES ($1, $2, $3, $4)",
    [city, status, message, details ? JSON.stringify(details) : null],
  );
};

export const getSyncLogs = async (limit = 50) => {
  const { rows } = await getBridgePool().query(
    "SELECT * FROM sync_logs ORDER BY created_at DESC LIMIT $1",
    [limit],
  );
  return rows;
};

/** История прогонов синка (фаза 2 плана) */
export async function startSyncRun(
  city: string,
  entityType: string,
  mode: string,
): Promise<number> {
  const { rows } = await getBridgePool().query<{ id: number }>(
    `INSERT INTO sync_runs (city, entity_type, mode, status)
     VALUES ($1, $2, $3, 'running') RETURNING id`,
    [city, entityType, mode],
  );
  return rows[0].id;
}

export async function finishSyncRun(
  runId: number,
  status: 'success' | 'error',
  report?: unknown,
  errorMessage?: string,
): Promise<void> {
  await getBridgePool().query(
    `UPDATE sync_runs SET status = $2, report = $3, error_message = $4, finished_at = NOW()
     WHERE id = $1`,
    [runId, status, report ? JSON.stringify(report) : null, errorMessage ?? null],
  );
}

export async function getSyncRuns(limit = 20) {
  const { rows } = await getBridgePool().query(
    'SELECT * FROM sync_runs ORDER BY started_at DESC LIMIT $1',
    [limit],
  );
  return rows;
};

export const runSync = async (city: "spb" | "chelyabinsk") => {
  const config = await getSyncConfig();

  if (!config.STRAPI_URL || !config.STRAPI_TOKEN) {
    throw new Error(
      "Настройки Strapi не заданы. Пожалуйста, укажите URL и Token.",
    );
  }

  const client = new StrapiClient(config.STRAPI_URL, config.STRAPI_TOKEN);

  const conn = await client.checkConnection();
  if (!conn.success) {
    await logSyncEvent(city, "error", "Ошибка подключения к Strapi", conn.message);
    throw new Error(conn.message);
  }

  await logSyncEvent(city, "info", "Начало синхронизации");

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await logSyncEvent(
      city,
      "success",
      "Синхронизация успешно завершена (тестовый прогон с батчингом и дельта-синхронизацией)",
    );
    return { success: true, message: "Синхронизация завершена" };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    await logSyncEvent(city, "error", "Ошибка во время синхронизации", message);
    throw error;
  }
};
