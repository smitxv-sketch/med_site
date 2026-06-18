import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/shared/ui/Card';

interface ExpandableListProps<T> {
  title: React.ReactNode;
  items: T[];
  renderItem: (item: T, index: number, isLast: boolean) => React.ReactNode;
  initialCount?: number;
  keyExtractor: (item: T, index: number) => string | number;
  className?: string;
}

export function ExpandableList<T>({
  title,
  items,
  renderItem,
  initialCount = 3,
  keyExtractor,
  className = ''
}: ExpandableListProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMore = items.length > initialCount;
  const visibleItems = isExpanded ? items : items.slice(0, initialCount);

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="bg-gray-50/50 px-5 sm:px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
          {/* We removed the green dot here to avoid the "online status" anti-pattern. 
              Instead, we rely on clean typography and the background separation. */}
          {title}
        </h3>
      </div>
      
      <div className="flex flex-col">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1 && !hasMore;
          return (
            <div key={keyExtractor(item, index)}>
              {renderItem(item, index, isLast)}
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="px-5 sm:px-6 py-3 border-t border-gray-100 bg-gray-50/30 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors py-2 px-4 rounded-full hover:bg-teal-50"
          >
            {isExpanded ? (
              <>Скрыть <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>Показать ещё {items.length - initialCount} <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
        </div>
      )}
    </Card>
  );
}
