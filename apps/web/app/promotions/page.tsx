import { PlaceholderPageClient } from '../components/PlaceholderPageClient';
import { fetchPageShell } from '../../lib/pageShell';
import { getWebTenantId } from '../../lib/tenant';

export const dynamic = 'force-dynamic';

export default async function PromotionsPage() {
  const tenantId = await getWebTenantId();
  const shell = await fetchPageShell(tenantId);

  return (
    <PlaceholderPageClient
      title="Акции"
      description="Здесь будут спецпредложения и акции. Сейчас страница-заглушка, чтобы не было 404."
      engineState={shell.engineState}
      navigation={shell.navigation}
      globalSetting={shell.globalSetting}
      tenantId={tenantId}
    />
  );
}
