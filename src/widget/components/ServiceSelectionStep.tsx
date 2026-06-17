import React from 'react';
import { Search, ChevronRight, Activity, HeartPulse, User, Syringe } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatSpecialty } from '../utils/formatters';
import { Card } from '@/shared/ui/Card';
import { LoadingState } from './LoadingState';
import { ServiceCardSkeleton } from './ServiceCardSkeleton';

const ICON_MAP: Record<string, any> = {
  Activity,
  HeartPulse,
  User,
  Syringe
};

export function ServiceSelectionStep() {
  const { 
    searchQuery, setSearchQuery, filteredDoctors, handleDoctorSelect, formatDoctorName, 
    config, groupedServices, handleServiceSelect, loading, services, allDoctors 
  } = useBooking();

  return (
    <div className="space-y-6 relative pb-20 px-4 sm:px-0">
      {loading && Object.keys(groupedServices).length === 0 ? (
        <LoadingState 
          title="Связываемся с клиникой..."
          description="Это может занять несколько секунд"
        >
          <div className="space-y-8 animate-pulse">
            <div>
              <div className="flex gap-3 items-center mb-4 pl-2 opacity-50">
                <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/10" />
                <div className="h-6 w-40 bg-gray-200 rounded" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ServiceCardSkeleton key={`skeleton-1-${i}`} />
                ))}
              </div>
            </div>
            <div>
              <div className="flex gap-3 items-center mb-4 pl-2 opacity-50">
                <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/10" />
                <div className="h-6 w-32 bg-gray-200 rounded" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <ServiceCardSkeleton key={`skeleton-2-${i}`} />
                ))}
              </div>
            </div>
          </div>
        </LoadingState>
      ) : (
        <>
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Врач, услуга или специальность..." 
              className="w-full pl-16 pr-6 py-5 sm:py-6 bg-white border border-gray-200/80 rounded-2xl focus:ring-4 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] outline-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all text-lg sm:text-xl text-[var(--color-text-primary)] placeholder-gray-400 font-medium"
            />
          </div>

          {/* Content */}
          {searchQuery ? (
            <div className="space-y-4">
               <h2 className="font-bold text-lg text-[var(--color-text-primary)]">Результаты поиска</h2>
           
           {/* Doctors matching search */}
           {filteredDoctors.length > 0 && (
             <div className="space-y-4">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Врачи</h3>
               {filteredDoctors.map(doctor => (
                 <Card
                   key={doctor.id}
                   onClick={() => handleDoctorSelect(doctor)}
                   className="w-full flex items-center gap-5 p-4 sm:p-5 hover:border-[var(--color-primary)]/30 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] transition-all duration-theme text-left active:scale-[0.99] group cursor-pointer"
                 >
                   {doctor.image ? (
                     <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                   ) : (
                     <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/5 flex items-center justify-center text-[var(--color-primary)] font-bold text-xl shrink-0 shadow-sm border border-[var(--color-primary)]/10">
                       {doctor.name.charAt(0)}
                     </div>
                   )}
                   <div className="flex-1 min-w-0">
                     <div className="font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors text-lg truncate">{formatDoctorName(doctor.name)}</div>
                     <div className="text-sm text-gray-500 mt-0.5 truncate">{formatSpecialty(doctor.specialty, config)}</div>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors shrink-0">
                     <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-primary)] transition-colors" />
                   </div>
                 </Card>
               ))}
             </div>
           )}

           {/* Services matching search */}
           {Object.values(groupedServices).flat().filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 && (
             <div className="space-y-4 mt-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Услуги</h3>
                {Object.values(groupedServices).flat().filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map(service => (
                  <Card
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 hover:border-[var(--color-primary)]/30 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] transition-all duration-theme text-left active:scale-[0.99] group cursor-pointer"
                  >
                    <span className="font-medium text-[15px] sm:text-base text-gray-800 group-hover:text-[var(--color-primary)] transition-colors pr-4">{formatSpecialty(service.name, config)}</span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors shrink-0">
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-primary)] transition-colors" />
                    </div>
                  </Card>
                ))}
             </div>
           )}

           {filteredDoctors.length === 0 && Object.values(groupedServices).flat().filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
             <div className="text-center py-12 text-[var(--color-text-secondary)]">
               Ничего не найдено
             </div>
           )}
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedServices).map(([groupName, groupServices]) => {
            const style = config?.group_styles?.[groupName];
            const Icon = style?.icon ? ICON_MAP[style.icon] : null;
            const color = style?.color || 'var(--color-primary)';
            
            return (
            <div key={groupName} className="space-y-5">
              <h2 className="font-bold text-2xl text-[var(--color-text-primary)] flex items-center gap-3 tracking-tight">
                {Icon && (
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                )}
                {groupName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {groupServices.map(service => (
                  <Card
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="relative flex items-center justify-between p-4 sm:p-5 hover:border-[var(--color-primary)]/30 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] transition-all duration-theme text-left group active:scale-[0.98] min-h-[4rem] cursor-pointer"
                  >
                    <span className="font-medium text-[15px] sm:text-base text-gray-800 group-hover:text-[var(--color-primary)] transition-colors break-words hyphens-auto pr-4 leading-snug" lang="ru">
                      {formatSpecialty(service.name, config)}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors shrink-0">
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-primary)] transition-colors" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            );
          })}
          
          {Object.keys(groupedServices).length === 0 && !loading && (
            <div className="text-center py-12 text-[var(--color-text-secondary)] flex flex-col items-center gap-2">
              <p>Нет доступных услуг</p>
              <p className="text-xs opacity-50">
                Debug: services={services.length}, doctors={allDoctors.length}, config={config ? 'yes' : 'no'}, disableFiltering=true
              </p>
            </div>
          )}
        </div>
      )}
      </>
      )}
    </div>
  );
}
