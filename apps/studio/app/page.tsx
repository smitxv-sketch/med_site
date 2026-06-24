import { fetchStudioDraft, fetchStudioPresets } from '../lib/studio-api';

const PREVIEW_URL =
  process.env.NEXT_PUBLIC_PREVIEW_URL ?? 'https://istochnik.smitx.ru';

export default async function StudioHomePage() {
  let draftError: string | null = null;
  let presetCount = 0;
  let blockCount = 0;
  let revision = 0;
  let colorTheme = '—';

  try {
    const [draft, presets] = await Promise.all([
      fetchStudioDraft('chel', 'home'),
      fetchStudioPresets(),
    ]);
    presetCount = presets.length;
    blockCount = draft.pageBlocks.length;
    revision = draft.revision;
    colorTheme = draft.engineState.colorTheme;
  } catch (e) {
    draftError = e instanceof Error ? e.message : 'Unknown error';
  }

  return (
    <main className="mx-auto flex min-h-[100svh] max-w-5xl flex-col gap-8 p-6 pb-safe">
      <header>
        <p className="text-sm uppercase tracking-wide text-slate-400">Wave 1B</p>
        <h1 className="text-3xl font-semibold">Studio — Command Center</h1>
        <p className="mt-2 text-slate-300">
          Каркас редактора. Следующий шаг — подключить UnifiedWorkspace и preview.
        </p>
      </header>

      <section className="grid gap-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-6 sm:grid-cols-3">
        <Stat label="Ревизия черновика" value={draftError ? '—' : String(revision)} />
        <Stat label="Блоков на главной" value={draftError ? '—' : String(blockCount)} />
        <Stat label="Пресетов / тема" value={draftError ? '—' : `${presetCount} / ${colorTheme}`} />
      </section>

      {draftError ? (
        <p className="rounded-lg border border-amber-600/50 bg-amber-950/40 p-4 text-amber-100">
          BFF недоступен или нет STUDIO_API_SECRET: {draftError}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <a
          href={PREVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
        >
          Открыть прод-preview
        </a>
        <a
          href="https://cms.istochnik.smitx.ru/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-slate-600 px-4 py-2 text-sm hover:bg-slate-800"
        >
          Strapi Admin
        </a>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
