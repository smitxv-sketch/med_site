import React from "react";

export const ChelClinicsList = ({ clinics, setCurrentDetail, setViewMode }: any) => {
  if (!clinics || clinics.length === 0) {
    return <div className="text-slate-500">Нет клиник для отображения.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {clinics.map((item: any) => (
        <div 
          key={item.id} 
          onClick={() => { setCurrentDetail({ type: 'Клиника', data: item }); setViewMode('detail'); }} 
          className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300"
        >
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{item.name || item.title || item.pagetitle}</h3>
          
          {item.address && (
            <p className="text-sm text-slate-600 mb-2 flex items-start">
              <span className="mr-2">📍</span> {item.address}
            </p>
          )}

          {item.phone && (
            <p className="text-sm text-slate-600 mb-2 flex items-start">
              <span className="mr-2">📞</span> {item.phone}
            </p>
          )}

          <div className="text-sm text-slate-500 line-clamp-3 mb-4 mt-2" dangerouslySetInnerHTML={{ __html: item.anonce || 'Нет описания' }} />

        </div>
      ))}
    </div>
  );
};
