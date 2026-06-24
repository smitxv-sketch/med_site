import type { PageDto } from '@med-site/contracts';

const BFF_URL = process.env.BFF_INTERNAL_URL ?? process.env.NEXT_PUBLIC_BFF_URL ?? 'http://localhost:3001';

export async function fetchPage(slug: string, tenant = 'chel'): Promise<PageDto> {
  const url = `${BFF_URL}/api/pages/${slug}?tenant=${tenant}`;
  const res = await fetch(url, {
    next: { tags: [`page:${slug}`, `tenant:${tenant}`] },
  });

  if (!res.ok) {
    throw new Error(`BFF page fetch failed: ${res.status}`);
  }

  return res.json() as Promise<PageDto>;
}
