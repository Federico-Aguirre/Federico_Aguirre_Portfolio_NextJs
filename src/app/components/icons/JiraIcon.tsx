"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const JiraIcon = ({ isActive = false, size = 40, style, ...props }: IconProps) => {
  const brandBlue = "#2684FF";

  // Trazados del SVG original
  const centerPath = "M15.808 7.552L8.69.667 8 0 2.642 5.183l-2.45 2.37A.623.623 0 000 8c0 .168.069.329.192.448l4.895 4.735L8 16l5.358-5.183.083-.08 2.367-2.29A.623.623 0 0016 8a.623.623 0 00-.192-.448zM8 10.365L5.554 8 8 5.635 10.446 8 8 10.365z";
  const topLeftPath = "M8 5.634A3.918 3.918 0 016.794 2.83 3.917 3.917 0 017.983.018L2.63 5.193 5.543 8.01 8 5.634z";
  const bottomRightPath = "M10.452 7.994L8 10.365c.383.37.686.81.893 1.293a3.87 3.87 0 010 3.05c-.207.483-.51.922-.893 1.292l5.365-5.189-2.913-2.817z";

  // Configuración de la rotación orbital
  const spinTransition = {
    duration: 1.5,
    repeat: Infinity,
    ease: "linear",
  };

  // Configuración del radar (ondas de choque)
  const radarTransition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeOut",
  };

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
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="paint0_linear" x1="7.563" y1="3.241" x2="4.262" y2="6.654" gradientUnits="userSpaceOnUse">
            <stop offset=".18" stopColor="#0052CC" />
            <stop offset="1" stopColor="#2684FF" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="216.055" y1="490.616" x2="331.647" y2="413.158" gradientUnits="userSpaceOnUse">
            <stop offset=".18" stopColor="#0052CC" />
            <stop offset="1" stopColor="#2684FF" />
          </linearGradient>
          
          {/* Filtro para el brillo intenso del centro */}
          <filter id="jira-glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* ONDAS DE RADAR (Visibles solo al activar) */}
        {isActive && (
          <motion.g style={{ transformOrigin: "8px 8px" }}>
            <motion.circle
              cx="8" cy="8" r="4"
              stroke={brandBlue} strokeWidth="0.2" fill="none"
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ ...radarTransition, delay: 0 }}
            />
            <motion.circle
              cx="8" cy="8" r="4"
              stroke={brandBlue} strokeWidth="0.2" fill="none"
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ ...radarTransition, delay: 1 }}
            />
          </motion.g>
        )}

        <motion.g
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          style={{ transformOrigin: "8px 8px" }}
        >
          {/* 1. NÚCLEO CENTRAL */}
          <motion.path
            d={centerPath}
            fill={brandBlue}
            style={{ transformOrigin: "8px 8px" }}
            animate={isActive ? {
              scale: [1, 1.15, 1],
              filter: "url(#jira-glow)"
            } : {
              scale: 1,
              filter: "none"
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* 2. PIEZA SUPERIOR IZQUIERDA Y SUS ESTELAS */}
          <motion.g style={{ transformOrigin: "8px 8px" }}>
            {/* Estela 2 (más transparente y retrasada) */}
            <motion.path
              d={topLeftPath} fill="url(#paint0_linear)"
              style={{ transformOrigin: "8px 8px" }}
              animate={isActive ? { rotate: 360, opacity: 0.2, scale: 1.1 } : { rotate: 0, opacity: 0, scale: 1 }}
              transition={isActive ? { ...spinTransition, delay: 0.15 } : { duration: 0.4 }}
            />
            {/* Estela 1 */}
            <motion.path
              d={topLeftPath} fill="url(#paint0_linear)"
              style={{ transformOrigin: "8px 8px" }}
              animate={isActive ? { rotate: 360, opacity: 0.5, scale: 1.1 } : { rotate: 0, opacity: 0, scale: 1 }}
              transition={isActive ? { ...spinTransition, delay: 0.07 } : { duration: 0.4 }}
            />
            {/* Pieza Principal */}
            <motion.path
              d={topLeftPath} fill="url(#paint0_linear)"
              style={{ transformOrigin: "8px 8px" }}
              animate={isActive ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
              transition={isActive ? spinTransition : { type: "spring", bounce: 0.4 }}
            />
          </motion.g>

          {/* 3. PIEZA INFERIOR DERECHA Y SUS ESTELAS */}
          <motion.g style={{ transformOrigin: "8px 8px" }}>
            {/* Estela 2 */}
            <motion.path
              d={bottomRightPath} fill="url(#paint1_linear)"
              style={{ transformOrigin: "8px 8px" }}
              animate={isActive ? { rotate: 360, opacity: 0.2, scale: 1.1 } : { rotate: 0, opacity: 0, scale: 1 }}
              transition={isActive ? { ...spinTransition, delay: 0.15 } : { duration: 0.4 }}
            />
            {/* Estela 1 */}
            <motion.path
              d={bottomRightPath} fill="url(#paint1_linear)"
              style={{ transformOrigin: "8px 8px" }}
              animate={isActive ? { rotate: 360, opacity: 0.5, scale: 1.1 } : { rotate: 0, opacity: 0, scale: 1 }}
              transition={isActive ? { ...spinTransition, delay: 0.07 } : { duration: 0.4 }}
            />
            {/* Pieza Principal */}
            <motion.path
              d={bottomRightPath} fill="url(#paint1_linear)"
              style={{ transformOrigin: "8px 8px" }}
              animate={isActive ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
              transition={isActive ? spinTransition : { type: "spring", bounce: 0.4 }}
            />
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  );
};