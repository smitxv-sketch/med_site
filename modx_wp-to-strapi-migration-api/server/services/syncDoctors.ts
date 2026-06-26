import { StrapiClient } from './strapiClient.js';
import { syncChelDoctors, type SyncReport } from './syncChelDoctors.js';
import { syncSpbDoctors } from './syncSpbDoctors.js';

export type SyncCity = 'chel' | 'spb';

/** Единая точка синка врачей: ЧЛБ (REST) или СПб (MODX MySQL) */
export async function syncDoctors(city: SyncCity, client: StrapiClient): Promise<SyncReport> {
  if (city === 'chel') return syncChelDoctors(client);
  return syncSpbDoctors(client);
}
