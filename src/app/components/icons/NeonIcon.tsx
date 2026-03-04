"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const NeonIcon = ({ isActive = false, size = 40, style, ...props }: IconProps) => {
  const neonGreen = "#62F755";
  const neonTeal = "#00E0D9";

  return (
    <div
      data-active={isActive.toString()}
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
      <style>
        {`
          /* Flotación sutil para que no parezca estático */
          @keyframes neonFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-2px); }
          }

          /* Pulso intenso del tubo de luz principal (la parte verde brillante) */
          @keyframes neonTubePulse {
            0%, 100% {
              filter: brightness(1) drop-shadow(0 0 2px ${neonGreen});
            }
            50% {
              /* Subimos el brillo al máximo y le damos un aura verde concentrada */
              filter: brightness(1.6) drop-shadow(0 0 12px ${neonGreen});
            }
          }

          .neon-group {
            transform-origin: center;
          }

          div[data-active="true"] .neon-group {
            animation: neonFloat 3s ease-in-out infinite;
          }

          div[data-active="true"] .neon-tube {
            animation: neonTubePulse 2s ease-in-out infinite;
          }

          .neon-tube {
            transition: all 0.3s ease;
          }
        `}
      </style>

      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 145 145"
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
                // ESCALA CONTROLADA
                scale: 0.85, 
                opacity: 1,
                // Sombra dual extrema: Turquesa extendido + Verde concentrado
                filter: `grayscale(0) drop-shadow(0 0 15px ${neonTeal}) drop-shadow(0 0 6px ${neonGreen})`,
              }
            : {
                // ESCALA INACTIVA (más pequeña)
                scale: 0.65, 
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
        <defs>
          <linearGradient x1="100%" y1="100%" x2="12%" y2="0%" id="neon-grad-a">
            <stop stopColor="#62F755" offset="0%" />
            <stop stopColor="#8FF986" stopOpacity="0" offset="100%" />
          </linearGradient>
          <linearGradient x1="100%" y1="100%" x2="40.6%" y2="76.9%" id="neon-grad-b">
            <stop stopColor="#000000" stopOpacity="0.9" offset="0%" />
            <stop stopColor="#1A1A1A" stopOpacity="0" offset="100%" />
          </linearGradient>
        </defs>
        
        <g className="neon-group">
          {/* Capa 1: Base Turquesa */}
          <path
            d="M0,24.91C0,11.15 11.15,0 24.91,0 L119.56,0 C133.32,0 144.47,11.15 144.47,24.91 L144.47,105.41 C144.47,119.64 126.46,125.82 117.73,114.59 L90.42,79.45 L90.42,122.05 C90.42,134.43 80.38,144.47 68,144.47 L24.91,144.47 C11.15,144.47 0,133.32 0,119.56 L0,24.91 Z M24.91,19.93 C22.16,19.93 19.93,22.16 19.93,24.91 L19.93,119.56 C19.93,122.31 22.16,124.55 24.91,124.55 L68.75,124.55 C70.12,124.55 70.49,123.43 70.49,122.05 L70.49,64.93 C70.49,50.7 88.5,44.52 97.24,55.76 L124.55,90.88 L124.55,24.91 C124.55,22.16 124.8,19.93 122.05,19.93 L24.91,19.93 Z"
            fill="#00E0D9"
          />
          {/* Capa 2: Gradiente Verde */}
          <path
            d="M0,24.91C0,11.15 11.15,0 24.91,0 L119.56,0 C133.32,0 144.47,11.15 144.47,24.91 L144.47,105.41 C144.47,119.64 126.46,125.82 117.73,114.59 L90.42,79.45 L90.42,122.05 C90.42,134.43 80.38,144.47 68,144.47 L24.91,144.47 C11.15,144.47 0,133.32 0,119.56 L0,24.91 Z M24.91,19.93 C22.16,19.93 19.93,22.16 19.93,24.91 L19.93,119.56 C19.93,122.31 22.16,124.55 24.91,124.55 L68.75,124.55 C70.12,124.55 70.49,123.43 70.49,122.05 L70.49,64.93 C70.49,50.7 88.5,44.52 97.24,55.76 L124.55,90.88 L124.55,24.91 C124.55,22.16 124.8,19.93 122.05,19.93 L24.91,19.93 Z"
            fill="url(#neon-grad-a)"
          />
          {/* Capa 3: Sombreado oscuro */}
          <path
            d="M0,24.91C0,11.15 11.15,0 24.91,0 L119.56,0 C133.32,0 144.47,11.15 144.47,24.91 L144.47,105.41 C144.47,119.64 126.46,125.82 117.73,114.59 L90.42,79.45 L90.42,122.05 C90.42,134.43 80.38,144.47 68,144.47 L24.91,144.47 C11.15,144.47 0,133.32 0,119.56 L0,24.91 Z M24.91,19.93 C22.16,19.93 19.93,22.16 19.93,24.91 L19.93,119.56 C19.93,122.31 22.16,124.55 24.91,124.55 L68.75,124.55 C70.12,124.55 70.49,123.43 70.49,122.05 L70.49,64.93 C70.49,50.7 88.5,44.52 97.24,55.76 L124.55,90.88 L124.55,24.91 C124.55,22.16 124.8,19.93 122.05,19.93 L24.91,19.93 Z"
            fillOpacity="0.4"
            fill="url(#neon-grad-b)"
          />
          {/* Capa 4: El tubo verde brillante principal (Animado individualmente) */}
          <path
            className="neon-tube"
            d="M119.56,0 C133.32,0 144.47,11.15 144.47,24.91 L144.47,105.41 C144.47,119.64 126.46,125.82 117.73,114.59 L90.42,79.45 L90.42,122.05 C90.42,134.43 80.38,144.47 68,144.47 C68.66,144.47 69.29,144.21 69.76,143.74 C70.23,143.28 70.49,124.64 70.49,123.98 L70.49,64.93 C70.49,50.7 88.5,44.52 97.24,55.76 L124.55,90.88 L124.55,4.98 C124.55,2.23 122.31,0 119.56,0 Z"
            fill="#63F655"
          />
        </g>
      </motion.svg>
    </div>
  );
};