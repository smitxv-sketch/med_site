import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Baby, Calendar, Star } from 'lucide-react';
import { Doctor } from '../../../../widget/types';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { SmartPrice } from '@/shared/ui/SmartPrice';
import { Badge } from '@/shared/ui/Badge';
import { SocialProofRating, SocialProofFeaturedBadges } from '@/shared/ui/SocialProofBadge';

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
    <Card 
      as={Link}
      to={`/doctors/${doctor.id}`} 
      hoverable
      className="group p-app flex flex-col sm:flex-row gap-5"
    >
      {/* Photo */}
      <div className="relative w-full sm:w-48 sm:shrink-0 rounded-3xl overflow-hidden bg-gray-50 aspect-[4/5] sm:aspect-[3/4]">
        <div className="absolute bottom-2 left-0 right-0 flex justify-center z-10 pointer-events-none px-2">
           <SocialProofFeaturedBadges featuredBadge={doctor.name.length % 2 === 0 ? 'patientsChoice' : 'expert'} className="backdrop-blur-md bg-opacity-95 shadow-sm" />
        </div>
        {doctor.image ? (
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
           
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
            <p className="text-brand text-sm font-medium mt-1">
              {doctor.displaySpecialty}
            </p>
            <div className="mt-2">
              <SocialProofRating rating={4.9} reviewsCount={24 + (doctor.name.length * 3)} />
            </div>
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
            <div className="hidden sm:block">
              <SmartPrice price={doctor.price} className="text-xl font-extrabold text-gray-900" />
            </div>
          </div>
        </div>
        
        {/* Badges & Experience */}
        <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
          {doctor.isPromo && (
            <Badge variant="promo" size="sm" className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              Участвует в акции
            </Badge>
          )}
          <Badge variant="outline" size="sm" className="uppercase tracking-wider">
            Стаж {doctor.expYears} лет
          </Badge>
          {doctor.availableToday && (
            <Badge variant="secondary" size="sm" className="flex items-center gap-1.5 bg-green-50 text-green-700">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              Сегодня
            </Badge>
          )}
          {doctor.acceptsChildren && (
            <Badge variant="secondary" size="sm" className="flex items-center gap-1.5 bg-orange-50 text-orange-700">
              <Baby className="w-3.5 h-3.5" />
              Детям
            </Badge>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>
        
        {/* Bottom Action Row */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="sm:hidden">
            <SmartPrice price={doctor.price} className="text-lg font-extrabold text-gray-900" />
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 mr-4">
            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="truncate">Ближайшее: <strong className="text-gray-900 font-medium">{doctor.availableToday ? 'Сегодня, 14:30' : 'Завтра, 09:00'}</strong></span>
          </div>

          <Button variant="primary" size="sm" onClick={(e) => e.preventDefault()}>
            Записаться
          </Button>
        </div>
      </div>
    </Card>
  );
}
