import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/shared/ui/Card';
import { Calendar, ArrowRight, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MedicalDisclaimer } from '@/shared/ui/MedicalDisclaimer';
import { useSpecialOffersRepository } from '@/shared/di/DIContext';
import { SpecialOffer } from '@/shared/infrastructure/storage/SpecialOffersRepository';
import { formatTypography } from '@/widget/utils/formatters';

export function SpecialOffersPage() {
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const repository = useSpecialOffersRepository();

  useEffect(() => {
    let active = true;
    repository.getSpecialOffers().then(data => {
      if(active) setOffers(data);
    });
    return () => { active = false; };
  }, [repository]);

  return (
    <div className="min-h-screen bg-gray-50/50 pt-4 md:pt-6 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Специальные предложения</h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-6">
            Особые медицинские программы, чекапы и скидки для наших пациентов.
          </p>
          <MedicalDisclaimer />
        </div>

        {offers.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Загрузка предложений...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                  {offer.image ? (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={offer.image} 
                        alt={offer.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-brand shadow-sm">
                        <Percent className="w-4 h-4" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brand/80 to-brand/40">
                       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-brand shadow-sm">
                        <Percent className="w-4 h-4" />
                       </div>
                    </div>
                  )}
                  
                  <div className="p-6 flex flex-col flex-1 bg-white">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>Действует до: <span className="font-medium text-gray-900">{offer.validUntil}</span></span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand transition-colors leading-tight">
                      {formatTypography(offer.title)}
                    </h3>
                    
                    <Link 
                      to="/booking"
                      className="inline-flex items-center gap-2 text-brand font-medium hover:text-brand/80 transition-colors mt-auto pt-4"
                    >
                      Воспользоваться предложением
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
