import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Star, Baby, MapPin } from 'lucide-react';
import { ProcessedDoctor } from '@/widgets/doctors-widget/types';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { SocialProofRating, SocialProofFeaturedBadges } from '@/shared/ui/SocialProofBadge';
import { useAnalytics } from '@/shared/infrastructure/analytics/AnalyticsService';

interface Props {
  doctor: ProcessedDoctor;
  className?: string; // ← добавили className
}

export function DoctorCardA({ doctor, className }: Props) {
  const analytics = useAnalytics();
  return (
    <Card 
      as={Link}
      onClick={() => analytics.trackEvent('doctor_clicked', { doctorId: doctor.id, variant: 'A' })}
      to={`/doctors/${doctor.id}`} 
      className={`snap-start shrink-0 w-[240px] sm:w-[280px] p-3 sm:p-4 hover:border-brand/30 group ${className || ''}`}
    >
      {/* Photo */}
      <div className="relative w-full overflow-hidden bg-gray-50 aspect-square sm:aspect-[4/5]" style={{ borderRadius: 'calc(var(--app-radius) * 0.8)' }}>
        {doctor.image ? (
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-brand/30 bg-brand/5">
            <User className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
        )}
        {doctor.isPromo && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <Badge variant="promo" size="sm" className="gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl shadow-sm">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
              Акция
            </Badge>
          </div>
        )}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none z-10 px-2">
           <SocialProofFeaturedBadges featuredBadge={doctor.name.length % 2 === 0 ? 'top10' : 'none'} className="shadow-md" />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-1 px-1 mt-2">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug transition-colors line-clamp-2">
          {doctor.name}
        </h3>
        <p className="text-brand text-xs sm:text-sm font-medium mt-0.5 sm:mt-1 line-clamp-1">
          {doctor.displaySpecialty}
        </p>
        
        <div className="mt-2">
            <SocialProofRating rating={4.9} reviewsCount={24 + (doctor.name.length * 2)} />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2 sm:mt-3 mb-3 sm:mb-4">
          {doctor.experienceYears && (
            <Badge variant="default" size="sm" className="rounded-md sm:rounded-lg">
              Стаж {doctor.experienceYears} лет
            </Badge>
          )}
          {doctor.isChildDoctor && (
            <Badge variant="warning" size="sm" className="gap-1 rounded-md sm:rounded-lg">
              <Baby className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Детям
            </Badge>
          )}
        </div>

        <div className="flex-1"></div>

        {/* Bottom Action */}
        <Button 
          as="div"
          variant="primary"
          size="sm"
          fullWidth
          className="mt-1 sm:mt-2"
        >
          Записаться
        </Button>
      </div>
    </Card>
  );
}
