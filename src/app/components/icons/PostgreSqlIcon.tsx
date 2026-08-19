"use client";

import React from "react";
import { m, HTMLMotionProps, useReducedMotion } from "framer-motion";

// Definimos la interfaz extendiendo de HTMLMotionProps para evitar conflictos de tipos
interface IconProps extends HTMLMotionProps<"img"> {
  isActive?: boolean;
  size?: number | string;
}

export const PostgreSqlIcon = ({ 
  isActive = false, 
  size = "1em", 
  style, 
  ...props 
}: IconProps) => {
  // ACCESIBILIDAD: Detectar preferencia de movimiento reducido
  const shouldReduceMotion = useReducedMotion();

  const jellyVariants = {
    idle: { scale: 1, rotate: 0 },
    active: {
      // Secuencia de escalas para simular efecto gelatina
      scale: shouldReduceMotion ? 1 : [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
      // Pequeña rotación simultánea
      rotate: shouldReduceMotion ? 0 : [0, 0, -10, 5, -5, 0, 0],
      transition: {
        duration: shouldReduceMotion ? 0 : 1,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut"
      }
    }
  };

  return (
    <m.img
      // Props fijos del icono
      src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
      alt="PostgreSQL"
      variants={jellyVariants}
      initial="idle"
      animate={isActive ? "active" : "idle"}
      
      // Combinamos estilos calculados con los recibidos por props
      style={{
        width: props.width || size,
        height: props.height || size,
        objectFit: "contain",
        display: "inline-block",
        verticalAlign: "middle",
        filter: isActive ? "brightness(1.1)" : "none",
        ...style
      }}
      
      {...props} 
    />
  );
};

export default PostgreSqlIcon;