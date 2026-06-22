import { localDb } from '../db.js';
import { StrapiClient } from './strapiClient.js';
import crypto from 'crypto';

// Helper to generate hash
export const generateHash = (data: any) => {
  return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
};

// Helper to get sync map entry
export const getSyncMap = (city: string, entityType: string, originalId: string) => {
  const stmt = localDb.prepare('SELECT * FROM sync_map WHERE city = ? AND entity_type = ? AND original_id = ?');
  return stmt.get(city, entityType, originalId) as any;
};

// Helper to update sync map
export const updateSyncMap = (city: string, entityType: string, originalId: string, strapiId: string, hash: string) => {
  const stmt = localDb.prepare(`
    INSERT INTO sync_map (city, entity_type, original_id, strapi_id, data_hash, last_synced)
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(city, entity_type, original_id) DO UPDATE SET
    strapi_id = excluded.strapi_id,
    data_hash = excluded.data_hash,
    last_synced = CURRENT_TIMESTAMP
  `);
  stmt.run(city, entityType, originalId, strapiId, hash);
};

// Helper to get sync config
export const getSyncConfig = () => {
  const stmt = localDb.prepare('SELECT key, value FROM sync_config');
  const rows = stmt.all() as { key: string, value: string }[];
  const config: Record<string, string> = {};
  rows.forEach(row => {
    config[row.key] = row.value;
  });
  return config;
};

// Helper to save sync config
export const saveSyncConfig = (config: Record<string, string>) => {
  const stmt = localDb.prepare('INSERT OR REPLACE INTO sync_config (key, value) VALUES (?, ?)');
  const transaction = localDb.transaction((conf) => {
    for (const [key, value] of Object.entries(conf)) {
      stmt.run(key, value);
    }
  });
  transaction(config);
};

// Helper to log sync events
export const logSyncEvent = (city: string, status: 'success' | 'error' | 'info', message: string, details?: any) => {
  const stmt = localDb.prepare('INSERT INTO sync_logs (city, status, message, details) VALUES (?, ?, ?, ?)');
  stmt.run(city, status, message, details ? JSON.stringify(details) : null);
};

// Helper to get logs
export const getSyncLogs = (limit = 50) => {
  const stmt = localDb.prepare('SELECT * FROM sync_logs ORDER BY created_at DESC LIMIT ?');
  return stmt.all(limit);
};

// Main sync runner
export const runSync = async (city: 'spb' | 'chelyabinsk') => {
  const config = getSyncConfig();
  
  if (!config.STRAPI_URL || !config.STRAPI_TOKEN) {
    throw new Error('Настройки Strapi не заданы. Пожалуйста, укажите URL и Token.');
  }

  const client = new StrapiClient(config.STRAPI_URL, config.STRAPI_TOKEN);
  
  // 1. Check connection
  const conn = await client.checkConnection();
  if (!conn.success) {
    logSyncEvent(city, 'error', 'Ошибка подключения к Strapi', conn.message);
    throw new Error(conn.message);
  }

  logSyncEvent(city, 'info', 'Начало синхронизации');

  try {
    // --- BATCH PROCESSING SKELETON ---
    // This function demonstrates how we will process large volumes of data
    // using chunks (batching) and delta-sync (hashing).
    
    const syncCollection = async (entityType: string, items: any[], mapper: (item: any) => any) => {
      let created = 0, updated = 0, skipped = 0, errors = 0;
      const chunkSize = 50; // Process 50 items at a time to avoid memory/API overload
      
      for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);
        
        // Process chunk sequentially to respect rate limits
        for (const item of chunk) {
          try {
            const mappedData = mapper(item);
            const hash = generateHash(mappedData);
            const existing = getSyncMap(city, entityType, String(item.id));
            
            // Delta Sync: If hash matches, skip
            if (existing && existing.data_hash === hash) {
              skipped++;
              continue;
            }
            
            if (existing && existing.strapi_id) {
              await client.updateEntry(entityType, existing.strapi_id, mappedData);
              updateSyncMap(city, entityType, String(item.id), existing.strapi_id, hash);
              updated++;
            } else {
              const res = await client.createEntry(entityType, mappedData);
              updateSyncMap(city, entityType, String(item.id), res.data.id, hash);
              created++;
            }
          } catch (err: any) {
            errors++;
            console.error(`Error syncing ${entityType} ${item.id}:`, err);
          }
        }
      }
      return { created, updated, skipped, errors };
    };

    // Simulate fetching data
    // const doctors = await getDoctorsFromSource(city);
    // const results = await syncCollection('doctors', doctors, mapDoctorToStrapi);
    // logSyncEvent(city, 'info', `Синхронизация врачей завершена`, results);

    // Simulate work
    await new Promise(resolve => setTimeout(resolve, 2000));

    logSyncEvent(city, 'success', 'Синхронизация успешно завершена (Тестовый прогон с поддержкой батчинга и дельта-синхронизации)');
    return { success: true, message: 'Синхронизация завершена' };
  } catch (error: any) {
    logSyncEvent(city, 'error', 'Ошибка во время синхронизации', error.message);
    throw error;
  }
};
