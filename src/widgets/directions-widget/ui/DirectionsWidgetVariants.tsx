import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ArrowRight,
  Heart,
  Users,
  Baby,
  Sparkles,
  Activity,
  ClipboardList,
} from "lucide-react";
import { formatTypography } from "@/widget/utils/formatters";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";

const getIcon = (id: string, className: string) => {
  switch (id) {
    case "vrt":
      return <Heart className={className} />;
    case "adult":
      return <Users className={className} />;
    case "kids":
      return <Baby className={className} />;
    case "cosmetology":
      return <Sparkles className={className} />;
    case "ambulance":
      return <Activity className={className} />;
    case "programs":
      return <ClipboardList className={className} />;
    default:
      return <Heart className={className} />;
  }
};

const renderTags = (
  dir: any,
  isDesktop = false,
  isDarkBg = false,
  showAllServicesFor: string | null,
  setShowAllServicesFor: (id: string | null) => void,
) => {
  if (!dir.items || dir.items.length === 0) return null;
  return (
    <>
      <div className="flex flex-wrap gap-2 mt-2">
        {(showAllServicesFor === dir.id && !isDarkBg
          ? dir.items
          : dir.items.slice(0, 3)
        ).map((item: string, i: number) => (
          <span
            key={i}
            className={`inline-flex items-center px-3 py-1.5 ${isDarkBg ? "bg-white/80 backdrop-blur-sm text-gray-800 text-xs rounded-full border-gray-100 font-semibold" : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-brand transition-colors cursor-pointer text-sm rounded-xl border-gray-200 font-medium"} border`}
          >
            {item}
          </span>
        ))}
        {!isDarkBg && showAllServicesFor !== dir.id && dir.items.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowAllServicesFor(dir.id);
            }}
            className={`inline-flex items-center ${dir.iconBgLight || "bg-brand/10"} ${dir.iconColor || "text-brand"} font-medium hover:opacity-80`}
          >
            Показать ещё {dir.items.length - 3}
          </Button>
        )}
        {isDarkBg && dir.items.length > 3 && (
          <span
            className={`inline-flex items-center px-3 py-1.5 bg-white/50 backdrop-blur-sm text-gray-800 text-xs rounded-full font-semibold`}
          >
            +{dir.items.length - 3}
          </span>
        )}
      </div>
      {showAllServicesFor === dir.id && isDesktop && !isDarkBg && (
        <span
          className={`flex items-center justify-center gap-2 mt-4 text-white hover:opacity-90 ${dir.iconBgSolid || "bg-brand"} px-4 h-10 w-full`}
          style={{ borderRadius: "calc(var(--app-radius) * 0.75)" }}
        >
          <span>{dir.title}</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </span>
      )}
    </>
  );
};

