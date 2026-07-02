import type { QmsCity } from '../qmsPricelistService.js';

export type QmsOrgFetchConfig = {
  label: string;
  apiUrl: string;
  apikey: string;
  qqc244: string;
  sourceKey: string;
  /** Прокси getPr на хостинге (IP в whitelist QMS) */
  siteProxyUrl?: string;
  /** robot-dev: spec_list / getslotsbyspec (отдельный URL и ключ записи) */
  bookingApiUrl?: string;
  bookingApikey?: string;
  bookingSiteProxyUrl?: string;
};

type FetchResult = {
  sections: Array<{ val?: string; rows?: unknown[] }>;
  transport: string;
};

/** Прямой POST на back.*.ru/qms-api/getPr */
async function fetchDirect(org: QmsOrgFetchConfig): Promise<FetchResult> {
  const res = await fetch(org.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apikey: org.apikey,
      unauthorized: 1,
      qqc244: org.qqc244,
    }),
    signal: AbortSignal.timeout(90_000),
  });
  if (!res.ok) {
    throw new Error(`direct HTTP ${res.status} org=${org.qqc244}`);
  }
  const data = await res.json();
  if (!data?.data?.sections) {
    throw new Error(`direct: нет data.sections org=${org.qqc244}`);
  }
  return { sections: data.data.sections, transport: 'direct' };
}

/**
 * Через PHP на хостинге ci74.ru / cispb.com (тот же IP, что и старый qms_price).
 * Ожидает POST JSON: { apikey, unauthorized, qqc244 }
 */
async function fetchViaSiteProxy(org: QmsOrgFetchConfig): Promise<FetchResult> {
  if (!org.siteProxyUrl) {
    throw new Error('siteProxyUrl не задан');
  }
  const res = await fetch(org.siteProxyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apikey: org.apikey,
      unauthorized: 1,
      qqc244: org.qqc244,
    }),
    signal: AbortSignal.timeout(90_000),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`proxy HTTP ${res.status}: ${t.slice(0, 120)}`);
  }
  const data = await res.json();
  if (!data?.data?.sections) {
    throw new Error(`proxy: нет data.sections org=${org.qqc244}`);
  }
  return { sections: data.data.sections, transport: 'site_proxy' };
}

/** auto: proxy → direct */
export async function fetchQmsSections(org: QmsOrgFetchConfig): Promise<FetchResult> {
  const errors: string[] = [];

  if (org.siteProxyUrl) {
    try {
      return await fetchViaSiteProxy(org);
    } catch (e) {
      errors.push(e instanceof Error ? e.message : String(e));
    }
  }

  try {
    return await fetchDirect(org);
  } catch (e) {
    errors.push(e instanceof Error ? e.message : String(e));
  }

  throw new Error(errors.join(' | ') || 'QMS fetch failed');
}

export function orgConfigsForCity(city: QmsCity): QmsOrgFetchConfig[] {
  if (city === 'chel') {
    const base = {
      apiUrl: process.env.QMS_CHEL_API_URL ?? 'https://back.ci74.ru/qms-api/getPr',
      apikey: process.env.QMS_CHEL_API_KEY ?? '',
      siteProxyUrl: process.env.QMS_CHEL_SITE_PROXY_URL,
    };
    const orgs: QmsOrgFetchConfig[] = [];
    if (process.env.QMS_CHEL_ORG_MAIN) {
      orgs.push({
        ...base,
        label: 'Основная поликлиника',
        qqc244: process.env.QMS_CHEL_ORG_MAIN,
        sourceKey: 'chel-main',
      });
    }
    if (process.env.QMS_CHEL_ORG_EKO) {
      orgs.push({
        ...base,
        label: 'ЭкоКлиника',
        qqc244: process.env.QMS_CHEL_ORG_EKO,
        sourceKey: 'chel-eko',
      });
    }
    return orgs.filter((o) => o.apikey);
  }

  const apikey = process.env.QMS_SPB_API_KEY ?? '';
  if (!apikey || !process.env.QMS_SPB_ORG) return [];

  // Ключ записи (robot-dev) может отличаться от ключа прайса (getPr)
  const bookingApikey = process.env.QMS_SPB_BOOKING_API_KEY || apikey;

  return [{
    label: 'Клиника Источник СПб',
    apiUrl: process.env.QMS_SPB_API_URL ?? 'https://back.cispb.ru/qms-api/getPr',
    bookingApiUrl: process.env.QMS_SPB_BOOKING_API_URL ?? 'https://back.cispb.ru/robot-dev',
    apikey,
    bookingApikey,
    qqc244: process.env.QMS_SPB_ORG,
    sourceKey: 'spb',
    siteProxyUrl: process.env.QMS_SPB_SITE_PROXY_URL,
    // Туннель записи: ci74 IP → back.cispb.ru/robot-dev (proxy-spb.php на хостинге)
    bookingSiteProxyUrl:
      process.env.QMS_SPB_BOOKING_SITE_PROXY_URL
      ?? 'https://ci74.ru/booking/php/proxy-spb.php?endpoint=',
  }];
}
