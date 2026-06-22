import React from "react";

export const ChelAnoncesList = ({ anonces, setCurrentDetail, setViewMode }: any) => {
  if (!anonces || anonces.length === 0) {
    return <div className="text-slate-500">Нет анонсов для отображения.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {anonces.map((item: any) => (
        <div 
          key={item.id} 
          onClick={() => { setCurrentDetail({ type: 'Анонс', data: item }); setViewMode('detail'); }} 
          className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300"
        >
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{item.title || item.header || item.pagetitle}</h3>
          
          <div className="text-sm text-slate-500 line-clamp-3 mb-4 mt-2" dangerouslySetInnerHTML={{ __html: item.anonce || 'Нет анонса' }} />
        </div>
      ))}
    </div>
  );
};
