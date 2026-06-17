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
}

export function DoctorCardB({ doctor }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const analytics = useAnalytics();

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [doctor]);

  return (
    <Card className="snap-start shrink-0 w-[300px] md:w-[380px] p-5 hover:border-brand/10 transition-all duration-500 group flex flex-col relative overflow-hidden">
      {/* Soft background blob for warmth */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50" />
      
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
         <SocialProofFeaturedBadges featuredBadge={doctor.name.length % 2 === 0 ? 'patientsChoice' : 'expert'} className="shadow-sm backdrop-blur-md bg-opacity-95" />
      </div>

      <Link 
        to={`/doctors/${doctor.id}`} 
        className="block relative z-10"
        onClick={() => analytics.trackEvent('doctor_clicked', { doctorId: doctor.id, variant: 'B' })}
      >
        <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-1 transition-colors leading-snug pr-4 max-w-[85%]">{doctor.name}</h3>
        <div className="mb-4">
            <SocialProofRating rating={4.9} reviewsCount={24 + (doctor.name.length * 3)} />
        </div>
      </Link>
      
      <div className="flex gap-5 mb-5 relative z-10">
        <Link to={`/doctors/${doctor.id}`} className="w-1/3 max-w-[120px] shrink-0 aspect-[3/4] overflow-hidden bg-gradient-to-br from-brand/5 to-brand/10 relative block shadow-inner" style={{ borderRadius: 'calc(var(--app-radius) * 0.8)' }}>
          {doctor.image ? (
            <img 
              src={doctor.image} 
              alt={doctor.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-brand/30">
              <User className="w-10 h-10" />
            </div>
          )}
        </Link>
        
        <div className="flex-1 relative flex flex-col">
          <div 
            ref={textRef}
            className={`flex flex-col gap-2.5 overflow-hidden transition-all duration-theme relative ${isExpanded ? '' : 'max-h-32 sm:max-h-36'}`}
          >
            <div className="flex flex-wrap gap-1.5 shrink-0">
              {doctor.isPromo && (
                <Badge variant="promo" size="sm" className="gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  По акции
                </Badge>
              )}
              {doctor.displaySpecialty && (
                <Badge variant="primary" size="sm">
                  {doctor.displaySpecialty}
                </Badge>
              )}
              {doctor.isChildDoctor && (
                <Badge variant="warning" size="sm">
                  Детский врач
                </Badge>
              )}
            </div>
            <div className="flex flex-col gap-1.5 mt-1">
              {doctor.position && (
                <div 
                  className="text-xs text-gray-500 leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: doctor.position }} 
                />
              )}
              {doctor.anonce && doctor.anonce.replace(/(<([^>]+)>)/gi, "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() !== (doctor.position || "").replace(/(<([^>]+)>)/gi, "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() && (
                <div 
                  className="text-xs text-gray-600 leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: doctor.anonce }} 
                />
              )}
            </div>
          </div>
          
          {!isExpanded && isOverflowing && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent flex items-end justify-start pb-0">
              <button 
                onClick={(e) => { e.preventDefault(); setIsExpanded(true); }}
                className="text-brand text-[11px] font-bold bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-brand/10 hover:bg-brand/5 transition-colors"
              >
                Развернуть
              </button>
            </div>
          )}
          {isExpanded && (
            <div className="mt-3 text-left">
              <button 
                onClick={(e) => { e.preventDefault(); setIsExpanded(false); }}
                className="text-brand text-[11px] font-bold hover:bg-brand/5 px-3 py-1.5 rounded-full transition-colors"
              >
                Свернуть
              </button>
            </div>
          )}
        </div>
      </div>

      {(doctor.experienceYears || (doctor.offerings && doctor.offerings.length > 0)) && (
        <div className="flex items-center gap-2 mb-5 mt-auto relative z-10">
          {doctor.experienceYears && (
            <Badge variant="warning" size="sm" className="gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Стаж {doctor.experienceYears} лет
            </Badge>
          )}
          {doctor.offerings && doctor.offerings.length > 0 && (
            <Badge variant="default" size="sm" className="gap-1.5 truncate max-w-[150px]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
              <span className="truncate">{doctor.offerings[0].branch.short || doctor.offerings[0].branch.name}</span>
            </Badge>
          )}
        </div>
      )}

      {/* Bottom Action */}
      <Button 
        as={Link}
        to={`/doctors/${doctor.id}`}
        variant="primary"
        size="sm"
        fullWidth
        className="mt-4"
      >
        Записаться
      </Button>
    </Card>
  );
}
