import React from 'react';
import { PageRenderer } from '@/shared/ui/PageRenderer';

export const TravelDestinationPrototype = () => {
  return (
    <div className="w-full">
      <PageRenderer 
        blocks={[
          {
            id: 'd-1',
            type: 'HeroWidget',
            props: {
              layoutPattern: 'cover',
              slides: [
                {
                  title: 'Ереван',
                  subtitle: 'Один из древнейших городов мира, старше Рима на 29 лет.',
                  description: 'Город уютных кафе, поющих фонтанов и теплого туфа.',
                  image: 'https://images.unsplash.com/photo-1518182170546-076616fd63f8',
                  link: '#',
                  linkText: 'Искать туры из Еревана',
                  badgeColor: 'bg-white text-black'
                }
              ]
            }
          },
          {
            id: 'd-2',
            type: 'FeaturesWidget',
            props: {
              title: 'О Ереване',
              features: [
                { title: 'Когда ехать', description: 'Лучшее время: Апрель-Май и Сентябрь-Октябрь.' },
                { title: 'Как перемещаться', description: 'Метро (1 ветка), такси (Yandex, GG).' },
                { title: 'Что попробовать', description: 'Хоровац, лахмаджун, женгялов хац.' }
              ]
            }
          },
          {
            id: 'd-3',
            type: 'showcase',
            props: {
              layoutPattern: 'classic'
            }
          }
        ]}
        onUpdateBlocks={() => {}}
      />
    </div>
  );
};
