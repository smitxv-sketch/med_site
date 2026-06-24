export type DataMode = 'mock' | 'live' | 'hybrid';

export function getDataMode(): DataMode {
  const mode = process.env.DATA_MODE ?? 'mock';
  if (mode === 'live' || mode === 'hybrid') return mode;
  return 'mock';
}

export function getStrapiUrl(): string {
  return (process.env.STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '');
}

export function getStrapiToken(): string | undefined {
  return process.env.STRAPI_API_TOKEN;
}
