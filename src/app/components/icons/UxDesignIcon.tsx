import React from "react";
import { motion, Variants } from "framer-motion";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

export const UxDesignIcon = ({ isActive = false, ...props }: IconProps) => {

  // 1. CONFIGURACIÓN DEL CONTENEDOR (Levitación y Escala)
  const containerVariants: Variants = {
    idle: {
      y: 0,
      scale: 1,
      filter: "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))",
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    active: {
      y: -5, // Levitación más sutil por el tamaño del viewBox
      scale: 1.1,
      filter: "drop-shadow(0px 0px 8px rgba(0, 240, 255, 0.6))", // Glow Cyan
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        },
        scale: { duration: 0.3 }
      }
    }
  };

  // 2. CONFIGURACIÓN DEL DIBUJADO (Sin pausas estáticas)
  const pathVariants: Variants = {
    idle: {
      pathLength: 1,
      opacity: 0.3, // Un poco más sutil en reposo
      strokeWidth: 2,
      stroke: "#FFFFFF"
    },
    active: {
      pathLength: [0, 1, 0], // Ciclo de dibujo completo
      opacity: 1,
      stroke: "url(#uxGradient)", // Aplicamos el degradado al borde
      transition: {
        duration: 3, // Un poco más rápido que el anterior para dar sensación de agilidad "UX"
        ease: ["linear", "linear"], // EL TRUCO: Sin pausas en los extremos
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.5, 1],
        repeatDelay: 0
      }
    }
  };

  // 3. VARIANTE EXTRA PARA EL CÍRCULO (Relleno suave)
  const circleVariants: Variants = {
    ...pathVariants,
    active: {
        ...pathVariants.active,
        fill: "url(#uxGradient)",
        fillOpacity: 0.1, // Relleno muy sutil tech
    }
  };

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
      {/* Definición del Gradiente "Cyber Blue" */}
      <defs>
        <linearGradient id="uxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" /> {/* Cyan Brillante */}
          <stop offset="100%" stopColor="#0055FF" /> {/* Azul Profundo */}
        </linearGradient>
      </defs>

      <motion.g
        initial="idle"
        animate={isActive ? "active" : "idle"}
        variants={containerVariants}
        style={{ transformOrigin: "center center" }}
      >
        {/* LAS LETRAS "UX" */}
        <motion.path
          d="M7 10V12C7 12.6667 7.4 14 9 14C10.6 14 11 12.6667 11 12V10M14 10L15.5 12M17 14L15.5 12M15.5 12L17 10M15.5 12L14 14"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />

        {/* EL CÍRCULO EXTERNO */}
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={circleVariants}
          // Añadimos una rotación lenta al círculo para darle dinamismo extra
          animate={isActive ? { rotate: 360 } : { rotate: 0 }}
          transition={isActive ? {
             rotate: { duration: 10, ease: "linear", repeat: Infinity } 
          } : {}}
          style={{ transformOrigin: "center center" }}
        />
      </motion.g>
    </motion.svg>
  );
};