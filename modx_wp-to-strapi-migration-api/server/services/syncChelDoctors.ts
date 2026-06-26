import type { StrapiClient } from './strapiClient.js';
import { runDoctorSync } from './SyncOrchestrator.js';
export type { SyncReport } from '../types/doctorCanonical.js';

/** Обратная совместимость: syncChelDoctors(client) */
export async function syncChelDoctors(client: StrapiClient) {
  return runDoctorSync('chel', client);
}
