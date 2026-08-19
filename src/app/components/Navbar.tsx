"use client";

import navbarStyle from "scss/base/navbar.module.scss";
import BackgroundChange from "./BackgroundChange";
import { useContextStore } from "@/store/Context";
import { m } from "framer-motion";
import Hamburger from "./Hamburger";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePathname, useRouter } from "next/navigation";

// Utilidad para obtener el viewport activo de OverlayScrollbars
const getScrollContainer = () => {
  return (
    document.querySelector("[data-overlayscrollbars-viewport]") ||
    document.querySelector(".os-viewport") ||
    document.getElementById("scroll-main-container-id")
  );
};

// Helper ultra seguro para convertir cualquier valor del store a string limpio
const getSectionString = (val: unknown): string => {
  if (!val) return "home";
  if (typeof val === "string") return val.toLowerCase();
  
  if (typeof val === "object" && val !== null) {
    const obj = val as Record<string, unknown>;
    if (typeof obj.sectionVisibleValue === "string") {
      return obj.sectionVisibleValue.toLowerCase();
    }
    if (typeof obj.sectionVisibleValue === "object" && obj.sectionVisibleValue !== null) {
      const nestedObj = obj.sectionVisibleValue as Record<string, unknown>;
      if (typeof nestedObj.sectionVisibleValue === "string") {
        return nestedObj.sectionVisibleValue.toLowerCase();
      }
    }
  }
  
  return "home";
};

const Navbar = () => {
  const t = useTranslations("header");
  const { sectionVisible, darkMode } = useContextStore();
  const toggleClass = darkMode ? "darkModeLetterClass" : "brightModeLetterClass";

  const pathname = usePathname();
  const router = useRouter();

  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  // Ref para pausar la autodetección durante el scroll automático por clic
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeColor = "hsl(194, 85%, 62%)";
  const isProjectDetailPage = pathname.includes("/projects/");

  const navLinks = [
    { id: "home", label: t("home"), className: navbarStyle.navbar__homeLink },
    { id: "projects", label: t("projects"), className: navbarStyle.navbar__projectsLink },
    { id: "about", label: t("about"), className: navbarStyle.navbar__aboutLink },
    { id: "contact", label: t("contact"), className: navbarStyle.navbar__contactLink },
  ];

  useEffect(() => {
    setIsMobile(window.innerWidth < 1025);
    
    function handleResize() {
      setIsMobile(window.innerWidth < 1025);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
  let lastScrollY = 0;

  function handleScrollEvent() {
    // Obtención real del scroll acumulado (Window > Contenedor)
    const scrollContainer = getScrollContainer();
    const currentScrollY =
      window.scrollY ||
      document.documentElement.scrollTop ||
      scrollContainer?.scrollTop ||
      0;

    // Detección de inicio de página (< 80px)
    const atTop = currentScrollY < 80;
    setIsAtTop(atTop);

    // Ocultar Navbar en móviles al bajar
    const shouldHide = currentScrollY > lastScrollY && currentScrollY > 150 && window.innerWidth < 800;
    setHidden((prev) => (prev !== shouldHide ? shouldHide : prev));
    lastScrollY = currentScrollY;

    // Si estamos en medio de una animación de clic por Navbar, ignorar la auto-detección
    if (isNavigatingRef.current) return;

    // DETECCIÓN DE SECCIÓN ACTIVA POR BoundingClientRect
    const navIds = ["home", "projects", "about", "contact"];
    let activeSection = "home";

    // Evaluamos la última sección que haya superado el tercio superior del viewport
    for (const id of navIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.35) {
          activeSection = id;
        }
      }
    }

    // Actualizamos Zustand solo si hubo un cambio real de sección
    const state = useContextStore.getState();
    const currentStoreVal = getSectionString(state.sectionVisible);

    if (currentStoreVal !== activeSection && state.changeSectionVisible) {
      state.changeSectionVisible(activeSection);
    }
  }

  handleScrollEvent();

  window.addEventListener("scroll", handleScrollEvent, true);
  return () => window.removeEventListener("scroll", handleScrollEvent, true);
}, []);

  const handleScroll = (e: React.MouseEvent, id: string) => {
  e.preventDefault();

  if (isProjectDetailPage) {
    router.push(`/?target=${id}`);
    return;
  }

  // Pausar auto-detección mientras transcurre la animación de scroll
  isNavigatingRef.current = true;
  if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);

  // Iluminación inmediata del botón cliqueado en el store
  const state = useContextStore.getState();
  if (state.changeSectionVisible) {
    state.changeSectionVisible(id);
  }

  // Reactivar la auto-detección tras terminar el scroll suave
  navTimeoutRef.current = setTimeout(() => {
    isNavigatingRef.current = false;
  }, 850);

  // SCROLL NATIVO ULTRA SEGURO
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

  const loadingAnimation = {
    initial: { opacity: 0, y: -60 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.3 },
    },
  };

  const showAnimation = {
    visible: { y: 0, transition: { duration: 0.3 } },
    hidden: { y: -60, transition: { duration: 0.3 } },
  };

  const checkIsActive = (sectionId: string) => {
    if (isProjectDetailPage) return false;
    const current = getSectionString(sectionVisible);

    if (sectionId === "home") {
      return current === "home" || current === "hero";
    }

    return current === sectionId;
  };

  return (
    <m.header
      className={`${navbarStyle.navbar} ${toggleClass}`}
      variants={showAnimation}
      animate={hidden ? "hidden" : "visible"}
    >
      <m.nav 
        variants={loadingAnimation} 
        initial="initial" 
        animate="animate"
        aria-label="Navegación principal"
      >
        <div>
          {navLinks.map((link) => {
            const isActive = checkIsActive(link.id);
            
            return (
              <m.div 
                key={link.id} 
                className={link.className} 
                whileHover={{ scale: 1.2 }}
                whileFocus={{ scale: 1.2 }}
              >
                <button
                  onClick={(e) => handleScroll(e, link.id)}
                  aria-current={isActive ? "page" : undefined}
                  style={{ 
                    color: isActive ? activeColor : "inherit",
                    cursor: "pointer",
                    background: "none", 
                    border: "none", 
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    padding: 0
                  }}
                >
                  {link.label}
                </button>
              </m.div>
            );
          })}

          {isMobile && <Hamburger onNavigate={handleScroll} styles={navbarStyle} />}

          <BackgroundChange styles={navbarStyle} />
          <LanguageSwitcher />
        </div>
      </m.nav>
    </m.header>
  );
};

export default Navbar;