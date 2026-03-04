"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

export const RenderIcon = ({ isActive = false, ...props }: IconProps) => {
  const white = "#ffffff";
  const neonGreen = "#39FF14";
  
  const filterId = useId();
  const clipId = useId();

  // PATHS
  const logoPath = "M15.6491 0.00582604C12.9679 -0.120371 10.7133 1.81847 10.3286 4.373C10.3134 4.49154 10.2905 4.60627 10.2715 4.72099C9.67356 7.90268 6.88955 10.3119 3.5457 10.3119C2.35364 10.3119 1.23395 10.006 0.258977 9.47058C0.140914 9.40557 0 9.4897 0 9.62354V10.3081V20.6218H10.2677V12.8894C10.2677 11.4668 11.4178 10.3119 12.8346 10.3119H15.4015C18.3074 10.3119 20.6458 7.89121 20.5315 4.94662C20.4287 2.29649 18.2884 0.132023 15.6491 0.00582604Z";
  const trianglePath = "M 0 0 L 6 10 L 12 0 Z";
  const xPath = "M 2 0 L 6 4 L 10 0 L 12 2 L 8 6 L 12 10 L 10 12 L 6 8 L 2 12 L 0 10 L 4 6 L 0 2 Z";

  // COORDENADAS
  const headPos = { cx: 15.65, cy: 4.4 }; 
  const centerBody = { x: 5, y: 14 }; 

  // ANIMACIÓN ACELERADA
  const animConfig = {
    duration: 3.5,
    // CRONOGRAMA DE VELOCIDAD:
    // 0.00 -> 0.10: ¡ZAS! Se estira y se rompe en una fracción de segundo.
    // 0.10 -> 0.12: Ya desapareció el puente.
    // Esto evita que el usuario se quede mirando la unión "falsa".
    times: [0, 0.1, 0.12, 0.5, 0.7, 0.85, 0.9, 1], 
    ease: "easeInOut",
    repeat: Infinity,
    repeatDelay: 0.2
  };

  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="-8 -5 36 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Render Logo Shapes"
      {...props}
      style={{ overflow: "visible", ...props.style }}
    >
      <defs>
        <filter id={filterId}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.3" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>

        <clipPath id={clipId}>
            <rect x="-10" y="10.3" width="40" height="30" />
        </clipPath>
      </defs>

      {/* CAPA ESTÁTICA */}
      <motion.path
        d={logoPath}
        fill={white}
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0 }} 
      />

      {/* CAPA ANIMADA */}
      <motion.g 
        key={isActive ? "active" : "inactive"}
        filter={`url(#${filterId})`}
        initial={{ fill: white, opacity: 0 }}
        animate={{ 
            fill: isActive ? neonGreen : white,
            opacity: isActive ? 1 : 0 
        }}
        transition={{ 
            fill: { duration: 1.0 }, 
            opacity: { duration: 0 }
        }}
      >
        
        {/* A. CUERPO */}
        <motion.path
          d={logoPath}
          clipPath={`url(#${clipId})`}
          style={{ transformOrigin: "bottom left" }}
          animate={isActive ? {
            scaleX: [1, 1, 0.9, 0.9, 1, 1, 1, 1],
            scaleY: [1, 1, 0.8, 0.8, 1, 1, 1, 1],
          } : { scale: 1 }}
          transition={animConfig}
        />

        {/* B. PUENTE RÁPIDO Y FINO */}
        {/* Gota 1: Ancla */}
        <motion.circle
            // Radio reducido a 2.0 para que sea apenas un hilo
            initial={{ cx: 13.2, cy: 9.5, r: 2.0 }}
            animate={isActive ? {
                // Desaparece rapidísimo (en el paso 0.12)
                r:  [2.0, 0, 0, 0, 0, 0, 2.0, 2.0],
                cx: [13.2, 14.5, headPos.cx, headPos.cx, headPos.cx, 14.5, 13.2, 13.2],
                cy: [9.5, 5, 2, 0, 0, 5, 9.5, 9.5],
            } : { cx: 13.2, cy: 9.5, r: 2.0 }}
            transition={animConfig}
        />
        {/* Gota 2: Conectora */}
        <motion.circle
            // Radio reducido a 1.8
            initial={{ cx: 14.8, cy: 7.5, r: 1.8 }}
            animate={isActive ? {
                r:  [1.8, 0, 0, 0, 0, 0, 1.5, 1.8],
                cx: [14.8, 15.5, headPos.cx, headPos.cx, headPos.cx, 15.5, 14.8, 14.8],
                cy: [7.5, 3, 0, -2, -2, 3, 7.5, 7.5],
            } : { cx: 14.8, cy: 7.5, r: 1.8 }}
            transition={animConfig}
        />

        {/* C. LA CABEZA */}
        <motion.circle
          r={5.4}
          initial={headPos}
          animate={isActive ? {
            cx: headPos.cx,
            // Sube de inmediato, sin pausas
            cy: [headPos.cy, -7, -7, -7, -7, headPos.cy - 2, headPos.cy, headPos.cy]
          } : { ...headPos }}
          transition={animConfig}
        />

        {/* D. TRIÁNGULO GRANDE */}
        <motion.path d={trianglePath}
          initial={{ x: centerBody.x, y: centerBody.y, scale: 0 }}
          animate={isActive ? {
            scale: [0, 1.4, 1.4, 1.4, 1.4, 0, 0, 0],
            x: [5, -16, -16, -16, -16, 5, 5, 5],
            y: [14, 14, 14, 14, 14, 14, 14, 14],
            rotate: [0, -180, -180, -180, -180, 0, 0, 0] 
          } : { scale: 0 }}
          transition={animConfig}
        />

        {/* E. LA 'X' GRANDE */}
        <motion.path d={xPath}
          initial={{ x: centerBody.x, y: centerBody.y, scale: 0 }}
          animate={isActive ? {
            scale: [0, 1.4, 1.4, 1.4, 1.4, 0, 0, 0],
            x: [5, 24, 24, 24, 24, 5, 5, 5],
            y: [14, 10, 10, 10, 10, 14, 14, 14],
            rotate: [0, 180, 180, 180, 180, 0, 0, 0] 
          } : { scale: 0 }}
          transition={animConfig}
        />
      </motion.g>
    </motion.svg>
  );
};