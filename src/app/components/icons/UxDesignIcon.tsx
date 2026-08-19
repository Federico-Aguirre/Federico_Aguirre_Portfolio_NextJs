"use client";

import React, { useId } from "react";
import {
  m,
  Variants,
  SVGMotionProps,
  useReducedMotion,
} from "framer-motion";

export interface UxDesignIconProps extends SVGMotionProps<SVGSVGElement> {
  /** Activa la animación de levitación, pulso de trazo y resplandor */
  isActive?: boolean;
  /** Tamaño del ícono (ancho y alto). Por defecto "100%" para layout fluido */
  size?: number | string;
  /** Etiqueta accesible para lectores de pantalla. Si se omite, se marca como decorativo */
  "aria-label"?: string;
  /** ID de un elemento externo que sirva de etiqueta */
  "aria-labelledby"?: string;
  /** Anuncio dinámico para lectores de pantalla al cambiar de estado */
  announcement?: string;
  /** Color principal del ícono (soporta 'currentColor' o hex) */
  color?: string;
}

export const UxDesignIcon = ({
  isActive = false,
  size = "100%",
  color = "currentColor",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  announcement,
  style,
  role,
  ...props
}: UxDesignIconProps) => {
  // 1. DIVERSIFICACIÓN DE IDs ÚNICOS EN SVG
  const gradientId = useId();

  // 2. DETECCIÓN DE PREFERENCIA DE MOVIMIENTO REDUCIDO
  const shouldReduceMotion = useReducedMotion();
  const animateIcon = isActive && !shouldReduceMotion;

  // 3. GESTIÓN SEMÁNTICA (Informativo vs Decorativo)
  const isExplicitlyHidden = props["aria-hidden"] === true;
  const hasLabel = Boolean(ariaLabel || ariaLabelledby);
  const isDecorative = isExplicitlyHidden || !hasLabel;

  const computedRole = role || (!isDecorative ? "img" : undefined);

  // 4. VARIANTES DE ANIMACIÓN SEGURAS Y LEGIBLES
  const containerVariants: Variants = {
    idle: {
      y: 0,
      scale: 1,
      filter: "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    active: {
      y: shouldReduceMotion ? 0 : -3,
      scale: shouldReduceMotion ? 1 : 1.05,
      filter: shouldReduceMotion
        ? "none"
        : "drop-shadow(0px 0px 8px rgba(0, 240, 255, 0.6))",
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
        scale: { duration: 0.3 },
      },
    },
  };

  // Trazo legible que NUNCA desaparece (Opacidad constante y segura)
  const pathVariants: Variants = {
    idle: {
      pathLength: 1,
      opacity: 0.85, // Garantiza contraste suficiente en reposo
      strokeWidth: 2,
      stroke: "currentColor",
    },
    active: {
      pathLength: 1,
      opacity: 1,
      stroke: `url(#${gradientId})`,
      transition: { duration: 0.3 },
    },
  };

  const circleVariants: Variants = {
    ...pathVariants,
    active: {
      ...pathVariants.active,
      fill: `url(#${gradientId})`,
      fillOpacity: 0.12,
    },
  };

  return (
    <>
      <m.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role={computedRole}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-hidden={isDecorative ? true : undefined}
        focusable="false"
        {...props}
        style={{
          overflow: "visible",
          color: color,
          // Adaptabilidad para Modo de Alto Contraste de Windows (WHCM)
          forcedColorAdjust: "auto",
          ...style,
        }}
      >
        <defs>
          {/* GRADIENTE CYBER CON ID ÚNICO */}
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#0055FF" />
          </linearGradient>
        </defs>

        <m.g
          initial="idle"
          animate={animateIcon ? "active" : "idle"}
          variants={containerVariants}
          style={{ transformOrigin: "center center" }}
        >
          {/* TRAZO DE LAS LETRAS "UX" (Legible en todo momento) */}
          <m.path
            d="M7 10V12C7 12.6667 7.4 14 9 14C10.6 14 11 12.6667 11 12V10M14 10L15.5 12M17 14L15.5 12M15.5 12L17 10M15.5 12L14 14"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
          />

          {/* CÍRCULO EXTERNO CON ROTACIÓN SEGURA O ESTÁTICA */}
          <m.circle
            cx="12"
            cy="12"
            r="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={circleVariants}
            animate={animateIcon ? { rotate: 360 } : { rotate: 0 }}
            transition={
              animateIcon
                ? {
                    rotate: {
                      duration: 12, // Velocidad más suave para evitar mareo vestibular
                      ease: "linear",
                      repeat: Infinity,
                    },
                  }
                : {}
            }
            style={{ transformOrigin: "center center" }}
          />
        </m.g>
      </m.svg>

      {/* REGIÓN VIVA PARA LECTORES DE PANTALLA */}
      {announcement && (
        <span
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          {announcement}
        </span>
      )}
    </>
  );
};

export default UxDesignIcon;