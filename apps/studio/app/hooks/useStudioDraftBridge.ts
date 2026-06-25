'use client';

import type { DesignPresetDto, StudioDraftDto } from '@med-site/contracts';
import { DEFAULT_TENANT_ID } from '@med-site/contracts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCmsStore } from '@/shared/store/cmsStore';
import { PRESETS, useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { designPresetToStrategy } from '@/shared/lib/studio/presetMapper';
import {
  applyDraftToStores,
  pickDraftPatchBody,
} from '../lib/draftPickers';

async function fetchDraft(tenantId: string, pageSlug: string): Promise<StudioDraftDto> {
  const res = await fetch(
    `/api/studio/draft?tenant=${encodeURIComponent(tenantId)}&page=${encodeURIComponent(pageSlug)}`,
    { cache: 'no-store' },
  );
  if (!res.ok) throw new Error(`Draft load failed: ${res.status}`);
  return res.json() as Promise<StudioDraftDto>;
}

/** Подгружает кастомные пресеты с BFF */
async function hydratePresetsFromBff(tenantId: string) {
  try {
    const res = await fetch(`/api/studio/presets?tenant=${encodeURIComponent(tenantId)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return;
    const json = (await res.json()) as { presets: DesignPresetDto[] };
    const base = PRESETS.filter((p) => !p.isCustom);
    const custom = json.presets
      .filter((p) => !p.isSystem)
      .map(designPresetToStrategy);
    useUISettingsStore.setState({ presets: [...base, ...custom] });
  } catch {
    /* остаёмся на marketingConfig */
  }
}

/** Синхронизация Zustand ↔ BFF draft (autosave + publish) */
export function useStudioDraftBridge() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tenantId = searchParams.get('tenant') ?? DEFAULT_TENANT_ID;
  const pageSlug = searchParams.get('page') ?? 'home';
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const hydrating = useRef(true);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hydrateFromDraft = useCallback((draft: StudioDraftDto) => {
    hydrating.current = true;
    applyDraftToStores(draft);
    setRevision(draft.revision);
    hydrating.current = false;
  }, []);

  useEffect(() => {
    void hydratePresetsFromBff(tenantId);
  }, [tenantId]);

  useEffect(() => {
    setLoading(true);
    fetchDraft(tenantId, pageSlug)
      .then(hydrateFromDraft)
      .catch((e) => setError(e instanceof Error ? e.message : 'Load error'))
      .finally(() => setLoading(false));
  }, [hydrateFromDraft, pageSlug, tenantId]);

  useEffect(() => {
    const onSwitch = (e: Event) => {
      const slug = (e as CustomEvent<{ pageSlug: string }>).detail?.pageSlug;
      if (!slug) return;
      setSearchParams({ tenant: tenantId, page: slug });
    };
    window.addEventListener('studio:switch-page', onSwitch);
    return () => window.removeEventListener('studio:switch-page', onSwitch);
  }, [setSearchParams, tenantId]);

  const scheduleSave = useCallback(() => {
    if (hydrating.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(async () => {
      const body = pickDraftPatchBody(revision);
      try {
        const res = await fetch(
          `/api/studio/draft?tenant=${encodeURIComponent(tenantId)}&page=${encodeURIComponent(pageSlug)}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          },
        );
        if (res.status === 409) {
          setError('Конфликт версии черновика — обновите страницу');
          return;
        }
        if (!res.ok) throw new Error(String(res.status));
        const draft = (await res.json()) as StudioDraftDto;
        setRevision(draft.revision);
        setError(null);
        useUISettingsStore.setState({ hasUnsavedChanges: false });
      } catch {
        useUISettingsStore.setState({ hasUnsavedChanges: true });
      }
    }, 800);
  }, [revision, pageSlug, tenantId]);

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
      await fetch(
        `/api/studio/draft?tenant=${encodeURIComponent(tenantId)}&page=${encodeURIComponent(pageSlug)}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pickDraftPatchBody(revision)),
        },
      );
      const res = await fetch(
        `/api/studio/publish?tenant=${encodeURIComponent(tenantId)}&page=${encodeURIComponent(pageSlug)}`,
        { method: 'POST' },
      );
      if (!res.ok) throw new Error(`Publish failed: ${res.status}`);
      const json = (await res.json()) as { draft: StudioDraftDto };
      hydrateFromDraft(json.draft);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Publish error');
    } finally {
      setPublishing(false);
    }
  }, [revision, hydrateFromDraft, pageSlug, tenantId]);

  return {
    loading,
    error,
    revision,
    publishing,
    publish,
    tenantId,
    pageSlug,
    hasUnsavedChanges: useUISettingsStore((s) => s.hasUnsavedChanges),
  };
}
