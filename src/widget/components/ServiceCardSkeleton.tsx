import React from 'react';
import { Skeleton } from './Skeleton';
import { Card } from '@/shared/ui/Card';

export function ServiceCardSkeleton() {
  return (
    <Card className="flex items-center justify-between p-4 sm:p-5 min-h-[4rem]">
      <Skeleton className="h-5 w-48 rounded" />
      <Skeleton className="w-8 h-8 rounded-full shrink-0" />
    </Card>
  );
}
