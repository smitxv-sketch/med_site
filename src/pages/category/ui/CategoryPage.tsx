import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { servicesDb } from "../../../shared/api/mocks/servicesDb";
import { SERVICES_DATA } from "@/shared/constants/servicesData";
import { Card } from "@/shared/ui/Card";
import { DoctorsWidget } from "@/widgets/doctors-widget/ui/DoctorsWidget";
import { PromotionsWidget } from "@/widgets/promotions-widget/ui/PromotionsWidget";

export function CategoryPage() {
  const { categoryId } = useParams();
  const location = useLocation();

  const currentCategory = SERVICES_DATA.find((cat) => cat.id === categoryId);
  const isAdultCategory =
    categoryId === "adult" || location.pathname.includes("/adult");
  const catId = categoryId || "adult";

  // In a real app, we'd fetch the category info from Strapi.
  // For now, we hardcode the category list using our mock DB.
  const categoryServices = Object.values(servicesDb);

  const title = currentCategory
    ? currentCategory.title
    : "Направления и услуги";
  const description = currentCategory
    ? currentCategory.description
    : "Полный спектр медицинских услуг для всей семьи. Выберите нужное направление для записи к специалисту.";

  return (
    <div className="w-full pb-12 pt-2 md:pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Главная
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{title}</span>
        </nav>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            {description}
          </p>
        </motion.div>

        {/* Services List (Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
          {categoryServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/services/${catId}/${service.id}`}
                className="block h-full cursor-pointer touch-manipulation"
              >
                <Card
                  hoverable
                  className="group relative flex flex-col h-full p-6 md:p-8 overflow-hidden border-gray-100 hover:border-brand/30 transition-all duration-500 hover:shadow-xl hover:shadow-brand/5"
                >
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-brand/5 text-brand flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-brand group-hover:text-white transition-all duration-theme">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-theme" />
                  </div>

                  {/* Subtle background glow on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100 duration-500" />

                  <div className="relative z-10 flex flex-col h-full pointer-events-none">
                    {/* Decorative Dash */}
                    <div className="w-8 h-1 bg-brand/20 rounded-full mb-6 group-hover:w-12 group-hover:bg-brand transition-all duration-500 ease-out" />

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pr-12 group-hover:text-brand transition-colors leading-[1.15] tracking-tight">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-0 flex-1">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Врачи в этой категории */}
        <div className="mb-16">
          <DoctorsWidget
            directionId={isAdultCategory ? "adult" : undefined}
            limit={10}
          />
        </div>

        {/* Акции в этой категории */}
        <div>
          <PromotionsWidget
            directionId={isAdultCategory ? "adult" : undefined}
            limit={6}
          />
        </div>
      </div>
    </div>
  );
}
