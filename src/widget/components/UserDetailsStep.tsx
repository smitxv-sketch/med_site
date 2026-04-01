import React from 'react';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export function UserDetailsStep() {
  const { 
    prevStep, text, formData, setFormData, formatDoctorName, handleSubmit, loading 
  } = useBooking();

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={prevStep} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all shadow-sm">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{text.details?.title || 'Подтверждение записи'}</h2>
      </div>

      <div className="bg-white p-6 rounded-[24px] space-y-4 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-primary)]"></div>
        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">{text.details?.appointment_label || 'Запись'}</span>
          <span className="font-bold text-gray-900 text-right max-w-[60%]">{formData.service?.name}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">{text.details?.with_label || 'Врач'}</span>
          <span className="font-bold text-gray-900">{formData.doctor ? formatDoctorName(formData.doctor.name) : ''}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">{text.details?.at_label || 'Время'}</span>
          <span className="font-bold text-[var(--color-primary)] text-lg bg-[var(--color-primary)]/10 px-3 py-1 rounded-lg">{formData.slot?.time}</span>
        </div>
      </div>

      <div className="space-y-5 bg-white p-6 sm:p-8 rounded-[24px] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
            {text.details?.form?.name_label || 'ФИО'}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder={text.details?.form?.name_placeholder || 'Иванов Иван Иванович'}
            className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
            {text.details?.form?.phone_label || 'Телефон'}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            placeholder={text.details?.form?.phone_placeholder || '+7 (999) 000-00-00'}
            className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
            {text.details?.form?.email_label || 'Email'}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder={text.details?.form?.email_placeholder || 'ivanov@example.com'}
            className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !formData.name || !formData.phone}
          className="w-full mt-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-[var(--color-primary)]/20 active:scale-[0.98]"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            text.details?.form?.submit_button || 'Записаться'
          )}
        </button>
        
        <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
          {text.details?.form?.terms || 'Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных'}
        </p>
      </div>
    </div>
  );
}
