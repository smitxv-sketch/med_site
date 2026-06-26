import { StrapiClient } from './strapiClient.js';
import { runDoctorSync, type SyncCity } from './SyncOrchestrator.js';
import type { SyncReport } from '../types/doctorCanonical.js';

export type { SyncReport };

/** Единая точка синка врачей */
export async function syncDoctors(city: SyncCity, client: StrapiClient): Promise<SyncReport> {
  return runDoctorSync(city, client);
}
