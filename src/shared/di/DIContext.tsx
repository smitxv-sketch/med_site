import React, { createContext, useContext } from 'react';
import { IMarketingRepository, JSONMarketingRepository } from '../infrastructure/storage/MarketingRepository';
import { IDoctorsRepository, APIDoctorsRepository } from '../infrastructure/storage/DoctorsRepository';
import { IPromotionsRepository, APIPromotionsRepository } from '../infrastructure/storage/PromotionsRepository';
import { IAnalyticsService, ConsoleAnalyticsService } from '../infrastructure/analytics/AnalyticsService';
import { IQuickActionsRepository, MockQuickActionsRepository } from '../infrastructure/storage/QuickActionsRepository';
import { IDirectionsRepository, APIDirectionsRepository } from '../infrastructure/storage/DirectionsRepository';
import { IHeroRepository, APIHeroRepository } from '../infrastructure/storage/HeroRepository';
import { IWidgetRepository, APIWidgetRepository } from '../infrastructure/storage/WidgetRepository';
import { IUserProfilesRepository, MockUserProfilesRepository } from '../infrastructure/storage/UserProfilesRepository';
import { ISpecialOffersRepository, MockSpecialOffersRepository } from '../infrastructure/storage/SpecialOffersRepository';

// Define the shape of our DI Container
interface IDIContainer {
  marketingRepository: IMarketingRepository;
  doctorsRepository: IDoctorsRepository;
  promotionsRepository: IPromotionsRepository;
  quickActionsRepository: IQuickActionsRepository;
  directionsRepository: IDirectionsRepository;
  heroRepository: IHeroRepository;
  widgetRepository: IWidgetRepository;
  userProfilesRepository: IUserProfilesRepository;
  specialOffersRepository: ISpecialOffersRepository;
  analyticsService: IAnalyticsService;
}

// Default implementations 
// In a real progressive app, we might construct this dynamically based on env vars
const defaultContainer: IDIContainer = {
  marketingRepository: new JSONMarketingRepository(),
  doctorsRepository: new APIDoctorsRepository(),
  promotionsRepository: new APIPromotionsRepository(),
  quickActionsRepository: new MockQuickActionsRepository(),
  directionsRepository: new APIDirectionsRepository(),
  heroRepository: new APIHeroRepository(),
  widgetRepository: new APIWidgetRepository(),
  userProfilesRepository: new MockUserProfilesRepository(),
  specialOffersRepository: new MockSpecialOffersRepository(),
  analyticsService: new ConsoleAnalyticsService(),
};

const DIContext = createContext<IDIContainer>(defaultContainer);

export const DIProvider: React.FC<{ children: React.ReactNode, container?: IDIContainer }> = ({ 
  children, 
  container = defaultContainer 
}) => {
  return (
    <DIContext.Provider value={container}>
      {children}
    </DIContext.Provider>
  );
};

export function useMarketingRepository(): IMarketingRepository {
  const container = useContext(DIContext);
  if (!container) {
    throw new Error('useMarketingRepository must be used within a DIProvider');
  }
  return container.marketingRepository;
}

export function useDoctorsRepository(): IDoctorsRepository {
  const container = useContext(DIContext);
  if (!container) {
    throw new Error('useDoctorsRepository must be used within a DIProvider');
  }
  return container.doctorsRepository;
}

export function usePromotionsRepository(): IPromotionsRepository {
  const container = useContext(DIContext);
  if (!container) {
    throw new Error('usePromotionsRepository must be used within a DIProvider');
  }
  return container.promotionsRepository;
}

export function useQuickActionsRepository(): IQuickActionsRepository {
  const container = useContext(DIContext);
  if (!container) {
    throw new Error('useQuickActionsRepository must be used within a DIProvider');
  }
  return container.quickActionsRepository;
}

export function useDirectionsRepository(): IDirectionsRepository {
  const container = useContext(DIContext);
  if (!container) {
    throw new Error('useDirectionsRepository must be used within a DIProvider');
  }
  return container.directionsRepository;
}

export function useHeroRepository(): IHeroRepository {
  const container = useContext(DIContext);
  if (!container) {
    throw new Error('useHeroRepository must be used within a DIProvider');
  }
  return container.heroRepository;
}

export function useWidgetRepository(): IWidgetRepository {
  const container = useContext(DIContext);
  if (!container) {
    throw new Error('useWidgetRepository must be used within a DIProvider');
  }
  return container.widgetRepository;
}

export function useUserProfilesRepository(): IUserProfilesRepository {
  const container = useContext(DIContext);
  if (!container) {
    throw new Error('useUserProfilesRepository must be used within a DIProvider');
  }
  return container.userProfilesRepository;
}

export function useSpecialOffersRepository(): ISpecialOffersRepository {
  const container = useContext(DIContext);
  if (!container) {
    throw new Error('useSpecialOffersRepository must be used within a DIProvider');
  }
  return container.specialOffersRepository;
}

// Global hook for analytics via DI
export function useDIAnalytics(): IAnalyticsService {
  const container = useContext(DIContext);
  if (!container) {
    throw new Error('useDIAnalytics must be used within a DIProvider');
  }
  return container.analyticsService;
}

