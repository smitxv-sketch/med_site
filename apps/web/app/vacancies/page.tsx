import { VacanciesPageClient } from './VacanciesPageClient';
import { fetchContentListPage, fetchVacancies } from '../../lib/contentCatalog';
import { fetchPageShell } from '../../lib/pageShell';
import { getWebTenantId } from '../../lib/tenant';

export const dynamic = 'force-dynamic';

export default async function VacanciesPageRoute() {
  const tenantId = await getWebTenantId();
  const [shell, items, listPage] = await Promise.all([
    fetchPageShell(tenantId),
    fetchVacancies(tenantId),
    fetchContentListPage('vacancies', tenantId),
  ]);

  return (
    <VacanciesPageClient
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
