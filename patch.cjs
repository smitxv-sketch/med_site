
const fs = require('fs');
let s = fs.readFileSync('src/shared/store/uiSettingsStore.ts', 'utf8');

const interfacesAddition = `
  hasUnsavedChanges: boolean;
  saveCustomPreset: (info: { name: string, desc: string, emoji: string }) => void;
  deleteCustomPreset: (id: string) => void;
  updateCustomPreset: (id: string, info: { name: string, desc: string, emoji: string }) => void;`;

s = s.replace('  hydrateConfig: (presets: StrategyPreset[], rules: MarketingRule[]) => void;\n}', `  hydrateConfig: (presets: StrategyPreset[], rules: MarketingRule[]) => void;${interfacesAddition}\n}`);

s = s.replace(`  userRole: 'integrator', // Default to integrator to show full config`, `  userRole: 'integrator', // Default to integrator to show full config
  hasUnsavedChanges: false,`);

s = s.replace(/(setColorTheme: .*? => )set\(\{(.*?)activePresetId: null, activeRuleId: null(.*?)\}\),/g, '$1set({ $2activePresetId: null, activeRuleId: null, hasUnsavedChanges: true $3}),');
s = s.replace(/(setColorIntensity: .*? => )set\(\{(.*?)activePresetId: null, activeRuleId: null(.*?)\}\),/g, '$1set({ $2activePresetId: null, activeRuleId: null, hasUnsavedChanges: true $3}),');
s = s.replace(/(setAppRadius: .*? => )set\(\{(.*?)activePresetId: null, activeRuleId: null(.*?)\}\),/g, '$1set({ $2activePresetId: null, activeRuleId: null, hasUnsavedChanges: true $3}),');
s = s.replace(/(setKey: \(key, value\) => )set\(\{ \[key\]: value, activePresetId: null, activeRuleId: null \} as any\),/g, '$1set({ [key]: value, activePresetId: null, activeRuleId: null, hasUnsavedChanges: true } as any),');

s = s.replace(`  applyPreset: (presetId) => {
    const preset = get().presets.find(p => p.id === presetId);
    const defaultPreset = get().presets.find(p => p.id === 'default');
    if (preset && defaultPreset) {
      set({ 
        activePresetId: preset.id,
        activeRuleId: null, // Reset active rule when directly picking a preset
        ...defaultPreset.state, // Reset leakage first
        ...preset.state         // Apply specific logic
      } as any);`, `  applyPreset: (presetId) => {
    const preset = get().presets.find(p => p.id === presetId);
    const defaultPreset = get().presets.find(p => p.id === 'default');
    if (preset && defaultPreset) {
      set({ 
        activePresetId: preset.id,
        activeRuleId: null, // Reset active rule when directly picking a preset
        hasUnsavedChanges: false,
        ...defaultPreset.state, // Reset leakage first
        ...preset.state         // Apply specific logic
      } as any);`);
      
s = s.replace(`  hydrateConfig: (presets, rules) => {
    set({ presets, semanticRules: rules });
    // optionally re-apply active preset
  }`, `  hydrateConfig: (presets, rules) => {
    set({ presets, semanticRules: rules });
  },
  saveCustomPreset: (info) => {
    const state = get();
    const currentStateToSave = {
      homePageConcept: state.homePageConcept,
      heroMobileVariant: state.heroMobileVariant,
      bottomNavVariant: state.bottomNavVariant,
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
    const newPreset = {
      id: 'custom_' + Date.now(),
      name: info.name,
      desc: info.desc,
      emoji: info.emoji,
      isCustom: true,
      state: currentStateToSave,
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
    set({
      presets: state.presets.map(p => (p.id === id && p.isCustom) ? { ...p, ...info } : p)
    });
  }`);

fs.writeFileSync('src/shared/store/uiSettingsStore.ts', s, 'utf8');
console.log('Patch complete.');
