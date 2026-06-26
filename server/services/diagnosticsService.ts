import { loadConfig } from './configService.js';
import { qmsDriver } from '../drivers/QmsDriver.js';

export const getDiagnostics = async () => {
  const tenants = loadConfig('tenants');
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV,
    dataSource: 'static_json (topology.json)', // Currently hardcoded
    chelDbConfigured: !!process.env.CHEL_DB_HOST,
    chelDbHost: process.env.CHEL_DB_HOST ? `${process.env.CHEL_DB_HOST.substring(0, 4)}...` : null,
    tenants: {},
    connectionTest: {}
  };

  // Check env vars for each tenant
  for (const [key, tenant] of Object.entries(tenants) as [string, any][]) {
    diagnostics.tenants[key] = {
      name: tenant.name,
      apiEnvVar: tenant.apiEnv,
      addressEnvVar: tenant.addressEnv,
      hasApiKey: !!process.env[tenant.apiEnv],
      hasAddress: !!process.env[tenant.addressEnv],
      // Security: Show first 4 chars if exists to verify value is passed
      apiKeyValuePreview: process.env[tenant.apiEnv] ? `${process.env[tenant.apiEnv]?.substring(0, 4)}...` : null
    };

    // Perform connection test if credentials exist
    if (process.env[tenant.apiEnv] && process.env[tenant.addressEnv]) {
      try {
        diagnostics.connectionTest[key] = await qmsDriver.testConnection(key);
        
        // Specific debug for chel tenant and the reported doctor
        if (key === 'chel') {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          
          const day = String(tomorrow.getDate()).padStart(2, '0');
          const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
          const year = tomorrow.getFullYear();
          const formattedDate = `${day}.${month}.${year}`;
          
          const doctorId = 'ТACdAACATAA';
          diagnostics.connectionTest[key].slotTest = {
            doctorId,
            date: formattedDate,
            rawResponse: await qmsDriver.getRawSlots(key, doctorId, formattedDate)
          };
        }
      } catch (e: any) {
        diagnostics.connectionTest[key] = { error: e.message };
      }
    } else {
      diagnostics.connectionTest[key] = { skipped: 'Missing credentials' };
    }
  }

  return diagnostics;
};
