"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const LaravelDuskIcon = ({ isActive = false, size = 40, style, ...props }: IconProps) => {
  // Colores del logo original
  const startColor = "#9B27AD";
  const endColor = "#F44F4F";

  // 1. CONFIGURACIÓN DEL LOOP DE DIBUJO (Sin morphing, solo trazado dinámico)
  const drawLoop = {
    pathLength: [1.05, 0, 1.05],
    pathOffset: [0, 1],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
    }
  };

  // 2. CONFIGURACIÓN DEL BUCLE PERFECTO DE NIEBLA (Tomado de PostCSS)
  const FOG_CHUNK_WIDTH = 400; 
  
  const fogClouds = [
    { id: 1, top: "5%", left: 0, scale: 1.2, floatDuration: 4, opacity: 0.6 },
    { id: 2, top: "35%", left: 80, scale: 0.8, floatDuration: 5, opacity: 0.5 },
    { id: 3, top: "-10%", left: 160, scale: 1.5, floatDuration: 6, opacity: 0.4 },
    { id: 4, top: "45%", left: 240, scale: 1.0, floatDuration: 4.5, opacity: 0.7 },
    { id: 5, top: "15%", left: 320, scale: 0.9, floatDuration: 5.5, opacity: 0.5 },
  ];

  const renderFogChunk = () => (
    <div style={{ position: "relative", width: FOG_CHUNK_WIDTH, height: "100%", flexShrink: 0 }}>
      {fogClouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          initial={{ scale: cloud.scale, y: "-10%" }}
          animate={{ y: ["-10%", "10%", "-10%"] }} 
          transition={{
            duration: cloud.floatDuration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            top: cloud.top,
            left: cloud.left,
            width: "100px", 
            height: "60px",
            // Un tono ligeramente purpura/rosado para que combine con el ambiente Dusk
            backgroundColor: `rgba(230, 200, 240, ${cloud.opacity})`,
            filter: "url(#dusk-fog-noise-particle)", 
            mixBlendMode: "normal",
            maskImage: "radial-gradient(closest-side, black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(closest-side, black 20%, transparent 100%)",
            transformOrigin: "center center",
          }}
        />
      ))}
    </div>
  );

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
      {/* DEFS GLOBALES PARA LA NIEBLA Y GRADIENTES */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <linearGradient id="dusk-grad" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor={startColor} />
            <stop offset="1" stopColor={endColor} />
          </linearGradient>
          <filter id="dusk-fog-noise-particle">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" stitchTiles="stitch" />
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
      </svg>

      {/* ICONO DE LARAVEL DUSK */}
      <motion.svg
        viewBox="0 0 80 80"
        style={{
          width: "100%",
          height: "100%",
          overflow: "visible",
          zIndex: 0,
        }}
        animate={{
          scale: isActive ? 1.05 : 1,
          filter: isActive 
            ? `drop-shadow(0 0 12px ${endColor}aa)` 
            : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
        }}
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        {/* 1. Fondo (Gradiente circular) */}
        <motion.path
          d="M40 80C17.9 80 0 62.1 0 40C0 17.9 17.9 0 40 0C62.1 0 80 17.9 80 40C80 62.1 62.1 80 40 80Z"
          fill="url(#dusk-grad)"
          initial={{ opacity: 1 }}
          animate={{ opacity: isActive ? 0.3 : 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* 2. Relleno de la forma interna */}
        <motion.path
          d="M33.9 45.5C25.5 37.1 23.5 24.6 28.1 14.3C25.1 15.7 22.2 17.6 19.7 20.1C8.8 31 8.8 48.8 19.7 59.7C30.6 70.6 48.4 70.6 59.3 59.7C61.8 57.2 63.7 54.4 65.1 51.3C54.9 55.9 42.4 54 33.9 45.5ZM39.6 63.9C33.2 63.9 27.2 61.4 22.6 56.9C13.5 47.8 13.3 33.2 21.8 23.8C21.3 32.8 24.5 41.8 31.1 48.4C37.1 54.4 45.2 57.8 53.7 57.8C54.4 57.8 55 57.8 55.7 57.7C51.3 61.7 45.6 63.9 39.6 63.9Z"
          fill="white"
          animate={{ opacity: isActive ? 0.1 : 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* 3. Trazo animado de la forma interna (Solo visible al activar) */}
        <motion.path
          d="M33.9 45.5C25.5 37.1 23.5 24.6 28.1 14.3C25.1 15.7 22.2 17.6 19.7 20.1C8.8 31 8.8 48.8 19.7 59.7C30.6 70.6 48.4 70.6 59.3 59.7C61.8 57.2 63.7 54.4 65.1 51.3C54.9 55.9 42.4 54 33.9 45.5ZM39.6 63.9C33.2 63.9 27.2 61.4 22.6 56.9C13.5 47.8 13.3 33.2 21.8 23.8C21.3 32.8 24.5 41.8 31.1 48.4C37.1 54.4 45.2 57.8 53.7 57.8C54.4 57.8 55 57.8 55.7 57.7C51.3 61.7 45.6 63.9 39.6 63.9Z"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 1.05, opacity: 0 }}
          animate={isActive 
            ? { ...drawLoop, opacity: 1 } 
            : { pathLength: 1.05, opacity: 0 }
          }
        />
      </motion.svg>

      {/* SISTEMA DE NIEBLA DE BUCLE PERFECTO */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: -20, left: -40, right: -40, bottom: -20,
            pointerEvents: 'none',
            zIndex: 10,
            maskImage: 'linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: -FOG_CHUNK_WIDTH, 
              width: FOG_CHUNK_WIDTH * 2,
              height: "100%",
              display: "flex", 
            }}
            animate={{ x: [0, FOG_CHUNK_WIDTH] }} 
            transition={{
              duration: 15, 
              ease: "linear",
              repeat: Infinity 
            }}
          >
            {renderFogChunk()}
            {renderFogChunk()}
          </motion.div>
        </div>
      )}
    </div>
  );
};