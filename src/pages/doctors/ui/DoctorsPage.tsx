import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { getAllDoctors } from '../../../widget/services/api';
import { Doctor } from '../../../widget/types';
import { formatSpecialty } from '../../../widget/utils/formatters';
import { DoctorCard, ProcessedDoctor } from './components/DoctorCard';
import { DoctorsFilterBar } from './components/DoctorsFilterBar';

export function DoctorsPage() {
  const { data: doctors, isLoading, error } = useQuery<Doctor[]>({
    queryKey: ['doctors'],
    queryFn: getAllDoctors
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const processedDoctors = useMemo(() => {
    if (!doctors) return [];
    return doctors.map(d => {
      const cleanedSpec = formatSpecialty(d.specialty || '');
      
      // Стабильный псевдорандом на основе ID для демо-фильтров
      const charCode = d.id.charCodeAt(0) || 0;
      const acceptsChildren = cleanedSpec.toLowerCase().includes('педиатр') || charCode % 3 === 0;
      const availableToday = charCode % 2 === 0;
      const availableTomorrow = !availableToday && charCode % 5 === 0;
      
      // Имитация стажа
      const expYears = d.experienceYears || (10 + (charCode % 15));

      // Имитация акции
      const isPromo = charCode % 4 === 0;

      return {
        ...d,
        displaySpecialty: cleanedSpec || d.specialty || d.position || '',
        acceptsChildren,
        availableToday,
        availableTomorrow,
        expYears,
        isPromo
      } as ProcessedDoctor;
    });
  }, [doctors]);

  const specialties = useMemo(() => {
    const specs = new Set(processedDoctors.map(d => d.displaySpecialty).filter(Boolean));
    return Array.from(specs).sort();
  }, [processedDoctors]);

  const filteredDoctors = useMemo(() => {
    return processedDoctors.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (d.displaySpecialty && d.displaySpecialty.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSpecialty = selectedSpecialty ? d.displaySpecialty === selectedSpecialty : true;
      
      let matchesQuick = true;
      if (activeQuickFilter === 'children') matchesQuick = d.acceptsChildren;
      if (activeQuickFilter === 'today') matchesQuick = d.availableToday;
      if (activeQuickFilter === 'tomorrow') matchesQuick = d.availableTomorrow;
      if (activeQuickFilter === 'promo') matchesQuick = !!d.isPromo;

      return matchesSearch && matchesSpecialty && matchesQuick;
    });
  }, [processedDoctors, searchTerm, selectedSpecialty, activeQuickFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-brand-green/30 border-t-brand-green rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500">
        <p>Ошибка загрузки списка врачей. Пожалуйста, попробуйте позже.</p>
      </div>
    );
  }

  return (
    <div className="py-4 md:py-8">
      <div className="flex flex-col gap-1.5 md:gap-2 mb-5 md:mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Наши врачи</h1>
          <span className="inline-flex items-center justify-center px-3 py-1 bg-brand-green/10 text-brand-green rounded-full font-bold text-sm">
            {filteredDoctors.length}
          </span>
        </div>
        <p className="text-gray-500 text-sm md:text-lg">Найдите своего специалиста и запишитесь на прием</p>
      </div>
      
      <DoctorsFilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedSpecialty={selectedSpecialty}
        setSelectedSpecialty={setSelectedSpecialty}
        specialties={specialties}
        activeQuickFilter={activeQuickFilter}
        setActiveQuickFilter={setActiveQuickFilter}
        doctors={processedDoctors}
      />

      {/* ========================================== */}
      {/* DOCTORS LIST                               */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
        {filteredDoctors?.map((doctor) => (
          <DoctorCard 
            key={doctor.id}
            doctor={doctor}
            isFavorite={favorites.has(doctor.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
        
        {filteredDoctors?.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Врачи не найдены</h3>
            <p className="text-gray-500 max-w-md mx-auto text-lg">
              Попробуйте изменить параметры поиска или сбросить фильтры, чтобы увидеть больше специалистов.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty(null);
                setActiveQuickFilter(null);
              }}
              className="mt-8 px-8 py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-brand-green/90 transition-colors shadow-sm shadow-brand-green/20"
            >
              Сбросить все фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
