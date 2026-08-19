"use client";

import { useState, useEffect, useRef, CSSProperties, startTransition } from "react";
import { useContextStore } from "@/store/Context";
import TextSpan from "./TextSpan";
import CallToAction from "./CallToAction";
import homeStyle from "scss/pages/home.module.scss";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Config as particleConfig } from "@/particlejsConfig/Config";

// Carga dinámica de ParticlesClient sin SSR
const ParticlesClient = dynamic(() => import("./ParticlesClient"), {
  ssr: false,
});

// Estilo helper para ocultar elementos visualmente manteniendo accesibilidad para lectores de pantalla
const srOnlyStyle: CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: "0",
};

export default function HomePageClientWrapper() {
  const t = useTranslations("home");
  const searchParams = useSearchParams();
  const target = searchParams.get("target");

  const headlineText = t("headline");
  const sentence = headlineText.split("");

  const homeSectionRef = useRef<HTMLHeadingElement | null>(null);

  // Selectores atómicos para Zustand
  const changeSectionVisible = useContextStore((state) => state.changeSectionVisible);
  const darkMode = useContextStore((state) => state.darkMode);

  const [shouldLoadParticles, setShouldLoadParticles] = useState(false);
  // Carga postergada: Las partículas se montan solo cuando el hilo principal de la CPU se libera
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => setShouldLoadParticles(true));
      return () => window.cancelIdleCallback(idleId);
    } else {
      const timer = setTimeout(() => setShouldLoadParticles(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Scroll automático accesible y seguro al navegar con ?target=id
  useEffect(() => {
    if (!target) return;

    let attempts = 0;
    const maxAttempts = 20;
    let timeoutId: NodeJS.Timeout;
    let isCancelled = false;

    // Respeta preferencias de movimiento reducido
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scrollBehavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

    const scrollToTarget = () => {
      if (isCancelled) return;

      const element = document.getElementById(target);
      const scrollContainer =
        document.querySelector("[data-overlayscrollbars-contents]") ||
        document.getElementById("scroll-main-container-id");

      if (target === "home") {
        if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: scrollBehavior });
        else window.scrollTo({ top: 0, behavior: scrollBehavior });

        // Transferir foco para lectores de pantalla
        const homeElem = document.getElementById("home");
        if (homeElem) {
          if (!homeElem.hasAttribute("tabindex")) homeElem.setAttribute("tabindex", "-1");
          homeElem.focus({ preventScroll: true });
        }
        return;
      }

      if (element) {
        const navbarOffset = 80;

        if (scrollContainer) {
          const targetPosition = element.offsetTop - navbarOffset;
          scrollContainer.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: scrollBehavior,
          });
        } else {
          // requestAnimationFrame espera a que el navegador termine de pintar el cuadro actual
          requestAnimationFrame(() => {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarOffset;
            window.scrollTo({ top: offsetPosition, behavior: scrollBehavior });
          });
        }

        // Garantiza que el elemento objetivo reciba el foco del teclado
        if (!element.hasAttribute("tabindex")) {
          element.setAttribute("tabindex", "-1");
        }
        element.focus({ preventScroll: true });

      } else if (attempts < maxAttempts) {
        attempts++;
        timeoutId = setTimeout(scrollToTarget, 100);
      }
    };

    timeoutId = setTimeout(scrollToTarget, 150);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [target]);

  // Observer para detectar visibilidad de la sección Home
  useEffect(() => {
    const currentRef = homeSectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startTransition(() => {
          changeSectionVisible("home"); 
        });
      }
    }, { 
      threshold: 0.3,
      rootMargin: "-10% 0px -10% 0px" 
    });

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [changeSectionVisible]);

    useEffect(() => {
    if (typeof window === "undefined") return;

    // Lee los parámetros de la URL directamente sin problemas de SSR/Suspense
    const params = new URLSearchParams(window.location.search);
    const target = params.get("target");

    if (target) {
      // 1. Ilumina de inmediato la pestaña activa en el Navbar (Zustand)
      const state = useContextStore.getState();
      if (state.changeSectionVisible) {
        state.changeSectionVisible(target);
      }

      // 2. Espera un instante a que el DOM se monte y hace el scroll
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 350); // 350ms da el tiempo justo a que la Home monte la sección
    }
  }, []);

  return (
    <section
      className={homeStyle.homePage}
      id="home"
      tabIndex={-1} // Permite recibir foco al desplazarse
      aria-labelledby="home-headline"
      style={{ position: "relative" }}
    >
      {/* Las partículas se renderizan solo cuando la CPU está desocupada */}
      {shouldLoadParticles && <ParticlesClient config={particleConfig} styles={homeStyle} />}

      <h1
        id="home-headline"
        className={`${homeStyle.homePage__title} ${
          darkMode ? "darkModeLetterClass" : "brightModeLetterClass"
        }`}
        ref={homeSectionRef}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Texto accesible para lectores de pantalla */}
        <span style={srOnlyStyle}>{headlineText}</span>

        {/* Animación visual de letras con efecto RubberBand */}
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {headlineText.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {word.split("").map((letter, letterIndex) => (
                <TextSpan key={letterIndex}>
                  <span>{letter}</span>
                </TextSpan>
              ))}
              {/* Espacio entre palabras */}
              <span style={{ display: "inline-block" }}>&nbsp;</span>
            </span>
          ))}
        </span>
      </h1>

      <CallToAction styles={homeStyle}/>
    </section>
  );
}