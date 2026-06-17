import React from 'react';
import { Appointment } from '../../model/types';

interface UpcomingAppointmentProps {
  appointment: Appointment;
}

export function UpcomingAppointment({ appointment }: UpcomingAppointmentProps) {
  // Format date helper
  const day = appointment.date.getDate();
  const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  const month = monthNames[appointment.date.getMonth()];
  const time = appointment.date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-3 ml-1">Ближайший приём</h3>
      <div 
        className="bg-white p-5 shadow-[var(--app-shadow)] border border-gray-100 transition-all duration-theme"
        style={{ borderRadius: 'var(--app-radius)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center text-brand font-bold">
              {day}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">{month}, {time}</div>
              <div className="text-xs text-gray-500 font-medium">{appointment.address}</div>
            </div>
          </div>
        </div>
        <div 
          className="bg-gray-50 p-4 flex gap-4 transition-colors duration-theme"
          style={{ borderRadius: 'calc(var(--app-radius) - 8px)' }}
        >
          <img src={appointment.doctor.avatarUrl} alt={appointment.doctor.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
          <div className="min-w-0">
            <div className="text-sm font-bold text-gray-900 truncate">{appointment.doctor.name}</div>
            <div className="text-xs text-brand font-medium truncate">{appointment.doctor.specialty}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
