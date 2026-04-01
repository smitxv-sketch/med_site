import React from 'react';
import { Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export function SuccessStep() {
  const { text, formData, formatDoctorName } = useBooking();

  return (
    <div className="text-center py-16 space-y-6 max-w-md mx-auto">
      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto shadow-inner border border-green-100">
        <Check className="w-12 h-12 text-green-500" />
      </div>
      <h2 className="text-3xl font-black text-gray-900 tracking-tight">{text.success?.title || 'Вы успешно записаны!'}</h2>
      <p className="text-gray-500 text-lg">
        {text.success?.message || 'Мы отправили подтверждение на вашу почту.'}
      </p>
      <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] mt-8 text-left space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
          <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Врач</span>
          <span className="font-bold text-gray-900 text-right">{formData.doctor ? formatDoctorName(formData.doctor.name) : ''}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Дата и время</span>
          <span className="font-bold text-[var(--color-primary)] text-lg bg-[var(--color-primary)]/10 px-3 py-1 rounded-lg">{formData.slot?.time}</span>
        </div>
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="mt-10 w-full px-6 py-4 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm active:scale-[0.98]"
      >
        Вернуться на главную
      </button>
    </div>
  );
}
