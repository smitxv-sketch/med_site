import { loadConfig } from './configService.js';

/**
 * Лёгкая диагностика для виджета записи (без тяжёлых QMS-тестов на каждый заход).
 * Полные проверки — через /api/diagnostics/test-connection в админке.
 */
export const getDiagnostics = async () => {
  const tenants = loadConfig('tenants') as Record<
    string,
    { name: string; apiEnv: string; addressEnv: string }
  >;

  const diagnostics: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV,
    dataSource: 'bff_config',
    chelApiConfigured: !!(
      process.env.QMS_CHEL_API_KEY && process.env.QMS_CHEL_ADDRESS
    ),
    chelRestConfigured: !!process.env.CHEL_API_ENDPOINT,
    tenants: {},
    connectionTest: {},
  };

  for (const [key, tenant] of Object.entries(tenants)) {
    (diagnostics.tenants as Record<string, unknown>)[key] = {
      name: tenant.name,
      apiEnvVar: tenant.apiEnv,
      addressEnvVar: tenant.addressEnv,
      hasApiKey: !!process.env[tenant.apiEnv],
      hasAddress: !!process.env[tenant.addressEnv],
      apiKeyValuePreview: process.env[tenant.apiEnv]
        ? `${process.env[tenant.apiEnv]?.substring(0, 4)}...`
        : null,
    };

    (diagnostics.connectionTest as Record<string, unknown>)[key] =
      process.env[tenant.apiEnv] && process.env[tenant.addressEnv]
        ? { skipped: 'Use /api/diagnostics/test-connection for live probe' }
        : { skipped: 'Missing credentials' };
  }

  return diagnostics;
};
