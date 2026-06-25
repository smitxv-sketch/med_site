import { PlaceholderPageClient } from '../components/PlaceholderPageClient';
import { fetchPageShell } from '../../lib/pageShell';
import { getWebTenantId } from '../../lib/tenant';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const tenantId = await getWebTenantId();
  const shell = await fetchPageShell(tenantId);

  return (
    <PlaceholderPageClient
      title="О клинике"
      description="История, миссия, подход и команда. Этот раздел можно собрать через Strapi."
      engineState={shell.engineState}
      navigation={shell.navigation}
      globalSetting={shell.globalSetting}
      tenantId={tenantId}
    />
  );
}
