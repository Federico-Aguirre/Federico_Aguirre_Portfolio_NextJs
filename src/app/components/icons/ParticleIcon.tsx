"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const ParticleIcon = ({ isActive = true, size = 32, style, ...props }: IconProps) => {
  // El trazado original exacto sin alteraciones
  const originalPath = "M7,12A5,5,0,1,0,2,7,5.006,5.006,0,0,0,7,12ZM7,4A3,3,0,1,1,4,7,3,3,0,0,1,7,4Zm5,10a4,4,0,1,0,4,4A4,4,0,0,0,12,14Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,20ZM22,9a3,3,0,1,0-3,3A3,3,0,0,0,22,9Zm-3,1a1,1,0,1,1,1-1A1,1,0,0,1,19,10ZM16,5a1,1,0,1,1-1-1A1,1,0,0,1,16,5Zm3,10a1,1,0,1,1-1,1A1,1,0,0,1,19,15ZM6,13a1,1,0,1,1-1,1A1,1,0,0,1,6,13Z";

  // Rutas de red que conectan los centros exactos de tus 6 círculos
  // Centros: (7,7), (12,18), (19,9), (16,4), (19,14), (6,12)
  const networkTriangles = "M7,7 L19,9 L12,18 Z"; // Triángulo principal
  const networkSpokes = "M7,7 L16,4 M19,9 L19,14 M12,18 L6,12 M16,4 L19,9 M6,12 L7,7"; // Conexiones secundarias

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
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
        // Gravedad cero: El icono entero respira y flota sutilmente
        animate={isActive ? {
          rotate: [0, 2, -2, 0],
          scale: [1, 1.05, 1],
        } : { rotate: 0, scale: 1 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* 1. RED DE FONDO (Líneas tenues que forman la constelación) */}
        <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.5">
           <path d={networkTriangles} />
           <path d={networkSpokes} />
        </g>

        {/* 2. FLUJO DE DATOS CONTINUO (Líneas punteadas animadas) */}
        {isActive && (
          <g stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round">
            {/* Partículas viajando por el triángulo principal */}
            <motion.path
              d={networkTriangles}
              strokeDasharray="2 12"
              animate={{ strokeDashoffset: [14, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Partículas viajando por las conexiones exteriores */}
            <motion.path
              d={networkSpokes}
              strokeDasharray="1 10"
              animate={{ strokeDashoffset: [11, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </g>
        )}

        {/* 3. ICONO ORIGINAL (Nodos) */}
        <motion.path
          d={originalPath}
          fill="#fff"
          // Resplandor pulsante en los nodos
          animate={isActive ? {
            filter: [
              "drop-shadow(0 0 1px rgba(255,255,255,0.2))",
              "drop-shadow(0 0 4px rgba(255,255,255,0.8))",
              "drop-shadow(0 0 1px rgba(255,255,255,0.2))"
            ]
          } : { filter: "none" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 4. MICRO-PARTÍCULAS FLOTANTES (Profundidad extra) */}
        {isActive && [
          { r: 0.5, cx: 3, cy: 3, dur: 3, delay: 0 },
          { r: 0.8, cx: 21, cy: 19, dur: 4, delay: 1 },
          { r: 0.4, cx: 2, cy: 18, dur: 2.5, delay: 0.5 }
        ].map((p, i) => (
          <motion.circle
            key={`stray-${i}`}
            r={p.r}
            fill="#fff"
            initial={{ cx: p.cx, cy: p.cy, opacity: 0 }}
            animate={{
              cx: [p.cx, p.cx + (Math.random() * 3 - 1.5), p.cx],
              cy: [p.cy, p.cy + (Math.random() * 3 - 1.5), p.cy],
              opacity: [0, 0.7, 0]
            }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.svg>
    </div>
  );
};