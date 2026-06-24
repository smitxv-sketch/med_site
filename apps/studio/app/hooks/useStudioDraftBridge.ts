'use client';

import type { EngineState, StudioDraftDto } from '@med-site/contracts';
import { useCallback, useEffect, useRef, useState } from 'react';
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

function pickEngineState(): EngineState {
  const s = useUISettingsStore.getState();
  const picked = {} as EngineState;
  for (const key of ENGINE_KEYS) {
    (picked as Record<string, unknown>)[key] = s[key];
  }
  return picked;
}

function applyEngineState(state: EngineState) {
  const patch: Record<string, unknown> = {};
  for (const key of ENGINE_KEYS) {
    patch[key] = state[key];
  }
  useUISettingsStore.setState({
    ...patch,
    hasUnsavedChanges: false,
  } as never);
}

async function fetchDraft(): Promise<StudioDraftDto> {
  const res = await fetch('/api/studio/draft?tenant=chel&page=home', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Draft load failed: ${res.status}`);
  return res.json() as Promise<StudioDraftDto>;
}

/** Синхронизация Zustand ↔ BFF draft (autosave + publish) */
export function useStudioDraftBridge() {
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const hydrating = useRef(true);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hydrateFromDraft = useCallback((draft: StudioDraftDto) => {
    hydrating.current = true;
    useCmsStore.setState({ pageBlocks: draft.pageBlocks });
    applyEngineState(draft.engineState);
    if (draft.activePresetId) {
      useUISettingsStore.setState({ activePresetId: draft.activePresetId });
    }
    useUISettingsStore.setState({ hasUnsavedChanges: false, isCommandCenterUnlocked: true });
    setRevision(draft.revision);
    hydrating.current = false;
  }, []);

  useEffect(() => {
    fetchDraft()
      .then(hydrateFromDraft)
      .catch((e) => setError(e instanceof Error ? e.message : 'Load error'))
      .finally(() => setLoading(false));
  }, [hydrateFromDraft]);

  const scheduleSave = useCallback(() => {
    if (hydrating.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(async () => {
      const body = {
        revision,
        engineState: pickEngineState(),
        pageBlocks: useCmsStore.getState().pageBlocks,
        activePresetId: useUISettingsStore.getState().activePresetId,
      };
      try {
        const res = await fetch('/api/studio/draft?tenant=chel&page=home', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(String(res.status));
        const draft = (await res.json()) as StudioDraftDto;
        setRevision(draft.revision);
        useUISettingsStore.setState({ hasUnsavedChanges: false });
      } catch {
        useUISettingsStore.setState({ hasUnsavedChanges: true });
      }
    }, 800);
  }, [revision]);

  useEffect(() => {
    const unsubUi = useUISettingsStore.subscribe(scheduleSave);
    const unsubCms = useCmsStore.subscribe(scheduleSave);
    return () => {
      unsubUi();
      unsubCms();
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [scheduleSave]);

  const publish = useCallback(async () => {
    setPublishing(true);
    setError(null);
    try {
      await fetch('/api/studio/draft?tenant=chel&page=home', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          revision,
          engineState: pickEngineState(),
          pageBlocks: useCmsStore.getState().pageBlocks,
          activePresetId: useUISettingsStore.getState().activePresetId,
        }),
      });
      const res = await fetch('/api/studio/publish?tenant=chel&page=home', {
        method: 'POST',
      });
      if (!res.ok) throw new Error(`Publish failed: ${res.status}`);
      const json = (await res.json()) as { draft: StudioDraftDto };
      hydrateFromDraft(json.draft);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Publish error');
    } finally {
      setPublishing(false);
    }
  }, [revision, hydrateFromDraft]);

  return {
    loading,
    error,
    revision,
    publishing,
    publish,
    hasUnsavedChanges: useUISettingsStore((s) => s.hasUnsavedChanges),
  };
}
