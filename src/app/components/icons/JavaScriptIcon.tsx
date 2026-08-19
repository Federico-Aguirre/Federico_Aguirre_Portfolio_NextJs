"use client";

import React from "react";
// Importamos useReducedMotion para evaluar las preferencias del usuario
import { m, useReducedMotion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const JavaScriptIcon = ({ isActive = true, size = 30, style, ...props }: IconProps) => {
  // ACCESIBILIDAD: Detectar si el usuario prefiere movimiento reducido
  const shouldReduceMotion = useReducedMotion();
  const animateIcon = isActive && !shouldReduceMotion;

  const brandYellow = "#f7df1e";
  const brandBlack = "#000000";

  const jsPath = "M324 370c10 17 24 29 47 29c20 0 33-10 33 -24c0-16 -13 -22 -35 -32l-12-5c-35-15 -58 -33 -58 -72c0-36 27 -64 70 -64c31 0 53 11 68 39l-37 24c-8-15 -17 -21 -31 -21c-14 0-23 9 -23 21c0 14 9 20 30 29l12 5c41 18 64 35 64 76c0 43-34 67 -80 67c-45 0-74 -21 -88 -49zm-170 4c8 13 14 25 31 25c16 0 26-6 26 -30V203h48v164c0 50-29 72 -72 72c-39 0-61 -20 -72 -44z";

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style
      }}
      {...props}
    >
      <m.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="100%"
        height="100%"
        // ACCESIBILIDAD
        aria-hidden="true"
        focusable="false"
        initial={{ scale: 1 }}
        animate={{ scale: animateIcon ? 1.05 : 1 }}
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        <defs>
          <pattern id="js-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={brandBlack} strokeWidth="1" opacity="0.1" />
          </pattern>
          <clipPath id="js-clip">
            <rect width="512" height="512" rx="76.8" />
          </clipPath>
        </defs>

        <g clipPath="url(#js-clip)">
          <rect width="512" height="512" fill={brandYellow} />

          {/* GRID */}
          <m.rect
            width="512"
            height="512"
            fill="url(#js-grid)"
            initial={{ opacity: 0 }}
            animate={{ opacity: animateIcon ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* CÍRCULOS DE FONDO */}
          <m.circle
            cx="256" cy="256" r="180"
            fill="none" stroke={brandBlack} strokeWidth="4" strokeDasharray="30 20"
            style={{ originX: "256px", originY: "256px" }}
            initial={{ rotate: 0, opacity: 0 }}
            animate={animateIcon ? { rotate: 360, opacity: 1 } : { rotate: 0, opacity: 0 }}
            transition={animateIcon ? { duration: 10, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
          />
          <m.circle
            cx="256" cy="256" r="130"
            fill="none" stroke={brandBlack} strokeWidth="2" strokeDasharray="15 15"
            style={{ originX: "256px", originY: "256px" }}
            initial={{ rotate: 0, opacity: 0 }}
            animate={animateIcon ? { rotate: -360, opacity: 1 } : { rotate: 0, opacity: 0 }}
            transition={animateIcon ? { duration: 8, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
          />

          {/* ESCÁNER LÁSER */}
          <m.g
            initial={{ y: -50, opacity: 0 }}
            animate={{ 
              y: animateIcon ? [ -50, 550, -50 ] : -50,
              opacity: animateIcon ? 1 : 0 
            }}
            transition={{ 
              y: { duration: 3, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.3 }
            }}
          >
            <line x1="0" y1="25" x2="512" y2="25" stroke={brandBlack} strokeWidth="12" opacity="0.6" />
            <line x1="0" y1="0" x2="512" y2="0" stroke={brandBlack} strokeWidth="5" opacity="0.4" />
          </m.g>

          {/* TRAZO JS (Stroke) */}
          <m.path
            d={jsPath}
            fill="none"
            stroke={brandBlack}
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animateIcon ? { pathLength: [0, 1, 1], opacity: [1, 1, 0] } : { pathLength: 1, opacity: 0 }}
            transition={animateIcon ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
          />

          {/* RELLENO JS (Solid) */}
          <m.path
            d={jsPath}
            fill={brandBlack}
            initial={{ opacity: 1 }}
            animate={animateIcon ? { opacity: [0.3, 1, 1] } : { opacity: 1 }}
            transition={animateIcon ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
          />
        </g>
      </m.svg>
    </div>
  );
};