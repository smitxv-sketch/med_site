import type { QmsOrgFetchConfig } from './qmsTransport.js';
import { orgConfigsForCity } from './qmsTransport.js';
import type { QmsCity } from '../qmsPricelistService.js';

/** URL эндпоинта QMS booking API (getPr / spec_list / getslotsbyspec) */
function resolveEndpointUrl(org: QmsOrgFetchConfig, endpoint: string): string {
  if (org.siteProxyUrl) {
    const proxy = org.siteProxyUrl;
    if (proxy.includes('endpoint=')) {
      return proxy.replace(/endpoint=[^&]+/, `endpoint=${endpoint}`);
    }
    return `${proxy}${proxy.includes('?') ? '&' : '?'}endpoint=${endpoint}`;
  }
  const base = (org.apiUrl || 'https://back.cispb.ru/qms-api/getPr').replace(/\/getPr\/?$/i, '');
  return `${base.replace(/\/$/, '')}/${endpoint}/`;
}

type QmsPostResult = { data: unknown; transport: string };

/** POST в QMS booking API: proxy → direct */
export async function postQmsBooking(
  city: QmsCity,
  endpoint: string,
  params: Record<string, unknown> = {},
): Promise<QmsPostResult> {
  const orgs = orgConfigsForCity(city);
  if (!orgs.length) {
    throw new Error(`QMS не настроен для city=${city}`);
  }
  const org = orgs[0];
  const body = {
    apikey: org.apikey,
    unauthorized: 1,
    qqc244: org.qqc244,
    ...params,
  };

  const errors: string[] = [];

  if (org.siteProxyUrl) {
    try {
      const res = await fetch(resolveEndpointUrl(org, endpoint), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(90_000),
      });
      if (!res.ok) {
        throw new Error(`proxy HTTP ${res.status}`);
      }
      return { data: await res.json(), transport: 'site_proxy' };
    } catch (e) {
      errors.push(e instanceof Error ? e.message : String(e));
    }
  }

  try {
    const res = await fetch(resolveEndpointUrl(org, endpoint), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(90_000),
    });
    if (!res.ok) {
      throw new Error(`direct HTTP ${res.status}`);
    }
    return { data: await res.json(), transport: 'direct' };
  } catch (e) {
    errors.push(e instanceof Error ? e.message : String(e));
  }

  throw new Error(errors.join(' | ') || 'QMS booking request failed');
}
