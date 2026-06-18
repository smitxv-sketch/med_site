import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  Info,
  ChevronRight,
  ArrowLeft,
  Star,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import { servicesDb } from "../../../shared/api/mocks/servicesDb";
import { ExpandableList } from "../../../shared/ui/ExpandableList";
import { VariantSelector } from "../../../shared/ui/VariantSelector";
import { useUISettingsStore } from "../../../shared/store/uiSettingsStore";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { DoctorsWidget } from "@/widgets/doctors-widget/ui/DoctorsWidget";

const renderPlatformBadge = (platform?: string) => {
  switch (platform) {
    case "yandex":
      return (
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white font-bold text-xs"
          title="Яндекс Карты"
        >
          Я
        </span>
      );
    case "prodoctorov":
      return (
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs"
          title="ПроДокторов"
        >
          ПД
        </span>
      );
    case "2gis":
      return (
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white font-bold text-xs"
          title="2GIS"
        >
          2Г
        </span>
      );
    case "google":
      return (
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-200 text-blue-600 font-bold text-xs"
          title="Google Maps"
        >
          G
        </span>
      );
    default:
      return null;
  }
};

export function ServicePage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const isDevMode = useUISettingsStore((state) => state.isDevMode);

  // D = Pro Clinic (С сайдбаром), E = Упрощенный (Без сайдбара), F = Классический (с отзывами)
  const [heroMode, setHeroMode] = useState<"D" | "E" | "F">("F");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState<string>("about");

  const activeHeroMode = heroMode;

  // Fetch mock data based on URL parameter
  const serviceData = serviceId ? servicesDb[serviceId] : null;

  // Intersection Observer for sticky nav highlighting
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -50% 0px" },
    );

    const sections = ["about", "prices", "doctors", "reviews", "articles", "faq"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [serviceData]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // If service not found in our mock DB, show 404 or redirect
  if (!serviceData) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Услуга не найдена
        </h2>
        <p className="text-gray-600 mb-8">
          Возможно, раздел находится в разработке или ссылка устарела.
        </p>
        <Link
          to="/services/adult"
          className="text-teal-600 font-medium hover:underline inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Вернуться к списку услуг
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pb-28 sm:pb-8 pt-6 md:pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 pt-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900 transition-colors">
              Главная
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <Link
              to="/services/adult"
              className="hover:text-gray-900 transition-colors"
            >
              Взрослая клиника
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <span className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-none">
              {serviceData.title}
            </span>
          </nav>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 relative"
        >
          <VariantSelector
            variants={[
              { id: "D", label: "С сайдбаром" },
              { id: "E", label: "Одна колонка" },
              { id: "F", label: "С отзывами вначале" },
            ]}
            currentVariant={heroMode}
            onVariantChange={(id) => setHeroMode(id as "D" | "E" | "F")}
            forceShow={true}
          />

          <div
            className={`grid grid-cols-1 gap-6 relative ${activeHeroMode === "D" ? "lg:grid-cols-4 lg:gap-8 xl:gap-12" : ""}`}
            id="about"
          >
            {/* Left Sidebar Layout */}
            {activeHeroMode === "D" && (
              <div className="hidden lg:block col-span-1">
                <div className="sticky top-24 bg-teal-50/30 rounded-2xl p-4 border border-teal-100">
                  <div className="text-sm font-bold text-teal-900 mb-4 px-2 uppercase tracking-wider">
                    Направления
                  </div>
                  <ul className="space-y-1 mb-8">
                    <li>
                      <button className="w-full text-left px-3 py-2 rounded-lg text-sm bg-white font-semibold text-teal-700 shadow-sm border border-teal-100">
                        {serviceData.title}
                      </button>
                    </li>
                    {serviceData.subDirections?.map((dir, idx) => (
                      <li key={idx}>
                        <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-teal-600 transition-colors">
                          {dir}
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Promo Banner inside Sidebar */}
                  <div className="bg-gradient-to-br from-brand/10 to-brand/5 rounded-xl p-4 border border-brand/20 mb-6">
                    <div className="text-xs font-bold text-brand uppercase tracking-wider mb-2">Акция</div>
                    <div className="font-semibold text-gray-900 text-sm mb-2 leading-tight">Скидка 15% на первичный приём при записи онлайн</div>
                    <Button as={Link} to="/promotions" variant="outline" size="sm" className="w-full text-xs bg-white border-brand/30 text-brand py-1.5 h-8">
                      Подробнее
                    </Button>
                  </div>

                  {/* Quick Helps */}
                  <div className="px-2">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Запись на приём</div>
                    <a href="tel:+73517788887" className="block text-lg font-bold text-gray-900 hover:text-brand transition-colors mb-1">
                      +7 (351) 778-88-87
                    </a>
                    <div className="text-xs text-gray-500 mb-4">Ежедневно с 8:00 до 20:00</div>
                    <Button as={Link} to="/booking" variant="primary" className="w-full text-sm py-2 h-10 shadow-sm shadow-brand/20">
                      Записаться онлайн
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {(activeHeroMode === "D" || activeHeroMode === "E") && (
              <div className={`${activeHeroMode === "D" ? "lg:col-span-3" : "w-full"} flex flex-col min-h-[calc(100svh-80px)] lg:min-h-0`}>
                <div className="flex-1 bg-gradient-to-r from-teal-50 to-emerald-50 sm:rounded-app -mx-4 sm:mx-0 overflow-hidden relative sm:shadow-sm sm:border border-teal-100 mb-6 flex flex-col md:block">
                    <div className="flex-1 flex flex-col md:grid md:grid-cols-2 lg:items-center h-full">
                      <div className="p-5 sm:p-10 relative z-10 flex flex-col justify-center order-2 md:order-1 flex-1 md:flex-none">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-900 tracking-tight leading-[1.15] mb-4">
                          {serviceData.title}
                        </h1>
                        <p className="text-base md:text-lg text-teal-800/80 leading-relaxed font-medium mb-6 md:mb-8 line-clamp-4 md:line-clamp-none">
                          {serviceData.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 relative z-20 mt-auto md:mt-0">
                          <Button
                            as={Link}
                            to="/booking"
                            variant="primary"
                            size="lg"
                            className="w-full sm:w-auto shadow-lg shadow-teal-500/25"
                          >
                            Записаться онлайн
                          </Button>
                        </div>
                      </div>
                      <div className="relative aspect-[4/3] md:aspect-auto md:h-full order-1 md:order-2 shrink-0 md:shrink">
                        {serviceData.heroImage && (
                          <img
                            src={serviceData.heroImage}
                            alt="Врачи"
                            className="absolute inset-0 w-full h-full object-cover md:rounded-l-[3rem] shadow-2xl"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-emerald-50/90 via-emerald-50/40 md:via-teal-50/20 to-transparent md:bg-none" />
                      </div>
                    </div>
                  </div>
              </div>
            )}

            {activeHeroMode === "F" && (
              <div className="w-full pt-4 sm:pt-6 mb-8">
                <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-extrabold text-[#1a1a1a] tracking-tight leading-[1.1] mb-6 sm:mb-10">
                  {serviceData.title}
                </h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                  {/* Left Column: Text & CTA */}
                  <div className="lg:col-span-7 flex flex-col">
                      <p className="text-base sm:text-[17px] text-gray-600 leading-[1.6] mb-5">
                        {serviceData.description}
                      </p>
                      <p className="text-base sm:text-[17px] text-gray-600 leading-[1.6] mb-8">
                        В нашей клинике любая женщина найдет своего врача гинеколога под любую из своих задач и для любого периода. Прием женщин ведут врачи с детского возраста и до постклиматерического периода. На всем протяжении жизни, на любом ее этапе - наши гинекологи рядом.
                      </p>
                      <div className="pt-2">
                        <Button
                          as={Link}
                          to="/booking"
                          className="w-full sm:w-auto font-bold uppercase tracking-wide bg-[#3e9f3e] hover:bg-[#348834] active:bg-[#2d762d] text-white border-transparent text-[13px] px-8 py-3 rounded-sm shadow-sm transition-colors duration-200"
                        >
                          ЗАПИСАТЬСЯ
                        </Button>
                      </div>
                  </div>
                  
                  {/* Right Column: Stats & Reviews ratings */}
                  <div className="lg:col-span-5 flex flex-col lg:pl-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4 mb-8">
                        <div className="flex flex-col gap-1 text-center sm:text-left">
                          <div className="text-[44px] leading-none font-bold text-[#1a1a1a] mb-1">5.0</div>
                          <div className="text-[15px] sm:text-[13px] text-[#1a1a1a] font-medium leading-[1.3] max-w-[150px] mx-auto sm:mx-0">
                            На основе более<br/>2534 отзывов
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 text-center sm:text-left">
                          <div className="text-[44px] leading-none font-bold text-[#1a1a1a] mb-1">5.0</div>
                          <div className="text-[15px] sm:text-[13px] text-[#1a1a1a] font-medium leading-[1.3] max-w-[150px] mx-auto sm:mx-0">
                            Средний рейтинг<br/>врачей на <span className="text-[#005bff]">prodoctorov</span>
                          </div>
                        </div>
                    </div>

                    <div className="mt-auto bg-gray-50 rounded-xl p-4 flex flex-wrap lg:flex-nowrap items-center justify-center sm:justify-between gap-4 border border-gray-100">
                      <div className="flex items-center gap-2 border-r border-gray-200 pr-4 last:border-0 last:pr-0">
                          {renderPlatformBadge("yandex")} <span className="text-[13px] text-gray-700 font-semibold ml-1">Карты</span> <span className="font-extrabold text-[#1a1a1a] ml-1">5.0</span>
                      </div>
                      <div className="flex items-center gap-2 border-r border-gray-200 pr-4 last:border-0 last:pr-0">
                          {renderPlatformBadge("2gis")} <span className="text-[13px] text-gray-700 font-semibold ml-1">2GIS</span> <span className="font-extrabold text-[#1a1a1a] ml-1">4.8</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <span className="text-[#005bff] font-bold text-[13px] ml-1">prodoctorov</span> <span className="font-extrabold text-[#1a1a1a] ml-1">5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

          {/* Sticky In-Page Navigation (Pill Menu) */}
        <div className="sticky top-16 md:top-20 z-40 bg-white/80 backdrop-blur-md py-3 md:py-4 mb-8 border-b border-gray-100 -mx-4 px-4 md:mx-0 overflow-x-auto hide-scrollbar">
          <div className="flex items-center gap-2 min-w-max md:justify-center md:min-w-0">
            {["about", "prices", "doctors", "reviews", "articles", "faq"].map(
              (section) => {
                const labels: Record<string, string> = {
                  about: "Об услуге",
                  prices: "Услуги и цены",
                  doctors: "Врачи",
                  reviews: "Отзывы",
                  articles: "Статьи",
                  faq: "Подробнее",
                };

                return (
                  <button
                    key={section}
                    onClick={() => scrollTo(section)}
                    className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                      activeSection === section
                        ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
                        : "bg-white text-gray-600 hover:bg-teal-50 hover:text-teal-800 border border-gray-200"
                    }`}
                  >
                    {labels[section]}
                  </button>
                );
              },
            )}
          </div>
        </div>

        {/* Rest of the content */}
        <div className={activeHeroMode === "D" ? "lg:pl-[25%]" : ""}>

          {/* Price List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 pt-10"
            id="prices"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Стоимость услуг
                </h2>
                <p className="text-gray-500 max-w-2xl">
                  Цены носят ознакомительный характер и не являются публичной
                  офертой.
                </p>
              </div>
              {/* Embedded Search Simulation */}
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Поиск по услугам..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>

            {serviceData.subDirections && (
              <div className="flex flex-wrap items-center gap-2 mb-8 mt-2">
                <button className="px-5 py-2.5 rounded-full text-sm font-semibold bg-teal-700 text-white shadow-md shadow-teal-700/20 transition-colors">
                  {serviceData.title}
                </button>
                {serviceData.subDirections.map((dir, idx) => (
                  <button key={idx} className="px-5 py-2.5 rounded-full text-sm font-medium bg-white text-gray-600 hover:bg-teal-50 hover:text-teal-800 border border-gray-200 transition-colors">
                     {dir}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-6">
              {serviceData.priceCategories?.map((category, idx) => (
                <ExpandableList
                  key={idx}
                  title={category.title}
                  items={category.items}
                  initialCount={2}
                  keyExtractor={(item, index) => `${item.name}-${index}`}
                  renderItem={(item, itemIdx, isLast) => (
                    <div
                      className={`p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors ${!isLast ? "border-b border-gray-100" : ""}`}
                    >
                      <div className="flex-1 pr-0 sm:pr-4">
                        <h4 className="text-gray-900 font-medium text-base sm:text-lg">
                          {item.name}
                        </h4>
                        {item.desc && (
                          <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                            {item.desc}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 shrink-0 pt-2 sm:pt-0">
                        <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
                          {item.price}
                        </span>
                        <Button
                          as={Link}
                          to="/booking"
                          variant="secondary"
                          size="sm"
                          className="whitespace-nowrap"
                        >
                          Записаться
                        </Button>
                      </div>
                    </div>
                  )}
                />
              ))}
            </div>
          </motion.div>

          {/* Informational Block */}
          {serviceData.preparationInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12"
              id="about-prep"
            >
              <Card className="bg-amber-50/50 border-amber-100 p-6 sm:p-8 flex gap-4 sm:gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <span className="text-2xl pt-1">⚠️</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Как подготовиться к приёму?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {serviceData.preparationInfo}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Doctors Section */}
          <div id="doctors" className="pt-10 mt-10">
            <DoctorsWidget 
              directionId={serviceId} 
              title="Врачи направления"
              subtitle="Опытные специалисты высшей категории"
              limit={10} 
            />
          </div>

          {/* Reviews Section */}
          {serviceData.reviews && serviceData.reviews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 sm:mt-24 pt-10"
              id="reviews"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10">
                Отзывы пациентов
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Rating Summary */}
                {serviceData.rating && (
                  <Card className="bg-gray-50/50 p-8 flex flex-col items-center justify-center text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-4">
                      {serviceData.rating.score.toFixed(1)} из 5
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-6 h-6 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      На основе {serviceData.rating.count} оценок
                    </div>
                    <Button variant="primary" fullWidth className="mt-8">
                      ОСТАВИТЬ ОТЗЫВ
                    </Button>
                  </Card>
                )}

                {/* Review Cards */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {serviceData.reviews.map((review) => (
                    <Card key={review.id} className="p-6 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="font-bold text-gray-900">
                            {review.author}
                          </div>
                          <div className="text-sm text-gray-500 mt-0.5">
                            {review.date}
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                        {review.text}
                      </p>
                      {review.source && (
                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                          <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                            {review.source}
                          </div>
                          {renderPlatformBadge(review.platform)}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Articles Section */}
          {serviceData.articles && serviceData.articles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 sm:mt-24 pt-10"
              id="articles"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Полезные статьи врачей
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceData.articles?.map((article) => (
                  <Card
                    key={article.id}
                    as={Link}
                    to={article.link}
                    hoverable
                    className="group relative overflow-hidden aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] block p-0"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/40 to-transparent" />
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 pr-8">
                        {article.title}
                      </h3>
                      <p className="text-teal-50 text-sm sm:text-base line-clamp-3 mb-0">
                        {article.excerpt}
                      </p>

                      {/* Subtle Top-Right Arrow for Interaction */}
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-white group-hover:text-teal-900 transition-all duration-theme">
                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-theme" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* SEO Text Blocks */}
          {serviceData.seoBlocks && serviceData.seoBlocks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 sm:mt-24 space-y-12"
            >
              {serviceData.seoBlocks.map((block, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    {block.title}
                  </h2>
                  <div className="prose prose-teal max-w-none">
                    {block.content.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-gray-600 leading-relaxed mb-4"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* FAQ Section */}
          {serviceData.faq && serviceData.faq.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-16 sm:mt-24 pt-10"
              id="faq"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10">
                Ответы на часто задаваемые вопросы
              </h2>
              <div className="space-y-4">
                {serviceData.faq.map((item, idx) => (
                  <Card key={idx} className="overflow-hidden p-0">
                    <button
                      onClick={() =>
                        setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                      }
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="text-lg font-medium text-gray-900 pr-4">
                        {item.question}
                      </span>
                      <span
                        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${openFaqIndex === idx ? "bg-teal-50 text-teal-600" : "bg-gray-50 text-gray-400"}`}
                      >
                        {openFaqIndex === idx ? (
                          <Minus className="w-5 h-5" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                      </span>
                    </button>
                    <AnimatePresence>
                      {openFaqIndex === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 sm:mt-24"
          >
            <Card className="bg-gray-50/50 p-8 sm:p-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
                  Есть вопросы или хотите записаться через оператора?
                </h2>
                <p className="text-gray-600 text-center mb-10 text-lg">
                  Оставьте заявку и телефон и мы подробно ответим на ваши
                  вопросы.
                </p>

                <form
                  className="space-y-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Иванов Иван"
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="+7 (999) 999-99-99"
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      ЗАКАЗАТЬ ЗВОНОК
                    </Button>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-start mt-1">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          defaultChecked
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-teal-500 peer-checked:border-teal-500 transition-colors"></div>
                        <svg
                          className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-500 leading-tight group-hover:text-gray-700 transition-colors">
                        Нажимая на кнопку, Вы даете согласие на{" "}
                        <a href="#" className="text-teal-600 hover:underline">
                          обработку своих персональных данных
                        </a>
                      </span>
                    </label>
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Contextual Action Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] z-50 md:hidden pb-safe flex items-center justify-between gap-4">
        <div className="flex flex-col pl-2">
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
            Приём от
          </span>
          <span className="text-lg font-black text-gray-900 leading-none mt-1">
            {serviceData.priceCategories[0]?.items[0]?.price || "1 500 ₽"}
          </span>
        </div>
        <Button
          as={Link}
          to="/booking"
          variant="primary"
          className="flex-1 shadow-lg shadow-teal-500/25 py-3"
        >
          Записаться
        </Button>
      </div>
    </div>
  );
}
