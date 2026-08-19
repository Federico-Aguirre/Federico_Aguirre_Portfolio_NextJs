"use client";

import React, { useId } from "react";
import {
  m,
  Variants,
  SVGMotionProps,
  useReducedMotion,
} from "framer-motion";

export interface WordPressIconProps extends SVGMotionProps<SVGSVGElement> {
  /** Activa el efecto de energía/resplandor del ícono */
  isActive?: boolean;
  /** Tamaño del ícono (ancho y alto). Por defecto "100%" para maquetación fluida */
  size?: number | string;
  /** Etiqueta accesible para lectores de pantalla. Si se omite, se trata como decorativo */
  "aria-label"?: string;
  /** ID de un elemento externo que sirva de etiqueta */
  "aria-labelledby"?: string;
  /** Anuncio dinámico para lectores de pantalla cuando cambie el estado */
  announcement?: string;
  /** Color principal de respaldo o tema */
  color?: string;
}

export const WordPressIcon = ({
  isActive = false,
  size = "100%",
  color = "currentColor",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  announcement,
  style,
  role,
  ...props
}: WordPressIconProps) => {
  // 1. IDENTIFICADORES ÚNICOS PARA PREVENIR COLISIONES EN EL DOM
  const uniqueId = useId();
  const pathId = `wp-path-${uniqueId}`;
  const gradientId = `electricSky-${uniqueId}`;

  // 2. DETECCIÓN DE PREFERENCIA DE MOVIMIENTO REDUCIDO
  const shouldReduceMotion = useReducedMotion();
  const animateIcon = isActive && !shouldReduceMotion;

  // 3. GESTIÓN SEMÁNTICA (Informativo vs. Decorativo)
  const isExplicitlyHidden = props["aria-hidden"] === true;
  const hasLabel = Boolean(ariaLabel || ariaLabelledby);
  const isDecorative = isExplicitlyHidden || !hasLabel;

  const computedRole = role || (!isDecorative ? "img" : undefined);

  // 4. VARIANTES SEGURAS (Evitan destellos estroboscópicos y convulsiones)
  const mainVariants: Variants = {
    idle: {
      scale: 1,
      x: 0,
      y: 0,
      filter: "drop-shadow(0px 2px 4px rgba(29, 140, 248, 0.2))",
    },
    active: {
      scale: shouldReduceMotion ? 1 : 1.03,
      x: 0,
      y: 0,
      filter: shouldReduceMotion
        ? "drop-shadow(0px 0px 8px rgba(34, 225, 255, 0.8))"
        : [
            "drop-shadow(0px 0px 4px rgba(34, 225, 255, 0.4))",
            "drop-shadow(0px 0px 10px rgba(34, 225, 255, 0.8))",
            "drop-shadow(0px 0px 4px rgba(34, 225, 255, 0.4))",
          ],
      transition: {
        filter: {
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
        scale: { duration: 0.3 },
      },
    },
  };

  // Aberración cromática sutil y fluida (Desplazamientos continuos, no flashes estroboscópicos)
  const chromaticLayer1Variants: Variants = {
    idle: { opacity: 0, x: 0 },
    active: {
      opacity: shouldReduceMotion ? 0 : 0.4,
      x: shouldReduceMotion ? 0 : [-1, 1, -1],
      transition: {
        x: { duration: 1.5, repeat: Infinity, repeatType: "mirror" },
        opacity: { duration: 0.3 },
      },
    },
  };

  const chromaticLayer2Variants: Variants = {
    idle: { opacity: 0, x: 0 },
    active: {
      opacity: shouldReduceMotion ? 0 : 0.3,
      x: shouldReduceMotion ? 0 : [1, -1, 1],
      transition: {
        x: { duration: 1.2, repeat: Infinity, repeatType: "mirror" },
        opacity: { duration: 0.3 },
      },
    },
  };

  return (
    <>
      <m.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
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
          forcedColorAdjust: "auto",
          ...style,
        }}
      >
        <defs>
          <path
            id={pathId}
            fillRule="evenodd"
            d="M0,11.99925 C0,16.749 2.76,20.85375 6.76275,22.7985 L1.03875,7.116 C0.3735,8.60775 0,10.25925 0,11.99925 M20.10015,11.394 C20.10015,9.9105 19.5669,8.88375 19.1109,8.085 C18.50265,7.09575 17.9319,6.25875 17.9319,5.27025 C17.9319,4.167 18.76815,3.14025 19.94715,3.14025 C20.0004,3.14025 20.05065,3.147 20.1024,3.15 C17.9679,1.194 15.12315,0 11.9994,0 C7.8069,0 4.11915,2.151 1.9734,5.40825 C2.2554,5.41725 2.5209,5.4225 2.7459,5.4225 C4.00065,5.4225 5.9439,5.27025 5.9439,5.27025 C6.5904,5.232 6.6669,6.183 6.0204,6.25875 C6.0204,6.25875 5.37015,6.33525 4.64715,6.3735 L9.01665,19.371 L11.64315,11.49525 L9.77415,6.3735 C9.12765,6.33525 8.5149,6.25875 8.5149,6.25875 C7.8684,6.2205 7.94415,5.232 8.5914,5.27025 8.5914,5.27025 10.5729,5.4225 11.7519,5.4225 C13.00665,5.4225 14.9499,5.27025 14.9499,5.27025 C15.59715,5.232 15.6729,6.183 15.0264,6.25875 C15.0264,6.25875 14.3754,6.33525 13.65315,6.3735 L17.98965,19.272 L19.1874,15.273 C19.7049,13.6125 20.10015,12.42075 20.10015,11.394 M12.21015,13.04895 L8.6094,23.5107 C9.6849,23.8272 10.8219,23.9997 11.9994,23.9997 C13.39665,23.9997 14.7369,23.7582 15.98415,23.31945 C15.95265,23.2677 15.92265,23.2137 15.89865,23.15445 L12.21015,13.04895 Z M22.52925,6.242475 C22.581,6.624975 22.61025,7.034475 22.61025,7.476225 C22.61025,8.693475 22.38225,10.062225 21.6975,11.774475 L18.03225,22.371225 C21.6,20.291475 23.99925,16.425975 23.99925,11.999475 C23.99925,9.912975 23.466,7.951725 22.52925,6.242475"
          />

          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#22E1FF" />
            <stop offset="100%" stopColor="#1D8CF8" />
          </linearGradient>
        </defs>

        {/* CAPA DE ABERRACIÓN CROMÁTICA 1 (ROJO) */}
        <m.use
          href={`#${pathId}`}
          variants={chromaticLayer1Variants}
          initial="idle"
          animate={animateIcon ? "active" : "idle"}
          fill="#FF0055"
        />

        {/* CAPA DE ABERRACIÓN CROMÁTICA 2 (CYAN) */}
        <m.use
          href={`#${pathId}`}
          variants={chromaticLayer2Variants}
          initial="idle"
          animate={animateIcon ? "active" : "idle"}
          fill="#00FF99"
        />

        {/* CAPA PRINCIPAL (LOGO GRADIENTE) */}
        <m.use
          href={`#${pathId}`}
          variants={mainVariants}
          initial="idle"
          animate={animateIcon ? "active" : "idle"}
          fill={`url(#${gradientId})`}
        />
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

export default WordPressIcon;