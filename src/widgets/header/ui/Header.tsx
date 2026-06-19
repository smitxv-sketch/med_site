import React, { useState, useEffect } from "react";
import { Menu, Phone, Search, User, MapPin } from "lucide-react";
import { useMobileMenuStore } from "../../mobile-menu/model/useMobileMenuStore";
import { Link, useLocation } from "react-router-dom";
import { ServicesMegaMenu } from "./ServicesMegaMenu";
import { useUISettingsStore } from "@/shared/store/uiSettingsStore";
import { Button } from "@/shared/ui/Button";
import { Container } from '@/shared/ui/Container';

export function Header() {
  const { openMenu } = useMobileMenuStore();
  const { homePageConcept, heroMobileVariant } = useUISettingsStore();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  // Прозрачный хедер только для fullscreen mobile (E)
  const isImmersive = isHome && isMobile && heroMobileVariant === 'E';
  const isTransparent = isImmersive && !scrolled;

  const headerSurfaceClass = isTransparent
    ? "bg-white/10 backdrop-blur-md border border-white/10 shadow-none"
    : [
        "bg-white/90 backdrop-blur-lg border border-gray-100/80 shadow-sm",
        "md:bg-white/45 md:backdrop-blur-2xl md:backdrop-saturate-150",
        "md:border-white/55 md:shadow-[0_8px_32px_-8px_rgba(15,23,42,0.12)]",
        "md:ring-1 md:ring-inset md:ring-white/50",
      ].join(" ");

  const headerIconButtonClass = isTransparent
    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
    : [
        "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200",
        "md:bg-white/35 md:hover:bg-white/55 md:text-gray-700 md:border-white/45",
        "md:backdrop-blur-md md:shadow-sm",
      ].join(" ");

  const headerGhostButtonClass = isTransparent
    ? "text-white hover:bg-white/20"
    : "text-gray-600 hover:bg-gray-100 md:hover:bg-white/45 md:backdrop-blur-sm";

  return (
    <>
      {/* Gradient blur backdrop for smooth transition - hide in immersive transparent mode */}
      <div
        className={`fixed top-0 left-0 right-0 h-20 sm:h-24 z-30 pointer-events-none transition-opacity duration-theme ${
          isTransparent
            ? "opacity-0"
            : "opacity-100 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] bg-white/40 md:bg-white/25 md:backdrop-blur-2xl md:backdrop-saturate-150"
        }`}
      />

      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none flex justify-center">
        <Container className="pt-2 sm:pt-3">
          <header
            className={`w-full transition-all duration-theme pointer-events-auto rounded-2xl ${headerSurfaceClass}`}
          >
            <div className="flex items-center justify-between px-4 py-3 relative">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5">
                <img
                  src="/logo-icon.png"
                  alt="Логотип"
                  className="w-[30px] h-[30px] object-contain"
                />
                <div className="flex flex-col justify-center w-max">
                  <span
                    className={`font-black text-[19px] leading-none tracking-wide transition-colors ${isTransparent ? "text-white" : "text-[#2C2C2C]"}`}
                  >
                    ИСТОЧНИК
                  </span>
                  <div className="flex justify-between w-full mt-[3px]">
                    {"КЛИНИКА".split("").map((letter, i) => (
                      <span
                        key={i}
                        className={`font-bold text-[7.5px] leading-none transition-colors ${isTransparent ? "text-white/90" : "text-[#2C2C2C]"}`}
                        style={{ textShadow: "0px 0px 1px rgba(0,0,0,0.1)" }}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>

              {/* Desktop Nav (Hidden on mobile) */}
              <div className="hidden md:flex items-center ml-4 mr-2">
                <button
                  onClick={() =>
                    useUISettingsStore.getState().setIsCitySelectorOpen(true)
                  }
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${headerIconButtonClass}`}
                  aria-label="Выбрать город"
                >
                  <MapPin className="w-4 h-4" />
                </button>
              </div>
              <nav className="hidden md:flex items-center gap-6 h-full">
                <ServicesMegaMenu isTransparent={isTransparent} />
                <Link
                  to="/doctors"
                  className={`text-[16px] font-medium transition-colors hover:text-brand ${isTransparent ? "text-white/90" : "text-gray-600"}`}
                >
                  Врачи
                </Link>
                <Link
                  to="/promotions"
                  className={`text-[16px] font-medium transition-colors hover:text-brand ${isTransparent ? "text-white/90" : "text-gray-600"}`}
                >
                  Акции
                </Link>
                <Link
                  to="/about"
                  className={`text-[16px] font-medium transition-colors hover:text-brand ${isTransparent ? "text-white/90" : "text-gray-600"}`}
                >
                  О клинике
                </Link>
                <Link
                  to="/contacts"
                  className={`text-[16px] font-medium transition-colors hover:text-brand ${isTransparent ? "text-white/90" : "text-gray-600"}`}
                >
                  Контакты
                </Link>
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="tel:+73517788887"
                  className={`text-[16px] font-bold transition-colors hidden lg:block mr-2 hover:text-brand ${isTransparent ? "text-white" : "text-gray-700"}`}
                >
                  +7 (351) 778-88-87
                </a>

                <Button
                  as={Link}
                  to="/booking"
                  variant="primary"
                  size="sm"
                  className="hidden md:inline-flex"
                >
                  Записаться
                </Button>

                <button
                  onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
                  className={`p-2 rounded-full transition-colors flex items-center gap-1.5 ${headerGhostButtonClass}`}
                >
                  <Search className="w-5 h-5" />
                </button>
                <Link
                  to="/profile"
                  className={`p-2 rounded-full transition-colors hidden sm:block ${headerGhostButtonClass}`}
                >
                  <User className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+73517788887"
                  className={`p-2 rounded-full transition-colors lg:hidden ${isTransparent ? "text-white bg-white/20 hover:bg-white/30" : "text-brand bg-brand/10 hover:bg-brand/20"}`}
                >
                  <Phone className="w-5 h-5" />
                </a>
                <button
                  onClick={openMenu}
                  className={`p-2 rounded-full transition-colors md:hidden ${isTransparent ? "text-white bg-white/20 hover:bg-white/30" : "text-gray-900 bg-gray-100 hover:bg-gray-200"}`}
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>
        </Container>
      </div>
    </>
  );
}
