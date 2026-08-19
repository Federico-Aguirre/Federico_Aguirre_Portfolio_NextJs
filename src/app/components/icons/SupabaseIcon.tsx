"use client";

import React, { useId } from "react";
import {
  m,
  Variants,
  SVGMotionProps,
  useReducedMotion,
} from "framer-motion";

export interface SupabaseIconProps extends SVGMotionProps<SVGSVGElement> {
  /** Activa el ciclo de animación de ondas expansivas */
  isActive?: boolean;
  /** Etiqueta accesible. Si se omite, el ícono se marca como decorativo */
  "aria-label"?: string;
  /** Anuncio en tiempo real para lectores de pantalla si cambia el estado */
  announcement?: string;
  /** Color primario personalizable (soporta 'currentColor' para temas) */
  color?: string;
}

export const SupabaseIcon = ({
  isActive = false,
  "aria-label": ariaLabel,
  announcement,
  color = "#3ECF8E",
  style,
  role,
  ...props
}: SupabaseIconProps) => {
  // 1. ID ÚNICO PARA PREVENIR DUPLICADOS EN EL GRADIENTE SVG
  const gradientId = useId();

  // 2. DETECCIÓN DE PREFERENCIA DE MOVIMIENTO REDUCIDO
  const shouldReduceMotion = useReducedMotion();
  const animateIcon = isActive && !shouldReduceMotion;

  // 3. GESTIÓN SEMÁNTICA (Informativo vs. Decorativo)
  const isExplicitlyHidden = props["aria-hidden"] === true;
  const hasLabel = Boolean(ariaLabel || props["aria-labelledby"]);
  const isDecorative = isExplicitlyHidden || !hasLabel;

  const computedRole = role || (!isDecorative ? "img" : undefined);

  // Rutas del rayo de Supabase
  const topPath =
    "M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z";
  const bottomPath =
    "M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z";

  const supabaseDark = "#249361";
  const centerOrigin = { transformOrigin: "55px 56.5px" };
  const waveDelays = [0, 0.5, 1];

  // 4. VARIANTES ADAPTATIVAS (Congelan el movimiento si shouldReduceMotion es true)
  const waveGroupVariants: Variants = {
    idle: {
      scale: 1,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    active: (delay: number) => ({
      scale: shouldReduceMotion ? 1 : [1, 2.2],
      opacity: shouldReduceMotion ? 0 : [0.8, 0],
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
            delay,
          },
    }),
  };

  const wavePathVariants: Variants = {
    idle: { strokeWidth: 0 },
    active: (delay: number) => ({
      strokeWidth: shouldReduceMotion ? 0 : [5, 3, 0],
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
            delay,
            times: [0, 0.7, 1],
          },
    }),
  };

  const centerIconVariants: Variants = {
    idle: {
      scale: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    active: {
      scale: shouldReduceMotion ? 1 : [1, 1.08, 1],
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
    },
  };

  const LightningOutline = ({ delay }: { delay: number }) => (
    <g>
      <m.path
        d={topPath}
        variants={wavePathVariants}
        custom={delay}
        initial="idle"
        animate={animateIcon ? "active" : "idle"}
        vectorEffect="non-scaling-stroke"
      />
      <m.path
        d={bottomPath}
        variants={wavePathVariants}
        custom={delay}
        initial="idle"
        animate={animateIcon ? "active" : "idle"}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );

  return (
    <>
      <m.svg
        width="100%"
        height="100%"
        viewBox="0 0 110 113"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role={computedRole}
        aria-label={ariaLabel}
        aria-hidden={isDecorative ? true : undefined}
        focusable="false"
        {...props}
        style={{
          overflow: "visible",
          color: color,
          // 5. ACCESIBILIDAD: ALTO CONTRASTE Y RESPALDO CSS
          forcedColorAdjust: "auto",
          ...style,
        }}
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="53.9738"
            y1="54.974"
            x2="94.1635"
            y2="71.8295"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={supabaseDark} />
            <stop offset="1" stopColor="currentColor" />
          </linearGradient>
        </defs>

        {/* --- ONDAS EXTERNAS (DESACTIVADAS SI HAY REDUCED MOTION) --- */}
        <g
          stroke="currentColor"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {waveDelays.map((delay, index) => (
            <m.g
              key={index}
              variants={waveGroupVariants}
              custom={delay}
              initial="idle"
              animate={animateIcon ? "active" : "idle"}
              style={centerOrigin}
              aria-hidden="true"
            >
              <LightningOutline delay={delay} />
            </m.g>
          ))}
        </g>

        {/* --- ÍCONO CENTRAL --- */}
        <m.g
          variants={centerIconVariants}
          initial="idle"
          animate={animateIcon ? "active" : "idle"}
          style={centerOrigin}
        >
          <path d={topPath} fill="currentColor" />
          <path d={bottomPath} fill={`url(#${gradientId})`} />
          <path
            d={bottomPath}
            fill="black"
            fillOpacity="0.2"
            style={{ mixBlendMode: "overlay" }}
          />
        </m.g>
      </m.svg>

      {/* 6. REGIÓN VIVA PARA LECTORES DE PANTALLA */}
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

export default SupabaseIcon;