import { Doctor } from '../../../../src/widget/types';
import { getAllDoctors, getDoctors as fetchDoctorsBySpec } from '../../../../src/widget/services/api';

export interface IDoctorsRepository {
  /**
   * Retrieves all highly detailed doctor mapped models
   */
  getAllDoctors: () => Promise<Doctor[]>;
  
  /**
   * Optional: Retrieves doctors by specialty (can be enhanced in the future)
   */
  getDoctorsBySpecialty?: (specialty: string) => Promise<Doctor[]>;
}

// In the future this could map directly to a proper FSD API layer instead of a legacy widget layer
export class APIDoctorsRepository implements IDoctorsRepository {
  async getAllDoctors(): Promise<Doctor[]> {
    return getAllDoctors();
  }

  async getDoctorsBySpecialty(specialty: string): Promise<Doctor[]> {
    return fetchDoctorsBySpec(specialty);
  }
}
