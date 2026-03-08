"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const HtmlIcon = ({ isActive = true, size = 30, style, ...props }: IconProps) => {
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
        initial={{ scale: 1 }}
        animate={{ scale: isActive ? 1.05 : 1 }}
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        <motion.g
          initial={{ y: 0 }}
          animate={isActive ? { y: [0, -1.5, 1.5, 0] } : { y: 0 }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          {/* Fondo del Escudo */}
          <path d="M6 28L4 3H28L26 28L16 31L6 28Z" fill="#E44D26" />
          <path d="M26 5H16V29.5L24 27L26 5Z" fill="#F16529" />

          {/* 1. Línea de contorno (Dibuja el 5) */}
          <motion.path
            d={path5}
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeLinejoin="round"
            // SOLUCIÓN AL WARNING: Definimos explícitamente el valor inicial
            initial={{ pathLength: 0, opacity: 0 }} 
            animate={isActive ? {
              pathLength: [0, 1, 1],
              opacity: [1, 1, 0] // El warning venía de aquí si initial.opacity era undefined
            } : { 
              pathLength: 1, 
              opacity: 0 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />

          {/* 2. Relleno del "5" */}
          <motion.path
            d={path5}
            fill="#ffffff"
            // SOLUCIÓN AL WARNING: opacity 1 por defecto para el estado inactivo
            initial={{ opacity: 1 }}
            animate={isActive ? { 
              opacity: [0, 0, 1, 1] 
            } : { 
              opacity: 1 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};