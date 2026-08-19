"use client";

import React, { useId } from "react";
import {
  m,
  Variants,
  SVGMotionProps,
  useReducedMotion,
} from "framer-motion";

export interface TrelloIconProps extends SVGMotionProps<SVGSVGElement> {
  /** Activa la animación de levitación y llenado de listas */
  isActive?: boolean;
  /** Tamaño del ícono (ancho y alto) */
  size?: number | string;
  /** Etiqueta accesible para lectores de pantalla. Si se omite, se trata como decorativo */
  "aria-label"?: string;
  /** ID de un elemento externo que sirva de etiqueta */
  "aria-labelledby"?: string;
  /** Anuncio dinámico para lectores de pantalla si cambia de estado */
  announcement?: string;
  /** Color principal del tablero (por defecto el azul característico de Trello, o 'currentColor') */
  color?: string;
}

export const TrelloIcon = ({
  isActive = false,
  size = "100%",
  color,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  announcement,
  style,
  role,
  ...props
}: TrelloIconProps) => {
  // 1. DIVERSIFICACIÓN DE IDs ÚNICOS (Previene colisiones en el DOM)
  const gradientId = useId();
  const clipLongListId = useId();
  const clipShortListId = useId();

  // 2. DETECCIÓN DE MOVIMIENTO REDUCIDO
  const shouldReduceMotion = useReducedMotion();
  const animateIcon = isActive && !shouldReduceMotion;

  // 3. GESTIÓN SEMÁNTICA (Informativo vs. Decorativo)
  const isExplicitlyHidden = props["aria-hidden"] === true;
  const hasLabel = Boolean(ariaLabel || ariaLabelledby);
  const isDecorative = isExplicitlyHidden || !hasLabel;

  const computedRole = role || (!isDecorative ? "img" : undefined);

  // 4. VARIANTES DE ANIMACIÓN (Respetan prefers-reduced-motion)
  const boardVariants: Variants = {
    idle: {
      y: 0,
      filter: "drop-shadow(0px 0px 0px rgba(0, 121, 191, 0))",
    },
    active: {
      y: shouldReduceMotion ? 0 : -5,
      filter: shouldReduceMotion
        ? "none"
        : "drop-shadow(0px 0px 15px rgba(0, 145, 230, 0.6))",
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

  const longListFillVariants: Variants = {
    idle: { scaleY: 1, opacity: 1 },
    active: {
      scaleY: shouldReduceMotion ? 1 : [0, 1, 1, 0],
      opacity: shouldReduceMotion ? 1 : [1, 1, 0, 0],
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 2.5,
            ease: "circOut",
            repeat: Infinity,
            repeatDelay: 0.5,
          },
    },
  };

  const shortListFillVariants: Variants = {
    idle: { scaleY: 1, opacity: 1 },
    active: {
      scaleY: shouldReduceMotion ? 1 : [0, 1, 1, 0],
      opacity: shouldReduceMotion ? 1 : [1, 1, 0, 0],
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 2.5,
            ease: "circOut",
            repeat: Infinity,
            delay: 0.4,
            repeatDelay: 0.5,
          },
    },
  };

  return (
    <>
      <m.svg
        width={size}
        height={size}
        viewBox="0 0 256 256"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        role={computedRole}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-hidden={isDecorative ? true : undefined}
        focusable="false"
        preserveAspectRatio="xMidYMid"
        {...props}
        style={{
          overflow: "visible",
          color: color || "#0079BF",
          // Adaptabilidad para Modo de Alto Contraste (WHCM)
          forcedColorAdjust: "auto",
          ...style,
        }}
      >
        <defs>
          <linearGradient
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            id={gradientId}
          >
            <stop stopColor="#0091E6" offset="0%" />
            <stop stopColor="currentColor" offset="100%" />
          </linearGradient>

          {/* CLIP PATHS CON IDs ÚNICOS */}
          <clipPath id={clipLongListId}>
            <rect x="33.28" y="33.28" width="78.08" height="176" rx="12" />
          </clipPath>
          <clipPath id={clipShortListId}>
            <rect x="144.64" y="33.28" width="78.08" height="112" rx="12" />
          </clipPath>
        </defs>

        <m.g
          initial="idle"
          animate={animateIcon ? "active" : "idle"}
          variants={boardVariants}
          style={{ transformOrigin: "center center" }}
        >
          {/* FONDO BASE DEL TABLERO */}
          <rect
            fill={`url(#${gradientId})`}
            x="0"
            y="0"
            width="256"
            height="256"
            rx="25"
          />

          {/* --- LISTA IZQUIERDA --- */}
          {/* Fondo traslúcido solo presente cuando está animándose */}
          {animateIcon && (
            <rect
              fill="#FFFFFF"
              fillOpacity="0.3"
              x="33.28"
              y="33.28"
              width="78.08"
              height="176"
              rx="12"
            />
          )}
          {/* Tarjeta sólida / Animada */}
          <m.rect
            x="33.28"
            y="33.28"
            width="78.08"
            height="176"
            fill="#FFFFFF"
            clipPath={`url(#${clipLongListId})`}
            variants={longListFillVariants}
            style={{ originY: 1 }}
          />

          {/* --- LISTA DERECHA --- */}
          {/* Fondo traslúcido solo presente cuando está animándose */}
          {animateIcon && (
            <rect
              fill="#FFFFFF"
              fillOpacity="0.3"
              x="144.64"
              y="33.28"
              width="78.08"
              height="112"
              rx="12"
            />
          )}
          {/* Tarjeta sólida / Animada */}
          <m.rect
            x="144.64"
            y="33.28"
            width="78.08"
            height="112"
            fill="#FFFFFF"
            clipPath={`url(#${clipShortListId})`}
            variants={shortListFillVariants}
            style={{ originY: 1 }}
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

export default TrelloIcon;