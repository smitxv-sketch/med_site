import type { QmsOrgFetchConfig } from './qmsTransport.js';
import { orgConfigsForCity } from './qmsTransport.js';
import type { QmsCity } from '../qmsPricelistService.js';

export type QmsBookingOrgConfig = QmsOrgFetchConfig & {
  /** robot-dev для spec_list / getslotsbyspec (СПб: back.cispb.ru/robot-dev) */
  bookingApiUrl?: string;
};

/** Базовый URL booking API (robot-dev), не getPr */
function bookingBaseUrl(org: QmsBookingOrgConfig): string {
  if (org.bookingApiUrl) {
    return org.bookingApiUrl.replace(/\/$/, '');
  }
  // fallback: qms-api → robot-dev для СПб
  return (org.apiUrl || 'https://back.cispb.ru/qms-api/getPr')
    .replace(/\/getPr\/?$/i, '')
    .replace(/qms-api$/i, 'robot-dev')
    .replace(/\/$/, '');
}

/** URL прокси записи (не getPr): bookingSiteProxyUrl приоритетнее siteProxyUrl */
function resolveEndpointUrl(org: QmsBookingOrgConfig, endpoint: string): string {
  const proxy = org.bookingSiteProxyUrl || org.siteProxyUrl;
  if (proxy) {
    if (proxy.includes('endpoint=')) {
      return proxy.replace(/endpoint=[^&]+/, `endpoint=${endpoint}`);
    }
    return `${proxy}${proxy.includes('?') ? '&' : '?'}endpoint=${endpoint}`;
  }
  return `${bookingBaseUrl(org)}/${endpoint}/`;
}

type QmsPostResult = { data: unknown; transport: string };

function toFormBody(params: Record<string, unknown>): string {
  const form = new URLSearchParams();
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined && val !== null) {
      form.append(key, String(val));
    }
  }
  return form.toString();
}

/** POST в QMS booking API (form-urlencoded, как BFF/proxy.php) */
export async function postQmsBooking(
  city: QmsCity,
  endpoint: string,
  params: Record<string, unknown> = {},
): Promise<QmsPostResult> {
  const orgs = orgConfigsForCity(city) as QmsBookingOrgConfig[];
  if (!orgs.length) {
    throw new Error(`QMS не настроен для city=${city}`);
  }
  const org = orgs[0];
  const apikey = org.bookingApikey || org.apikey;
  const bodyParams = {
    apikey,
    unauthorized: 1,
    qqc244: org.qqc244,
    ...params,
  };
  const body = toFormBody(bodyParams);
  const url = resolveEndpointUrl(org, endpoint);
  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
    apikey,
    token: apikey,
  };

  const errors: string[] = [];
  const bookingProxy = org.bookingSiteProxyUrl || org.siteProxyUrl;

  if (bookingProxy) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body,
        signal: AbortSignal.timeout(90_000),
      });
      if (!res.ok) {
        const t = await res.text().catch(() => '');
        throw new Error(`proxy HTTP ${res.status}: ${t.slice(0, 120)}`);
      }
      return { data: await res.json(), transport: 'site_proxy' };
    } catch (e) {
      errors.push(e instanceof Error ? e.message : String(e));
    }
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body,
      signal: AbortSignal.timeout(90_000),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      throw new Error(`direct HTTP ${res.status}: ${t.slice(0, 120)}`);
    }
    return { data: await res.json(), transport: 'direct' };
  } catch (e) {
    errors.push(e instanceof Error ? e.message : String(e));
  }

  throw new Error(errors.join(' | ') || 'QMS booking request failed');
}
