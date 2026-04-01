import axios from 'axios';
import { loadConfig } from './configService.js';

export const testExternalConnection = async (cityId: string) => {
  const tenants = loadConfig('tenants');
  const tenant = tenants[cityId];
  
  if (!tenant) return { error: 'Tenant not found' };
  
  // Note: config uses 'apiEnv' and 'addressEnv', but diagnostics used 'apiEnvVar'.
  // Let's check tenants.json structure again.
  // "apiEnv": "chel_api", "addressEnv": "chel_adress"
  
  const apiKey = process.env[tenant.apiEnv];
  const baseUrl = process.env[tenant.addressEnv];
  
  if (!apiKey || !baseUrl) return { error: `Missing credentials for ${cityId}. Key: ${!!apiKey}, Url: ${!!baseUrl}` };

  // Ensure protocol exists
  let validBaseUrl = baseUrl;
  if (!validBaseUrl.startsWith('http://') && !validBaseUrl.startsWith('https://')) {
    validBaseUrl = `https://${validBaseUrl}`;
  }

  try {
    // Fetch public IP
    let publicIp = 'unknown';
    try {
      const ipResponse = await axios.get('https://api.ipify.org?format=json', { timeout: 3000 });
      publicIp = ipResponse.data.ip;
    } catch (e) {
      console.error('Failed to fetch public IP', e);
    }

    // Based on user logs and new PHP proxy logic
    // We now use 'endpoint' parameter to tell the proxy what to do
    const endpoints = [
        { name: 'doctors', action: 'getslotsbyspec' }, // QMS doesn't have get_doctors, use getslotsbyspec
        { name: 'services', action: 'spec_list' }
    ];
    const results: any = {};

    for (const item of endpoints) {
      try {
        // Construct URL for the proxy
        let url = validBaseUrl;
        
        // If baseUrl ends with ?endpoint=, we need to handle it carefully
        if (url.includes('?endpoint=')) {
            url = url.replace('?endpoint=', '');
        } else if (url.includes('&endpoint=')) {
            url = url.replace('&endpoint=', '');
        }
        if (url.includes('?action=')) {
            url = url.replace('?action=', '');
        } else if (url.includes('&action=')) {
            url = url.replace('&action=', '');
        }
        
        const separator = url.includes('?') ? '&' : '?';
        const targetUrl = `${url}${separator}endpoint=${item.action}`;
        
        console.log(`Testing connection to: ${targetUrl}`);
        
        // Use POST request as QMS expects POST
        const params = new URLSearchParams();
        params.append('apikey', apiKey);
        // Add dummy params for specific endpoints if needed
        if (item.action === 'getslotsbyspec') {
            params.append('chatid', '999');
            params.append('spec', 'Терапевт'); // Dummy spec
        } else if (item.action === 'spec_list') {
            params.append('qqc244', '');
        }

        const response = await axios.post(targetUrl, params.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'apikey': apiKey
          },
          timeout: 20000
        });
        
        let preview = response.data;
        if (Array.isArray(preview)) {
            preview = preview.slice(0, 2);
        } else if (preview && typeof preview === 'object') {
             const keys = Object.keys(preview);
             if (keys.length > 0 && Array.isArray(preview[keys[0]])) {
                 const firstKey = keys[0];
                 const firstVal = preview[firstKey];
                 if (Array.isArray(firstVal)) {
                    preview = { [firstKey]: firstVal.slice(0, 2) };
                 }
             }
        }
        
        results[item.name] = {
          status: response.status,
          dataPreview: preview
        };
      } catch (err: any) {
        results[item.name] = {
          error: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        };
      }
    }

    return {
      config: {
        baseUrl: validBaseUrl,
        apiKeyPreview: apiKey ? apiKey.substring(0, 4) + '...' : 'none',
        serverIp: publicIp
      },
      results
    };

  } catch (error: any) {
    return {
      error: error.message,
      stack: error.stack
    };
  }
};
