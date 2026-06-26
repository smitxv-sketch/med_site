import { DEFAULT_TENANT_ID, resolveTenant } from '@med-site/contracts';
import { Doctor } from '../../../../src/widget/types';
import { fetchPlatformDoctors } from '../../api/platformDoctors';
import { getAllDoctors, getDoctors as fetchDoctorsBySpec } from '../../../../src/widget/services/api';

function resolveTenantId(): string {
  if (typeof window === 'undefined') return DEFAULT_TENANT_ID;
  try {
    return resolveTenant({
      host: window.location.host,
      pathname: window.location.pathname,
    }).tenant.id;
  } catch {
    return DEFAULT_TENANT_ID;
  }
}

export interface IDoctorsRepository {
  getAllDoctors: () => Promise<Doctor[]>;
  getDoctorsBySpecialty?: (specialty: string) => Promise<Doctor[]>;
}

/** Strapi SSOT для каталога; booking-виджет по-прежнему использует /api/wp-doctors */
export class APIDoctorsRepository implements IDoctorsRepository {
  async getAllDoctors(): Promise<Doctor[]> {
    try {
      const fromStrapi = await fetchPlatformDoctors(resolveTenantId());
      if (fromStrapi.length > 0) return fromStrapi;
    } catch (e) {
      console.warn('[DoctorsRepository] Strapi /api/doctors failed, fallback to wp-doctors', e);
    }
    return getAllDoctors();
  }

  async getDoctorsBySpecialty(specialty: string): Promise<Doctor[]> {
    return fetchDoctorsBySpec(specialty);
  }
}
