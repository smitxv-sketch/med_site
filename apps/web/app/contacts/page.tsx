import { PlaceholderPageClient } from '../components/PlaceholderPageClient';
import { fetchPageShell } from '../../lib/pageShell';
import { getWebTenantId } from '../../lib/tenant';

export const dynamic = 'force-dynamic';

export default async function ContactsPage() {
  const tenantId = await getWebTenantId();
  const shell = await fetchPageShell(tenantId);

  return (
    <PlaceholderPageClient
      title="Контакты"
      description="Телефоны, адреса, график работы, как добраться. Всё это будет в Strapi per tenant."
      engineState={shell.engineState}
      navigation={shell.navigation}
      globalSetting={shell.globalSetting}
      tenantId={tenantId}
    />
  );
}
