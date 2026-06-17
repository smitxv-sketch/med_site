import React from 'react';
import { HealthStory } from '../../model/types';

interface HealthStoriesProps {
  stories: HealthStory[];
  title?: string;
}

export function HealthStories({ stories, title = 'Анонсы' }: HealthStoriesProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-3 ml-1">{title}</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {stories.map((s) => (
          <div key={s.id} className="flex flex-col gap-2 min-w-[90px] cursor-pointer hover:opacity-90 transition-opacity">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand to-blue-500 p-0.5 shrink-0">
              <div className="w-full h-full bg-white rounded-full p-0.5">
                <img src={s.imgUrl} alt={s.title} className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            <span className="text-[10px] text-center font-medium text-gray-700 leading-tight">{s.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
