import React from "react";

export const SpbServicesList = ({ services, setCurrentDetail, setViewMode }: any) => {
  if (!services || services.length === 0) {
    return <div className="text-slate-500">Нет услуг для отображения.</div>;
  }

  const groupedServices = services.reduce((acc: any, service: any) => {
    const cat = service.category?.pagetitle || 'Без категории';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(service);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(groupedServices)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([category, items]: [string, any]) => (
        <div key={category}>
          <h3 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((service: any) => {
              const filledTvs = Object.keys(service.tvs || {}).filter(k => service.tvs[k] && String(service.tvs[k]).trim() !== '');
              return (
                <div 
                  key={service.id} 
                  onClick={() => { setCurrentDetail({ type: 'Услуга', data: service }); setViewMode('detail'); }} 
                  className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300"
                >
                  <h4 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">{service.pagetitle}</h4>
                  {service.tvs?.specintro && (
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4">{service.tvs.specintro.replace(/<[^>]+>/g, '')}</p>
                  )}
                  <div className="mt-auto flex flex-wrap gap-1">
                    <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded border border-indigo-100">
                      {filledTvs.length} полей заполнено
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
