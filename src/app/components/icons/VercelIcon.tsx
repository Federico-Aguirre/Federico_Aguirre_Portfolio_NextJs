"use client";

import React, { useId } from "react";
import {
  m,
  Variants,
  SVGMotionProps,
  useReducedMotion,
} from "framer-motion";

export interface VercelIconProps extends SVGMotionProps<SVGSVGElement> {
  /** Activa la animación del doble pulso en el borde del triángulo */
  isActive?: boolean;
  /** Tamaño del ícono (ancho y alto). Por defecto "100%" para maquetación fluida */
  size?: number | string;
  /** Etiqueta accesible para lectores de pantalla. Si se omite, se trata como decorativo */
  "aria-label"?: string;
  /** ID de un elemento externo que sirva de etiqueta */
  "aria-labelledby"?: string;
  /** Anuncio dinámico para lectores de pantalla cuando cambie el estado */
  announcement?: string;
  /** Color principal del logo (por defecto 'currentColor' para adaptarse al tema) */
  color?: string;
}

export const VercelIcon = ({
  isActive = false,
  size = "100%",
  color = "currentColor",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  announcement,
  style,
  role,
  ...props
}: VercelIconProps) => {
  // 1. GENERACIÓN DE ID ÚNICO PARA PREVENIR COLISIONES EN EL DOM
  const gradientId = useId();

  // 2. DETECCIÓN DE PREFERENCIA DE MOVIMIENTO REDUCIDO
  const shouldReduceMotion = useReducedMotion();
  const animateIcon = isActive && !shouldReduceMotion;

  // 3. GESTIÓN SEMÁNTICA (Informativo vs. Decorativo)
  const isExplicitlyHidden = props["aria-hidden"] === true;
  const hasLabel = Boolean(ariaLabel || ariaLabelledby);
  const isDecorative = isExplicitlyHidden || !hasLabel;

  const computedRole = role || (!isDecorative ? "img" : undefined);

  // CONFIGURACIÓN DEL TRAZO
  const strokeLength = 0.4;
  const gapLength = 0.6;
  const strokeArray = `${strokeLength} ${gapLength}`;
  const DURATION = 4;

  // VARIANTES PARA EL CUERPO BASE DE VERCEL
  const baseVariants: Variants = {
    idle: { scale: 1 },
    active: {
      scale: shouldReduceMotion ? 1 : 0.95, // Escala sutil e inofensiva
      transition: { duration: 0.3 },
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
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FF0080" />
          </linearGradient>
        </defs>

        {/* 1. BASE DEL TRIÁNGULO (Usa currentColor para legibilidad universal) */}
        <m.path
          d="M24 22.525H0l12-21.05 12 21.05z"
          fill="currentColor"
          variants={baseVariants}
          initial="idle"
          animate={animateIcon ? "active" : "idle"}
          style={{ transformOrigin: "center" }}
        />

        {/* 2. LÍNEA DE ENERGÍA (Doble Pulso Seguro) */}
        {[4, 2].map((width, index) => (
          <m.path
            key={index}
            d="M24 22.525H0l12-21.05 12 21.05z"
            pathLength={1}
            stroke={`url(#${gradientId})`}
            strokeWidth={width}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray={strokeArray}
            filter={index === 0 && !shouldReduceMotion ? "blur(4px)" : "none"}
            style={{ transformOrigin: "center", scale: animateIcon ? 0.95 : 1 }}
            initial={{ opacity: 0, strokeDashoffset: 0 }}
            animate={
              animateIcon
                ? {
                    strokeDashoffset: -1,
                    opacity: [0, 1, 1, 0.2, 1, 1, 0], // Evita desaparecer totalmente a 0 en el centro
                  }
                : isActive && shouldReduceMotion
                ? { opacity: 1, strokeDashoffset: 0 }
                : { opacity: 0 }
            }
            transition={
              animateIcon
                ? {
                    duration: DURATION,
                    ease: "linear",
                    repeat: Infinity,
                    times: [0, 0.15, 0.35, 0.5, 0.65, 0.85, 1],
                  }
                : { duration: 0.3 }
            }
          />
        ))}
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

export default VercelIcon;