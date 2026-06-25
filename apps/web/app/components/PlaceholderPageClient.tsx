'use client';

import type { EngineState, GlobalSettingDto, NavigationDto } from '@med-site/contracts';
import { PrototypeShell } from '../providers/PrototypeShell';
import { SiteChrome } from '@/app/layouts/SiteChrome';

export function PlaceholderPageClient({
  title,
  description,
  engineState,
  navigation,
  globalSetting,
  tenantId,
}: {
  title: string;
  description?: string;
  engineState: EngineState;
  navigation: NavigationDto | null;
  globalSetting: GlobalSettingDto | null;
  tenantId: string;
}) {
  return (
    <PrototypeShell
      engineState={engineState}
      navigation={navigation}
      globalSetting={globalSetting}
      tenantId={tenantId}
    >
      <SiteChrome>
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 text-gray-600 text-lg leading-relaxed max-w-2xl">
              {description}
            </p>
          ) : null}
          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-gray-700 font-medium">
              Раздел в разработке. Можно наполнить через CMS (Strapi) — мы уже
              подключили shell и данные per tenant.
            </p>
          </div>
        </div>
      </SiteChrome>
    </PrototypeShell>
  );
}

