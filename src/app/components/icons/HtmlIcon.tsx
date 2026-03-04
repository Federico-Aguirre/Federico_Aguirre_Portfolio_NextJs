"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const HtmlIcon = ({ isActive = true, size = 30, style, ...props }: IconProps) => {
  // El trazado exacto del número 5
  const path5 = "M9.5 17.5L8.5 8H24L23.5 11H11.5L12 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5H9.5Z";

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
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ scale: isActive ? 1.05 : 1 }}
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        {/* Grupo principal: Escudo completo que levita suavemente */}
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: isActive ? [0, -1.5, 1.5, 0] : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Fondo del Escudo (Naranja Oscuro) */}
          <path d="M6 28L4 3H28L26 28L16 31L6 28Z" fill="#E44D26" />
          
          {/* Relieve del Escudo (Naranja Claro) */}
          <path d="M26 5H16V29.5L24 27L26 5Z" fill="#F16529" />

          {/* 1. ANIMACIÓN DE RENDERIZADO: Línea de contorno que dibuja el "5" */}
          <motion.path
            d={path5}
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeLinejoin="round"
            initial={{ pathLength: 1, opacity: 0 }}
            animate={{
              pathLength: isActive ? [0, 1, 1] : 1,
              opacity: isActive ? [1, 1, 0] : 0
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* 2. RELLENO DEL "5": Aparece justo después de dibujarse el contorno */}
          <motion.path
            d={path5}
            fill="#ffffff"
            initial={{ opacity: 1 }}
            animate={{ opacity: isActive ? [0, 1, 1] : 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};