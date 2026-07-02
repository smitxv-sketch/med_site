import type { CatalogServiceDetailDto } from '@med-site/contracts';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { CmsHtml } from '@/shared/ui/CmsHtml';

/** Live-карточка услуги/программы из Strapi (СПб) */
export function CatalogServiceView({ data }: { data: CatalogServiceDetailDto }) {
  const bookHref = `/booking?service_id=${encodeURIComponent(data.article)}`;

  return (
    <div className="w-full pb-16 pt-2 md:pt-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/prices"
          className="group inline-flex items-center gap-2 text-brand font-medium mb-8 hover:opacity-80"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Услуги и цены
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            {data.title}
          </h1>
          {data.summary ? (
            <p className="text-lg text-gray-600 leading-relaxed">{data.summary}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="text-2xl md:text-3xl font-bold text-brand">{data.price}</span>
            {data.legacyOnly ? (
              <span className="text-sm text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                Цена по прайсу клиники
              </span>
            ) : null}
            <Link to={bookHref}>
              <Button variant="primary" size="md" className="rounded-xl">
                <Calendar className="w-4 h-4 mr-2" />
                Записаться
              </Button>
            </Link>
          </div>
        </header>

        {data.description ? (
          <section className="mb-10">
            <CmsHtml html={data.description} />
          </section>
        ) : null}

        {data.isProgram && data.includedItems.length > 0 ? (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {data.includedListTitle || 'Что входит в программу'}
            </h2>
            <ul className="space-y-3">
              {data.includedItems.map((item, idx) => (
                <li
                  key={`${item.article ?? item.label}-${idx}`}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 leading-snug">{item.label}</p>
                    {item.title && item.title !== item.label ? (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.title}</p>
                    ) : null}
                  </div>
                  {item.price ? (
                    <span className="text-sm font-semibold text-gray-700 shrink-0">{item.price}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="pt-4 border-t border-gray-100 text-sm text-gray-500">
          Артикул: {data.article}
        </div>
      </div>
    </div>
  );
}
