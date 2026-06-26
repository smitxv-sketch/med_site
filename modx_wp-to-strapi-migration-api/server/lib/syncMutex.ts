/**
 * Мьютекс синка: одна job на сущность+город (защита Beget + Strapi).
 */
const active = new Map<string, Promise<unknown>>();

export async function withSyncMutex<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const running = active.get(key);
  if (running) {
    throw new Error(`Sync already running: ${key}`);
  }

  const job = fn();
  active.set(key, job);
  try {
    return await job;
  } finally {
    active.delete(key);
  }
}

export function isSyncRunning(key: string): boolean {
  return active.has(key);
}
