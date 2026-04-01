import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Baby, Calendar, Star } from 'lucide-react';
import { Doctor } from '../../../../widget/types';

export interface ProcessedDoctor extends Doctor {
  displaySpecialty: string;
  acceptsChildren: boolean;
  availableToday: boolean;
  availableTomorrow: boolean;
  expYears: number;
  isPromo?: boolean;
}

interface DoctorCardProps {
  doctor: ProcessedDoctor;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
}

export function DoctorCard({ doctor, isFavorite, onToggleFavorite }: DoctorCardProps) {
  return (
    <Link 
      to={`/doctors/${doctor.id}`} 
      className="group relative bg-white rounded-[2rem] p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-5 hover:shadow-xl hover:shadow-brand-green/5 hover:border-brand-green/30 transition-all duration-300"
    >
      {/* Photo */}
      <div className="relative w-full sm:w-48 sm:shrink-0 rounded-3xl overflow-hidden bg-gray-50 aspect-[4/5] sm:aspect-[3/4]">
        {doctor.image ? (
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-gray-200 bg-gray-100">
            {doctor.name?.charAt(0) || '?'}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col py-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug transition-colors">
              {doctor.name}
            </h3>
            <p className="text-brand-green text-sm font-medium mt-1">
              {doctor.displaySpecialty}
            </p>
          </div>
          
          {/* Right Column: Favorite + Price (Desktop) / Just Favorite (Mobile) */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <button 
              onClick={(e) => { e.preventDefault(); onToggleFavorite(e, doctor.id); }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-red-50 transition-colors"
              aria-label="В избранное"
            >
              <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
            </button>
            <div className="hidden sm:block text-right mt-1">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Прием от</div>
              <div className="text-xl font-extrabold text-gray-900">{doctor.price ? `${doctor.price}\u00A0₽` : '---'}</div>
            </div>
          </div>
        </div>
        
        {/* Badges & Experience */}
        <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
          {doctor.isPromo && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-violet text-white text-xs font-bold rounded-xl shadow-sm shadow-brand-violet/20">
              <Star className="w-3.5 h-3.5 fill-current" />
              Участвует в акции
            </span>
          )}
          <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold rounded-xl uppercase tracking-wider">
            Стаж {doctor.expYears} лет
          </span>
          {doctor.availableToday && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-xl">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              Сегодня
            </span>
          )}
          {doctor.acceptsChildren && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold rounded-xl">
              <Baby className="w-3.5 h-3.5" />
              Детям
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>
        
        {/* Bottom Action Row */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="sm:hidden">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Прием от</div>
            <div className="text-lg font-extrabold text-gray-900">{doctor.price ? `${doctor.price}\u00A0₽` : '---'}</div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 mr-4">
            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="truncate">Ближайшее: <strong className="text-gray-900 font-medium">{doctor.availableToday ? 'Сегодня, 14:30' : 'Завтра, 09:00'}</strong></span>
          </div>

          <button className="px-6 py-3 bg-brand-green text-white font-bold rounded-xl transition-all duration-200 text-sm shadow-sm shadow-brand-green/20 hover:bg-teal-600 hover:shadow-md hover:shadow-brand-green/30 hover:-translate-y-0.5 shrink-0">
            Записаться
          </button>
        </div>
      </div>
    </Link>
  );
}
