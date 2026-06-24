import type { DesignPresetDto, StudioDraftDto } from '@med-site/contracts';

const BFF_URL =
  process.env.BFF_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_BFF_URL ??
  'http://localhost:3001';

function studioHeaders(): HeadersInit {
  const secret = process.env.STUDIO_API_SECRET ?? process.env.NEXT_PUBLIC_STUDIO_API_SECRET;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (secret) headers.Authorization = `Bearer ${secret}`;
  return headers;
}

export async function fetchStudioDraft(
  tenant = 'chel',
  page = 'home',
): Promise<StudioDraftDto> {
  const url = `${BFF_URL}/studio/draft?tenant=${tenant}&page=${page}`;
  const res = await fetch(url, {
    headers: studioHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Studio draft fetch failed: ${res.status}`);
  return res.json() as Promise<StudioDraftDto>;
}

export async function fetchStudioPresets(): Promise<DesignPresetDto[]> {
  const url = `${BFF_URL}/studio/presets`;
  const res = await fetch(url, {
    headers: studioHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Studio presets fetch failed: ${res.status}`);
  const json = (await res.json()) as { presets: DesignPresetDto[] };
  return json.presets;
}
