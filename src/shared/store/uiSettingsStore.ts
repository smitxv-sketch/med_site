import { create } from 'zustand';
import marketingConfig from '../api/marketingConfig.json';
import { useCmsStore } from './cmsStore';
import { 
  EngineState, StrategyPreset, MarketingRule,
  ColorTheme, ColorIntensity, FontFamily, ShadowStyle, AnimationTheme,
  LayoutDensity, SocialProofLevel, PricingStrategy, UrgencyLevel
} from '../domain/marketing/types';

export type { ColorTheme, ColorIntensity, FontFamily, ShadowStyle, AnimationTheme, LayoutDensity, SocialProofLevel, PricingStrategy, UrgencyLevel };

export type WidgetType = 
  | 'HeroWidget' 
  | 'CategoriesWidget' 
  | 'PromotionsWidget' 
  | 'SpecialOffersWidget' 
  | 'DirectionsWidget' 
  | 'DoctorsWidget' 
  | 'LocationsWidget' 
  | 'ReviewsWidget' 
  | 'GalleryWidget'
  | 'FeaturesWidget'
  | 'TimelineWidget'
  | 'FaqWidget'
  | 'CalculatorWidget'
  | 'PortfolioWidget'
  | 'GridContainerWidget'
  | 'header'
  | 'footer'
  | 'showcase'
  | 'program';

export const PRESETS: StrategyPreset[] = marketingConfig.presets as StrategyPreset[];
export const SEMANTIC_RULES: MarketingRule[] = marketingConfig.semanticRules as MarketingRule[];

// UISettingsState is now an extension of EngineState along with UI controls
interface UISettingsState extends EngineState {
  // Config state
  presets: StrategyPreset[];
  semanticRules: MarketingRule[];
  
  isDevMode: boolean;
  isWidgetEditorMinimized: boolean;
  isCommandCenterUnlocked: boolean;
  userRole: 'integrator' | 'director';
  activePresetId: string | null;
  activeRuleId: string | null;
  bottomNavBehavior: 'always-visible' | 'hide-on-scroll-down' | 'hidden-on-top';
  cityRegion: string;
  setCityRegion: (city: string) => void;
  isCitySelectorOpen: boolean;
  setIsCitySelectorOpen: (isOpen: boolean) => void;
  isXRayMode: boolean;
  setIsXRayMode: (value: boolean) => void;
  
  isCommandCenterOpen: boolean;
  setIsCommandCenterOpen: (value: boolean) => void;
  commandCenterWidth: number;
  setCommandCenterWidth: (value: number) => void;

  setIsDevMode: (value: boolean) => void;
  setIsWidgetEditorMinimized: (value: boolean) => void;
  unlockCommandCenter: () => void;
  setUserRole: (role: 'integrator' | 'director') => void;
  setBottomNavBehavior: (behavior: 'always-visible' | 'hide-on-scroll-down' | 'hidden-on-top') => void;
  setHeroDesktopVariant: (variant: 'A' | 'B' | 'C' | 'D') => void;
  setHeroMobileVariant: (variant: 'A' | 'B' | 'C' | 'D' | 'E' | 'F') => void;
  setBottomNavVariant: (variant: 'A' | 'B' | 'C' | 'D') => void;
  setBottomNavActionAnimation: (animation: 'pulse' | 'border-beam' | 'shimmer' | 'neon') => void;
  setHomePageConcept: (concept: 'classic' | 'immersive') => void;
  setDoctorsSectionVariant: (variant: 'A' | 'B') => void;
  setDirectionsIconVariant: (variant: 'A' | 'B' | 'C') => void;
  setDirectionsSectionVariant: (variant: 'A' | 'B' | 'C' | 'D') => void;
  setPromotionsSectionVariant: (variant: 'A' | 'B' | 'C' | 'D' | 'E') => void;
  setQuickActionsVariant: (variant: 'none' | 'A' | 'B' | 'C') => void;

  setColorTheme: (theme: ColorTheme) => void;
  setColorIntensity: (intensity: ColorIntensity) => void;
  setAppRadius: (radius: number) => void;
  setKey: <K extends keyof Omit<UISettingsState, 'setKey' | 'setIsDevMode' | 'setUserRole' | 'setBottomNavBehavior' | 'setHeroMobileVariant' | 'setBottomNavVariant' | 'setBottomNavActionAnimation' | 'setHomePageConcept' | 'setDoctorsSectionVariant' | 'setPromotionsSectionVariant' | 'setQuickActionsVariant' | 'setColorTheme' | 'setColorIntensity' | 'setAppRadius' | 'applyPreset' | 'applyRule' | 'resetToDefaults'>>(key: K, value: UISettingsState[K]) => void;
  applyPreset: (presetId: string) => void;
  applyRule: (ruleId: string | null) => void;
  resetToDefaults: () => void;
  
  hydrateConfig: (presets: StrategyPreset[], rules: MarketingRule[]) => void;
  hasUnsavedChanges: boolean;
  saveCustomPreset: (info: { name: string, desc: string, emoji: string }) => void;
  deleteCustomPreset: (id: string) => void;
  updateCustomPreset: (id: string, info?: { name?: string, desc?: string, emoji?: string }) => void;
}

