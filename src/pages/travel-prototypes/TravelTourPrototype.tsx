import React from 'react';
import { PageRenderer } from '@/shared/ui/PageRenderer';

export const TravelTourPrototype = () => {
  return (
    <div className="w-full">
      <PageRenderer 
        blocks={[
          {
            id: 't-1',
            type: 'program',
            props: {
              layoutPattern: 'classic'
            }
          },
          {
            id: 't-2',
            type: 'FaqWidget',
            props: {
              title: 'Частые вопросы по туру',
              faqs: [
                { question: 'Нужна ли виза?', answer: 'Для граждан РФ виза не требуется, возможен въезд по внутреннему паспорту.' },
                { question: 'Какая валюта?', answer: 'Национальная валюта — драм (AMD). Карты "Мир" работают не везде, лучше иметь наличные.' }
              ]
            }
          }
        ]}
        onUpdateBlocks={() => {}}
      />
    </div>
  );
};
