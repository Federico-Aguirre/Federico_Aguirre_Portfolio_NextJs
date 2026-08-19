"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/createNavigation";
import { useTransition, useEffect } from "react";
import Image from "next/image";
import navbarStyle from "scss/base/navbar.module.scss";

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale();

  const nextLocale = activeLocale === 'es' ? 'en' : 'es';

  const localeInfo = {
    es: { label: 'Español', flagSrc: '/svg/flags/Spain-flag.svg' },
    en: { label: 'English', flagSrc: '/svg/flags/US-flag.svg' }
  };

  const currentInfo = localeInfo[activeLocale];
  const nextInfo = localeInfo[nextLocale];

  const getScrollContainer = () => {
    return document.querySelector('[data-overlayscrollbars-viewport]') || 
           document.getElementById("scroll-main-container-id");
  };

  const getTrueOffset = (element: HTMLElement) => {
    let top = 0;
    let el: HTMLElement | null = element;
    while (el) {
      top += el.offsetTop;
      el = el.offsetParent as HTMLElement;
    }
    return top;
  };

  useEffect(() => {
    const savedSection = sessionStorage.getItem("langSwitchSection");
    const savedDistance = sessionStorage.getItem("langSwitchDistance");
    
    if (savedSection && savedDistance) {
      const scrollContainer = getScrollContainer();

      if (scrollContainer instanceof HTMLElement) {
        scrollContainer.style.setProperty("scroll-behavior", "auto", "important");
        
        const applyScroll = () => {
          const section = document.getElementById(savedSection);
          if (section) {
            const sectionTrueTop = getTrueOffset(section);
            const targetScrollTop = sectionTrueTop + parseFloat(savedDistance);
            
            scrollContainer.scrollTo({ top: targetScrollTop, behavior: "instant" });
          }

          requestAnimationFrame(() => {
            scrollContainer.scrollTop += 1;
            requestAnimationFrame(() => {
              scrollContainer.scrollTop -= 1;
              scrollContainer.dispatchEvent(new Event("scroll"));
              
              scrollContainer.style.removeProperty("scroll-behavior");
              sessionStorage.removeItem("langSwitchSection");
              sessionStorage.removeItem("langSwitchDistance");
            });
          });
        };

        applyScroll();
        setTimeout(applyScroll, 100);
      }
    }
  }, [activeLocale]);

  const onToggleLanguage = () => {
    const scrollContainer = getScrollContainer();

    if (scrollContainer) {
      const ids = ["home", "projects", "about", "contact"];
      let bestId = "home";
      let minDistance = Infinity;

      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
           const elTrueTop = getTrueOffset(el);
           const distanceToTop = scrollContainer.scrollTop - elTrueTop;
           
           if (Math.abs(distanceToTop) < minDistance) {
               minDistance = Math.abs(distanceToTop);
               bestId = id;
           }
        }
      });

      const bestEl = document.getElementById(bestId);
      if (bestEl) {
          const elTrueTop = getTrueOffset(bestEl);
          const distance = scrollContainer.scrollTop - elTrueTop;
          
          sessionStorage.setItem("langSwitchSection", bestId);
          sessionStorage.setItem("langSwitchDistance", distance.toString());
      }
    }

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  };

  return (
    <div className={navbarStyle.navbar__switcherContainer}>
      <button
        onClick={onToggleLanguage}
        className={navbarStyle.navbar__mainButton}
        disabled={isPending}
        type="button"
        // 1. Mantenemos title para el tooltip visual, pero agrega aria-label para el lector de pantalla
        title={`Cambiar a ${nextInfo.label}`}
        aria-label={`Cambiar idioma a ${nextInfo.label}`}
      >
        {/* 2. Oculta la bandera y el texto a los lectores de pantalla (ya tienen la info en el aria-label) */}
        <div className={navbarStyle.navbar__flagWrapper} data-flag={activeLocale} aria-hidden="true">
          <Image 
            src={currentInfo.flagSrc} 
            alt="" // 3. alt vacío significa que la imagen es puramente decorativa
            fill 
            className={navbarStyle.navbar__flagImage}
          />
        </div>
        
        <span className={navbarStyle.navbar__langCode} aria-hidden="true">
            {activeLocale}
        </span>
      </button>
    </div>
  );
}