export const useUISettingsStore = create<UISettingsState>((set, get) => ({
  // ==========================================
  // SLICE 2: APP UI STATE (Role, Layout, Modals)
  // ==========================================
  isDevMode: false,
  isWidgetEditorMinimized: false,
  isXRayMode: false,
  isCommandCenterUnlocked: false,
  userRole: 'integrator',
  hasUnsavedChanges: false,
  cityRegion: 'Челябинск',
  isCitySelectorOpen: false,

  setCityRegion: (cityRegion) => set({ cityRegion }),
  setIsCitySelectorOpen: (isCitySelectorOpen) => set({ isCitySelectorOpen }), 
  setIsXRayMode: (isXRayMode) => {
    set({ isXRayMode });
    if (isXRayMode) {
      document.body.classList.add('x-ray-mode');
    } else {
      document.body.classList.remove('x-ray-mode');
    }
  },
  
  isCommandCenterOpen: false,
  setIsCommandCenterOpen: (value) => set({ isCommandCenterOpen: value }),
  commandCenterWidth: 640,
  setCommandCenterWidth: (value) => set({ commandCenterWidth: value }),

  setIsDevMode: (value) => set({ isDevMode: value }),
  setIsWidgetEditorMinimized: (value) => set({ isWidgetEditorMinimized: value }),
  unlockCommandCenter: () => set({ isCommandCenterUnlocked: true }),
  setUserRole: (role) => set({ userRole: role }),
  setBottomNavBehavior: (behavior) => set({ bottomNavBehavior: behavior, activeRuleId: null, hasUnsavedChanges: true }),

  // ==========================================
  // SLICE 3: THEME & TOKENS STATE
  // ==========================================
  homePageConcept: 'classic',
  heroDesktopVariant: 'A',
  heroMobileVariant: 'A',
  bottomNavVariant: 'A',
  bottomNavBehavior: 'hide-on-scroll-down',
  bottomNavActionAnimation: 'pulse',
  doctorsSectionVariant: 'A',
  promotionsSectionVariant: 'A',
  directionsIconVariant: 'A',
  directionsSectionVariant: 'A',
  quickActionsVariant: 'A',
  colorTheme: 'green',
  colorIntensity: 'standard',
  appRadius: 16,
  customHue: 153,
  customSaturation: 70,
  customLightness: 45,
  fontFamily: 'inter',
  shadowStyle: 'soft',
  animationTheme: 'default',
  marketingTriggers: true,
  layoutDensity: 1.0,
  socialProofLevel: 'balanced',
  pricingStrategy: 'open',
  urgencyLevel: 'soft',

  setHeroDesktopVariant: (variant) => set({ heroDesktopVariant: variant }),
  setHeroMobileVariant: (variant) => set({ heroMobileVariant: variant }),
  setBottomNavVariant: (variant) => set({ bottomNavVariant: variant }),
  setBottomNavActionAnimation: (animation) => set({ bottomNavActionAnimation: animation }),
  setHomePageConcept: (concept) => set({ homePageConcept: concept }),
  setDoctorsSectionVariant: (variant) => set({ doctorsSectionVariant: variant }),
  setDirectionsIconVariant: (variant) => set({ directionsIconVariant: variant }),
  setDirectionsSectionVariant: (variant) => set({ directionsSectionVariant: variant }),
  setPromotionsSectionVariant: (variant) => set({ promotionsSectionVariant: variant }),
  setQuickActionsVariant: (variant) => set({ quickActionsVariant: variant }),
  setColorTheme: (theme) => set({  colorTheme: theme, activeRuleId: null, hasUnsavedChanges: true  }),
  setColorIntensity: (intensity) => set({  colorIntensity: intensity, activeRuleId: null, hasUnsavedChanges: true  }),
  setAppRadius: (radius) => set({  appRadius: radius, activeRuleId: null, hasUnsavedChanges: true  }),
  setKey: (key, value) => set({ [key]: value, activeRuleId: null, hasUnsavedChanges: true } as any),

  // ==========================================
  // SLICE 4: MARKETING ENGINE STATE
  // ==========================================
  presets: PRESETS,
  semanticRules: SEMANTIC_RULES,
  activePresetId: null,
  activeRuleId: null,

  applyPreset: (presetId) => {
    const preset = get().presets.find(p => p.id === presetId);
    const defaultPreset = get().presets.find(p => p.id === 'default');
    if (preset && defaultPreset) {
      // Kalashnikov approach: gently apply cms page blocks if they exist in the preset
      // MUST be before `set(...)` so that `setPageBlocks` setting `hasUnsavedChanges: true` gets overwritten!
      if (preset.pageBlocks && preset.pageBlocks.length > 0) {
        useCmsStore.getState().setPageBlocks(preset.pageBlocks);
      }

      set({ 
        activePresetId: preset.id,
        activeRuleId: null, // Reset active rule when directly picking a preset
        hasUnsavedChanges: false,
        ...defaultPreset.state, // Reset leakage first
        ...preset.state         // Apply specific logic
      } as any);
    }
  },
  
  applyRule: (ruleId) => {
    if (!ruleId) {
       // Turn off rule, revert to default preset or just clear activeRuleId and re-apply active preset
       const currentPresetId = get().activePresetId || 'default';
       get().applyPreset(currentPresetId);
       set({ activeRuleId: null });
       return;
    }
    
    const rule = get().semanticRules.find(r => r.id === ruleId);
    const defaultPreset = get().presets.find(p => p.id === 'default');
    if (rule && defaultPreset) {
      set({ 
        activeRuleId: rule.id,
        activePresetId: null, // Turn off preset tracking if driven by a rule
        ...defaultPreset.state, 
        ...rule.stateOverrides 
      } as any);
    }
  },
  
  resetToDefaults: () => {
    const defaultPreset = get().presets.find(p => p.id === 'default');
    if (defaultPreset) {
      set({
        activePresetId: 'default',
        activeRuleId: null,
        ...defaultPreset.state
      } as any);
    }
  },
  
  hydrateConfig: (presets, rules) => {
    set({ presets, semanticRules: rules });
  },
  saveCustomPreset: (info) => {
    const state = get();
    const currentStateToSave = {
      homePageConcept: state.homePageConcept,
      heroDesktopVariant: state.heroDesktopVariant,
      heroMobileVariant: state.heroMobileVariant,
      bottomNavVariant: state.bottomNavVariant,
      bottomNavBehavior: state.bottomNavBehavior,
      bottomNavActionAnimation: state.bottomNavActionAnimation,
      doctorsSectionVariant: state.doctorsSectionVariant,
      promotionsSectionVariant: state.promotionsSectionVariant,
      quickActionsVariant: state.quickActionsVariant,
      directionsIconVariant: state.directionsIconVariant,
      directionsSectionVariant: state.directionsSectionVariant,
      colorTheme: state.colorTheme,
      colorIntensity: state.colorIntensity,
      appRadius: state.appRadius,
      customHue: state.customHue,
      customSaturation: state.customSaturation,
      customLightness: state.customLightness,
      fontFamily: state.fontFamily,
      shadowStyle: state.shadowStyle,
      animationTheme: state.animationTheme,
      marketingTriggers: state.marketingTriggers,
      layoutDensity: state.layoutDensity,
      socialProofLevel: state.socialProofLevel,
      pricingStrategy: state.pricingStrategy,
      urgencyLevel: state.urgencyLevel,
    };
    
    // Save CMS blocks too
    const currentPageBlocks = useCmsStore.getState().pageBlocks;

    const newPreset = {
      id: 'custom_' + Date.now(),
      name: info.name,
      desc: info.desc,
      emoji: info.emoji,
      isCustom: true,
      state: currentStateToSave,
      pageBlocks: currentPageBlocks,
    };
    set({
      presets: [...state.presets, newPreset],
      activePresetId: newPreset.id,
      hasUnsavedChanges: false
    });
  },
  deleteCustomPreset: (id) => {
    const state = get();
    set({
      presets: state.presets.filter(p => p.id !== id || !p.isCustom),
      activePresetId: state.activePresetId === id ? 'default' : state.activePresetId
    });
  },
  updateCustomPreset: (id, info) => {
    const state = get();
    const currentStateToSave = {
      homePageConcept: state.homePageConcept,
      heroDesktopVariant: state.heroDesktopVariant,
      heroMobileVariant: state.heroMobileVariant,
      bottomNavVariant: state.bottomNavVariant,
      bottomNavBehavior: state.bottomNavBehavior,
      bottomNavActionAnimation: state.bottomNavActionAnimation,
      doctorsSectionVariant: state.doctorsSectionVariant,
      promotionsSectionVariant: state.promotionsSectionVariant,
      quickActionsVariant: state.quickActionsVariant,
      directionsIconVariant: state.directionsIconVariant,
      directionsSectionVariant: state.directionsSectionVariant,
      colorTheme: state.colorTheme,
      colorIntensity: state.colorIntensity,
      appRadius: state.appRadius,
      customHue: state.customHue,
      customSaturation: state.customSaturation,
      customLightness: state.customLightness,
      fontFamily: state.fontFamily,
      shadowStyle: state.shadowStyle,
      animationTheme: state.animationTheme,
      marketingTriggers: state.marketingTriggers,
      layoutDensity: state.layoutDensity,
      socialProofLevel: state.socialProofLevel,
      pricingStrategy: state.pricingStrategy,
      urgencyLevel: state.urgencyLevel,
    };
    
    const currentPageBlocks = useCmsStore.getState().pageBlocks;
    
    set({
      presets: state.presets.map(p => {
        if (p.id === id && p.isCustom) {
          return { 
             ...p, 
             ...(info || {}),
             state: currentStateToSave,
             pageBlocks: currentPageBlocks
          };
        }
        return p;
      }),
      hasUnsavedChanges: state.activePresetId === id ? false : state.hasUnsavedChanges
    });
  }
}));
