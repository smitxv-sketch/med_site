import React from 'react';
import { MapPin, FileText, Image as ImageIcon } from "lucide-react";
import { Doctor, Service } from '../types';
import { ChelServicesList } from './lists/ChelServicesList';
import { SpbServicesList } from './lists/SpbServicesList';
import { ChelReviewsList } from './lists/ChelReviewsList';
import { ChelNewsList } from './lists/ChelNewsList';
import { ChelVacanciesList } from './lists/ChelVacanciesList';
import { ChelClinicsList } from './lists/ChelClinicsList';
import { ChelArticlesList } from './lists/ChelArticlesList';
import { ChelFaqList } from './lists/ChelFaqList';
import { ChelAdvantagesList } from './lists/ChelAdvantagesList';
import { ChelAnoncesList } from './lists/ChelAnoncesList';

interface EntityListsProps {
  activeTab: string;
  doctors: Doctor[];
  services: Service[];
  fullGraph: any;
  handleTabChange: (tab: string) => void;
  setCurrentDetail: (detail: any) => void;
  setViewMode: (mode: "list" | "detail") => void;
  schemaAnalysis?: any[];
}

const PricesTab: React.FC<{ fullGraph: any, setCurrentDetail: any, setViewMode: any }> = ({ fullGraph, setCurrentDetail, setViewMode }) => {
  const priceItems = fullGraph?.entities?.price_items || [];
  
  // Group by tab
  const groupedByTab = React.useMemo(() => {
    return priceItems.reduce((acc: any, item: any) => {
      const tab = item.tab || 'Прочее';
      if (!acc[tab]) acc[tab] = [];
      acc[tab].push(item);
      return acc;
    }, {});
  }, [priceItems]);

  const tabs = Object.keys(groupedByTab).sort();
  const [selectedPriceTab, setSelectedPriceTab] = React.useState(tabs[0] || '');

  // Update selected tab if tabs change and current is invalid
  React.useEffect(() => {
    if (tabs.length > 0 && !tabs.includes(selectedPriceTab)) {
      setSelectedPriceTab(tabs[0]);
    }
  }, [tabs, selectedPriceTab]);

  if (priceItems.length === 0) {
    return <div className="p-8 text-center text-slate-500">Прайс-лист пуст</div>;
  }

  const currentItems = groupedByTab[selectedPriceTab] || [];
  
  // Group current items by category
  const groupedByCategory = currentItems.reduce((acc: any, item: any) => {
    const cat = item.category || 'Без категории';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const categories = Object.keys(groupedByCategory).sort();

  return (
    <div className="flex flex-col h-full">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-200 overflow-x-auto hide-scrollbar bg-slate-50">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedPriceTab(tab)}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
              selectedPriceTab === tab 
                ? 'border-b-2 border-indigo-600 text-indigo-600 bg-white' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 backdrop-blur-md'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-0 max-h-[70vh] overflow-y-auto">
        {categories.map(category => (
          <div key={category} className="mb-6 last:mb-0">
            <div className="bg-slate-100/60 backdrop-blur-md px-6 py-3 font-bold text-slate-800 sticky top-0 z-10 shadow-sm">
              {category}
            </div>
            <div className="divide-y divide-gray-100">
              {groupedByCategory[category].map((price: any, i: number) => (
                <div 
                  key={i} 
                  onClick={() => { setCurrentDetail({ type: 'Цена', data: price }); setViewMode('detail'); }} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-6 hover:bg-indigo-50 cursor-pointer transition-colors gap-2 sm:gap-4"
                >
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{price.name}</div>
                    {price.doc_id && <div className="text-xs text-slate-500 font-mono mt-1">Код: {price.doc_id}</div>}
                  </div>
                  <div className="font-bold text-lg whitespace-nowrap text-right">
                    {price.price} ₽
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const EntityLists: React.FC<EntityListsProps> = ({
  activeTab, doctors, services, fullGraph, handleTabChange, setCurrentDetail, setViewMode, schemaAnalysis = []
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold capitalize">
          {activeTab === 'doctors' && 'Врачи'}
          {activeTab === 'services' && 'Услуги'}
          {activeTab === 'prices' && 'Прайс-лист'}
          {activeTab === 'locations' && 'Локации'}
          {activeTab === 'articles' && 'Статьи'}
          {activeTab === 'news' && 'Новости'}
          {activeTab === 'promotions' && 'Акции'}
          {activeTab === 'reviews' && 'Отзывы'}
          {activeTab === 'programs' && 'Программы'}
          {activeTab === 'branches' && 'Филиалы'}
          {activeTab === 'equipment' && 'Оборудование'}
          {activeTab === 'vacancies' && 'Вакансии'}
          {activeTab === 'media' && 'Медиафайлы'}
          {activeTab === 'redirects' && 'Редиректы'}
          {activeTab === 'pages' && 'Все страницы'}
        </h2>
        <button onClick={() => handleTabChange("overview")} className="text-sm font-medium hover:underline">
          ← На главную
        </button>
      </div>

      {activeTab === "doctors" && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {doctors.map(doc => {
            // Calculate filled fields for both MODX (tvs) and WP (direct fields)
            let filledFieldsCount = 0;
            if (doc.tvs) {
              filledFieldsCount = Object.keys(doc.tvs).filter(k => doc.tvs[k] && String(doc.tvs[k]).trim() !== '').length;
            } else {
              // WP logic
              const wpFields = ['rank', 'experience', 'education', 'description', 'anonce', 'activities', 'education_history', 'badges', 'price', 'duration'];
              filledFieldsCount = wpFields.filter(k => {
                const val = (doc as any)[k];
                if (Array.isArray(val)) return val.length > 0;
                return val && String(val).trim() !== '' && val !== 0;
              }).length;
            }

            const photoUrl = doc.photo 
              ? (String(doc.photo).startsWith('http') 
                  ? doc.photo 
                  : (doc.city === 'chel' ? `https://ci74.ru${String(doc.photo).startsWith('/') ? '' : '/'}${doc.photo}` : `https://cispb.com${String(doc.photo).startsWith('/') ? '' : '/'}${doc.photo}`))
              : `https://picsum.photos/seed/${doc.id}/600/800`;

            return (
              <div key={doc.id} onClick={() => { setCurrentDetail({ type: 'Врач', data: doc }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300">
                <div className="aspect-[3/4] bg-slate-100/60 backdrop-blur-md overflow-hidden relative">
                  <img src={photoUrl} alt={doc.pagetitle} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 sm:p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-sm sm:text-lg leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{doc.pagetitle}</h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 mb-2 sm:mb-3 line-clamp-2">{doc.specialization}</p>
                  <div className="mt-auto flex flex-wrap gap-1">
                    <span className="text-[9px] sm:text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded border border-indigo-100">
                      {filledFieldsCount} полей
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "services" && (
        <div className="space-y-8">
          {services.length > 0 && services[0].city === 'chel' ? (
            <ChelServicesList services={services} setCurrentDetail={setCurrentDetail} setViewMode={setViewMode} />
          ) : (
            <SpbServicesList services={services} setCurrentDetail={setCurrentDetail} setViewMode={setViewMode} />
          )}
        </div>
      )}

      {activeTab === "articles" && (
        <div className="space-y-8">
          {fullGraph?.entities?.articles?.length > 0 && fullGraph.entities.articles[0].city === 'chel' ? (
            <ChelArticlesList articles={fullGraph.entities.articles} setCurrentDetail={setCurrentDetail} setViewMode={setViewMode} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullGraph?.entities?.articles?.map((article: any) => (
                <div key={article.id} onClick={() => { setCurrentDetail({ type: 'Статья', data: article }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{article.pagetitle}</h3>
                  <p className="text-sm text-slate-500 line-clamp-3 mb-4">{article.description || article.seo?.description || 'Нет описания'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "faq" && (
        <div className="space-y-8">
          {fullGraph?.entities?.faq?.length > 0 && fullGraph.entities.faq[0].city === 'chel' ? (
            <ChelFaqList faq={fullGraph.entities.faq} setCurrentDetail={setCurrentDetail} setViewMode={setViewMode} />
          ) : (
            <div className="text-slate-500">Нет данных для отображения.</div>
          )}
        </div>
      )}

      {activeTab === "advantages" && (
        <div className="space-y-8">
          {fullGraph?.entities?.advantages?.length > 0 && fullGraph.entities.advantages[0].city === 'chel' ? (
            <ChelAdvantagesList advantages={fullGraph.entities.advantages} setCurrentDetail={setCurrentDetail} setViewMode={setViewMode} />
          ) : (
            <div className="text-slate-500">Нет данных для отображения.</div>
          )}
        </div>
      )}

      {activeTab === "anonces" && (
        <div className="space-y-8">
          {fullGraph?.entities?.anonces?.length > 0 && fullGraph.entities.anonces[0].city === 'chel' ? (
            <ChelAnoncesList anonces={fullGraph.entities.anonces} setCurrentDetail={setCurrentDetail} setViewMode={setViewMode} />
          ) : (
            <div className="text-slate-500">Нет данных для отображения.</div>
          )}
        </div>
      )}

      {activeTab === "news" && (
        <div className="space-y-8">
          {fullGraph?.entities?.news?.length > 0 && fullGraph.entities.news[0].city === 'chel' ? (
            <ChelNewsList news={fullGraph.entities.news} setCurrentDetail={setCurrentDetail} setViewMode={setViewMode} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullGraph?.entities?.news?.map((article: any) => (
                <div key={article.id} onClick={() => { setCurrentDetail({ type: 'Новость', data: article }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{article.pagetitle}</h3>
                  <p className="text-sm text-slate-500 line-clamp-3 mb-4">{article.description || article.seo?.description || 'Нет описания'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "vacancies" && (
        <div className="space-y-8">
          {fullGraph?.entities?.vacancies?.length > 0 && fullGraph.entities.vacancies[0].city === 'chel' ? (
            <ChelVacanciesList vacancies={fullGraph.entities.vacancies} setCurrentDetail={setCurrentDetail} setViewMode={setViewMode} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullGraph?.entities?.vacancies?.map((article: any) => (
                <div key={article.id} onClick={() => { setCurrentDetail({ type: 'Вакансия', data: article }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{article.pagetitle}</h3>
                  <p className="text-sm text-slate-500 line-clamp-3 mb-4">{article.description || article.seo?.description || 'Нет описания'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "promotions" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fullGraph?.entities?.promotions?.map((article: any) => (
            <div key={article.id} onClick={() => { setCurrentDetail({ type: 'Акция', data: article }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300">
              <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{article.pagetitle}</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-4">{article.description || article.seo?.description || 'Нет описания'}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-8">
          {fullGraph?.entities?.reviews?.length > 0 && fullGraph.entities.reviews[0].city === 'chel' ? (
            <ChelReviewsList reviews={fullGraph.entities.reviews} setCurrentDetail={setCurrentDetail} setViewMode={setViewMode} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullGraph?.entities?.reviews?.map((review: any) => (
                <div key={review.id} onClick={() => { setCurrentDetail({ type: 'Отзыв', data: review }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{review.pagetitle}</h3>
                  <p className="text-xs text-slate-400 mb-2">{review.tvs?.revDate || 'Нет даты'}</p>
                  <p className="text-sm text-slate-500 line-clamp-3 mb-4">{review.tvs?.revPlus || review.tvs?.revMinus || 'Нет текста'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "locations" && (
        <div className="space-y-8">
          {fullGraph?.entities?.locations?.length > 0 && fullGraph.entities.locations[0].city === 'chel' ? (
            <ChelClinicsList clinics={fullGraph.entities.locations} setCurrentDetail={setCurrentDetail} setViewMode={setViewMode} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullGraph?.entities?.locations?.map((location: any) => (
                <div key={location.id} onClick={() => { setCurrentDetail({ type: 'Клиника', data: location }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-indigo-600 transition-colors">{location.pagetitle}</h3>
                  <div className="text-sm text-slate-500 mb-4" dangerouslySetInnerHTML={{ __html: location.description || 'Нет описания' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "programs" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fullGraph?.entities?.programs?.map((program: any) => (
            <div key={program.id} onClick={() => { setCurrentDetail({ type: 'Программа', data: program }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300">
              <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{program.pagetitle}</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-4">{program.tvs?.descriptionProgramm?.replace(/<[^>]+>/g, '') || 'Нет описания'}</p>
              {program.tvs?.priceProgramm && <p className="font-bold text-indigo-600">{program.tvs.priceProgramm}</p>}
            </div>
          ))}
        </div>
      )}

      {activeTab === "branches" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fullGraph?.entities?.branches?.map((branch: any) => (
            <div key={branch.id} onClick={() => { setCurrentDetail({ type: 'Филиал', data: branch }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300">
              <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{branch.pagetitle}</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-4">{branch.tvs?.polyclinicText?.replace(/<[^>]+>/g, '') || 'Нет описания'}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "equipment" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fullGraph?.entities?.equipment?.map((item: any) => (
            <div key={item.id} onClick={() => { setCurrentDetail({ type: 'Оборудование', data: item }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300">
              <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{item.pagetitle}</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-4">{item.description || 'Нет описания'}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "pages" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fullGraph?.entities?.resources?.filter((r: any) => r.template === 2).map((page: any) => (
            <div key={page.id} onClick={() => { setCurrentDetail({ type: 'Страница', data: page }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300">
              <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{page.pagetitle}</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-4">{page.description || page.seo?.description || 'Нет описания'}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "prices" && (
        <div className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg overflow-hidden">
          <PricesTab fullGraph={fullGraph} setCurrentDetail={setCurrentDetail} setViewMode={setViewMode} />
        </div>
      )}

      {activeTab === "locations" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fullGraph?.entities?.locations?.map((loc: any) => (
            <div key={loc.id} onClick={() => { setCurrentDetail({ type: 'Локация', data: loc }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{loc.name}</h3>
                <p className="text-xs text-slate-500">ID: {loc.id}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "media" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fullGraph?.entities?.media?.map((med: any) => (
            <div key={med.id} onClick={() => { setCurrentDetail({ type: 'Медиафайл', data: med }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-slate-100/60 backdrop-blur-md rounded flex items-center justify-center shrink-0">
                {med.type === "image" ? <ImageIcon size={24} className="text-slate-400" /> : <FileText size={24} className="text-slate-400" />}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-sm truncate">{med.original_path?.split('/').pop() || med.name}</p>
                <p className="text-xs text-slate-500 mt-1">{med.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "redirects" && (
        <div className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 bg-slate-50 p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <div>Старый URL</div>
            <div>Новый URL</div>
          </div>
          <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
            {fullGraph?.entities?.redirects?.map((red: any, i: number) => (
              <div key={i} onClick={() => { setCurrentDetail({ type: 'Редирект', data: red }); setViewMode('detail'); }} className="grid grid-cols-2 p-4 text-sm items-center hover:bg-slate-50 cursor-pointer gap-4">
                <div className="text-slate-500 break-all">{red.old_url}</div>
                <div className="font-medium break-all">{red.new_slug}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "pages" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fullGraph?.entities?.pages?.map((page: any) => (
            <div key={page.id} onClick={() => { setCurrentDetail({ type: 'Страница', data: page }); setViewMode('detail'); }} className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300">
              <div className="mb-3 flex justify-between items-center">
                <span className="text-[10px] uppercase bg-slate-100/60 backdrop-blur-md text-slate-600 px-2 py-1 rounded">Шаблон {page.template}</span>
                <span className="text-xs text-slate-400">ID: {page.id}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{page.pagetitle}</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-4">{page.description || page.seo?.description || 'Нет описания'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
