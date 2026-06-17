import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, Phone, X, User, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDoctorsRepository } from "@/shared/di/DIContext";
import { Doctor } from "@/widget/types";
import { Link } from "react-router-dom";
import { useMobileMenuStore } from "../model/useMobileMenuStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const menuItems = [
  {
    title: "Услуги и цены",
    path: "/prices",
    children: [
      { title: "Взрослая клиника", path: "/services/adult" },
      { title: "Детская клиника", path: "/services/kids" },
      { title: "ВРТ (Центр ЭКО)", path: "/services/vrt" },
      { title: "Косметология", path: "/services/cosmetology" },
      { title: "Скорая помощь", path: "/services/ambulance" },
      { title: "Комплексные программы", path: "/services/programs" },
    ],
  },
  { title: "Врачи", path: "/doctors" },
  { title: "Акции", path: "/promotions" },
  {
    title: "О клинике",
    path: "/about",
    children: [
      { title: "О нас", path: "/about" },
      { title: "Новости и статьи", path: "/news" },
      { title: "Вакансии", path: "/vacancies" },
      { title: "Контакты", path: "/contacts" },
    ],
  },
];

export function MobileMenu() {
  const { isOpen, closeMenu, openMenu } = useMobileMenuStore();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const doctorsRepository = useDoctorsRepository();

  const { data: doctors, isLoading } = useQuery<Doctor[]>({
    queryKey: ['doctors'],
    queryFn: () => doctorsRepository.getAllDoctors(),
    enabled: isSearchExpanded,
  });

  const filteredDoctors = React.useMemo(() => {
    if (!searchQuery.trim() || !doctors) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return doctors.filter((d: any) => 
      d.name.toLowerCase().includes(lowerQuery) || 
      (d.specialty && d.specialty.toLowerCase().includes(lowerQuery))
    ).slice(0, 5);
  }, [searchQuery, doctors]);

  const toggleExpand = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedItem(expandedItem === title ? null : title);
  };

  return (
    <>
      <Sheet
        open={isOpen}
        onOpenChange={(open) => (open ? openMenu() : closeMenu())}
      >
        <SheetContent
          side="right"
          className="w-[85vw] max-w-sm flex flex-col p-0 bg-white border-0 overflow-hidden hide-scrollbar"
          showCloseButton={false}
        >
          {/* Header */}
                    {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between p-5 border-b border-gray-100/50 space-y-0 text-left min-h-[72px] relative">
            <AnimatePresence initial={false} mode="wait">
              {isSearchExpanded ? (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, width: '0%' }}
                  animate={{ opacity: 1, width: '100%' }}
                  exit={{ opacity: 0, width: '0%' }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex items-center gap-2 overflow-hidden w-full"
                >
                  <div className="flex-1 relative flex items-center bg-gray-100 rounded-full overflow-hidden">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3" />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Поиск врачей, услуг..."
                      className="w-full bg-transparent pl-9 pr-4 py-2 text-[15px] outline-none placeholder:-translate-y-px placeholder:text-gray-400 focus:ring-2 focus:ring-brand/50 h-10"
                    />
                  </div>
                  <button
                    onClick={() => { setIsSearchExpanded(false); setSearchQuery(''); }}
                    className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between w-full"
                >
                  <SheetTitle className="font-extrabold text-2xl text-gray-900 tracking-tight m-0">
                    Меню
                  </SheetTitle>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsSearchExpanded(true)}
                      className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      aria-label="Поиск по сайту"
                    >
                      <Search className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={closeMenu}
                      className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      aria-label="Закрыть меню"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </SheetHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col bg-gray-50/40 relative">
            
            {isSearchExpanded ? (
              <div className="absolute inset-0 bg-white z-10 overflow-y-auto w-full p-4">
                {searchQuery.trim() === '' ? (
                  <div className="flex flex-col items-center justify-center pt-8 opacity-60 px-4 text-center">
                    <Search className="w-10 h-10 text-gray-300 mb-3" />
                    <p className="text-sm text-gray-500">Хотите быстро найти специалиста или услугу?</p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {['Терапевт', 'УЗИ', 'Анализы'].map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-3 py-1.5 bg-gray-100/80 hover:bg-gray-200 text-gray-600 rounded-full text-[13px] font-medium transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : isLoading ? (
                  <div className="flex justify-center p-8">
                    <Loader2 className="w-6 h-6 text-brand animate-spin" />
                  </div>
                ) : filteredDoctors.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    <div className="px-2 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Врачи
                    </div>
                    {filteredDoctors.map((doctor: any) => (
                      <button
                        key={doctor.id}
                        onClick={() => { closeMenu(); navigate('/doctors'); }}
                        className="w-full p-3 bg-white border border-gray-100 rounded-2xl flex items-center gap-3 active:scale-[0.98] transition-all shadow-sm mb-2 text-left"
                      >
                        {doctor.image ? (
                          <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-gray-50" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-brand/5 flex items-center justify-center text-brand shrink-0 ring-2 ring-gray-50">
                            <User className="w-5 h-5" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 text-[15px] truncate">{doctor.name}</div>
                          <div className="text-[13px] text-gray-500 truncate mt-0.5">{doctor.specialty}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 shrink-0 ml-1" />
                      </button>
                    ))}
                    <button 
                      onClick={() => { closeMenu(); navigate('/doctors'); }}
                      className="w-full p-3 mt-2 text-[14px] text-brand font-semibold text-center hover:bg-brand/5 active:bg-brand/10 transition-colors rounded-xl"
                    >
                      Показать всех
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center p-10 text-center opacity-60">
                    <p className="text-[15px] text-gray-500">По запросу «{searchQuery}» ничего не найдено</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col flex-1 pb-safe">
                <nav className="p-4 flex-1">
              <div className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {menuItems.map((item, index) => (
                  <div
                    key={item.title}
                    className={`overflow-hidden ${index !== menuItems.length - 1 ? "border-b border-gray-50" : ""}`}
                  >
                    <div className="flex items-stretch min-h-[56px]">
                      <Link
                        to={item.path}
                        onClick={closeMenu}
                        className="flex-1 py-3 px-4 font-bold text-[17px] text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center focus-visible:outline-none focus-visible:bg-gray-50"
                      >
                        {item.title}
                      </Link>

                      {item.children && (
                        <button
                          onClick={(e) => toggleExpand(item.title, e)}
                          className="px-4 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors border-l border-transparent hover:border-gray-50 focus-visible:outline-none focus-visible:bg-gray-50"
                          aria-expanded={expandedItem === item.title}
                          aria-label={
                            expandedItem === item.title
                              ? "Свернуть"
                              : "Развернуть"
                          }
                        >
                          <motion.div
                            animate={{
                              rotate: expandedItem === item.title ? 90 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight
                              className={`w-5 h-5 ${expandedItem === item.title ? "text-brand" : "text-gray-400"}`}
                            />
                          </motion.div>
                        </button>
                      )}
                    </div>

                    {/* Accordion Content via Framer Motion */}
                    <AnimatePresence>
                      {item.children && expandedItem === item.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <div className="pb-3 pt-1 px-4 ml-4">
                            <div className="space-y-0.5 border-l-2 border-brand/20 pl-4 py-1.5">
                              {item.children.map((child) => (
                                <Link
                                  key={child.title}
                                  to={child.path}
                                  onClick={closeMenu}
                                  className="block py-2.5 px-3 text-[16px] font-medium text-gray-600 hover:text-brand active:bg-brand/5 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                                >
                                  {child.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </nav>

            {/* Contact Info Footer w/ Safe Area & ZLS pattern */}
            <div className="p-4 bg-white/90 backdrop-blur-xl border-t border-gray-100 mt-auto flex flex-col gap-3 pb-safe">
              <Link
                to="/booking"
                onClick={closeMenu}
                className="flex items-center justify-center w-full py-3.5 bg-brand text-brand-fg font-bold rounded-xl text-[17px] shadow-sm active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                Записаться на прием
              </Link>
              <a
                href="tel:+73517788887"
                className="flex items-center justify-center gap-3 w-full p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-brand/30 hover:bg-brand/5 active:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <div className="w-10 h-10 bg-white shadow-sm text-brand rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-gray-900 font-extrabold text-[19px] tracking-tight whitespace-nowrap">
                  +7 (351) 778-88-87
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </SheetContent>
      </Sheet>
    </>
  );
}
