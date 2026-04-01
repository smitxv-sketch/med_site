import { create } from 'zustand';

interface UISettingsState {
  // В будущем эти данные будут приходить из Strapi (коллекция Global Settings)
  hideBottomNavOnScroll: boolean;
  heroMobileVariant: 'A' | 'B' | 'C';
  directionsIconVariant: 'A' | 'B' | 'C';
  bottomNavVariant: 'A' | 'B' | 'C' | 'D';
  homePageConcept: 'classic' | 'immersive';
  doctorsSectionVariant: 'A' | 'B';
  promotionsSectionVariant: 'A' | 'B' | 'C';
  
  // Метод для обновления настроек (будет вызываться после загрузки данных из API)
  setHideBottomNavOnScroll: (value: boolean) => void;
  setHeroMobileVariant: (variant: 'A' | 'B' | 'C') => void;
  setDirectionsIconVariant: (variant: 'A' | 'B' | 'C') => void;
  setBottomNavVariant: (variant: 'A' | 'B' | 'C' | 'D') => void;
  setHomePageConcept: (concept: 'classic' | 'immersive') => void;
  setDoctorsSectionVariant: (variant: 'A' | 'B') => void;
  setPromotionsSectionVariant: (variant: 'A' | 'B' | 'C') => void;
  
  // Задел на будущее: здесь могут быть другие настройки интерфейса
  // Например:
  // themeMode: 'light' | 'dark' | 'auto';
  // enableAnimations: boolean;
}

export const useUISettingsStore = create<UISettingsState>((set) => ({
  // По умолчанию фича включена
  hideBottomNavOnScroll: true, 
  heroMobileVariant: 'A',
  directionsIconVariant: 'A',
  bottomNavVariant: 'A',
  homePageConcept: 'classic',
  doctorsSectionVariant: 'A',
  promotionsSectionVariant: 'A',
  
  setHideBottomNavOnScroll: (value) => set({ hideBottomNavOnScroll: value }),
  setHeroMobileVariant: (variant) => set({ heroMobileVariant: variant }),
  setDirectionsIconVariant: (variant) => set({ directionsIconVariant: variant }),
  setBottomNavVariant: (variant) => set({ bottomNavVariant: variant }),
  setHomePageConcept: (concept) => set({ homePageConcept: concept }),
  setDoctorsSectionVariant: (variant) => set({ doctorsSectionVariant: variant }),
  setPromotionsSectionVariant: (variant) => set({ promotionsSectionVariant: variant }),
}));
