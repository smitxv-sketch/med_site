import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Phone, MapPin, Clock } from 'lucide-react';
import { useMobileMenuStore } from '../model/useMobileMenuStore';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    title: 'Взрослая клиника',
    path: '/services/adult',
    children: [
      { title: 'Сомнология', path: '/services/adult/somnology' },
      { title: 'Аллергология', path: '/services/adult/allergology' },
      { title: 'Гастроэнтерология', path: '/services/adult/gastro' },
    ]
  },
  {
    title: 'Детская клиника',
    path: '/services/kids',
    children: [
      { title: 'Педиатрия', path: '/services/kids/pediatrics' },
      { title: 'Вакцинация', path: '/services/kids/vaccination' },
    ]
  },
  { title: 'Врачи', path: '/doctors' },
  { title: 'Акции', path: '/promotions' },
  { title: 'О клинике', path: '/about' },
];

export function MobileMenu() {
  const { isOpen, closeMenu } = useMobileMenuStore();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedItem(expandedItem === title ? null : title);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 shadow-2xl flex flex-col md:hidden overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-xl text-gray-900">Меню</span>
              <button 
                onClick={closeMenu}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-gray-50 overflow-hidden">
                    <div className="flex items-center">
                      {/* Primary Action (Go to page) */}
                      <Link 
                        to={item.path}
                        onClick={closeMenu}
                        className="flex-1 py-4 pl-5 font-semibold text-gray-900 active:bg-gray-100 transition-colors"
                      >
                        {item.title}
                      </Link>
                      
                      {/* Secondary Action (Expand accordion) */}
                      {item.children && (
                        <button 
                          onClick={(e) => toggleExpand(item.title, e)}
                          className="p-4 active:bg-gray-100 transition-colors border-l border-gray-200/50"
                        >
                          <motion.div
                            animate={{ rotate: expandedItem === item.title ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        </button>
                      )}
                    </div>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {item.children && expandedItem === item.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-white"
                        >
                          <div className="py-2 px-4 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.title}
                                to={child.path}
                                onClick={closeMenu}
                                className="block py-3 px-4 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {/* Contact Info Footer */}
              <div className="p-6 mt-4 border-t border-gray-100 space-y-4">
                <a href="tel:+78000000000" className="flex items-center gap-3 text-gray-900 font-bold text-lg">
                  <div className="p-2 bg-teal-100 text-teal-600 rounded-full">
                    <Phone className="w-5 h-5" />
                  </div>
                  8 (800) 000-00-00
                </a>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  г. Челябинск, ул. Примерная, 123
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <Clock className="w-5 h-5 text-gray-400" />
                  Ежедневно с 8:00 до 20:00
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
