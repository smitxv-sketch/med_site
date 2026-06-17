import { QuickActionItem } from '../../../pages/home/ui/sections/CategoriesVariants';
import { mockQuickActions } from '../../../pages/app-prototype/model/mock-data';

export interface IQuickActionsRepository {
  getQuickActions(): Promise<QuickActionItem[]>;
}

export class MockQuickActionsRepository implements IQuickActionsRepository {
  async getQuickActions(): Promise<QuickActionItem[]> {
    // Artificial delay to simulate network request
    // return new Promise(resolve => setTimeout(() => resolve(mockQuickActions), 300));
    return mockQuickActions;
  }
}
