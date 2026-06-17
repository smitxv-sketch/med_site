import React from 'react';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export function UserDetailsStep() {
  const { 
    prevStep, text, formData, setFormData, formatDoctorName, handleSubmit, loading, bookingError
  } = useBooking();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    let numbers = input.replace(/\D/g, '');

    if (!numbers) {
      setFormData({ ...formData, phone: '' });
      return;
    }

    if (numbers[0] === '8') {
      numbers = '7' + numbers.substring(1);
    } else if (numbers[0] === '9') {
      numbers = '7' + numbers;
    } else if (numbers[0] !== '7') {
      numbers = '7' + numbers;
    }

    let formatted = '+7';
    if (numbers.length > 1) {
      formatted += ' (' + numbers.substring(1, 4);
    }
    if (numbers.length >= 5) {
      formatted += ') ' + numbers.substring(4, 7);
    }
    if (numbers.length >= 8) {
      formatted += '-' + numbers.substring(7, 9);
    }
    if (numbers.length >= 10) {
      formatted += '-' + numbers.substring(9, 11);
    }

    setFormData({ ...formData, phone: formatted });
  };

  return (
    <div className="max-w-xl mx-auto space-y-5 sm:space-y-6 px-4 sm:px-0 pb-12">
      <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
        <button onClick={prevStep} className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all shadow-sm">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-tight">{text?.details?.title || 'Подтверждение записи'}</h2>
      </div>

      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-primary)]"></div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start gap-4">
             <div className="flex-1">
                <div className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">{text?.details?.appointment_label || 'Запись'}</div>
                <div className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">{formData.service?.name}</div>
             </div>
             <div className="shrink-0 text-right">
                <div className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">{text?.details?.at_label || 'Время'}</div>
                <div className="font-bold text-[var(--color-primary)] text-sm sm:text-base bg-[var(--color-primary)]/10 px-2.5 py-1 rounded-md inline-block">{formData.slot?.time}</div>
             </div>
          </div>
          
          <div className="border-t border-gray-50 pt-3">
             <div className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">{text?.details?.with_label || 'Врач'}</div>
             <div className="font-semibold text-gray-900 text-sm sm:text-base">{formData.doctor ? formatDoctorName(formData.doctor.name) : ''}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
            {text?.details?.form?.name_label || 'ФИО'}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder={text?.details?.form?.name_placeholder || 'Иванов Иван Иванович'}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all text-sm text-gray-900 placeholder-gray-400 font-medium"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
            {text?.details?.form?.phone_label || 'Телефон'}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder={text?.details?.form?.phone_placeholder || '+7 (999) 000-00-00'}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all text-sm text-gray-900 placeholder-gray-400 font-medium"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
            {text?.details?.form?.email_label || 'Email'}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder={text?.details?.form?.email_placeholder || 'ivanov@example.com'}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all text-sm text-gray-900 placeholder-gray-400 font-medium"
          />
        </div>

        {bookingError && (
          <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-xl text-center space-y-2 relative animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-center mb-1">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h4 className="font-bold text-red-900">Ошибка записи</h4>
            <p className="text-sm font-medium">{bookingError}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !formData.name || !formData.phone || formData.phone.length < 18}
          className="w-full mt-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold text-base py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-[var(--color-primary)]/20 active:scale-[0.98]"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            text?.details?.form?.submit_button || 'Записаться'
          )}
        </button>
        
        <p className="text-[10px] sm:text-xs text-center text-gray-400 mt-3 leading-relaxed px-2">
          {text?.details?.form?.terms || 'Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных'}
        </p>
      </div>
    </div>
  );
}
