import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_DATA } from '@/shared/constants/servicesData';
import { Card } from '@/shared/ui/Card';

interface ServicesMegaMenuProps {
  isTransparent?: boolean;
}

// Map string names to service IDs for the mock DB
const serviceIdMap: Record<string, string> = {
  'Гинекология и акушерство': 'gynecology',
  'Акушерство и гинекология': 'gynecology',
  'Сомнология': 'somnology',
  'Аллергология-иммунология': 'allergology',
  'Гастроэнтерология': 'gastro',
};

export function ServicesMegaMenu({ isTransparent = false }: ServicesMegaMenuProps) {
  const [activeTab, setActiveTab] = useState(SERVICES_DATA[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleServiceClick = (e: React.MouseEvent, categoryId: string, itemName: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Check if we have a mock service mapped for this item
    const mappedId = serviceIdMap[itemName];
    if (mappedId && categoryId === 'adult') {
      navigate(`/services/adult/${mappedId}`);
    } else {
      navigate(`/services/${categoryId}`);
    }
  };

  return (
    <div 
      className="flex items-center h-full"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link 
        to="/prices" 
        onClick={() => setIsOpen(false)}
        className={`text-[16px] font-medium transition-colors py-2 ${isOpen ? 'text-brand' : isTransparent ? 'text-white/90 hover:text-brand' : 'text-gray-600 hover:text-brand'}`}
      >
        Услуги и цены
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 pt-4"
            style={{ width: '100%' }}
          >
            <Card className="p-0 shadow-xl overflow-hidden flex max-h-[70vh]">
              {/* Left sidebar - Tabs */}
              <div className="w-1/3 lg:w-1/4 bg-gray-50/50 p-4 border-r border-gray-100 flex flex-col gap-1 overflow-y-auto relative">
                {SERVICES_DATA.map((category) => (
                  <button
                    key={category.id}
                    onMouseEnter={() => setActiveTab(category.id)}
                    onClick={() => {
                      setIsOpen(false);
                      navigate(`/services/${category.id}`);
                    }}
                    className={`relative text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center justify-between group ${
                      activeTab === category.id 
                        ? 'text-brand' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                    }`}
                  >
                    {activeTab === category.id && (
                      <motion.div
                        layoutId="activeTabBackground"
                        className="absolute inset-0 rounded-xl shadow-sm border border-gray-100/50"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <Card className="w-full h-full p-0 border-0 shadow-none" />
                      </motion.div>
                    )}
                    <span className="relative z-10">{category.title}</span>
                    <ChevronRight 
                      className={`w-4 h-4 relative z-10 transition-all duration-200 ${
                        activeTab === category.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`} 
                    />
                  </button>
                ))}
              </div>

              {/* Right content - Services Grid */}
              <div className="w-2/3 lg:w-3/4 p-6 lg:p-8 bg-white overflow-y-auto">
                <AnimatePresence mode="wait">
                  {SERVICES_DATA.map((category) => (
                    category.id === activeTab && (
                      <motion.div 
                        key={category.id} 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4"
                      >
                        {category.items.map((item, idx) => (
                          <a
                            key={idx}
                            href={`/services/${category.id}`}
                            onClick={(e) => handleServiceClick(e, category.id, item)}
                            className="text-sm text-gray-600 hover:text-brand transition-colors flex items-center gap-2 group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-brand transition-colors shrink-0" />
                            <span className="truncate" title={item}>{item}</span>
                          </a>
                        ))}
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
