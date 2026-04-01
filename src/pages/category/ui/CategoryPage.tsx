import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Stethoscope, Wind, Activity } from 'lucide-react';
import { servicesDb } from '../../../shared/api/mocks/servicesDb';

// Map icon names to actual Lucide components for the mock
const iconMap: Record<string, React.ElementType> = {
  'somnology': Wind,
  'allergology': Activity,
  'gastro': Stethoscope,
};

export function CategoryPage() {
  // In a real app, we'd fetch the category info from Strapi.
  // For now, we hardcode the "Adult Clinic" category list using our mock DB.
  const categoryServices = Object.values(servicesDb);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link to="/" className="hover:text-gray-900 transition-colors">Главная</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Взрослая клиника</span>
      </nav>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
          Взрослая клиника
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          Выберите необходимое направление. Наши специалисты используют современные методы диагностики и лечения, основанные на доказательной медицине.
        </p>
      </motion.div>

      {/* Services List (Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {categoryServices.map((service, index) => {
          const Icon = iconMap[service.id] || Stethoscope;
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={`/services/adult/${service.id}`}
                className="group flex flex-col h-full bg-white border border-gray-100 rounded-3xl p-6 md:p-8 hover:shadow-lg hover:border-teal-100 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>
                
                <div className="flex items-center text-teal-600 font-medium text-sm mt-auto">
                  <span>Смотреть цены и услуги</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
