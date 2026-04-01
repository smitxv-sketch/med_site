import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Info, ChevronRight, ArrowLeft } from 'lucide-react';
import { servicesDb } from '../../../shared/api/mocks/servicesDb';

export function ServicePage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  
  // Fetch mock data based on URL parameter
  const serviceData = serviceId ? servicesDb[serviceId] : null;

  // If service not found in our mock DB, show 404 or redirect
  if (!serviceData) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Услуга не найдена</h2>
        <p className="text-gray-600 mb-8">Возможно, раздел находится в разработке или ссылка устарела.</p>
        <Link to="/services/adult" className="text-teal-600 font-medium hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Вернуться к списку услуг
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link to="/" className="hover:text-gray-900 transition-colors">Главная</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/services/adult" className="hover:text-gray-900 transition-colors">Взрослая клиника</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{serviceData.title}</span>
      </nav>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
          {serviceData.title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          {serviceData.description}
        </p>
      </motion.div>

      {/* Clean Price List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Стоимость услуг</h2>
          <p className="text-gray-500 mt-2 text-sm">Цены носят ознакомительный характер и не являются публичной офертой.</p>
        </div>

        <div className="p-6 md:p-8 space-y-10">
          {serviceData.priceCategories.map((category, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                {category.title}
              </h3>
              <div className="flex flex-col">
                {category.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx} 
                    className="group flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors -mx-4 px-4 rounded-2xl"
                  >
                    <div className="flex-1 pr-4">
                      <h4 className="text-gray-900 font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 mt-2 sm:mt-0">
                      <span className="font-semibold text-gray-900 whitespace-nowrap">{item.price}</span>
                      <Link 
                        to="/booking" 
                        className="text-sm font-medium text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-full transition-colors whitespace-nowrap"
                      >
                        Записаться
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Informational Block */}
      {serviceData.preparationInfo && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-teal-50 rounded-3xl p-6 md:p-8 flex gap-4 items-start"
        >
          <div className="p-2 bg-teal-100 rounded-full text-teal-600 shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Как подготовиться к приему?</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {serviceData.preparationInfo}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
