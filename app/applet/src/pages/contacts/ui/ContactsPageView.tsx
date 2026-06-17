import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/shared/ui/Card';

const BRANCHES = [
  {
    id: 'aleksandrovsky',
    name: 'Клиника в ЖК Александровский',
    address: 'ул. 40-летия Победы, 11',
    phones: [
      { label: 'Взрослое отделение', number: '+7 (351) 77-88-887' },
      { label: 'Детское отделение', number: '+7 (351) 77-88-887' }
    ],
    hours: 'ПН - ПТ: 8:00 - 22:00\nСБ - ВС: 9:00 - 18:00',
    email: 'info@clinicaistochnik.ru',
    company: 'Общество с ограниченной ответственностью «ПолиКлиника»',
    license: 'Лицензия № ЛО-74-01-004408 от 19.01.18г.',
    images: [
      'https://ci74.ru/wp-content/themes/ci74/pics/clinicpictures/84/3779_Thumb.jpeg',
      'https://ci74.ru/wp-content/themes/ci74/pics/clinicpictures/fe/3777_Thumb.jpeg',
    ]
  },
  {
    id: 'eco',
    name: 'Клиника ЭКО',
    address: 'Челябинск, улица Чичерина, 36В',
    phones: [
      { number: '+7 (351) 77-88-910' }
    ],
    hours: 'ПН - ПТ: 8:00 - 18:00\nСБ: 8:00 - 15:00',
    email: '',
    company: 'Общество с ограниченной ответственностью «ЭкоКлиника»',
    license: 'Лицензия № ЛО-74-01-005172 от 09.08.19г.',
    images: [
      'https://ci74.ru/wp-content/uploads/2019/11/5552_Thumb.jpeg',
      'https://ci74.ru/wp-content/uploads/2019/11/5558_Thumb.jpeg',
      'https://ci74.ru/wp-content/uploads/2019/11/5556_Thumb.jpeg'
    ]
  },
  {
    id: 'podsolnuhi',
    name: 'Клиника в ЖК Подсолнухи',
    address: 'ул. Чичерина, 34А',
    phones: [
      { number: '+7 (351) 77-88-887' }
    ],
    hours: 'ПН - ПТ: 8:00 - 22:00\nСБ - ВС: 9:00 - 18:00',
    email: 'info@clinicaistochnik.ru',
    company: 'Общество с ограниченной ответственностью «ПолиКлиника»',
    license: 'Лицензия № ЛО-74-01-004408 от 19.01.18г.',
    images: [
      'https://ci74.ru/wp-content/uploads/2019/11/3783_Thumb.jpeg',
      'https://ci74.ru/wp-content/uploads/2019/11/3781_Thumb.jpeg'
    ]
  },
  {
    id: 'skoraya',
    name: 'Скорая помощь',
    address: 'ул. 40-летия Победы, 11',
    phones: [
       { number: '+7 (351) 77-88-911' }
    ],
    hours: 'Амбулаторный прием в отделении круглосуточно',
    email: '',
    company: 'Общество с ограниченной ответственностью «ПолиКлиника»',
    license: 'Лицензия № ЛО-74-01-004408 от 19.01.18г.',
    images: [
      'https://ci74.ru/wp-content/uploads/2019/11/3821_Thumb.jpeg',
      'https://ci74.ru/wp-content/uploads/2019/11/3817_Thumb.jpeg',
      'https://ci74.ru/wp-content/uploads/2019/11/3815_Thumb.jpeg',
      'https://ci74.ru/wp-content/uploads/2019/11/3795_Thumb.jpeg'
    ]
  },
  {
    id: 'lesnoi-ostrov',
    name: 'Клиника в Лесном острове',
    address: 'ул. Градостроителей, 1/3',
    phones: [
      { number: '+7 (351) 77-88-906' }
    ],
    hours: 'ПН, СР, ЧТ, ПТ: 8:00 - 16:00\nВТ: 12:00 - 20:00\nСБ: 9:00 - 15:00',
    email: '',
    company: 'Общество с ограниченной ответственностью «ПолиКлиника»',
    license: 'Лицензия № ЛО-74-01-004408 от 19.01.18г.',
    images: [
      'https://ci74.ru/wp-content/uploads/2019/11/3823_Thumb.jpeg'
    ]
  },
  {
    id: 'kosmetologiya',
    name: 'Отделение косметологии',
    address: 'ул. Чичерина, 34А',
    phones: [
      { number: '+7 (351) 77-88-905' }
    ],
    hours: 'ПН - ПТ: 8:00 - 22:00\nСБ - ВС: 9:00 - 18:00',
    email: '',
    company: 'Общество с ограниченной ответственностью «ПолиКлиника»',
    license: 'Лицензия № ЛО-74-01-004408 от 19.01.18г.',
    images: [
      'https://ci74.ru/wp-content/uploads/2025/02/001.jpg',
      'https://ci74.ru/wp-content/uploads/2025/02/20241106-0034-%D0%98%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA-scaled.jpg',
      'https://ci74.ru/wp-content/uploads/2025/02/013-scaled.jpg'
    ]
  }
];

