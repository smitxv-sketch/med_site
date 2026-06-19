import React, { useEffect, useState, useMemo } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { useDoctorsRepository } from '../../../../shared/di/DIContext';
import { useAnalytics } from '../../../../shared/infrastructure/analytics/AnalyticsService';
import { Doctor } from '../../../../widget/types';
import { DoctorProfileScreen } from './DoctorProfileScreen';
import { useUISettingsStore } from '../../../../shared/store/uiSettingsStore';

export function DoctorsScreen() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { doctorsSectionVariant } = useUISettingsStore();
  const doctorsRepository = useDoctorsRepository();
  const analytics = useAnalytics();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setIsLoading(true);
        const data = await doctorsRepository.getAllDoctors();
        setDoctors(data);
      } catch (err) {
        console.warn('API Error fetching real data, using fallback.', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  // Извлекаем уникальные специализации
  const specialties = useMemo(() => {
    const specs = new Set<string>();
    doctors.forEach(d => {
      if (d.specialty) {
        d.specialty.split(',').forEach(s => {
          let cleanSpec = s.trim();
          if (cleanSpec.toLowerCase().startsWith('врач-')) {
            cleanSpec = cleanSpec.substring(5);
            cleanSpec = cleanSpec.charAt(0).toUpperCase() + cleanSpec.slice(1);
          }
          specs.add(cleanSpec);
        });
      }
    });
    return Array.from(specs).sort();
  }, [doctors]);

  // Фильтруем врачей по поиску и специализации
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (doc.specialty && doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSpecialty = selectedSpecialty 
                              ? doc.specialty?.toLowerCase().includes(selectedSpecialty.toLowerCase())
                              : true;
      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, searchQuery, selectedSpecialty]);

  const handleDoctorClick = (doc: Doctor) => {
    analytics.trackEvent('doctor_clicked', { doctorId: doc.id });
    setSelectedDoctor(doc);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-white sticky top-0 z-10 border-b border-gray-100 flex flex-col pt-safe">
        <div className="p-[var(--spacing-base)] flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-900">Врачи</h2>
          <div className="bg-gray-100 rounded-xl flex items-center px-4 py-2.5 text-gray-400 focus-within:ring-2 ring-brand/30 transition-shadow">
             <Search className="w-4 h-4 mr-2 shrink-0" />
             <input 
               type="text" 
               placeholder="Фамилия, имя или специальность..." 
               className="bg-transparent border-none outline-none text-[13px] w-full text-gray-800 placeholder:text-gray-400"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
        </div>

        {/* Categories scrollable list */}
        {!isLoading && specialties.length > 0 && (
          <div className="overflow-x-auto scrollbar-hide px-[var(--spacing-base)] pb-[var(--spacing-base)]">
            <div className="flex items-center gap-2 w-max">
              <button 
                onClick={() => setSelectedSpecialty(null)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap border ${
                  selectedSpecialty === null 
                    ? 'bg-brand text-brand-fg border-brand' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                Все направления
              </button>
              {specialties.map(spec => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap border ${
                    selectedSpecialty === spec 
                      ? 'bg-brand text-brand-fg border-brand' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-[var(--spacing-base)] space-y-3 pb-24 relative z-0">
        {isLoading && (
          // Skeleton loaders
          [1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-4 rounded-3xl animate-pulse flex gap-4">
               <div className="w-16 h-16 bg-gray-200 rounded-full shrink-0" />
               <div className="flex-1 py-1">
                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                 <div className="h-3 bg-gray-100 rounded w-1/2" />
               </div>
            </div>
          ))
        )}

        {!isLoading && doctorsSectionVariant === 'B' ? (
          <div className="grid grid-cols-2 gap-3">
             {filteredDoctors.map(doc => {
               const photo = doc.image || 'https://i.pravatar.cc/150?img=12';
               const spec = doc.specialty || doc.position || 'Врач';
               return (
                 <div 
                   key={doc.id} 
                   onClick={() => handleDoctorClick(doc)}
                   className="bg-white p-3 shadow-[var(--app-shadow)] flex flex-col items-center text-center active:scale-95 transition-transform group cursor-pointer"
                   style={{ borderRadius: 'var(--app-radius)', border: 'var(--app-border)' }}
                 >
                   <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 bg-gray-100 border border-gray-100 mb-3">
                     <img src={photo} alt={doc.name} className="w-full h-full object-cover" />
                   </div>
                   <h3 className="text-[12px] font-bold text-gray-900 leading-tight mb-1 line-clamp-2">{doc.name}</h3>
                   <p className="text-[10px] text-brand font-medium mb-3 line-clamp-1">{spec}</p>
                   <button className="w-full bg-brand/10 text-brand text-[10px] font-bold py-1.5 rounded-lg mt-auto">
                     Записаться
                   </button>
                 </div>
               );
             })}
          </div>
        ) : (
          !isLoading && filteredDoctors.map(doc => {
            const photo = doc.image || 'https://i.pravatar.cc/150?img=12';
            const spec = doc.specialty || doc.position || 'Врач';
            return (
              <div 
                key={doc.id} 
                onClick={() => handleDoctorClick(doc)}
                className="bg-white p-4 shadow-[var(--app-shadow)] flex items-start gap-4 active:scale-95 transition-transform group cursor-pointer"
                style={{ borderRadius: 'var(--app-radius)', border: 'var(--app-border)' }}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-gray-100 border border-gray-100">
                  <img src={photo} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] font-bold text-gray-900 leading-tight mb-0.5 truncate">{doc.name}</h3>
                  <p className="text-[11px] text-brand font-medium mb-3 truncate">{spec}</p>
  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-[10px] font-semibold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">
                      Запись открыта
                    </div>
                    <button className="flex items-center justify-center w-8 h-8 bg-gray-50 hover:bg-brand group-hover:bg-brand hover:text-white group-hover:text-white text-gray-400 rounded-full transition-colors shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {!isLoading && filteredDoctors.length === 0 && (
          <div className="text-center flex flex-col items-center justify-center py-10">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl mb-4 grayscale opacity-50">👩‍⚕️</div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Ничего не найдено</h4>
            <p className="text-xs text-gray-500 max-w-[200px]">Попробуйте изменить параметры поиска или фильтры</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialty(null);
              }}
              className="mt-4 text-brand text-xs font-bold"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {selectedDoctor && (
        <DoctorProfileScreen 
          doctor={selectedDoctor}
          onBack={() => setSelectedDoctor(null)}
          onSlotSelect={() => {
            alert('Переход к бронированию слота!');
          }}
        />
      )}
    </div>
  );
}
