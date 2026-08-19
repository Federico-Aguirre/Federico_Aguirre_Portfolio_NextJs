"use client";

import React from "react";
import { m, Variants, SVGMotionProps, useReducedMotion } from "framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
  isActive?: boolean;
  "aria-label"?: string;
  /** Estado de carga o notificación accesible para lectores de pantalla */
  announcement?: string;
}

export const SunIcon = ({
  isActive = false,
  "aria-label": ariaLabel = "Ícono de Sol",
  announcement,
  style,
  ...props
}: IconProps) => {
  // 1. PREFERENCIA DE MOVIMIENTO REDUCIDO
  const shouldReduceMotion = useReducedMotion();

  const sunColor = "#efcc00";
  const centerOrigin = { transformOrigin: "32px 32px" };

  // 2. VARIANTES AJUSTADAS SEGÚN PREFERENCIA DE MOVIMIENTO
  const centerVariants: Variants = {
    idle: { scale: 1, transition: { duration: 0.3 } },
    active: {
      scale: shouldReduceMotion ? 1 : [1, 1.12, 1],
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const raysVariants: Variants = {
    idle: { rotate: 0, scale: 1, opacity: 0.85 },
    active: {
      rotate: shouldReduceMotion ? 0 : 360,
      scale: shouldReduceMotion ? 1 : [1, 1.08, 1],
      opacity: shouldReduceMotion ? 1 : [0.85, 1, 0.85],
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            rotate: { duration: 12, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          },
    },
  };

  const isDecorative = !ariaLabel && !props["aria-labelledby"];

  return (
    <>
      <m.svg
        width="100%"
        height="100%"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={ariaLabel}
        aria-hidden={isDecorative}
        {...props}
        style={{
          overflow: "visible",
          // 3. SOPORTE PARA MODO DE ALTO CONTRASTE (FORCED COLORS)
          forcedColorAdjust: "auto",
          ...style,
        }}
      >
        {/* RAYOS SOLARES */}
        <m.g
          fill="none"
          stroke={sunColor}
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="3px"
          // 4. MANTENER GROSOR EN ESCALADO
          vectorEffect="non-scaling-stroke"
          variants={raysVariants}
          initial="idle"
          animate={isActive ? "active" : "idle"}
          style={centerOrigin}
          aria-hidden="true"
        >
          <line x1="32" x2="32" y1="5" y2="11" />
          <line x1="32" x2="32" y1="53" y2="59" />
          <line x1="59" x2="53" y1="32" y2="32" />
          <line x1="11" x2="5" y1="32" y2="32" />
          <line x1="51.09" x2="46.85" y1="12.91" y2="17.15" />
          <line x1="17.15" x2="12.91" y1="46.85" y2="51.09" />
          <line x1="51.09" x2="46.85" y1="51.09" y2="46.85" />
          <line x1="17.15" x2="12.91" y1="17.15" y2="12.91" />
        </m.g>

        {/* NÚCLEO CENTRAL */}
        <m.circle
          cx="32"
          cy="32"
          r="17"
          fill={sunColor}
          variants={centerVariants}
          initial="idle"
          animate={isActive ? "active" : "idle"}
          style={centerOrigin}
        />
      </m.svg>

      {/* 5. ANUNCIO VIVO PARA LECTORES DE PANTALLA (SI CAMBIA DE ESTADO) */}
      {announcement && (
        <span
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
          aria-live="polite"
        >
          {announcement}
        </span>
      )}
    </>
  );
};

export default SunIcon;