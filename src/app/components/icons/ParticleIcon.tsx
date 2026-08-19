"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";

export interface ParticleIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Estado activo de la animación */
  isActive?: boolean;
  /** Tamaño del ícono (ancho y alto) */
  size?: number | string;
  /** Texto accesible para lectores de pantalla. Si se omite y no hay aria-labelledby, se marca como decorativo */
  "aria-label"?: string;
  /** ID del elemento que describe el ícono */
  "aria-labelledby"?: string;
  /** Mensaje opcional para anunciar dinámicamente cambios de estado a lectores de pantalla */
  announcement?: string;
  /** Color principal del ícono. Por defecto usa 'currentColor' para máxima adaptabilidad */
  color?: string;
}

export const ParticleIcon = ({
  isActive = true,
  size = 32,
  color = "currentColor",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  announcement,
  style,
  role,
  ...props
}: ParticleIconProps) => {
  // 1. ACCESIBILIDAD: Detectar movimiento reducido
  const shouldReduceMotion = useReducedMotion();
  const animateIcon = isActive && !shouldReduceMotion;

  // 2. ACCESIBILIDAD: Lógica para determinar si el icono es semántico o decorativo
  const isDecorative = !ariaLabel && !ariaLabelledby && props["aria-hidden"] !== false;
  const computedRole = role || (!isDecorative ? "img" : undefined);

  // Trazo original exacto
  const originalPath =
    "M7,12A5,5,0,1,0,2,7,5.006,5.006,0,0,0,7,12ZM7,4A3,3,0,1,1,4,7,3,3,0,0,1,7,4Zm5,10a4,4,0,1,0,4,4A4,4,0,0,0,12,14Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,20ZM22,9a3,3,0,1,0-3,3A3,3,0,0,0,22,9Zm-3,1a1,1,0,1,1,1-1A1,1,0,0,1,19,10ZM16,5a1,1,0,1,1-1-1A1,1,0,0,1,16,5Zm3,10a1,1,0,1,1-1,1A1,1,0,0,1,19,15ZM6,13a1,1,0,1,1-1,1A1,1,0,0,1,6,13Z";

  // Red de conexiones
  const networkTriangles = "M7,7 L19,9 L12,18 Z";
  const networkSpokes =
    "M7,7 L16,4 M19,9 L19,14 M12,18 L6,12 M16,4 L19,9 M6,12 L7,7";

  return (
    <>
      <div
        role={computedRole}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-hidden={isDecorative ? true : undefined}
        style={{
          position: "relative",
          width: size,
          height: size,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: color,
          // ACCESIBILIDAD: Adaptabilidad para Alto Contraste (Windows High Contrast Mode)
          forcedColorAdjust: "auto",
          ...style,
        }}
        {...props}
      >
        <m.svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          aria-hidden="true"
          style={{ overflow: "visible" }}
          animate={
            animateIcon
              ? {
                  rotate: [0, 2, -2, 0],
                  scale: [1, 1.05, 1],
                }
              : { rotate: 0, scale: 1 }
          }
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* 1. RED DE FONDO (Con currentColor y opacidad en porcentaje para respetar alto contraste) */}
          <g
            stroke="currentColor"
            strokeOpacity={0.25}
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          >
            <path d={networkTriangles} />
            <path d={networkSpokes} />
          </g>

          {/* 2. FLUJO DE DATOS CONTINUO */}
          {animateIcon && (
            <g
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            >
              <m.path
                d={networkTriangles}
                strokeDasharray="2 12"
                animate={{ strokeDashoffset: [14, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <m.path
                d={networkSpokes}
                strokeDasharray="1 10"
                animate={{ strokeDashoffset: [11, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </g>
          )}

          {/* 3. ICONO ORIGINAL (Nodos) */}
          <m.path
            d={originalPath}
            fill="currentColor"
            animate={
              animateIcon
                ? {
                    filter: [
                      "drop-shadow(0 0 1px currentColor)",
                      "drop-shadow(0 0 4px currentColor)",
                      "drop-shadow(0 0 1px currentColor)",
                    ],
                  }
                : { filter: "none" }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* 4. MICRO-PARTÍCULAS FLOTANTES */}
          {animateIcon &&
            [
              { r: 0.5, cx: 3, cy: 3, dur: 3, delay: 0 },
              { r: 0.8, cx: 21, cy: 19, dur: 4, delay: 1 },
              { r: 0.4, cx: 2, cy: 18, dur: 2.5, delay: 0.5 },
            ].map((p, i) => (
              <m.circle
                key={`stray-${i}`}
                r={p.r}
                fill="currentColor"
                initial={{ cx: p.cx, cy: p.cy, opacity: 0 }}
                animate={{
                  cx: [p.cx, p.cx + 1, p.cx],
                  cy: [p.cy, p.cy - 1, p.cy],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: p.dur,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
        </m.svg>
      </div>

      {/* 5. ACCESIBILIDAD: Región interactiva de anuncios de estado en tiempo real */}
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

export default ParticleIcon;