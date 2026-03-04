import React from "react";
import { motion, Variants } from "framer-motion";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

export const WordPressIcon = ({ isActive = false, ...props }: IconProps) => {
  // --- CONFIGURACIÓN DE GLITCH (Fallo Digital) ---
  
  // 1. Capa Principal (El logo visible)
  const mainVariants: Variants = {
    idle: { scale: 1, x: 0, y: 0, filter: "brightness(1)" },
    active: {
      scale: 1.05,
      // Vibración sutil
      x: [0, -1, 1, -1, 0],
      y: [0, 1, -1, 0],
      // Aumenta el brillo como si fuera energía pura
      filter: "brightness(1.2) drop-shadow(0px 0px 8px rgba(34, 225, 255, 0.6))",
      transition: {
        x: { repeat: Infinity, duration: 0.2, repeatType: "mirror" },
        y: { repeat: Infinity, duration: 0.3, repeatType: "mirror" },
        filter: { duration: 0.2 }
      }
    }
  };

  // 2. Capa "Cyan/Red" (Aberración Cromática 1)
  // Se mueve muy rápido y de forma aleatoria
  const glitch1Variants: Variants = {
    idle: { opacity: 0, x: 0, y: 0 },
    active: {
      opacity: [0, 0.8, 0, 0.5, 0], // Parpadeo constante
      x: [0, -3, 3, -5, 2, 0],       // Saltos horizontales bruscos
      y: [0, 2, -2, 1, 0],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear"
      }
    }
  };

  // 3. Capa "Magenta/Blue" (Aberración Cromática 2)
  const glitch2Variants: Variants = {
    idle: { opacity: 0, x: 0, y: 0 },
    active: {
      opacity: [0, 0.6, 0, 0.9, 0],
      x: [0, 4, -4, 2, -2, 0],       // Saltos opuestos a la capa 1
      y: [0, -1, 3, -2, 0],
      transition: {
        duration: 0.3, // Ritmo diferente para crear caos
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear"
      }
    }
  };

  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ overflow: "visible" }}
    >
      {/* DEFINICIONES:
         1. El Path del Logo (Para reusarlo 3 veces sin copiar código)
         2. El Gradiente "Electric Sky" (Celeste Brillante)
      */}
      <defs>
        <path
          id="wp-path"
          fillRule="evenodd"
          d="M0,11.99925 C0,16.749 2.76,20.85375 6.76275,22.7985 L1.03875,7.116 C0.3735,8.60775 0,10.25925 0,11.99925 M20.10015,11.394 C20.10015,9.9105 19.5669,8.88375 19.1109,8.085 C18.50265,7.09575 17.9319,6.25875 17.9319,5.27025 C17.9319,4.167 18.76815,3.14025 19.94715,3.14025 C20.0004,3.14025 20.05065,3.147 20.1024,3.15 C17.9679,1.194 15.12315,0 11.9994,0 C7.8069,0 4.11915,2.151 1.9734,5.40825 C2.2554,5.41725 2.5209,5.4225 2.7459,5.4225 C4.00065,5.4225 5.9439,5.27025 5.9439,5.27025 C6.5904,5.232 6.6669,6.183 6.0204,6.25875 C6.0204,6.25875 5.37015,6.33525 4.64715,6.3735 L9.01665,19.371 L11.64315,11.49525 L9.77415,6.3735 C9.12765,6.33525 8.5149,6.25875 8.5149,6.25875 C7.8684,6.2205 7.94415,5.232 8.5914,5.27025 8.5914,5.27025 10.5729,5.4225 11.7519,5.4225 C13.00665,5.4225 14.9499,5.27025 14.9499,5.27025 C15.59715,5.232 15.6729,6.183 15.0264,6.25875 C15.0264,6.25875 14.3754,6.33525 13.65315,6.3735 L17.98965,19.272 L19.1874,15.273 C19.7049,13.6125 20.10015,12.42075 20.10015,11.394 M12.21015,13.04895 L8.6094,23.5107 C9.6849,23.8272 10.8219,23.9997 11.9994,23.9997 C13.39665,23.9997 14.7369,23.7582 15.98415,23.31945 C15.95265,23.2677 15.92265,23.2137 15.89865,23.15445 L12.21015,13.04895 Z M22.52925,6.242475 C22.581,6.624975 22.61025,7.034475 22.61025,7.476225 C22.61025,8.693475 22.38225,10.062225 21.6975,11.774475 L18.03225,22.371225 C21.6,20.291475 23.99925,16.425975 23.99925,11.999475 C23.99925,9.912975 23.466,7.951725 22.52925,6.242475"
        />

        <linearGradient id="electricSky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22E1FF" />   {/* CYAN BRILLANTE (Celeste) */}
          <stop offset="100%" stopColor="#1D8CF8" /> {/* AZUL ELÉCTRICO */}
        </linearGradient>
      </defs>

      {/* --- RENDERIZADO DE CAPAS --- */}

      {/* CAPA GLITCH 1 (ROJO/ROSA) - Se mueve detrás */}
      <motion.use
        href="#wp-path"
        variants={glitch1Variants}
        initial="idle"
        animate={isActive ? "active" : "idle"}
        fill="#FF0055" // Color de contraste para el glitch
        style={{ mixBlendMode: "screen" }} // Fusión de luz
      />

      {/* CAPA GLITCH 2 (VERDE/CYAN) - Se mueve detrás opuesto */}
      <motion.use
        href="#wp-path"
        variants={glitch2Variants}
        initial="idle"
        animate={isActive ? "active" : "idle"}
        fill="#00FF99"
        style={{ mixBlendMode: "screen" }}
      />

      {/* CAPA PRINCIPAL (LOGO CELESTE) - Se mantiene al frente */}
      <motion.use
        href="#wp-path"
        variants={mainVariants}
        initial="idle"
        animate={isActive ? "active" : "idle"}
        fill="url(#electricSky)" // El gradiente que querías
      />
      
    </motion.svg>
  );
};