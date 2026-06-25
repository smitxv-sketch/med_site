import { DoctorsPageClient } from './DoctorsPageClient';
import { fetchPageShell } from '../../lib/pageShell';
import { getWebTenantId } from '../../lib/tenant';

export const dynamic = 'force-dynamic';

export default async function DoctorsPageRoute() {
  const tenantId = await getWebTenantId();
  const shell = await fetchPageShell(tenantId);

  return (
    <DoctorsPageClient
      engineState={shell.engineState}
      navigation={shell.navigation}
      globalSetting={shell.globalSetting}
      tenantId={tenantId}
    />
  );
}
