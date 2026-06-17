import { mockUserProfiles } from '../../../pages/app-prototype/model/mock-data';
import { UserProfile } from '../../../pages/app-prototype/model/types';

export interface IUserProfilesRepository {
  getUserProfiles(): Promise<UserProfile[]>;
}

export class MockUserProfilesRepository implements IUserProfilesRepository {
  async getUserProfiles(): Promise<UserProfile[]> {
    return Promise.resolve(mockUserProfiles);
  }
}
