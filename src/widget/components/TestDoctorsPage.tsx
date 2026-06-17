import React from 'react';
import { Link } from 'react-router-dom';
import { useDoctorsRepository } from '@/shared/di/DIContext';
import { useQuery } from '@tanstack/react-query';
import { Doctor } from '../types';

export function TestDoctorsPage() {
  const doctorsRepository = useDoctorsRepository();

  const { data: doctors, isLoading, error } = useQuery<Doctor[]>({
    queryKey: ['doctors-test-list'],
    queryFn: () => doctorsRepository.getAllDoctors()
  });

  if (isLoading) {
    return <div className="p-10 text-center text-gray-500">Загрузка врачей...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">Ошибка загрузки</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Сервисная страница: Все врачи</h1>
      <p className="text-gray-500 mb-8 text-sm">
        Нажмите на любого врача, чтобы открыть модуль онлайн записи сразу с открытой карточкой этого врача (параметр ?doctor_id=ID).
      </p>
      
      <div className="flex flex-col gap-2">
        {doctors?.map(doctor => (
          <Link 
            key={doctor.id} 
            to={`/booking?doctor_id=${doctor.id}`}
            className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all"
          >
            <div className="font-bold text-gray-900">{doctor.name}</div>
            <div className="text-sm text-gray-500">{doctor.specialty || doctor.position}</div>
            <div className="text-xs text-blue-500 mt-2 font-mono break-all font-medium">?doctor_id={doctor.id}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
