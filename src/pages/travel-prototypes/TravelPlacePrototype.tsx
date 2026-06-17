import React from 'react';
import { PageRenderer } from '@/shared/ui/PageRenderer';

export const TravelPlacePrototype = () => {
  return (
    <div className="w-full">
      <PageRenderer 
        blocks={[
          {
            id: 'p-1',
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
