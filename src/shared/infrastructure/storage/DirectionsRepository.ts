import { fetchDirections } from '@/shared/api/contentApi';
import type { ServiceDirection } from '@/shared/domain/direction/types';

export interface IDirectionsRepository {
  getDirections(): Promise<ServiceDirection[]>;
}

export class APIDirectionsRepository implements IDirectionsRepository {
  async getDirections(): Promise<ServiceDirection[]> {
    return fetchDirections();
  }
}
