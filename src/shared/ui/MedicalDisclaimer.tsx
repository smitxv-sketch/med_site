import { AlertTriangle } from "lucide-react";

export function MedicalDisclaimer({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 p-3 bg-gray-100 text-gray-500 rounded-lg text-xs leading-tight font-medium ${className}`}>
      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
      <span className="uppercase tracking-wide">Имеются противопоказания. Необходима консультация специалиста.</span>
    </div>
  );
}
