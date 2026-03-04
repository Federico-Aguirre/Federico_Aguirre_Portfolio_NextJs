import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

export const SassIcon = ({ isActive = false, ...props }: IconProps) => {
  const pathData = "M258,88c-96,33-158,100-152,140s66,72,93,93h0c-35,18-79,45-78,80,2,48,54,33,76,19s44-53,30-94c31-8,58,2,66,8,31,22,15,47,4,51s-4,6,3,4,22-12,22-29c0-43-46-63-103-48-33-35-78-51-76-89,1-14,6-50,95-95s152-27,144,14c-12,62-120,104-158,68-2-4-9-7-5,4,20,50,182,27,189-79C410,79,329,64,258,88ZM172,408c-25,8-24-8-23-14,3-17,17-38,59-59C220,373,193,402,172,408Z";
  
  const brandColor = "#c69"; // Rosa Sass
  const contrastColor = "#ffffff"; // Blanco

  // Animación del contenedor (el cuadrado rosa)
  // Un "respiro" suave para indicar que está vivo
  const bgVariants = {
    idle: { scale: 1, rx: "15%" },
    active: {
      scale: [1, 0.98, 1], // Sutil bombeo
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Animación del Trazado (Las letras)
  // 1. Se convierte en solo borde (stroke)
  // 2. Se dibuja el contorno (pathLength)
  // 3. Se rellena de blanco (fillOpacity)
  const pathVariants = {
    idle: {
      pathLength: 1,   // Completamente dibujado
      fillOpacity: 1,  // Completamente lleno
      strokeWidth: 0,  // Sin borde
      strokeOpacity: 0
    },
    active: {
      pathLength: [0, 1, 1],       // Dibuja el contorno de 0 a 100%
      fillOpacity: [0, 0, 1],      // Se mantiene transparente y luego se llena al final
      strokeWidth: [3, 3, 0],      // Borde visible mientras dibuja, luego desaparece
      strokeOpacity: [1, 1, 0],
      transition: {
        duration: 2.5,             // Duración del ciclo completo
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5           // Pequeña pausa antes de volver a empezar
      }
    }
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="800px"
      height="800px"
      {...props}
    >
      <title>Sass Compilation</title>

      {/* --- FONDO ROSA --- */}
      <motion.rect
        width="512"
        height="512"
        fill={brandColor}
        variants={bgVariants}
        initial="idle"
        animate={isActive ? "active" : "idle"}
        // El origen en el centro (256, 256) para que el scale sea simétrico
        style={{ originX: "256px", originY: "256px" }}
      />

      {/* --- LETRAS ANIMADAS --- */}
      <motion.path
        d={pathData}
        fill={contrastColor}
        stroke={contrastColor} // El borde es del mismo color que el relleno final
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="idle"
        animate={isActive ? "active" : "idle"}
      />
    </motion.svg>
  );
};