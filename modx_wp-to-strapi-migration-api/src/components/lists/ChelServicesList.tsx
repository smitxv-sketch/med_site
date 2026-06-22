import React from "react";

export const ChelServicesList = ({ services, setCurrentDetail, setViewMode }: any) => {
  if (!services || services.length === 0) {
    return <div className="text-slate-500">Нет услуг для отображения.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service: any) => (
        <div 
          key={service.id} 
          onClick={() => { setCurrentDetail({ type: 'Услуга', data: service }); setViewMode('detail'); }} 
          className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-4 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300"
        >
          <h3 className="font-bold text-base mb-2 group-hover:text-indigo-600 transition-colors">{service.title || service.pagetitle}</h3>
          <div className="flex justify-between items-center mt-auto">
            {service.price ? (
              <span className="text-sm font-semibold text-emerald-600">{service.price} ₽</span>
            ) : (
              <span className="text-xs text-slate-400">Цена не указана</span>
            )}
            {service.article && (
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">Арт: {service.article}</span>
            )}
          </div>
          {service.taxonomies?.directions && (
            <div className="mt-3 flex flex-wrap gap-1">
              {service.taxonomies.directions.map((dir: any, idx: number) => (
                <span key={idx} className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100">
                  {dir.name}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
