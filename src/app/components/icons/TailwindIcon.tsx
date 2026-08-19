"use client";

import React, { useId } from "react";
import { m, SVGMotionProps, useReducedMotion } from "framer-motion";

export interface TailwindIconProps extends SVGMotionProps<SVGSVGElement> {
  /** Activa la animación del brillo barriendo el ícono */
  isActive?: boolean;
  /** Tamaño del ícono (ancho y alto). Por defecto 100% para fluidez en layout */
  size?: number | string;
  /** Etiqueta accesible para lectores de pantalla. Si se omite, el ícono se marca como decorativo */
  "aria-label"?: string;
  /** ID de un elemento externo que sirva de etiqueta */
  "aria-labelledby"?: string;
  /** Anuncio dinámico para lectores de pantalla si cambia de estado */
  announcement?: string;
  /** Color base del ícono (por defecto Tailwind Sky 500, o 'currentColor') */
  color?: string;
}

export const TailwindIcon = ({
  isActive = false,
  size = "100%",
  color = "#0ea5e9",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  announcement,
  style,
  role,
  ...props
}: TailwindIconProps) => {
  // 1. DIVERSIFICACIÓN DE IDs ÚNICOS PARA SVG (Previene colisiones en el DOM)
  const clipId = useId();
  const gradientId = useId();

  // 2. DETECCIÓN DE PREFERENCIA DE MOVIMIENTO REDUCIDO
  const shouldReduceMotion = useReducedMotion();
  const animateIcon = isActive && !shouldReduceMotion;

  // 3. GESTIÓN SEMÁNTICA (Informativo vs Decorativo)
  const isExplicitlyHidden = props["aria-hidden"] === true;
  const hasLabel = Boolean(ariaLabel || ariaLabelledby);
  const isDecorative = isExplicitlyHidden || !hasLabel;

  const computedRole = role || (!isDecorative ? "img" : undefined);

  // Trazados oficiales de la ola de Tailwind
  const topPath =
    "M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7Z";
  const bottomPath =
    "M2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z";

  return (
    <>
      <m.svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
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
          // 4. ADAPTABILIDAD PARA MODO DE ALTO CONTRASTE (WHCM)
          forcedColorAdjust: "auto",
          ...style,
        }}
      >
        <defs>
          {/* MÁSCARA CON ID ÚNICO */}
          <clipPath id={clipId}>
            <path d={topPath} />
            <path d={bottomPath} />
          </clipPath>

          {/* GRADIENTE CON ID ÚNICO */}
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="currentColor" />
            <stop offset="40%" stopColor="currentColor" />
            {/* El brillo usa stopOpacity en lugar de blanco absoluto para respetar contrastes */}
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="60%" stopColor="currentColor" />
            <stop offset="100%" stopColor="currentColor" />
          </linearGradient>
        </defs>

        {/* CAPA BASE ESTÁTICA */}
        <g fill="currentColor">
          <path d={topPath} />
          <path d={bottomPath} />
        </g>

        {/* CAPA DE ANIMACIÓN ENMASCARADA (DESACTIVADA SI HAY REDUCED MOTION) */}
        <g clipPath={`url(#${clipId})`} aria-hidden="true">
          {animateIcon && (
            <m.rect
              width="300%"
              height="100%"
              fill={`url(#${gradientId})`}
              initial={{ x: "-200%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 0,
              }}
            />
          )}
        </g>
      </m.svg>

      {/* 5. ANUNCIADOR VIVO EN TIEMPO REAL PARA LECTORES DE PANTALLA */}
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

export default TailwindIcon;