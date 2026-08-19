"use client";

import React, { useId } from "react";
import {
  m,
  Variants,
  SVGMotionProps,
  useReducedMotion,
} from "framer-motion";

export interface TypeScriptIconProps extends SVGMotionProps<SVGSVGElement> {
  /** Activa la animación de elevación y brillo/pulso */
  isActive?: boolean;
  /** Tamaño del ícono (ancho y alto). Por defecto 100% para maquetación fluida */
  size?: number | string;
  /** Etiqueta accesible. Si se omite, el ícono se marca automáticamente como decorativo */
  "aria-label"?: string;
  /** ID de un elemento externo que sirva de etiqueta accesible */
  "aria-labelledby"?: string;
  /** Anuncio dinámico para lectores de pantalla cuando cambie el estado (ej: "TypeScript activo") */
  announcement?: string;
  /** Color de fondo personalizable (soporta 'currentColor' o valor hex) */
  color?: string;
}

export const TypeScriptIcon = ({
  isActive = false,
  size = "100%",
  color = "#3178c6",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  announcement,
  style,
  role,
  ...props
}: TypeScriptIconProps) => {
  // 1. DETECCIÓN DE PREFERENCIA DE MOVIMIENTO REDUCIDO
  const shouldReduceMotion = useReducedMotion();
  const animateIcon = isActive && !shouldReduceMotion;

  // 2. GESTIÓN SEMÁNTICA WCAG (Informativo vs. Decorativo)
  const isExplicitlyHidden = props["aria-hidden"] === true;
  const hasLabel = Boolean(ariaLabel || ariaLabelledby);
  const isDecorative = isExplicitlyHidden || !hasLabel;

  const computedRole = role || (!isDecorative ? "img" : undefined);

  // 3. VARIANTES ADAPTATIVAS Y SEGURAS (Sin glitches agresivos)
  const containerVariants: Variants = {
    idle: {
      y: 0,
      filter: "drop-shadow(0px 0px 0px rgba(49, 120, 198, 0))",
    },
    active: {
      y: shouldReduceMotion ? 0 : -6, // Elevación moderada
      filter: shouldReduceMotion
        ? "none"
        : "drop-shadow(0px 8px 16px rgba(49, 120, 198, 0.45))",
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      },
    },
  };

  const textVariants: Variants = {
    idle: { opacity: 1, scale: 1 },
    active: {
      opacity: shouldReduceMotion ? 1 : [1, 0.85, 1],
      scale: shouldReduceMotion ? 1 : [1, 1.02, 1],
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
    },
  };

  const tsPath =
    "m233 284h64v-41H118v41h64v183h51zm84 173c8.1 4.2 18 7.3 29 9.4s23 3.1 35 3.1c12 0 23-1.1 34-3.4c11-2.3 20-6.1 28-11 c 8.1-5.3 15-12 19-21s7.1-19 7.1-32c0-9.1-1.4-17-4.1-24s-6.6-13-12-18c-5.1-5.3-11-10-18-14s-15-8.2-24-12c-6.6-2.7-12-5.3-18-7.9c-5.2-2.6-9.7-5.2-13-7.8c-3.7-2.7-6.5-5.5-8.5-8.4c-2-3-3-6.3-3-10c0-3.4.89-6.5 2.7-9.3s4.3-5.1 7.5-7.1c3.2-2 7.2-3.5 12-4.6c4.7-1.1 9.9-1.6 16-1.6c4.2 0 8.6.31 13 .94c4.6.63 9.3 1.6 14 2.9c4.7 1.3 9.3 2.9 14 4.9c4.4 2 8.5 4.3 12 6.9v-47c-7.6-2.9-16-5.1-25-6.5s-19-2.1-31-2.1c-12 0-23 1.3-34 3.8s-20 6.5-28 12c-8.1 5.4-14 12-19 21c-4.7 8.4-7 18-7 30c0 15 4.3 28 13 38c8.6 11 22 19 39 27c6.9 2.8 13 5.6 19 8.3s11 5.5 15 8.4c4.3 2.9 7.7 6.1 10 9.5c2.5 3.4 3.8 7.4 3.8 12c0 3.2-.78 6.2-2.3 9s-3.9 5.2-7.1 7.2s-7.1 3.6-12 4.8c-4.7 1.1-10 1.7-17 1.7c-11 0-22-1.9-32-5.7c-11-3.8-21-9.5-28.1-15.44z";

  return (
    <>
      <m.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={size}
        height={size}
        role={computedRole}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-hidden={isDecorative ? true : undefined}
        focusable="false"
        {...props}
        style={{
          overflow: "visible",
          color: color,
          // 4. ALTO CONTRASTE DE WINDOWS (WHCM) Y TEMAS
          forcedColorAdjust: "auto",
          ...style,
        }}
      >
        <m.g
          initial="idle"
          animate={animateIcon ? "active" : "idle"}
          variants={containerVariants}
          style={{ transformOrigin: "center" }}
        >
          {/* FONDO AZUL CON RESPALDO DE COLOR */}
          <rect
            width="512"
            height="512"
            rx="15%"
            fill="currentColor"
          />

          {/* TRAZO DE LAS LETRAS 'TS' */}
          <m.path
            fill="#ffffff"
            variants={textVariants}
            style={{ transformOrigin: "center" }}
            d={tsPath}
          />
        </m.g>
      </m.svg>

      {/* 5. ANUNCIO VIVO EN TIEMPO REAL PARA LECTORES DE PANTALLA */}
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

export default TypeScriptIcon;