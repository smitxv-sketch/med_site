'use client';

import type {
  EvolutionSuggestionDto,
  ExperimentDto,
} from '@med-site/contracts';
import { Dna, Loader2, Play, Sparkles, Trophy } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { isStudioApp } from '@/shared/config/appTarget';
import { useTenant } from '@/shared/tenant/TenantContext';
import { InsightCard } from '../components/SharedComponents';

interface SuggestResponse {
  suggestion: EvolutionSuggestionDto;
  insights: { summary: string; suggestions: string[]; source: string };
}

async function fetchExperiments(tenantId: string): Promise<ExperimentDto[]> {
  const res = await fetch(`/api/studio/experiments?tenant=${encodeURIComponent(tenantId)}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(String(res.status));
  const json = (await res.json()) as { experiments: ExperimentDto[] };
  return json.experiments;
}

/** Wave 3: A/B эксперименты и AI-эволюция (Studio → BFF) */
export const EvolutionTab = () => {
  const inStudio = isStudioApp();
  const { tenantId } = useTenant();
  const [items, setItems] = useState<ExperimentDto[]>([]);
  const [loading, setLoading] = useState(inStudio);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [suggest, setSuggest] = useState<Record<string, SuggestResponse>>({});
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!inStudio) return;
    setLoading(true);
    setError(null);
    try {
      setItems(await fetchExperiments(tenantId));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }, [inStudio, tenantId]);

  useEffect(() => {
    reload();
  }, [reload]);

  const createDemo = async () => {
    setBusyId('new');
    try {
      const res = await fetch(`/api/studio/experiments?tenant=${encodeURIComponent(tenantId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Hero: синий vs розовый',
          hypothesis: 'Розовый акцент повысит клики на запись у женской аудитории',
          variants: [
            {
              id: 'a',
              label: 'Синий (контроль)',
              weight: 50,
              engineStateOverrides: { colorTheme: 'blue' },
            },
            {
              id: 'b',
              label: 'Розовый (тест)',
              weight: 50,
              engineStateOverrides: { colorTheme: 'rose' },
            },
          ],
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось создать');
    } finally {
      setBusyId(null);
    }
  };

  const startExp = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(
        `/api/studio/experiments/${id}/start?tenant=${encodeURIComponent(tenantId)}`,
        {
        method: 'POST',
        },
      );
      if (!res.ok) throw new Error(String(res.status));
      await reload();
    } finally {
      setBusyId(null);
    }
  };

  const suggestExp = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(
        `/api/studio/experiments/${id}/suggest?tenant=${encodeURIComponent(tenantId)}`,
      );
      if (!res.ok) throw new Error(String(res.status));
      const json = (await res.json()) as SuggestResponse;
      setSuggest((s) => ({ ...s, [id]: json }));
    } finally {
      setBusyId(null);
    }
  };

  const applyWinner = async (id: string, variantId: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/studio/experiments/${id}/apply?tenant=${encodeURIComponent(tenantId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variantId,
          applyToDraft: true,
          pageSlug: 'home',
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      await reload();
      alert(
        'Победитель применён к черновику home. Проверьте preview и нажмите «Опубликовать» вручную.',
      );
    } finally {
      setBusyId(null);
    }
  };

  if (!inStudio) {
    return (
      <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-2 p-6">
        <InsightCard title="Эволюция" variant="purple">
          Полный модуль экспериментов доступен в{' '}
          <strong>studio.istochnik.smitx.ru</strong> (Wave 3).
        </InsightCard>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col animate-in fade-in slide-in-from-bottom-2">
      <div className="border-b border-pink-100 bg-gradient-to-br from-pink-50 to-rose-50 p-6">
        <div className="mb-2 flex items-center gap-2">
          <Dna className="h-5 w-5 text-pink-600" />
          <h3 className="text-[15px] font-extrabold text-pink-900">AI Эволюция (Wave 3)</h3>
        </div>
        <p className="text-sm text-pink-900/80">
          Эксперименты A/B → метрики → AI-подсказка → <strong>ручное</strong> применение к черновику.
        </p>
        <button
          type="button"
          onClick={createDemo}
          disabled={busyId === 'new'}
          className="mt-4 rounded-lg bg-pink-600 px-4 py-2 text-xs font-bold text-white hover:bg-pink-500 disabled:opacity-60"
        >
          {busyId === 'new' ? 'Создаём…' : '+ Демо-эксперимент'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : null}
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Загрузка…
          </div>
        ) : null}

        {items.map((exp) => (
          <div
            key={exp.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-slate-900">{exp.name}</p>
                <p className="text-xs text-slate-500 mt-1">{exp.hypothesis}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-2">
                  {exp.status} · показы {exp.metrics.impressions}
                </p>
              </div>
              {exp.status === 'concluded' ? (
                <Trophy className="h-5 w-5 text-amber-500 shrink-0" />
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {exp.status === 'draft' ? (
                <button
                  type="button"
                  disabled={busyId === exp.id}
                  onClick={() => startExp(exp.id)}
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <Play className="h-3 w-3" /> Запустить
                </button>
              ) : null}
              {exp.status === 'running' || exp.status === 'concluded' ? (
                <button
                  type="button"
                  disabled={busyId === exp.id}
                  onClick={() => suggestExp(exp.id)}
                  className="inline-flex items-center gap-1 rounded-lg border border-pink-200 bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-800"
                >
                  <Sparkles className="h-3 w-3" /> AI-анализ
                </button>
              ) : null}
            </div>

            {suggest[exp.id] ? (
              <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700 space-y-2">
                <p>{suggest[exp.id].suggestion.reason}</p>
                <p className="text-xs text-slate-500">{suggest[exp.id].insights.summary}</p>
                {exp.status !== 'concluded' ? (
                  <button
                    type="button"
                    disabled={busyId === exp.id}
                    onClick={() =>
                      applyWinner(exp.id, suggest[exp.id].suggestion.suggestedWinnerId)
                    }
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white"
                  >
                    Применить к черновику (без auto-publish)
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        ))}

        {!loading && items.length === 0 ? (
          <p className="text-sm text-slate-500">Нет экспериментов. Создайте демо выше.</p>
        ) : null}
      </div>
    </div>
  );
};
