import axios from 'axios';
import { loadConfig } from '../../services/configService.js';

export const getTenantConfig = (cityCode: string = 'chel') => {
  const tenants = loadConfig('tenants');
  return tenants[cityCode];
};

export const getProxyUrl = (cityCode: string): string => {
  const tenant = getTenantConfig(cityCode);
  if (!tenant) return '';
  
  const url = process.env[tenant.addressEnv];
  if (!url) return '';

  let validUrl = url;
  if (!validUrl.startsWith('http')) {
    validUrl = `https://${validUrl}`;
  }
  return validUrl;
};

export const getApiKey = (cityCode: string): string => {
  const tenant = getTenantConfig(cityCode);
  return tenant ? process.env[tenant.apiEnv] || '' : '';
};

export const makeRequest = async (cityCode: string, endpoint: string, params: any) => {
  const proxyUrl = getProxyUrl(cityCode);
  const apiKey = getApiKey(cityCode);
  
  console.log(`[QMS DEBUG] makeRequest cityCode=${cityCode}, proxyUrl=${proxyUrl}, apiKey=${apiKey ? 'PRESENT' : 'MISSING'}`);

  if (!proxyUrl || !apiKey) {
    throw new Error(`Configuration missing for city: ${cityCode}`);
  }

  const finalParams = new URLSearchParams();
  finalParams.append('apikey', apiKey);
  
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      finalParams.append(key, String(params[key]));
    }
  }

  // Construct URL:
  // 1. Proxy Mode (Temporary): If URL contains .php or ?, append endpoint as query param.
  // 2. Direct Mode (Future): If URL is clean, append endpoint as path (e.g. /spec_list/).
  
  let url: string;
  const isProxy = proxyUrl.includes('.php') || proxyUrl.includes('?');

  if (isProxy) {
    let baseUrl = proxyUrl;
    // Cleanup existing endpoint/action params if present
    if (baseUrl.includes('?endpoint=')) {
      baseUrl = baseUrl.replace('?endpoint=', '');
    } else if (baseUrl.includes('&endpoint=')) {
      baseUrl = baseUrl.replace('&endpoint=', '');
    }
    if (baseUrl.includes('?action=')) {
      baseUrl = baseUrl.replace('?action=', '');
    } else if (baseUrl.includes('&action=')) {
      baseUrl = baseUrl.replace('&action=', '');
    }
    
    const separator = baseUrl.includes('?') ? '&' : '?';
    url = `${baseUrl}${separator}endpoint=${endpoint}`;
  } else {
    // Direct QMS connection style
    url = `${proxyUrl.replace(/\/$/, '')}/${endpoint}/`;
  }

  try {
    console.log(`[QMS] Requesting ${endpoint} via ${isProxy ? 'Proxy' : 'Direct'}`);
    
    // Pass finalParams.toString() to ensure it's sent as raw urlencoded string
    // Add token to headers as proxy.php expects 'token' or 'authorization'
    const response = await axios.post(url, finalParams.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': apiKey,
        'apikey': apiKey // Keep for direct connection just in case
      },
      timeout: 60000
    });

    return response.data;
  } catch (error: any) {
    console.error(`[QMS] Error requesting ${endpoint}:`, error.message);
    throw error;
  }
};
