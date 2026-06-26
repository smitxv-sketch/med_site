import type { StrapiClient } from './strapiClient.js';
import { runDoctorSync } from './SyncOrchestrator.js';

export async function syncSpbDoctors(client: StrapiClient) {
  return runDoctorSync('spb', client);
}
