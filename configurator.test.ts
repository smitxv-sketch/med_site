import { useUISettingsStore, PRESETS } from './src/shared/store/uiSettingsStore.js';

async function runTests() {
  console.log("Running UI Configurator Logic Auto-Tests...");

  let state = useUISettingsStore.getState();
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, msg: string) {
    total++;
    if (condition) {
      console.log(`✅ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${msg}`);
    }
  }

  // TEST 1: verify presets restore state without leakage
  useUISettingsStore.getState().applyPreset('neo');
  state = useUISettingsStore.getState();
  
  assert(state.colorTheme === 'custom', "Neo preset applies custom colorTheme");
  assert(state.shadowStyle === 'neo', "Neo preset applies neo shadowStyle");
  assert(state.quickActionsVariant === 'C', "Neo preset modifies architectural blocks natively");
  
  useUISettingsStore.getState().applyPreset('apple');
  state = useUISettingsStore.getState();
  
  assert(state.colorTheme === 'blue', "Apple preset applies blue colorTheme");
  assert(state.shadowStyle === 'soft', "Leakage check: Apple preset reverts shadowStyle to soft instead of preserving neo");
  assert(state.quickActionsVariant === 'B', "Apple preset applies Apple-specific QuickActions structural variant (B)");
  assert(state.customHue === 153, "Leakage check: custom variables reset to default when switching preset");

  // TEST 2: Intensity behavior
  useUISettingsStore.getState().setColorIntensity('vibrant');
  state = useUISettingsStore.getState();
  assert(state.colorIntensity === 'vibrant', "setColorIntensity works correctly");

  // TEST 3: DevMode behavior isn't deleting tokens
  useUISettingsStore.getState().setIsDevMode(true);
  useUISettingsStore.getState().setAppRadius(8);
  useUISettingsStore.getState().setIsDevMode(false);
  state = useUISettingsStore.getState();
  assert(state.appRadius === 8, "Deactivating DevMode DOES NOT clear custom tokens");

  console.log(`\nResults: ${passed}/${total} passed.`);
  if (passed !== total) process.exit(1);
}

runTests();
