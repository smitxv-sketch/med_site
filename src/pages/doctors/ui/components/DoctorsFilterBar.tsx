import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, ChevronDown, Check, Baby, Clock, Calendar, Stethoscope, Star, User } from 'lucide-react';

interface DoctorsFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSpecialty: string | null;
  setSelectedSpecialty: (specialty: string | null) => void;
  specialties: string[];
  activeQuickFilter: string | null;
  setActiveQuickFilter: (filter: string | null) => void;
  doctors?: any[];
}

export function DoctorsFilterBar({
  searchTerm,
  setSearchTerm,
  selectedSpecialty,
  setSelectedSpecialty,
  specialties,
  activeQuickFilter,
  setActiveQuickFilter,
  doctors = []
}: DoctorsFilterBarProps) {
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSpecialtyOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return { doctors: [], specialties: [] };
    
    const term = searchTerm.toLowerCase().trim();
    
    const matchedSpecialties = specialties.filter(s => s.toLowerCase().includes(term)).slice(0, 3);
    
    const matchedDoctors = doctors.filter(d => d.name.toLowerCase().includes(term)).slice(0, 5);
    
    return { doctors: matchedDoctors, specialties: matchedSpecialties };
  }, [searchTerm, specialties, doctors]);

  const showSuggestions = isSearchFocused && searchTerm.trim().length > 0 && (searchSuggestions.doctors.length > 0 || searchSuggestions.specialties.length > 0);

  return (
    <>
      {/* Unified Search Bar */}
      <div className="bg-white rounded-3xl md:rounded-[2rem] p-1.5 md:p-2 shadow-sm border border-gray-200 mb-4 md:mb-6 flex flex-col md:flex-row relative z-20">
        {/* Search */}
        <div className="relative flex-1 flex items-center px-3 md:px-4 py-1.5 md:py-2" ref={searchContainerRef}>
          <Search className="h-5 w-5 md:h-6 md:w-6 text-gray-400 shrink-0" />
          <input
            type="text"
            className="w-full pl-3 md:pl-4 pr-3 md:pr-4 py-1.5 md:py-2 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-base md:text-lg"
            placeholder="Врач, заболевание, услуга..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
          />
          {searchTerm && (
            <button 
              onClick={() => {
                setSearchTerm('');
                setIsSearchFocused(true);
              }}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          )}

          {/* Search Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
              <div className="max-h-[60vh] overflow-y-auto py-2">
                {searchSuggestions.specialties.length > 0 && (
                  <div className="mb-2">
                    <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Специальности</div>
                    {searchSuggestions.specialties.map(spec => (
                      <button
                        key={spec}
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        onClick={() => {
                          setSearchTerm(spec);
                          setIsSearchFocused(false);
                        }}
                      >
                        <Stethoscope className="w-4 h-4 text-brand-green" />
                        <span className="text-gray-700">{spec}</span>
                      </button>
                    ))}
                  </div>
                )}
                
                {searchSuggestions.doctors.length > 0 && (
                  <div>
                    <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Врачи</div>
                    {searchSuggestions.doctors.map(doc => (
                      <button
                        key={doc.id}
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        onClick={() => {
                          setSearchTerm(doc.name);
                          setIsSearchFocused(false);
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden shrink-0 relative">
                          {doc.image ? (
                            <img src={doc.image} alt={doc.name} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              <User className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-900 font-medium text-sm">{doc.name}</span>
                          <span className="text-xs text-gray-500">{doc.displaySpecialty}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:block w-px bg-gray-200 my-3 mx-2"></div>
        <div className="md:hidden h-px bg-gray-100 mx-3 my-0.5"></div>

        {/* Specialty Dropdown */}
        <div className="relative md:w-80 shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setIsSpecialtyOpen(!isSpecialtyOpen)}
            className="w-full flex items-center justify-between px-3 md:px-4 py-2.5 md:py-4 bg-transparent hover:bg-gray-50 rounded-2xl transition-colors text-left"
          >
            <div className="flex items-center gap-2.5 md:gap-3 truncate">
              <Stethoscope className="w-5 h-5 md:w-6 md:h-6 text-brand-green shrink-0" />
              <span className={`truncate text-base md:text-lg ${selectedSpecialty ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                {selectedSpecialty || 'Все специальности'}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 text-gray-400 transition-transform duration-200 ${isSpecialtyOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSpecialtyOpen && (
            <>
              {/* Mobile overlay */}
              <div 
                className="fixed inset-0 bg-black/20 z-40 md:hidden"
                onClick={() => setIsSpecialtyOpen(false)}
              />
              
              {/* Dropdown menu */}
              <div className="fixed md:absolute z-50 bottom-0 left-0 right-0 md:bottom-auto md:top-full md:mt-3 bg-white md:border border-gray-100 rounded-t-3xl md:rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-xl max-h-[85vh] md:max-h-96 flex flex-col pb-safe">
                <div className="shrink-0 pt-4 pb-2 bg-white rounded-t-3xl md:hidden sticky top-0 z-10 border-b border-gray-100">
                  <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="px-5 mb-2 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Выберите специальность</h3>
                    <button onClick={() => setIsSpecialtyOpen(false)} className="p-2 -mr-2 text-gray-400 hover:text-gray-600">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="overflow-y-auto flex-1 pb-24 md:pb-2">
                  <button
                    onClick={() => { setSelectedSpecialty(null); setIsSpecialtyOpen(false); }}
                    className={`w-full text-left px-5 md:px-6 py-4 md:py-3.5 hover:bg-gray-50 transition-colors flex items-center justify-between ${!selectedSpecialty ? 'text-brand-green font-bold bg-brand-green/5' : 'text-gray-700'}`}
                  >
                    Все специальности
                    {!selectedSpecialty && <Check className="w-5 h-5" />}
                  </button>
                  {specialties.map(spec => (
                    <button
                      key={spec}
                      onClick={() => { setSelectedSpecialty(spec); setIsSpecialtyOpen(false); }}
                      className={`w-full text-left px-5 md:px-6 py-4 md:py-3.5 hover:bg-gray-50 transition-colors flex items-center justify-between border-t border-gray-50 ${selectedSpecialty === spec ? 'text-brand-green font-bold bg-brand-green/5' : 'text-gray-700'}`}
                    >
                      <span className="truncate pr-4 text-[15px] md:text-base">{spec}</span>
                      {selectedSpecialty === spec && <Check className="w-5 h-5 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick Filters Row */}
      <div className="flex flex-wrap items-center gap-2.5 md:gap-3 mb-6 md:mb-10">
        {/* Quick Chips */}
        <button
          onClick={() => setActiveQuickFilter(activeQuickFilter === 'children' ? null : 'children')}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
            activeQuickFilter === 'children' 
              ? 'bg-brand-orange text-white border-brand-orange shadow-md' 
              : 'bg-white border-gray-200 text-gray-600 hover:border-brand-orange/50 hover:bg-brand-orange/5'
          }`}
        >
          <Baby className="w-4 h-4" />
          Детский врач
        </button>
        <button
          onClick={() => setActiveQuickFilter(activeQuickFilter === 'today' ? null : 'today')}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
            activeQuickFilter === 'today' 
              ? 'bg-brand-green text-white border-brand-green shadow-md' 
              : 'bg-white border-gray-200 text-gray-600 hover:border-brand-green/50 hover:bg-brand-green/5'
          }`}
        >
          <Clock className="w-4 h-4" />
          Прием сегодня
        </button>
        <button
          onClick={() => setActiveQuickFilter(activeQuickFilter === 'tomorrow' ? null : 'tomorrow')}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
            activeQuickFilter === 'tomorrow' 
              ? 'bg-brand-blue text-white border-brand-blue shadow-md' 
              : 'bg-white border-gray-200 text-gray-600 hover:border-brand-blue/50 hover:bg-brand-blue/5'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Завтра
        </button>
        <button
          onClick={() => setActiveQuickFilter(activeQuickFilter === 'promo' ? null : 'promo')}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
            activeQuickFilter === 'promo' 
              ? 'bg-brand-violet text-white border-brand-violet shadow-md' 
              : 'bg-white border-gray-200 text-gray-600 hover:border-brand-violet/50 hover:bg-brand-violet/5'
          }`}
        >
          <Star className="w-4 h-4" />
          По акции
        </button>
      </div>
    </>
  );
}
