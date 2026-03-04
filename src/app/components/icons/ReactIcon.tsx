import React from "react";
import { motion, Variants } from "framer-motion";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

export const ReactIcon = ({ isActive = false, ...props }: IconProps) => {
  const color = "#61DAFB"; 

  // Configuración común para la transición de "Vuelta a la calma"
  // Cuando isActive es false, tarda 0.5s en volver a su sitio suavemente.
  const smoothReturnTransition = {
    duration: 0.6,
    ease: "backOut" // Un pequeño rebote al volver a su sitio queda muy bien
  };

  // VARIANTE DEL NÚCLEO
  const coreVariants: Variants = {
    idle: { 
      scale: 1, 
      opacity: 1,
      transition: smoothReturnTransition 
    },
    active: {
      scale: [1, 1.25, 1],
      opacity: 1,
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  // GENERADOR DE VARIANTES PARA ANILLOS
  // baseAngle: El ángulo original (0, 60, 120)
  // speed: Duración de una vuelta completa
  // direction: 1 para horario, -1 para antihorario
  const createRingVariant = (baseAngle: number, duration: number, direction: number): Variants => ({
    idle: { 
      rotate: baseAngle, // Vuelve EXACTAMENTE a su ángulo geométrico
      scaleX: 1,         // Vuelve al tamaño normal
      scaleY: 1,
      opacity: 0.6,      // Un poco más tenue cuando está inactivo para elegancia
      transition: smoothReturnTransition
    },
    active: {
      // Gira indefinidamente sumando 360 grados al ángulo base
      rotate: baseAngle + (360 * direction), 
      scaleX: 1.1,       // Se estira un poco horizontalmente (deformación sutil)
      scaleY: 1.1,       // Se estira verticalmente
      opacity: 1,        // Brilla al máximo
      transition: { 
        rotate: {
          duration: duration, 
          repeat: Infinity, 
          ease: "linear", // Giro constante sin frenos
        },
        scaleX: { duration: 0.5 }, // La expansión es rápida
        scaleY: { duration: 0.5 },
        opacity: { duration: 0.3 }
      }
    }
  });

  return (
    <motion.svg
      // Aumenté el viewBox de -11.5 a -13 para dar margen y que no se corten los anillos al girar
      viewBox="-13 -13 26 26" 
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="none"
      {...props}
      style={{ overflow: "visible" }} // Aseguro extra anti-recorte
    >
      {/* NÚCLEO */}
      <motion.circle
        cx="0"
        cy="0"
        r="2.05"
        fill={color}
        variants={coreVariants}
        initial="idle"
        animate={isActive ? "active" : "idle"}
      />

      {/* GRUPO DE ANILLOS */}
      <g stroke={color} strokeWidth="1.1" fill="none">
        
        {/* Anillo 1: Base (0°) - Gira Horario */}
        <motion.ellipse
          rx="11" ry="4.2"
          variants={createRingVariant(0, 4, 1)} 
          initial="idle"
          animate={isActive ? "active" : "idle"}
        />

        {/* Anillo 2: Inclinado (60°) - Gira Anti-Horario (Contraste) */}
        <motion.ellipse
          rx="11" ry="4.2"
          variants={createRingVariant(60, 5, -1)} 
          initial="idle"
          animate={isActive ? "active" : "idle"}
        />

        {/* Anillo 3: Inclinado (120°) - Gira Horario (Lento) */}
        <motion.ellipse
          rx="11" ry="4.2"
          variants={createRingVariant(120, 7, 1)} 
          initial="idle"
          animate={isActive ? "active" : "idle"}
        />
      </g>
    </motion.svg>
  );
};