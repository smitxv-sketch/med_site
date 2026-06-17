import { fetchDirections } from '../../api/contentApi';

export interface IDirectionsRepository {
  getDirections(): Promise<any[]>;
}

export class APIDirectionsRepository implements IDirectionsRepository {
  async getDirections(): Promise<any[]> {
    return fetchDirections();
  }
}
