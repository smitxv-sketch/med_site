import React from "react";

export const ChelFaqList = ({ faq, setCurrentDetail, setViewMode }: any) => {
  if (!faq || faq.length === 0) {
    return <div className="text-slate-500">Нет вопросов для отображения.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {faq.map((item: any) => (
        <div 
          key={item.id} 
          onClick={() => { setCurrentDetail({ type: 'Вопрос-ответ', data: item }); setViewMode('detail'); }} 
          className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300"
        >
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{item.title || item.pagetitle}</h3>
          
          <div className="flex items-center gap-2 mb-2">
            {item.question_date && (
              <span className="text-xs text-slate-400">
                {new Date(item.question_date).toLocaleDateString('ru-RU')}
              </span>
            )}
            {item.name && (
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                {item.name}
              </span>
            )}
          </div>

          <div className="text-sm text-slate-500 line-clamp-3 mb-4 mt-2" dangerouslySetInnerHTML={{ __html: item.question_text || 'Нет текста вопроса' }} />

          {item.answer_text && (
            <div className="mt-auto pt-3 border-t border-slate-100">
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">
                Есть ответ
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
