import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function LoadingState({ title, description, children }: LoadingStateProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-theme">
        <Loader2 className="w-10 h-10 text-[var(--color-primary)] animate-spin mb-4" />
        <p className="text-gray-900 font-medium text-lg">{title}</p>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {children}
    </div>
  );
}
