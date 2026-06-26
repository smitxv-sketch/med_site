import { NewsPageClient } from './NewsPageClient';
import { fetchContentListPage, fetchNews } from '../../lib/contentCatalog';
import { fetchPageShell } from '../../lib/pageShell';
import { getWebTenantId } from '../../lib/tenant';

export const dynamic = 'force-dynamic';

export default async function NewsPageRoute() {
  const tenantId = await getWebTenantId();
  const [shell, items, listPage] = await Promise.all([
    fetchPageShell(tenantId),
    fetchNews(tenantId),
    fetchContentListPage('news', tenantId),
  ]);

  return (
    <NewsPageClient
      items={items}
      pageTitle={listPage.pageTitle}
      pageDescription={listPage.pageDescription}
      engineState={shell.engineState}
      navigation={shell.navigation}
      globalSetting={shell.globalSetting}
      tenantId={tenantId}
    />
  );
}
