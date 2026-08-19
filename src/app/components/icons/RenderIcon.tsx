"use client";

import React from "react";
import { m, SVGMotionProps } from "framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
  isActive?: boolean;
}

export const RenderIcon = ({
  isActive = false,
  style,
  ...props
}: IconProps) => {
  const white = "#ffffff";
  const neonGreen = "#39FF14";

  // El path original del logo de Render
  const logoPath =
    "M15.6491 0.00582604C12.9679 -0.120371 10.7133 1.81847 10.3286 4.373C10.3134 4.49154 10.2905 4.60627 10.2715 4.72099C9.67356 7.90268 6.88955 10.3119 3.5457 10.3119C2.35364 10.3119 1.23395 10.006 0.258977 9.47058C0.140914 9.40557 0 9.4897 0 9.62354V10.3081V20.6218H10.2677V12.8894C10.2677 11.4668 11.4178 10.3119 12.8346 10.3119H15.4015C18.3074 10.3119 20.6458 7.89121 20.5315 4.94662C20.4287 2.29649 18.2884 0.132023 15.6491 0.00582604Z";

  return (
    <m.svg
      width="100%"
      height="100%"
      viewBox="0 0 21 21" // Ajustado al tamaño real del path
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo de Render"
      {...props}
      style={{ overflow: "visible", ...style }}
      initial="idle"
      animate={isActive ? "active" : "idle"}
      variants={{
        idle: { y: 0 },
        active: { 
          y: [-1, 1, -1], // Pequeña levitación constante
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      }}
    >
      {/* CAPA 1: Base sólida y brillo */}
      <m.path
        d={logoPath}
        initial={{ fill: white, opacity: 1, filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))" }}
        variants={{
          idle: { 
            fill: white, 
            opacity: 1, 
            filter: "drop-shadow(0px 0px 0px rgba(57,255,20,0))",
            transition: { duration: 0.3 }
          },
          active: { 
            fill: "rgba(57, 255, 20, 0.15)", // Fondo casi transparente
            opacity: 1, 
            filter: `drop-shadow(0px 0px 8px ${neonGreen})`, // Resplandor intenso
            transition: { duration: 0.4 }
          }
        }}
      />

      {/* CAPA 2: Trazo de energía neón (Dibujo infinito) */}
      <m.path
        d={logoPath}
        fill="none"
        stroke={neonGreen}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        variants={{
          idle: { 
            pathLength: 0, 
            opacity: 0, 
            transition: { duration: 0.3 } 
          },
          active: { 
            pathLength: [0, 1, 1, 0], // Dibuja y desdibuja
            opacity: [0, 1, 1, 0], // Se desvanece sutilmente en los extremos
            transition: { 
              duration: 3.5, 
              ease: "easeInOut", 
              repeat: Infinity,
              times: [0, 0.4, 0.6, 1] // Tiempos para que se mantenga dibujado un rato
            } 
          }
        }}
      />
    </m.svg>
  );
};