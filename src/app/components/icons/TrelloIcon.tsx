import React from "react";
import { motion, Variants } from "framer-motion";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

export const TrelloIcon = ({ isActive = false, ...props }: IconProps) => {

  // 1. EL CONTENEDOR (Tablero)
  // Mantiene la forma rígida, solo añade una "respiración" de sombra
  const boardVariants: Variants = {
    idle: {
      y: 0,
      filter: "drop-shadow(0px 0px 0px rgba(0, 121, 191, 0))",
    },
    active: {
      y: -5, // Levitación muy leve
      // Glow azul tech detrás del tablero
      filter: "drop-shadow(0px 0px 15px rgba(0, 145, 230, 0.6))",
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }
      }
    }
  };

  // 2. EFECTO DE "LLENADO DE DATOS" (Listas)
  // En lugar de mover el rect, animamos un "pathLength" o una escala interna
  // pero usando una máscara para que nunca salga de la forma original.
  
  // Variante para el "contenido" dentro de la lista larga
  const longListFillVariants: Variants = {
    idle: { scaleY: 0, opacity: 0 },
    active: {
      scaleY: [0, 1, 1, 0], // Sube -> Se queda lleno -> Desaparece
      opacity: [1, 1, 0, 0], // Al final se desvanece suavemente
      transition: {
        duration: 2.5,
        ease: "circOut", // Rápido al principio, lento al final
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }
  };

  // Variante para el "contenido" dentro de la lista corta (desfasada)
  const shortListFillVariants: Variants = {
    idle: { scaleY: 0, opacity: 0 },
    active: {
      scaleY: [0, 1, 1, 0],
      opacity: [1, 1, 0, 0],
      transition: {
        duration: 2.5,
        ease: "circOut",
        repeat: Infinity,
        delay: 0.4, // Desfase para que no se llenen al mismo tiempo (efecto cascada)
        repeatDelay: 0.5
      }
    }
  };

  return (
    <motion.svg
      width="800px"
      height="800px"
      viewBox="0 0 256 256"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMid"
      {...props}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="trello_gradient"
        >
          <stop stopColor="#0091E6" offset="0%" />
          <stop stopColor="#0079BF" offset="100%" />
        </linearGradient>
        
        {/* Definimos CLIP PATHS para restringir el llenado a la forma exacta de las listas */}
        <clipPath id="clip-long-list">
             <rect x="33.28" y="33.28" width="78.08" height="176" rx="12" />
        </clipPath>
        <clipPath id="clip-short-list">
             <rect x="144.64" y="33.28" width="78.08" height="112" rx="12" />
        </clipPath>
      </defs>
      
      <motion.g
        initial="idle"
        animate={isActive ? "active" : "idle"}
        variants={boardVariants}
        style={{ transformOrigin: "center center" }}
      >
        {/* FONDO BASE (Estático en forma) */}
        <rect
            fill="url(#trello_gradient)"
            x="0"
            y="0"
            width="256"
            height="256"
            rx="25"
        />
        
        {/* --- LISTA IZQUIERDA --- */}
        {/* 1. Fondo de la lista (Semitransparente, como un cristal vacío) */}
        <rect
            fill="#FFFFFF"
            fillOpacity="0.3"
            x="33.28"
            y="33.28"
            width="78.08"
            height="176"
            rx="12"
        />
        {/* 2. El "Líquido/Dato" que llena la lista (Blanco Brillante) */}
        <motion.rect
            x="33.28"
            y="33.28"
            width="78.08"
            height="176"
            fill="#FFFFFF"
            // Usamos clipPath para asegurar que el rectangulos interno respete los bordes redondeados
            clipPath="url(#clip-long-list)"
            variants={longListFillVariants}
            style={{ originY: 1 }} // Importante: Crece desde abajo hacia arriba
        />

        {/* --- LISTA DERECHA --- */}
        {/* 1. Fondo Cristal */}
        <rect
            fill="#FFFFFF"
            fillOpacity="0.3"
            x="144.64"
            y="33.28"
            width="78.08"
            height="112"
            rx="12"
        />
        {/* 2. Líquido de llenado */}
        <motion.rect
            x="144.64"
            y="33.28"
            width="78.08"
            height="112"
            fill="#FFFFFF"
            clipPath="url(#clip-short-list)"
            variants={shortListFillVariants}
            style={{ originY: 1 }} // Crece desde abajo
        />
      </motion.g>
    </motion.svg>
  );
};