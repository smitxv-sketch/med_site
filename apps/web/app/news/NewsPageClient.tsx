'use client';

import type {
  EngineState,
  GlobalSettingDto,
  NavigationDto,
  NewsDto,
} from '@med-site/contracts';
import { PrototypeShell } from '../providers/PrototypeShell';
import { SiteChrome } from '@/app/layouts/SiteChrome';
import { Card } from '@/shared/ui/Card';
import { CoverPicture } from '../components/CoverPicture';

function formatNewsDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function NewsPageClient({
  items,
  pageTitle,
  pageDescription,
  engineState,
  navigation,
  globalSetting,
  tenantId,
}: {
  items: NewsDto[];
  pageTitle: string;
  pageDescription?: string;
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
        <div className="min-h-screen bg-gray-50/50 pt-4 md:pt-6 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{pageTitle}</h1>
              {pageDescription ? (
                <p className="text-lg text-gray-600 max-w-2xl">{pageDescription}</p>
              ) : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden flex flex-col h-full">
                  {item.cover ? (
                    <div className="relative h-48 overflow-hidden">
                      <CoverPicture
                        cover={item.cover}
                        imgClassName="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="p-6 flex flex-col flex-1">
                    <time className="text-sm text-gray-500 mb-2">
                      {formatNewsDate(item.publishedAt)}
                    </time>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h2>
                    {item.excerpt ? (
                      <p className="text-gray-600 line-clamp-3 flex-1">{item.excerpt}</p>
                    ) : null}
                  </div>
                </Card>
              ))}
            </div>
            {items.length === 0 ? (
              <p className="text-gray-500">Пока нет опубликованных новостей.</p>
            ) : null}
          </div>
        </div>
      </SiteChrome>
    </PrototypeShell>
  );
}
