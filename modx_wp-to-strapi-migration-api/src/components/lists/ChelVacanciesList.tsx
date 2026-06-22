import React from "react";

export const ChelVacanciesList = ({ vacancies, setCurrentDetail, setViewMode }: any) => {
  if (!vacancies || vacancies.length === 0) {
    return <div className="text-slate-500">Нет вакансий для отображения.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {vacancies.map((item: any) => (
        <div 
          key={item.id} 
          onClick={() => { setCurrentDetail({ type: 'Вакансия', data: item }); setViewMode('detail'); }} 
          className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300"
        >
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{item.title || item.pagetitle}</h3>
          
          {item.created && (
            <p className="text-xs text-slate-400 mb-2">
              {new Date(item.created).toLocaleDateString('ru-RU')}
            </p>
          )}

          <div className="text-sm text-slate-500 line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: item.anonce || item.duties || item.content || 'Нет описания' }} />

          <div className="mt-auto flex justify-between items-center">
            {item.experience && (
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                Опыт: {item.experience}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
