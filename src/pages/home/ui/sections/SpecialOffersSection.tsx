import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { formatTypography } from '../../../../widget/utils/formatters';

const specialOffers = [
  {
    id: 'pensioners',
    title: 'Скидка 10% пенсионерам на все услуги клиники',
    validUntil: '31 декабря 2026 года',
  },
  {
    id: 'svo',
    title: 'Скидка 15% участникам СВО и членам их семей',
    validUntil: '31 декабря 2026 года',
  }
];

function SpecialOfferCard({ offer, isLast }: { offer: any, isLast: boolean }) {
  return (
    <React.Fragment>
      <Link 
        to={`/promotions/${offer.id}`} 
        className="group flex-1 flex flex-col justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors relative h-full"
      >
        <div className="flex-1 mb-2">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-snug">
            {formatTypography(offer.title)}
          </h3>
        </div>
        
        <div className="shrink-0 flex items-center gap-4 mt-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 text-brand-green" />
            <span>Действует до <span className="text-gray-900 group-hover:text-brand-green transition-colors">{offer.validUntil}</span></span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-green group-hover:translate-x-1 transition-all hidden sm:block ml-auto" />
        </div>
      </Link>
      {!isLast && (
        <>
          <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent my-4" />
          <div className="md:hidden h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-4" />
        </>
      )}
    </React.Fragment>
  );
}

export function SpecialOffersSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Спецпредложения</h2>
      </div>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden flex flex-col md:flex-row pl-1.5">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-transparent via-brand-green to-transparent z-10" />
        {specialOffers.map((offer, index) => (
          <SpecialOfferCard 
            key={offer.id} 
            offer={offer} 
            isLast={index === specialOffers.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
