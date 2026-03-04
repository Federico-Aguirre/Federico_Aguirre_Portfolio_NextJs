"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const PhpUnitIcon = ({ isActive = false, size = 40, style, ...props }: IconProps) => {
  const glowBlueColor = "rgba(60, 156, 215, 0.8)";
  const glowGreenShadow = "rgba(57, 181, 74, 0.9)";
  const blockColor = "#39b54a";

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        ...style
      }}
      {...props}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 38.5 10.5"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          overflow: "visible",
        }}
        initial={false}
        animate={
          isActive
            ? {
                scale: 1.6, 
                opacity: 1,
                filter: `grayscale(0) drop-shadow(0px 0px 4px ${glowBlueColor}) drop-shadow(0px 2px 8px ${glowGreenShadow})`,
              }
            : {
                scale: 1.4,
                opacity: 0.4,
                filter: "grayscale(1) drop-shadow(0px 0px 0px rgba(0,0,0,0))",
              }
        }
        transition={{
          scale: { duration: 0.4, ease: "backOut" },
          filter: { duration: 0.5 },
          opacity: { duration: 0.3 },
        }}
      >
        {/* =========================================
            FONDO ESTÁTICO (LETRAS COMPLETAS)
        ========================================= */}
        {/* PHP (Celeste) */}
        <path fill="#3c9cd7" d="M15.88 0h-1.25c-1.18 0-1.81.76-1.81 2.24v7.27h2.08V6.13h.92c1.72 0 2.45-1.2 2.45-3.19 0-1.94-.83-2.94-2.39-2.94zm-.38 4.44h-.6V1.71h.61c.49 0 .73.37.73 1.29 0 .98-.26 1.44-.74 1.44z" />
        <path fill="#3c9cd7" d="M3.06 0H1.81C.63 0 0 .76 0 2.24v7.27h2.08V6.13H3c1.72 0 2.45-1.2 2.45-3.19C5.45 1 4.62 0 3.06 0zm-.39 4.44h-.6V1.71h.61c.49 0 .73.37.73 1.29.01.98-.26 1.44-.74 1.44z" />
        <path fill="#3c9cd7" d="M11.52 0c-1.18 0-1.81.76-1.81 2.24v1.55H8.23V0h-.27c-1.18 0-1.81.76-1.81 2.24v7.27h2.08V5.67h1.48v3.84h2.07V0h-.26z" />
        
        {/* UNIT (Azul Oscuro - Base sólida) */}
        <path fill="#356388" d="M22.72 0h1.97v1.77h-1.97z" />
        <path fill="#356388" d="M22.72 4.77v2.22c0 .52-.28.84-.75.84-.44 0-.76-.28-.76-.85V0h-.28c-1.18 0-1.81.76-1.81 2.24v4.8c0 1.8 1.03 2.61 2.73 2.61 1.6 0 2.85-.92 2.84-2.65V4.77h-1.97z" />
        <path fill="#356388" d="M22.72 2.33h1.97v1.88h-1.97z" /> 
        <path fill="#356388" d="M29.09 2.17c-.63 0-1.13.27-1.48.77v-.61h-.63c-.85 0-1.31.55-1.31 1.61v3.12h1.93V4.53c0-.43.21-.75.53-.75.43 0 .52.33.52.63v5.09h1.92V3.69c.02-.94-.65-1.52-1.48-1.52z" />
        <path fill="#356388" d="M25.68 7.62h1.93v1.88h-1.93z" /> 
        <path fill="#356388" d="M32.87 2.4c-.85 0-1.31.55-1.31 1.61v5.49h1.93V2.4z" />
        <path fill="#356388" d="M31.56 0h1.93v1.88h-1.93z" /> 
        <path fill="#356388" d="M37.81 3.89V2.4h-.97V.79h-.61c-.85 0-1.31.55-1.31 1.61h-.63v1.49h.63v4.2c0 1.05.75 1.52 1.69 1.52.37 0 .84-.07 1.19-.19V7.89c-.15.03-.36.04-.56.04-.31 0-.4-.15-.4-.41V3.89z" />

        {/* =========================================
            CUADRADOS ANIMADOS (VERDES)
        ========================================= */}
        {/* Cuadrado de la 'U' */}
        <motion.rect
          fill={blockColor}
          width="1.97"
          height="1.88"
          initial={{ x: 22.72, y: 2.33 }} 
          animate={isActive ? {
            x: [22.72, 22.72, 19.3, 19.3, 19.3, 22.72, 22.72, 22.72],
            y: [2.33,  7.6,   7.6,  0,    7.6,  7.6,   0,    2.33]
          } : { x: 22.72, y: 2.33 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Cuadrado de la 'N' */}
        <motion.rect
          fill={blockColor}
          width="1.93"
          height="1.88"
          initial={{ x: 25.68, y: 7.62 }}
          animate={isActive ? {
            x: [25.68, 25.68, 29.1, 29.1, 29.1, 25.68, 25.68],
            y: [7.62,  2.1,   2.1,  7.62, 2.1,  2.1,   7.62]
          } : { x: 25.68, y: 7.62 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Cuadrado de la 'I' */}
        <motion.rect
          fill={blockColor}
          width="1.93"
          height="1.88"
          initial={{ x: 31.56, y: 0 }} 
          animate={isActive ? {
            x: [31.56, 31.56, 31.56, 31.56],
            y: [0,     7.6,   2.4,   0]
          } : { x: 31.56, y: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Cuadrado de la 'T' (CORREGIDO: Ya no desaparece) */}
        <motion.rect
          fill={blockColor}
          width="1.93"
          height="1.88"
          initial={{ x: 35.3, y: 2.4 }} 
          animate={isActive ? {
            x: [35.3, 33.5, 36.5, 35.3, 35.3, 35.3, 35.3],
            y: [2.4,  2.4,  2.4,  2.4,  7.6,  0.8,  2.4],
          } : { x: 35.3, y: 2.4 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </motion.svg>
    </div>
  );
};