function GallerySlider({ images, title }: { images: string[], title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full relative h-[280px] overflow-hidden shrink-0 bg-gray-100 group">
      <div 
        ref={scrollRef}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory custom-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full h-full shrink-0 snap-center relative">
            <img 
              src={img} 
              alt={`${title} - Фото ${i + 1}`} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Soft gradient overlay at the bottom for aesthetic */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button 
            onClick={scrollLeft}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={scrollRight}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-2.5 py-1.5 rounded-full bg-black/20 backdrop-blur-md">
            {images.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-sm" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ContactsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Контакты</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
            Выберите удобный для вас филиал клиники. Мы всегда на связи и готовы помочь вам и вашим близким.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {BRANCHES.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col"
            >
              <Card className="flex flex-col h-full overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border-gray-200/60">
                <GallerySlider images={branch.images} title={branch.name} />
                
                <div className="p-6 md:p-8 flex-1 flex flex-col pt-7">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight group-hover:text-brand transition-colors">{branch.name}</h2>
                  
                  <div className="space-y-5 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-brand/5 rounded-xl text-brand shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="pt-0.5">
                        <div className="text-[13px] font-bold uppercase tracking-wider text-gray-400 mb-1">Адрес</div>
                        <div className="font-medium text-gray-900">{branch.address}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-brand/5 rounded-xl text-brand shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="space-y-2 pt-0.5">
                        <div className="text-[13px] font-bold uppercase tracking-wider text-gray-400 mb-1">Телефон</div>
                        {branch.phones.map((phone, i) => (
                           <div key={i} className="flex flex-col">
                             {phone.label && <span className="text-sm text-gray-500 font-medium mb-0.5">{phone.label}</span>}
                             <a href={`tel:${phone.number.replace(/[^0-9+]/g, '')}`} className="font-bold text-gray-900 hover:text-brand transition-colors text-lg tracking-tight">
                               {phone.number}
                             </a>
                           </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-brand/5 rounded-xl text-brand shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="pt-0.5">
                        <div className="text-[13px] font-bold uppercase tracking-wider text-gray-400 mb-1">Режим работы</div>
                        <div className="font-medium text-gray-900 whitespace-pre-line leading-relaxed">{branch.hours}</div>
                      </div>
                    </div>

                    {branch.email && (
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-brand/5 rounded-xl text-brand shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div className="pt-0.5">
                          <div className="text-[13px] font-bold uppercase tracking-wider text-gray-400 mb-1">Email</div>
                          <a href={`mailto:${branch.email}`} className="font-medium text-gray-900 hover:text-brand transition-colors">
                            {branch.email}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3 opacity-60">
                    <Info className="w-5 h-5 shrink-0 text-gray-400" />
                    <div className="space-y-1.5">
                      <div className="text-xs font-medium text-gray-600">{branch.company}</div>
                      <div className="text-[11px] text-gray-500 font-mono">
                        {branch.license}
                      </div>
                    </div>
                  </div>

                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
