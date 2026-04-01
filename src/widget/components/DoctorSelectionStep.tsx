import React from 'react';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { DoctorCard } from '../components/DoctorCard';
import { DoctorCardSkeleton } from '../components/DoctorCardSkeleton';

export function DoctorSelectionStep() {
  const { 
    prevStep, loading, text, displayedDoctors, handleDoctorSelect, 
    handleSlotSelect, selectedBranchName, setDebugRawSlots 
  } = useBooking();

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={prevStep} disabled={loading} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all disabled:opacity-50 shadow-sm">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{text.doctor?.title || 'Выберите врача'}</h2>
      </div>
      
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-300">
          <Loader2 className="w-10 h-10 text-[var(--color-primary)] animate-spin mb-4" />
          <p className="text-gray-900 font-medium text-lg">Загружаем список врачей...</p>
          <p className="text-sm text-gray-500 mt-1">Это может занять несколько секунд</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <DoctorCardSkeleton key={i} />
          ))
        ) : (
          displayedDoctors.map(doctor => (
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
          ))
        )}
        {!loading && displayedDoctors.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-[24px] border border-gray-100">
            Нет доступных врачей
          </div>
        )}
      </div>
    </div>
  );
}
