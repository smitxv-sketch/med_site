'use client';

import type {
  EngineState,
  GlobalSettingDto,
  NavigationDto,
  PromotionDto,
} from '@med-site/contracts';
import { Calendar } from 'lucide-react';
import { PrototypeShell } from '../providers/PrototypeShell';
import { SiteChrome } from '@/app/layouts/SiteChrome';
import { Card } from '@/shared/ui/Card';
import { MedicalDisclaimer } from '@/shared/ui/MedicalDisclaimer';
import { CoverPicture } from '../components/CoverPicture';

function formatPromoDates(item: PromotionDto) {
  if (!item.endDate) return 'Без срока окончания';
  try {
    return `До ${new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
    }).format(new Date(item.endDate))}`;
  } catch {
    return '';
  }
}

export function PromotionsPageClient({
  items,
  pageTitle,
  pageDescription,
  engineState,
  navigation,
  globalSetting,
  tenantId,
}: {
  items: PromotionDto[];
  pageTitle: string;
  pageDescription?: string;
  engineState: EngineState;
  navigation: NavigationDto | null;
  globalSetting: GlobalSettingDto | null;
  tenantId: string;
}) {
  const promotions = items.filter((i) => i.kind === 'promotion');
  const specials = items.filter((i) => i.kind === 'special_offer');

  const renderGrid = (list: PromotionDto[], heading: string) => {
    if (!list.length) return null;
    return (
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((promo) => (
            <Card
              key={promo.id}
              className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow"
            >
              {promo.cover ? (
                <div className="relative h-48 overflow-hidden">
                  <CoverPicture
                    cover={promo.cover}
                    imgClassName="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ) : null}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-sm text-brand font-medium mb-3">
                  <Calendar className="w-4 h-4" />
                  {formatPromoDates(promo)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.title}</h3>
                {promo.shortDescription ? (
                  <p className="text-gray-600 line-clamp-3 flex-1">{promo.shortDescription}</p>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </section>
    );
  };

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
                <p className="text-lg text-gray-600 max-w-2xl mb-6">{pageDescription}</p>
              ) : null}
              <MedicalDisclaimer />
            </div>

            {renderGrid(promotions, 'Акции')}
            {renderGrid(specials, 'Спецпредложения')}
            {items.length === 0 ? (
              <p className="text-gray-500">Сейчас нет активных акций.</p>
            ) : null}
          </div>
        </div>
      </SiteChrome>
    </PrototypeShell>
  );
}
