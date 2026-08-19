"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { useLocale } from "next-intl";
import { Config as defaultConfig } from "@/particlejsConfig/Config";

interface ParticlesClientProps {
  config?: ISourceOptions;
  styles: typeof import("scss/pages/home.module.scss").default;
}

// evita ejecutar loadSlim múltiples veces al cambiar de ruta
let isSlimLoaded = false;

export default function ParticlesClient({ config, styles }: ParticlesClientProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const containerRef = useRef<Container | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  // 1. Accesibilidad: Detección de preferencia de movimiento reducido
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Manejador opcional para cambios dinámicos de accesibilidad
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      }
    };
  }, []);

  // 2. Configuración dinámicamente adaptada
  const accessibleOptions: ISourceOptions = useMemo(() => {
    const baseConfig = config || defaultConfig || {};
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return {
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      ...baseConfig,
      particles: {
        ...baseConfig.particles,
        move: {
          ...baseConfig.particles?.move,
          enable: prefersReducedMotion ? false : (baseConfig.particles?.move?.enable ?? true),
        },
      },
      interactivity: prefersReducedMotion
        ? {
            events: {
              onHover: { enable: false },
              onClick: { enable: false },
            },
          }
        : baseConfig.interactivity,
    };
  }, [config]);

  // 3. Inicializar el motor y cargar las partículas
  useEffect(() => {
    let isMounted = true;
    let timerId: NodeJS.Timeout;
    const elementId = `tsparticles-${locale}`;
    
    // 💡 Guardamos una copia local del nodo DOM para evitar el warning en el cleanup
    const currentDiv = divRef.current;

    async function initParticles() {
      try {
        if (!isSlimLoaded) {
          await loadSlim(tsParticles);
          isSlimLoaded = true;
        }

        if (!isMounted) return;

        timerId = setTimeout(async () => {
          if (!isMounted) return;

          if (containerRef.current) {
            try {
              containerRef.current.destroy();
            } catch (_) {}
            containerRef.current = null;
          }

          if (currentDiv) {
            currentDiv.innerHTML = "";
          }

          const targetElement = currentDiv || document.getElementById(elementId);
          if (!targetElement) return;

          const container = await tsParticles.load({
            id: elementId,
            element: targetElement,
            options: accessibleOptions,
          });

          if (container && isMounted) {
            containerRef.current = container;
            console.log("✨ Partículas cargadas con éxito en el DOM ID:", elementId);

            const canvasElem = targetElement.querySelector("canvas");
            if (canvasElem && canvasElem instanceof HTMLCanvasElement) {
              canvasElem.setAttribute("aria-hidden", "true");
              canvasElem.setAttribute("tabindex", "-1");
            }
          }
        }, 150);
      } catch (error) {
        console.error("❌ Error inicializando tsParticles:", error);
      }
    }

    initParticles();

    return () => {
      isMounted = false;
      if (timerId) clearTimeout(timerId);

      if (containerRef.current) {
        try {
          containerRef.current.destroy();
        } catch (_) {}
        containerRef.current = null;
      }

      // Usa la copia local garantizando que el cleanup limpie el nodo exacto que montó
      if (currentDiv) {
        currentDiv.innerHTML = "";
      }
    };
  }, [locale, accessibleOptions, pathname]);

  // 4. Estructura HTML con `key` dinámica y `ref` directa
  return (
    <div
      key={`${locale}-${pathname}`}
      className={styles.particlesContainer}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <div
        ref={divRef}
        id={`tsparticles-${locale}`}
        className={styles.myParticles}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}