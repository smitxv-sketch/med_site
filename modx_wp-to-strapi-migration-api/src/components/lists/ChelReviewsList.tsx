import React from "react";

export const ChelReviewsList = ({ reviews, setCurrentDetail, setViewMode }: any) => {
  if (!reviews || reviews.length === 0) {
    return <div className="text-slate-500">Нет отзывов для отображения.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review: any) => (
        <div 
          key={review.id} 
          onClick={() => { setCurrentDetail({ type: 'Отзыв', data: review }); setViewMode('detail'); }} 
          className="bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col group cursor-pointer hover:shadow-md transition-all hover:border-indigo-300"
        >
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{review.client_name || review.title || review.pagetitle}</h3>
          
          {(review.review_date || review.created) && (
            <p className="text-xs text-slate-400 mb-2">
              {review.review_date || new Date(review.created).toLocaleDateString('ru-RU')}
            </p>
          )}

          <div className="text-sm text-slate-500 line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: review.review_text || review.content || review.text || 'Нет текста' }} />

          <div className="mt-auto flex justify-between items-center">
            {review.rating && (
              <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded">
                ★ {review.rating}
              </span>
            )}
            {review.source && (
              <span className="text-xs text-slate-400">
                Источник: {review.source}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
