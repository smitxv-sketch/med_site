import React from 'react';
import { Skeleton } from './Skeleton';

export const DoctorCardSkeleton = () => {
  return (
    <div className="bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] p-3 sm:p-5 h-full flex flex-col">
      <div className="flex gap-3 sm:gap-5 mb-3 sm:mb-4">
        {/* Photo Skeleton */}
        <div className="relative shrink-0">
          <Skeleton className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-lg" />
        </div>

        {/* Info Skeleton */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between items-start gap-2">
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="h-6 w-16 rounded hidden sm:block" />
          </div>
          <Skeleton className="h-4 w-1/2 rounded" />
          
          <div className="flex gap-2 mt-1">
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-5 w-16 rounded" />
          </div>
          
          <div className="mt-auto flex justify-between items-end pt-2">
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-6 w-20 rounded sm:hidden" />
          </div>
        </div>
      </div>

      {/* Schedule Skeleton */}
      <div className="mt-auto pt-3 sm:pt-4 border-t border-[var(--color-border)]">
        <div className="flex gap-2 overflow-hidden mb-3">
           {Array.from({ length: 5 }).map((_, i) => (
             <Skeleton key={i} className="w-[3.5rem] h-[4rem] rounded-lg shrink-0" />
           ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
           {Array.from({ length: 4 }).map((_, i) => (
             <Skeleton key={i} className="h-[36px] rounded-lg" />
           ))}
        </div>
      </div>
    </div>
  );
};
