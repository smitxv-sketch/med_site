import { PricesPageClient } from './PricesPageClient';
import { fetchPageShell } from '../../lib/pageShell';
import { getWebTenantId } from '../../lib/tenant';

export const dynamic = 'force-dynamic';

export default async function PricesPageRoute() {
  const tenantId = await getWebTenantId();
  const shell = await fetchPageShell(tenantId);

  return (
    <PricesPageClient
      engineState={shell.engineState}
      navigation={shell.navigation}
      globalSetting={shell.globalSetting}
      tenantId={tenantId}
    />
  );
}
