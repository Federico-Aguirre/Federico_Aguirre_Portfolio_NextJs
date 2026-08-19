"use client";

import React from "react";
import {
  m,
  Variants,
  SVGMotionProps,
  useReducedMotion,
} from "framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
  isActive?: boolean;
  "aria-label"?: string;
  /** Mensaje opcional para anunciar cambios de estado en lectores de pantalla */
  announcement?: string;
}

export const RestApiIcon = ({
  isActive = false,
  "aria-label": ariaLabel,
  announcement,
  style,
  ...props
}: IconProps) => {
  // 1. DETECCIÓN DE PREFERENCIA DE MOVIMIENTO REDUCIDO
  const shouldReduceMotion = useReducedMotion();

  // 2. CORRECCIÓN DE LÓGICA DE ACCESIBILIDAD Y ETIQUETADO
  const isExplicitlyHidden = props["aria-hidden"] === true;
  const hasExternalLabel = Boolean(ariaLabel || props["aria-labelledby"]);
  
  // Si no está oculto explícitamente ni tiene etiqueta externa, aplicamos fallback accessible
  const finalAriaLabel = !isExplicitlyHidden && !hasExternalLabel 
    ? "Ícono de REST API" 
    : ariaLabel;

  const isDecorative = isExplicitlyHidden || (!hasExternalLabel && !finalAriaLabel);

  const white = "#ffffff";
  const cyan = "#00efff";
  const violet = "#bf5af2";

  const n = {
    tl: { x: 4, y: 4 },
    tr: { x: 16, y: 4 },
    bl: { x: 4, y: 16 },
    br: { x: 16, y: 16 },
  };

  const originalPathD =
    "M16 13c-1.3 0-2.4.8-2.8 2H9c0-.7-.2-1.3-.5-1.8l7.1-7.3c.3 0 .6.1.9.1C17.9 6 19 4.9 19 3.5S17.9 1 16.5 1 14 2.1 14 3.5c0 .3.1.7.2 1l-7 7.2c-.6-.5-1.4-.7-2.2-.7V6.8C6.2 6.4 7 5.3 7 4c0-1.7-1.3-3-3-3S1 2.3 1 4c0 1.3.8 2.4 2 2.8v4.7c-1.2.7-2 2-2 3.4 0 2.2 1.8 4 4 4 1.5 0 2.8-.8 3.4-2h4.7c.4 1.1 1.5 2 2.8 2 1.6 0 3-1.3 3-3C19 14.3 17.6 13 16 13z";

  const loopConfig = {
    duration: 4,
    ease: "linear" as const,
    repeat: Infinity,
    times: [0, 0.25, 0.5, 0.8, 1],
  };

  const fadeTransition = { duration: 0.5, ease: "easeInOut" as const };

  // 3. VARIANTES ADAPTADAS A MOVIMIENTO REDUCIDO
  const whitePathVariants: Variants = {
    idle: { pathLength: 1, transition: { duration: 0.3 } },
    active: {
      pathLength: shouldReduceMotion ? 1 : [1, 0, 0, 0, 1],
      transition: shouldReduceMotion ? { duration: 0 } : loopConfig,
    },
  };

  const cyanPathVariants: Variants = {
    idle: { pathLength: 0, transition: { duration: 0.3 } },
    active: {
      pathLength: shouldReduceMotion ? 1 : [0, 1, 0, 0, 0],
      transition: shouldReduceMotion ? { duration: 0 } : loopConfig,
    },
  };

  const violetPathVariants: Variants = {
    idle: { pathLength: 0, transition: { duration: 0.3 } },
    active: {
      pathLength: shouldReduceMotion ? 1 : [0, 0, 1, 0, 0],
      transition: shouldReduceMotion ? { duration: 0 } : loopConfig,
    },
  };

  return (
    <>
      <m.svg
        width="100%"
        height="100%"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={finalAriaLabel}
        aria-hidden={isDecorative}
        {...props}
        style={{
          overflow: "visible",
          // 4. MODO ALTO CONTRASTE
          forcedColorAdjust: "auto",
          ...style,
        }}
      >
        {/* NODOS ESTRUCTURALES */}
        <circle cx={n.tl.x} cy={n.tl.y} r="2" fill={white} />
        <circle cx={n.tr.x} cy={n.tr.y} r="2" fill={white} />
        <circle cx={n.bl.x} cy={n.bl.y} r="2" fill={white} />
        <circle cx={n.br.x} cy={n.br.y} r="2" fill={white} />

        {/* CAPA SÓLIDA (INACTIVO) */}
        <m.path
          d={originalPathD}
          fill={white}
          style={{ opacity: isActive ? 0 : 1 }}
          initial={{ opacity: isActive ? 0 : 1 }}
          animate={{ opacity: isActive ? 0 : 1 }}
          transition={fadeTransition}
        />

        {/* CAPA DE ANIMACIÓN (ACTIVO) */}
        <m.g
          style={{ opacity: isActive ? 1 : 0 }}
          initial={{ opacity: isActive ? 1 : 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={fadeTransition}
          aria-hidden="true"
        >
          {/* FASE 1 & 4: BORDE BLANCO */}
          <m.path
            d={originalPathD}
            fill="none"
            stroke={white}
            strokeWidth="1.5"
            strokeLinecap="butt"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            variants={whitePathVariants}
            initial="idle"
            animate={isActive ? "active" : "idle"}
          />

          {/* FASE 2: FLECHA CYAN */}
          <m.path
            d={`M${n.tl.x} ${n.tl.y} L${n.br.x} ${n.br.y} M${n.bl.x} ${n.bl.y} L${n.tr.x} ${n.tr.y}`}
            fill="none"
            stroke={cyan}
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            variants={cyanPathVariants}
            initial="idle"
            animate={isActive ? "active" : "idle"}
          />

          {/* FASE 3: ZETA VIOLETA */}
          <m.path
            d={`M${n.tl.x} ${n.tl.y} L${n.tr.x} ${n.tr.y} L${n.bl.x} ${n.bl.y} L${n.br.x} ${n.br.y}`}
            fill="none"
            stroke={violet}
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            variants={violetPathVariants}
            initial="idle"
            animate={isActive ? "active" : "idle"}
          />
        </m.g>
      </m.svg>

      {/* 5. REGIÓN VIVA PARA ANUNCIOS EN TIEMPO REAL */}
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