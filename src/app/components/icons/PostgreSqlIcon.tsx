"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  isActive?: boolean;
  size?: number | string; // Prop opcional para controlar tamaño fácilmente
}

export const PostgreSqlIcon = ({ isActive = false, size = "1em", style, ...props }: IconProps) => {

  // Animación "Gelatina" (Jelly / Rubber Band)
  // Crea un efecto de rebote enérgico y divertido.
  const jellyVariants = {
    idle: { scale: 1, rotate: 0 },
    active: {
      // Secuencia de escalas para simular que es de goma
      scale: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
      // Pequeña rotación simultánea para dar "sacudida"
      rotate: [0, 0, -10, 5, -5, 0, 0],
      transition: {
        duration: 1, // Duración del rebote
        repeat: Infinity,
        repeatDelay: 1, // Espera un segundo entre rebotes para no marear
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.img
      src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
      alt="PostgreSQL Logo"
      
      // Aplicamos la animación
      variants={jellyVariants}
      initial="idle"
      animate={isActive ? "active" : "idle"}
      
      // Estilos
      style={{
        // Tamaño controlado: usa la prop 'size' o por defecto '1em' (tamaño de texto)
        width: props.width || size,
        height: props.height || size,
        objectFit: "contain",
        display: "inline-block",
        verticalAlign: "middle", // Se alinea bien con texto
        // Filtro sutil para que destaque un poco más al moverse
        filter: isActive ? "brightness(1.1)" : "none",
        ...style
      }}
      {...props}
    />
  );
};