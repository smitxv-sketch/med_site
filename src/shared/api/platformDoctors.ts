import axios from 'axios';
import { DEFAULT_TENANT_ID } from '@med-site/contracts';
import type { Doctor } from '@/widget/types';

/** Каталог врачей для /doctors — Strapi через BFF (не WP напрямую) */
export async function fetchPlatformDoctors(tenant = DEFAULT_TENANT_ID): Promise<Doctor[]> {
  const { data } = await axios.get<Doctor[]>('/api/catalog/doctors', {
    timeout: 15000,
    params: { tenant },
  });
  return Array.isArray(data) ? data : [];
}
