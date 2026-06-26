'use client';

import type {
  EngineState,
  GlobalSettingDto,
  NavigationDto,
  VacancyDto,
} from '@med-site/contracts';
import { Briefcase, Clock, MapPin } from 'lucide-react';
import { PrototypeShell } from '../providers/PrototypeShell';
import { SiteChrome } from '@/app/layouts/SiteChrome';
import { Card } from '@/shared/ui/Card';

export function VacanciesPageClient({
  items,
  pageTitle,
  pageDescription,
  engineState,
  navigation,
  globalSetting,
  tenantId,
}: {
  items: VacancyDto[];
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

            <div className="grid grid-cols-1 gap-6">
              {items.map((vacancy) => (
                <Card
                  key={vacancy.id}
                  className="p-6 md:p-8 flex flex-col gap-4 hover:border-brand/30 transition-colors"
                >
                  {vacancy.department ? (
                    <div className="inline-block w-fit px-3 py-1 bg-brand/10 text-brand text-sm font-medium rounded-full">
                      {vacancy.department}
                    </div>
                  ) : null}
                  <h2 className="text-2xl font-bold text-gray-900">{vacancy.title}</h2>
                  {vacancy.content ? (
                    <div
                      className="prose prose-gray max-w-3xl text-gray-600"
                      dangerouslySetInnerHTML={{ __html: vacancy.content }}
                    />
                  ) : null}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    {vacancy.experience ? (
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        Опыт: {vacancy.experience}
                      </div>
                    ) : null}
                    {vacancy.employmentType ? (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {vacancy.employmentType}
                      </div>
                    ) : null}
                    {vacancy.location ? (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {vacancy.location}
                      </div>
                    ) : null}
                  </div>
                </Card>
              ))}
              {items.length === 0 ? (
                <p className="text-gray-500">Сейчас открытых вакансий нет.</p>
              ) : null}
            </div>
          </div>
        </div>
      </SiteChrome>
    </PrototypeShell>
  );
}
