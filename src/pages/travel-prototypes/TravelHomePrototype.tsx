import React from 'react';
import { PageRenderer } from '@/shared/ui/PageRenderer';

export const TravelHomePrototype = () => {
  return (
    <div className="w-full">
      <PageRenderer 
        blocks={[
          {
            id: 'h-1',
            type: 'HeroWidget',
            props: {
              slides: [
                {
                  title: 'Армения: Больше чем горы',
                  subtitle: 'Авторские туры и маршруты по самым живописным уголкам.',
                  description: 'Откройте для себя древнейшее христианское наследие и невероятное гостеприимство.',
                  image: 'https://images.unsplash.com/photo-1542314831-c6a4d142104d',
                  link: '#',
                  linkText: 'Выбрать тур'
                }
              ]
            }
          },
          {
            id: 'h-2',
            type: 'CategoriesWidget',
            props: {
              categories: [
                { id: '1', title: 'Экскурсии на 1 день', icon: 'Sun' },
                { id: '2', title: 'Многодневные туры', icon: 'Calendar' },
                { id: '3', title: 'Гастротуры', icon: 'Wine' },
                { id: '4', title: 'Активный отдых', icon: 'Mountain' }
              ],
              title: 'Выберите формат отдыха'
            }
          },
          {
            id: 'h-3',
            type: 'LocationsWidget',
            props: {
              title: 'Популярные направления',
              locations: [
                { id: 'l1', title: 'Ереван', subtitle: 'Розовый город', image: 'https://images.unsplash.com/photo-1518182170546-076616fd63f8' },
                { id: 'l2', title: 'Гарни и Гегард', subtitle: 'Античность и скалы', image: 'https://images.unsplash.com/photo-1533580554157-19e917d091fc' },
                { id: 'l3', title: 'Севан', subtitle: 'Пресноводная жемчужина', image: 'https://images.unsplash.com/photo-1542314831-c6a4d142104d' }
              ]
            }
          }
        ]}
        onUpdateBlocks={() => {}}
      />
    </div>
  );
};