export const DirectionsVariantA = ({
  directions,
  iconVariant,
  expandedId,
  setExpandedId,
  showAllServicesFor,
  setShowAllServicesFor,
}: any) => {
  return (
    <>
      <div className="md:hidden flex flex-col gap-[var(--spacing-app,16px)] sm:gap-6">
        {directions.map((dir: any, index: number) => {
          const isExpanded = expandedId === dir.id;

          if (dir.isVip) {
            return (
              <motion.div
                key={dir.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to={dir.path} className="block w-full h-full">
                  <Card
                    className={`group relative flex flex-col hover:shadow-md transition-all duration-theme border-white/40 ${dir.iconBgLight || dir.accentBg || "bg-brand/5"} p-app gap-app rounded-app`}
                  >
                    <div className="flex flex-col">
                      <h3
                        className={`text-3xl font-bold mb-3 transition-colors leading-[1.15] ${dir.iconColor || "text-brand-dark"} pr-12`}
                      >
                        {formatTypography(dir.title)}
                      </h3>
                      <p
                        className={`${dir.iconColor || "text-brand-dark"} opacity-80 text-base leading-relaxed mb-0 line-clamp-2`}
                      >
                        {formatTypography(dir.description)}
                      </p>
                    </div>

                    <div
                      className={`absolute top-6 right-6 w-10 h-10 rounded-full shadow-sm shadow-black/5 bg-white text-gray-400 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:${dir.iconBgSolid || "bg-brand"} group-hover:text-white transition-all duration-theme`}
                    >
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-theme" />
                    </div>

                    <div className="w-full aspect-[16/9] sm:aspect-[21/9] shrink-0 mt-4">
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-sm">
                        <img
                          src={dir.image}
                          referrerPolicy="no-referrer"
                          alt={dir.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={dir.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card
                className={`border ${isExpanded ? "border-brand/30 shadow-md" : "border-gray-100 shadow-sm"} transition-all duration-theme rounded-app p-0`}
              >
                <button
                  onClick={() => {
                    if (isExpanded) {
                      setExpandedId(null);
                      setShowAllServicesFor(null);
                    } else {
                      setExpandedId(dir.id);
                      setShowAllServicesFor(null);
                    }
                  }}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 shrink-0">
                      <AnimatePresence mode="wait">
                        {iconVariant === "A" && (
                          <motion.div
                            key="A"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={`absolute inset-0 rounded-2xl flex items-center justify-center ${dir.iconBgSolid}`}
                          >
                            {getIcon(dir.id, `w-6 h-6 text-white`)}
                          </motion.div>
                        )}
                        {iconVariant === "B" && (
                          <motion.div
                            key="B"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50"
                          >
                            <img
                              src={dir.image}
                              referrerPolicy="no-referrer"
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        )}
                        {iconVariant === "C" && (
                          <motion.div
                            key="C"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            {getIcon(dir.id, `w-8 h-8 ${dir.iconColor}`)}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <h3
                      className={`text-xl font-bold ${dir.textColor} leading-tight`}
                    >
                      {formatTypography(dir.title)}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0 ml-2"
                  >
                    <ChevronDown
                      className={`w-5 h-5 ${isExpanded ? dir.iconColor : "text-gray-400"}`}
                    />
                  </motion.div>
                </button>

                <div
                  className="transition-all duration-theme ease-in-out opacity-0"
                  style={{
                    display: "grid",
                    gridTemplateRows: isExpanded ? "1fr" : "0fr",
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="p-5 pt-0 flex flex-col gap-4">
                      <p className="text-gray-600 text-base leading-relaxed">
                        {formatTypography(dir.description)}
                      </p>

                      {dir.items && dir.items.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(showAllServicesFor === dir.id
                            ? dir.items
                            : dir.items.slice(0, 3)
                          ).map((item: string, i: number) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-brand transition-colors cursor-pointer text-sm rounded-xl border border-gray-200 font-medium"
                            >
                              {item}
                            </span>
                          ))}
                          {showAllServicesFor !== dir.id &&
                            dir.items.length > 3 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setShowAllServicesFor(dir.id);
                                }}
                                className={`inline-flex items-center ${dir.iconBgLight} ${dir.iconColor} font-medium hover:opacity-80`}
                              >
                                Показать ещё {dir.items.length - 3}
                              </Button>
                            )}
                        </div>
                      )}

                      {showAllServicesFor === dir.id && (
                        <span
                          className={`flex items-center justify-center gap-2 mt-4 text-white hover:opacity-90 ${dir.iconBgSolid} px-4 h-10 w-full`}
                          style={{
                            borderRadius: "calc(var(--app-radius) * 0.75)",
                          }}
                        >
                          <span>{dir.title}</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-gap,16px)] md:gap-6 lg:gap-8">
        {directions.map((dir: any, index: number) => {
          if (dir.isVip) {
            return (
              <motion.div
                key={dir.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="md:col-span-2 lg:col-span-3"
              >
                <Link to={dir.path} className="block w-full h-full">
                  <Card
                    className={`group relative flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition-all duration-theme border-white/40 ${dir.iconBgLight || dir.accentBg || "bg-brand/5"} p-app gap-app rounded-app`}
                  >
                    <div
                      className={`absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full shadow-sm shadow-black/5 bg-white text-gray-400 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:${dir.iconBgSolid || "bg-brand"} group-hover:text-white transition-all duration-theme z-10`}
                    >
                      <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-theme" />
                    </div>

                    <div className="flex flex-col flex-1 justify-center order-2 md:order-1 pr-6 md:pr-12">
                      <h3
                        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-colors leading-[1.15] tracking-tight ${dir.iconColor || "text-brand-dark"}`}
                      >
                        {formatTypography(dir.title)}
                      </h3>
                      <p
                        className={`${dir.iconColor || "text-brand-dark"} opacity-80 text-lg leading-relaxed max-w-2xl mb-0`}
                      >
                        {formatTypography(dir.description)}
                      </p>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-5/12 aspect-[4/3] md:aspect-auto md:min-h-[320px] shrink-0 order-1 md:order-2 flex flex-col">
                      <div className="relative w-full h-full flex-1 rounded-3xl overflow-hidden shadow-lg">
                        <img
                          src={dir.image}
                          referrerPolicy="no-referrer"
                          alt={dir.title}
                          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={dir.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                to={dir.path}
                className="block h-full cursor-pointer touch-manipulation"
              >
                <Card className="group flex flex-col h-full hover:shadow-xl transition-all duration-500 rounded-app overflow-hidden p-0">
                  <div className="relative w-full h-56 overflow-hidden bg-gray-50 shrink-0">
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 ${dir.accentBg}`}
                    />
                    <img
                      src={dir.image}
                      referrerPolicy="no-referrer"
                      alt={dir.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-app">
                    <h3
                      className={`text-2xl font-bold text-gray-900 mb-3 transition-colors leading-[1.15] ${dir.textColor}`}
                    >
                      {formatTypography(dir.title)}
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed mb-6">
                      {formatTypography(dir.description)}
                    </p>
                    <div className="mt-auto">
                      {renderTags(
                        dir,
                        true,
                        false,
                        showAllServicesFor,
                        setShowAllServicesFor,
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export const DirectionsVariantB = ({
  directions,
  showAllServicesFor,
  setShowAllServicesFor,
}: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-gap,16px)] auto-rows-[280px]">
      {directions.map((dir: any, index: number) => {
        const isVip = dir.isVip;
        return (
          <motion.div
            key={dir.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={
              isVip
                ? "md:col-span-2 lg:col-span-2 row-span-2"
                : "md:col-span-1 lg:col-span-2 row-span-1"
            }
          >
            <Link
              to={dir.path}
              className="group relative w-full h-full block rounded-app overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img
                src={dir.image}
                referrerPolicy="no-referrer"
                alt={dir.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3
                    className={`text-2xl ${isVip ? "md:text-4xl" : ""} font-bold text-white mb-2`}
                  >
                    {formatTypography(dir.title)}
                  </h3>
                  {isVip && (
                    <p className="text-gray-200 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-4 max-w-sm">
                      {formatTypography(dir.description)}
                    </p>
                  )}
                  <div className="opacity-0 h-0 group-hover:h-auto overflow-hidden group-hover:opacity-100 transition-all duration-300">
                    {renderTags(
                      dir,
                      false,
                      true,
                      showAllServicesFor,
                      setShowAllServicesFor,
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export const DirectionsVariantC = ({ directions }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-gap,16px)]">
      {directions.map((dir: any, index: number) => (
        <motion.div
          key={dir.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link to={dir.path} className="group block">
            <Card
              className={`relative flex items-center p-4 md:p-6 rounded-app border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ${dir.isVip ? dir.iconBgLight : "bg-white"}`}
            >
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0 ${dir.iconBgSolid || "bg-gray-100"}`}
              >
                {getIcon(dir.id, `w-7 h-7 md:w-8 md:h-8 text-white`)}
              </div>
              <div className="ml-5 flex-1 min-w-0 pr-8">
                <h3
                  className={`text-lg md:text-xl font-bold truncate ${dir.textColor || "text-gray-900"}`}
                >
                  {formatTypography(dir.title)}
                </h3>
                <p className="text-sm md:text-base text-gray-500 truncate mt-1">
                  {formatTypography(dir.description)}
                </p>
              </div>
              <div className="shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all">
                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export const DirectionsVariantD = ({ directions }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {directions.map((dir: any, index: number) => (
        <motion.div
          key={dir.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={dir.isVip ? "md:col-span-2" : "col-span-1"}
        >
          <Card className="h-full flex flex-col p-0 overflow-hidden group hover:shadow-xl transition-shadow duration-300 border-gray-100">
            <div className="relative h-48 overflow-hidden">
              <img
                src={dir.image}
                referrerPolicy="no-referrer"
                alt={dir.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-sm">
                  {formatTypography(dir.title)}
                </h3>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1 bg-white">
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {formatTypography(dir.description)}
              </p>

              {dir.items && dir.items.length > 0 && (
                <div className="mt-auto">
                  <ul className="space-y-2 mb-4">
                    {dir.items
                      .slice(0, dir.isVip ? 5 : 3)
                      .map((item: string, i: number) => (
                        <li
                          key={i}
                          className="text-sm text-gray-700 flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-brand/40 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                  </ul>
                  <Button
                    as={Link}
                    to={dir.path}
                    variant="ghost"
                    className="w-full text-brand justify-center font-medium bg-brand/5 hover:bg-brand/10"
                  >
                    Перейти в отделение
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export const DirectionsRegistry = {
  A: DirectionsVariantA,
  B: DirectionsVariantB,
  C: DirectionsVariantC,
  D: DirectionsVariantD,
};
