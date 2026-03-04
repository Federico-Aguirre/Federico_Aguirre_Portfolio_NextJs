"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const GitLabIcon = ({ isActive = true, size = 30, style, ...props }: IconProps) => {
  const pieceTransition = (delay: number) => ({
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
    delay: delay,
  });

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style
      }}
      {...props}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        animate={{ scale: isActive ? 1.05 : 1 }}
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        {/* Cuerpo central */}
        <motion.path
          fill="#E24329"
          d="M8 14.296l2.578-7.75H5.423L8 14.296z"
          animate={isActive ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
          transition={pieceTransition(0)}
        />

        {/* Mejillas */}
        <motion.path
          fill="#FC6D26"
          d="M8 14.296l-2.579-7.75H1.813L8 14.296z"
          animate={isActive ? { opacity: [0.8, 1, 0.8] } : { opacity: 1 }}
          transition={pieceTransition(0.2)}
        />
        <motion.path
          fill="#FC6D26"
          d="M8 14.296l2.578-7.75h3.614L8 14.296z"
          animate={isActive ? { opacity: [0.8, 1, 0.8] } : { opacity: 1 }}
          transition={pieceTransition(0.2)}
        />

        {/* OREJA IZQUIERDA: Ahora con movimiento de traslación y rotación claro */}
        <motion.path
          fill="#E24329"
          d="M1.812 6.549h3.612L3.87 1.882a.268.268 0 00-.254-.18.268.268 0 00-.255.18L1.812 6.549z"
          style={{ originX: "5.4px", originY: "6.5px" }} // Punto de anclaje en la base de la oreja
          animate={isActive ? { 
            rotate: [-15, 0, -15], 
            x: [-1, 0, -1],
            y: [-0.5, 0, -0.5] 
          } : { rotate: 0, x: 0, y: 0 }}
          transition={pieceTransition(0.1)}
        />

        {/* OREJA DERECHA: Movimiento simétrico de alerta */}
        <motion.path
          fill="#E24329"
          d="M14.19 6.549H10.58l1.551-4.667a.267.267 0 01.255-.18c.115 0 .217.073.254.18l1.552 4.667z"
          style={{ originX: "10.5px", originY: "6.5px" }} // Punto de anclaje en la base de la oreja
          animate={isActive ? { 
            rotate: [15, 0, 15], 
            x: [1, 0, 1],
            y: [-0.5, 0, -0.5] 
          } : { rotate: 0, x: 0, y: 0 }}
          transition={pieceTransition(0.1)}
        />

        {/* Laterales inferiores */}
        <motion.path
          fill="#FCA326"
          d="M1.81 6.549l-.784 2.354a.515.515 0 00.193.583L8 14.3 1.81 6.55z"
          animate={isActive ? { opacity: [0.6, 1, 0.6] } : { opacity: 1 }}
          transition={pieceTransition(0.4)}
        />
        <motion.path
          fill="#FCA326"
          d="M14.19 6.549l.783 2.354a.514.514 0 01-.193.583L8 14.296l6.188-7.747h.001z"
          animate={isActive ? { opacity: [0.6, 1, 0.6] } : { opacity: 1 }}
          transition={pieceTransition(0.4)}
        />
      </motion.svg>
    </div>
  );
};