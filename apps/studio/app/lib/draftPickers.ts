import type { StudioDraftDto } from '@med-site/contracts';
import type { EngineState } from '@med-site/contracts';
import { useCmsStore } from '@/shared/store/cmsStore';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';

const ENGINE_KEYS: (keyof EngineState)[] = [
  'homePageConcept',
  'heroDesktopVariant',
  'heroMobileVariant',
  'bottomNavVariant',
  'bottomNavBehavior',
  'bottomNavActionAnimation',
  'doctorsSectionVariant',
  'promotionsSectionVariant',
  'quickActionsVariant',
  'directionsIconVariant',
  'directionsSectionVariant',
  'colorTheme',
  'colorIntensity',
  'appRadius',
  'customHue',
  'customSaturation',
  'customLightness',
  'fontFamily',
  'shadowStyle',
  'animationTheme',
  'marketingTriggers',
  'layoutDensity',
  'socialProofLevel',
  'pricingStrategy',
  'urgencyLevel',
];

/** Снимок engineState из Zustand для PATCH draft */
export function pickEngineState(): EngineState {
  const s = useUISettingsStore.getState();
  const picked = {} as EngineState;
  for (const key of ENGINE_KEYS) {
    (picked as Record<string, unknown>)[key] = s[key];
  }
  return picked;
}

/** CMS-поля черновика для PATCH draft */
export function pickCmsDraftFields() {
  const cms = useCmsStore.getState();
  return {
    pageBlocks: cms.pageBlocks,
    pageTitle: cms.pageSeo.title,
    pageSeo: { ...cms.pageSeo },
    brandVoice: cms.brandVoice,
  };
}

/** Полное тело autosave/publish */
export function pickDraftPatchBody(revision: number) {
  return {
    revision,
    engineState: pickEngineState(),
    ...pickCmsDraftFields(),
    activePresetId: useUISettingsStore.getState().activePresetId,
  };
}

/** Применить черновик BFF к Zustand stores */
export function applyDraftToStores(draft: StudioDraftDto) {
  useCmsStore.setState({
    pageBlocks: draft.pageBlocks,
    pageSeo: draft.pageSeo,
    brandVoice: draft.brandVoice,
  });

  const patch: Record<string, unknown> = {};
  for (const key of ENGINE_KEYS) {
    patch[key] = draft.engineState[key];
  }
  useUISettingsStore.setState({
    ...patch,
    activePresetId: draft.activePresetId,
    hasUnsavedChanges: false,
    isCommandCenterUnlocked: true,
  } as never);
}
