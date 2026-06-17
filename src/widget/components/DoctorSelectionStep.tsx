import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { DoctorCard } from '../components/DoctorCard';
import { DoctorCardSkeleton } from '../components/DoctorCardSkeleton';
import { LoadingState } from '../components/LoadingState';
import { Card } from '@/shared/ui/Card';

export function DoctorSelectionStep() {
  const { 
    prevStep, loading, text, displayedDoctors, handleDoctorSelect, 
    handleSlotSelect, selectedBranchName, setDebugRawSlots 
  } = useBooking();

  return (
    <div className="space-y-6 relative px-4 sm:px-0">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={prevStep} disabled={loading} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all disabled:opacity-50 shadow-sm">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{text?.doctor?.title || 'Выберите врача'}</h2>
      </div>
      
      {loading ? (
        <LoadingState 
          title="Загружаем список врачей..."
          description="Это может занять несколько секунд"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <DoctorCardSkeleton key={i} />
            ))}
          </div>
        </LoadingState>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {displayedDoctors.map(doctor => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              onSelect={handleDoctorSelect} 
              onSlotSelect={handleSlotSelect}
              selectedBranchName={selectedBranchName}
              onRawSlotsLoaded={(rawSlots: any) => {
                setDebugRawSlots((prev: any) => ({ ...prev, [doctor.id]: rawSlots }));
              }}
            />
          ))}
          {displayedDoctors.length === 0 && (
            <Card className="col-span-full text-center py-12 text-gray-500 bg-gray-50">
              Нет доступных врачей
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
