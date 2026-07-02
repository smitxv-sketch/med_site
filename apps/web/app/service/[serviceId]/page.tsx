import { ServicePageClient } from './ServicePageClient';
import { fetchPageShell } from '../../../lib/pageShell';
import { getWebTenantId } from '../../../lib/tenant';

export const dynamic = 'force-dynamic';

export default async function ServicePageRoute() {
  const tenantId = await getWebTenantId();
  const shell = await fetchPageShell(tenantId);

  return (
    <ServicePageClient
      engineState={shell.engineState}
      navigation={shell.navigation}
      globalSetting={shell.globalSetting}
      tenantId={tenantId}
    />
  );
}
