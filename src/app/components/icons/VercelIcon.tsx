import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

export const VercelIcon = ({ isActive = false, ...props }: IconProps) => {
  
  // CONFIGURACIÓN
  const strokeLength = 0.4;
  const gapLength = 0.6;
  const strokeArray = `${strokeLength} ${gapLength}`;
  
  const DURATION = 4; // 4 segundos por vuelta completa

  return (
    <motion.svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ overflow: "visible" }}
    >
      <title>Vercel Double Pulse</title>
      
      <defs>
        <linearGradient id="doublePulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FFFF" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FF0080" />
        </linearGradient>
      </defs>

      {/* 1. BASE NEGRA */}
      <motion.path
        d="M24 22.525H0l12-21.05 12 21.05z"
        initial={{ fill: "#171717", scale: 1 }}
        animate={isActive ? { fill: "#000000", scale: 0.9 } : { fill: "#171717", scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: "center" }}
      />

      {/* 2. LÍNEA DE ENERGÍA (Doble Ciclo) */}
      {[4, 2].map((width, index) => (
        <motion.path
          key={index}
          d="M24 22.525H0l12-21.05 12 21.05z"
          pathLength={1}
          stroke="url(#doublePulseGradient)"
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray={strokeArray}
          filter={index === 0 ? "blur(5px)" : "none"}
          style={{ transformOrigin: "center", scale: 0.9 }}

          initial={{ opacity: 0, strokeDashoffset: 0 }}
          
          animate={isActive ? {
            strokeDashoffset: -1, // Una vuelta completa
            
            // LÓGICA DEL DOBLE PULSO:
            // 0: Invisible (Inicio)
            // 1: Visible
            // 0: Invisible (Mitad del camino) -> Aquí desaparece
            // 1: Visible
            // 0: Invisible (Final)
            opacity: [0, 1, 1, 0, 1, 1, 0] 
          } : {
            opacity: 0
          }}

          transition={isActive ? {
            duration: DURATION,
            ease: "linear",
            repeat: Infinity,
            
            // TIEMPOS EXACTOS DEL DOBLE PULSO:
            // 0.00 - 0.15: Fade In (Aparece)
            // 0.15 - 0.35: Se mantiene visible
            // 0.35 - 0.50: Fade Out (Desaparece llegando a la mitad)
            // -----------------------------------------------------
            // 0.50 - 0.65: Fade In (Reaparece pasando la mitad)
            // 0.65 - 0.85: Se mantiene visible
            // 0.85 - 1.00: Fade Out (Desaparece al final)
            times: [0, 0.15, 0.35, 0.5, 0.65, 0.85, 1]
          } : {
            duration: 0.5
          }}
        />
      ))}
    </motion.svg>
  );
};