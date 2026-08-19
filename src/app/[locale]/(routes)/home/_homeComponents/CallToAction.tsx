"use client";

import React from "react";
import { useContextStore } from "@/store/Context";
import { useTranslations } from "next-intl";

interface CallToActionProps {
    styles: typeof import("scss/pages/home.module.scss").default;
}

const CallToAction = ({ styles }: CallToActionProps) => {
  const darkMode = useContextStore((state) => state.darkMode);
  const t = useTranslations("home");

  const toggleShadowClass = darkMode
    ? styles.darkCallToActionClass
    : styles.brightCallToActionClass;

  // Función de scroll fluido compatible y accesible con gestión de foco
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      // Verificar preferencia de movimiento para el scroll
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      element.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });

      // Garantizar que el foco del teclado y lector de pantalla se traslade a la sección
      if (!element.hasAttribute("tabindex")) {
        element.setAttribute("tabindex", "-1");
      }
      element.focus({ preventScroll: true });
    }
  };

  const buttonText = t("watchProjects") || "Ver proyectos";

  return (
    <a
      href="#projects"
      className={`${styles.homePage__CallToAction} ${styles.ctaAnimated} ${toggleShadowClass}`}
      onClick={(e) => handleScroll(e, "projects")}
      aria-label={buttonText}
    >
      <span>{buttonText}</span>
    </a>
  );
};

export default CallToAction;