"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const PostCssIcon = ({ isActive = false, size = 40, style, ...props }: IconProps) => {
  // 1. BASE DE COLOR (Mantenemos la base constante)
  const baseFilters = "invert(29%) sepia(58%) saturate(2758%) hue-rotate(342deg)";
  
  // CORRECCIÓN: Estructuras de filtros estrictamente idénticas
  // IMPORTANTE: Los valores como '1' deben ser '1.0' para asegurar compatibilidad de tipos en algunos motores
  const neonOn = `${baseFilters} brightness(1.3) grayscale(0) drop-shadow(0px 0px 3px rgba(255,255,255,0.9)) drop-shadow(0px 0px 12px rgba(255,0,0,1)) drop-shadow(0px 0px 25px rgba(221,55,53,1))`;
  
  const neonOff = `${baseFilters} brightness(0.3) grayscale(0.6) drop-shadow(0px 0px 0px rgba(255,255,255,0)) drop-shadow(0px 0px 0px rgba(255,0,0,0)) drop-shadow(0px 0px 0px rgba(221,55,53,0))`;

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
            backgroundColor: `rgba(200, 200, 200, ${cloud.opacity})`,
            filter: "url(#fog-noise-particle)", 
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
        ...style
      }}
      {...props}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="fog-noise-particle">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" stitchTiles="stitch" />
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
      </svg>

      <motion.img
        src="https://www.vectorlogo.zone/logos/postcss/postcss-icon.svg"
        alt="PostCSS Icon"
        // CORRECCIÓN: Agregamos initial para evitar el salto de hidratación
        initial={{ opacity: 0.4, filter: neonOff }}
        animate={{
          opacity: isActive ? 1 : 0.4,
          filter: isActive ? neonOn : neonOff,
        }}
        transition={{ 
          duration: 1.5,
          ease: "easeInOut" 
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          // Mantenemos tu rotación scaleY(-1) si es intencional para el diseño
          transform: "scaleY(-1)",
          zIndex: 0,
        }}
      />

      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: -20, left: -40, right: -40, bottom: -20,
            pointerEvents: 'none',
            zIndex: 10,
            maskImage: 'linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)',
            overflow: 'hidden'
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