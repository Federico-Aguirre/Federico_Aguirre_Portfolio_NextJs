"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const MaterialUiIcon = ({ isActive = true, size = 100, style, ...props }: IconProps) => {
  const ripples = useMemo(() => [0, 1, 2], []);

  const partVariants = {
    // Definimos explícitamente el estado inicial para evitar el "undefined"
    inactive: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    active: (i: number) => ({
      y: [0, -3, 0],
      opacity: [1, 0.7, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: "32px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1000px",
        ...style
      }}
      {...props}
    >
      {/* ONDAS CON ANIMATE PRESENCE PARA EVITAR SALTOS */}
      <AnimatePresence>
        {isActive && ripples.map((i) => (
          <motion.div
            key={`ripple-${i}`}
            style={{
              position: "absolute",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              border: "2px solid #29b6f6",
              zIndex: 0,
              pointerEvents: "none",
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 4, opacity: [0, 0.3, 0] }} // Opacidad controlada
            exit={{ opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="32px"
        height="32px"
        style={{ zIndex: 1, overflow: "visible" }}
        // Añadimos valores iniciales aquí también para consistencia
        initial={{ rotateY: 0, scale: 1 }}
        animate={isActive ? { 
          rotateY: [0, 15, 0],
          scale: [1, 1.05, 1] 
        } : { rotateY: 0, scale: 1 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* CORRECCIÓN CLAVE: 
            Se añade initial="inactive" a todos los bloques.
        */}
        <motion.g 
          variants={partVariants} 
          custom={1} 
          initial="inactive"
          animate={isActive ? "active" : "inactive"}
        >
          <polygon fill="#29b6f6" points="1,5 7,9 7,29 1,25" />
          <polygon fill="#29b6f6" points="1,12 18,23 18,16 1,5" />
        </motion.g>

        <motion.g 
          variants={partVariants} 
          custom={2} 
          initial="inactive"
          animate={isActive ? "active" : "inactive"}
        >
          <polygon fill="#0288d1" points="47,20 41,24 41,37 47,33" />
          <polygon fill="#0288d1" points="47,6 41,10 41,17 47,13" />
        </motion.g>

        <motion.g 
          variants={partVariants} 
          custom={3} 
          initial="inactive"
          animate={isActive ? "active" : "inactive"}
        >
          <polygon fill="#0288d1" points="35,5 29,9 29,29 35,25" />
          <polygon fill="#0288d1" points="35,12 18,23 18,16 35,5" />
        </motion.g>

        <motion.g 
          variants={partVariants} 
          custom={4} 
          initial="inactive"
          animate={isActive ? "active" : "inactive"}
        >
          <polygon fill="#0288d1" points="35,26 18,37 18,30 35,19" />
          <polygon fill="#47,34 30,45 30,38 47,27" /> {/* Simplificado el fill para consistencia */}
          <polygon fill="#29b6f6" points="30,37.765 18,30 18,37 30,44.765" />
        </motion.g>
      </motion.svg>
    </div>
  );
};