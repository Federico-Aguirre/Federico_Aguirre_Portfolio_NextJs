"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const FigmaIcon = ({ isActive = true, size = 100, style, ...props }: IconProps) => {
  // Partículas que parecen nodos vectoriales
  const nodes = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 40,
    y: (Math.random() - 0.5) * 40,
    delay: Math.random() * 2,
    color: ["#e64a19", "#7c4dff", "#66bb6a", "#29b6f6"][i % 4]
  })), []);

  const springTransition = (delay: number) => ({
    type: "spring",
    stiffness: 150,
    damping: 10,
    repeat: Infinity,
    repeatDelay: 1,
    delay
  });

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: "32px", 
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "4px",
        overflow: "visible",
        ...style
      }}
      {...props}
    >
      {/* NODOS VECTORIALES - CORREGIDO */}
      {isActive && nodes.map((n) => (
        <motion.div
          key={n.id}
          style={{
            position: "absolute",
            width: "3px",
            height: "3px",
            border: `1px solid ${n.color}`,
            backgroundColor: "white",
            zIndex: 0,
          }}
          // CORRECCIÓN: initial explícito para evitar saltos
          initial={{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0 }}
          animate={{
            x: [0, n.x, 0],
            y: [0, n.y, 0],
            rotate: [0, 90, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: n.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.svg
        width="30px"
        height="30px"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 1, overflow: "visible" }}
        // CORRECCIÓN: initial para la rotación del grupo
        initial={{ rotate: 0 }}
        animate={isActive ? { rotate: [0, 5, -5, 0] } : { rotate: 0 }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Pieza Roja - CORREGIDO */}
        <motion.path
          fill="#e64a19"
          d="M26,17h-8c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h8V17z"
          initial={{ x: 0, y: 0 }}
          animate={isActive ? { x: [-1, -3, -1], y: [-1, -3, -1] } : { x: 0, y: 0 }}
          transition={springTransition(0)}
        />
        {/* Pieza Naranja - CORREGIDO */}
        <motion.path
          fill="#ff7043"
          d="M32,17h-7V3h7c3.866,0,7,3.134,7,7v0C39,13.866,35.866,17,32,17z"
          initial={{ x: 0, y: 0 }}
          animate={isActive ? { x: [1, 3, 1], y: [-1, -3, -1] } : { x: 0, y: 0 }}
          transition={springTransition(0.1)}
        />
        {/* Pieza Morada - CORREGIDO */}
        <motion.path
          fill="#7c4dff"
          d="M25,31h-7c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7V31z"
          initial={{ x: 0 }}
          animate={isActive ? { x: [-1, -4, -1] } : { x: 0 }}
          transition={springTransition(0.2)}
        />
        {/* Círculo Azul - CORREGIDO */}
        <motion.circle
          cx="32" cy="24" r="7"
          fill="#29b6f6"
          initial={{ scale: 1, x: 0 }}
          animate={isActive ? { scale: [1, 1.2, 1], x: [0, 2, 0] } : { scale: 1, x: 0 }}
          transition={springTransition(0.3)}
        />
        {/* Pieza Verde - CORREGIDO */}
        <motion.path
          fill="#66bb6a"
          d="M18,45L18,45c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7v7C25,41.866,21.866,45,18,45z"
          initial={{ y: 0, x: 0 }}
          animate={isActive ? { y: [1, 4, 1], x: [-1, -2, -1] } : { y: 0, x: 0 }}
          transition={springTransition(0.4)}
        />
      </motion.svg>
    </div>
  );
};