import pg from "pg";

const { Pool } = pg;

let pool: pg.Pool | null = null;

/** Имя БД bridge — только буквы/цифры/подчёркивание (защита от SQL-инъекции в CREATE DATABASE). */
function safeDbName(name: string): string {
  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    throw new Error(`Недопустимое имя БД: ${name}`);
  }
  return name;
}

/** Параметры подключения к Postgres bridge (отдельная БД, не Strapi). */
function buildPoolConfig(database?: string): pg.PoolConfig {
  if (process.env.BRIDGE_DATABASE_URL?.trim()) {
    return { connectionString: process.env.BRIDGE_DATABASE_URL.trim() };
  }

  const host = process.env.BRIDGE_PG_HOST?.trim();
  if (!host) {
    throw new Error(
      "Задайте BRIDGE_DATABASE_URL или BRIDGE_PG_HOST (Postgres для sync-состояния bridge).",
    );
  }

  return {
    host,
    port: Number(process.env.BRIDGE_PG_PORT || 5432),
    user: process.env.BRIDGE_PG_USER || "postgres",
    password: process.env.BRIDGE_PG_PASSWORD || "",
    database: database || process.env.BRIDGE_PG_DATABASE || "legacy_bridge",
  };
}

export function getBridgePool(): pg.Pool {
  if (!pool) {
    pool = new Pool(buildPoolConfig());
  }
  return pool;
}

/** Создаём БД legacy_bridge, если её ещё нет (подключаемся к служебной postgres). */
async function ensureBridgeDatabase(): Promise<void> {
  if (process.env.BRIDGE_DATABASE_URL?.trim()) {
    return;
  }

  const dbName = safeDbName(process.env.BRIDGE_PG_DATABASE || "legacy_bridge");
  const adminPool = new Pool(buildPoolConfig("postgres"));

  try {
    const { rows } = await adminPool.query<{ exists: number }>(
      "SELECT 1 AS exists FROM pg_database WHERE datname = $1",
      [dbName],
    );
    if (rows.length === 0) {
      await adminPool.query(`CREATE DATABASE ${dbName}`);
    }
  } finally {
    await adminPool.end();
  }
}

/** Создаём служебные таблицы при старте (идемпотентно). */
export async function initBridgeDb(): Promise<void> {
  await ensureBridgeDatabase();
  const db = getBridgePool();
  await db.query(`
    CREATE TABLE IF NOT EXISTS excluded_resources (
      resource_id INTEGER PRIMARY KEY,
      excluded_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS export_templates (
      template_id INTEGER PRIMARY KEY,
      is_exportable BOOLEAN DEFAULT TRUE,
      alias TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS export_fields (
      id SERIAL PRIMARY KEY,
      template_id INTEGER,
      field_name TEXT,
      is_exportable BOOLEAN DEFAULT TRUE,
      alias TEXT,
      cast_type TEXT DEFAULT 'string',
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(template_id, field_name)
    );

    CREATE TABLE IF NOT EXISTS sync_config (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS sync_logs (
      id SERIAL PRIMARY KEY,
      city TEXT,
      status TEXT,
      message TEXT,
      details TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS sync_map (
      id SERIAL PRIMARY KEY,
      city TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      original_id TEXT NOT NULL,
      strapi_id TEXT,
      data_hash TEXT,
      last_synced TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(city, entity_type, original_id)
    );
  `);
}

export async function getExcludedIds(): Promise<number[]> {
  const { rows } = await getBridgePool().query<{ resource_id: number }>(
    "SELECT resource_id FROM excluded_resources",
  );
  return rows.map((r) => r.resource_id);
}

export async function listExcludedResourceIds(): Promise<number[]> {
  return getExcludedIds();
}

export async function toggleExcludedResource(
  resourceId: number,
  exclude: boolean,
): Promise<void> {
  const db = getBridgePool();
  if (exclude) {
    await db.query(
      "INSERT INTO excluded_resources (resource_id) VALUES ($1) ON CONFLICT DO NOTHING",
      [resourceId],
    );
  } else {
    await db.query("DELETE FROM excluded_resources WHERE resource_id = $1", [
      resourceId,
    ]);
  }
}

export async function getExportSchema(): Promise<{
  templates: unknown[];
  fields: unknown[];
}> {
  const db = getBridgePool();
  const templates = await db.query("SELECT * FROM export_templates");
  const fields = await db.query("SELECT * FROM export_fields");
  return { templates: templates.rows, fields: fields.rows };
}

export async function upsertExportTemplate(
  templateId: number,
  isExportable: boolean,
  alias: string | null,
): Promise<void> {
  await getBridgePool().query(
    `INSERT INTO export_templates (template_id, is_exportable, alias, updated_at)
     VALUES ($1, $2, $3, NOW())
     ON CONFLICT (template_id) DO UPDATE SET
       is_exportable = EXCLUDED.is_exportable,
       alias = EXCLUDED.alias,
       updated_at = NOW()`,
    [templateId, isExportable, alias],
  );
}

export async function upsertExportField(
  templateId: number,
  fieldName: string,
  isExportable: boolean,
  alias: string | null,
  castType: string,
): Promise<void> {
  await getBridgePool().query(
    `INSERT INTO export_fields (template_id, field_name, is_exportable, alias, cast_type, updated_at)
     VALUES ($1, $2, $3, $4, $5, NOW())
     ON CONFLICT (template_id, field_name) DO UPDATE SET
       is_exportable = EXCLUDED.is_exportable,
       alias = EXCLUDED.alias,
       cast_type = EXCLUDED.cast_type,
       updated_at = NOW()`,
    [templateId, fieldName, isExportable, alias, castType],
  );
}
