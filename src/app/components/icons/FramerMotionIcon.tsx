"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const FramerMotionIcon = ({ isActive = true, size = 100, style, ...props }: IconProps) => {
  const particles = useMemo(() => Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    // Pre-calculamos los destinos para evitar inconsistencias de hidratación
    targetX: Math.cos((i * (360 / 24)) * (Math.PI / 180)) * (14 + Math.random() * 18),
    targetY: Math.sin((i * (360 / 24)) * (Math.PI / 180)) * (14 + Math.random() * 18),
    delay: Math.random() * 2,
    size: 1.2 + Math.random() * 1.8,
    color: i % 3 === 0 ? "#FF00AD" : i % 3 === 1 ? "#00D1FF" : "#7000FF"
  })), []);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: "32px", 
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        ...style
      }}
      {...props}
    >
      {/* NUBE DE PARTÍCULAS NEÓN - CORREGIDA */}
      {isActive && particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: "50%",
            zIndex: 0,
            left: "50%",
            top: "50%",
            boxShadow: `0 0 6px ${p.color}, 0 0 2px white`, 
          }}
          // CORRECCIÓN: initial para evitar que las partículas aparezcan de golpe
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{
            x: [0, p.targetX, 0],
            y: [0, p.targetY, 0],
            scale: [0, 1.4, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* ICONO - CORREGIDO */}
      <motion.svg
        width="32px"
        height="32px"
        viewBox="3.7 3.7 43.6 43.6"
        style={{ 
          zIndex: 1, 
          overflow: "visible",
        }}
        // CORRECCIÓN: initial para el filtro y transformaciones
        initial={{ rotateY: 0, y: 0, filter: "none" }}
        animate={isActive ? { 
          rotateY: [0, 15, -15, 0],
          y: [0, -2, 0],
          filter: "drop-shadow(0 0 4px rgba(187,75,150,0.4))"
        } : { rotateY: 0, y: 0, filter: "none" }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.path
          d="m47.3 3.7v21.8l-10.9 10.9-10.9 10.9-10.9-10.9 10.9-10.9v.1-.1z"
          fill="#59529d"
          initial={{ y: 0 }}
          animate={isActive ? { y: [-0.5, -2, -0.5] } : { y: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path 
          d="m47.3 25.5v21.8l-10.9-10.9z" 
          fill="#5271b4" 
          initial={{ x: 0, y: 0 }}
          animate={isActive ? { x: [0, 3, 0], y: [0, 3, 0] } : { x: 0, y: 0 }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        />
        <motion.path
          d="m25.5 25.5-10.9 10.9-10.9 10.9v-43.6l10.9 10.9z"
          fill="#bb4b96"
          initial={{ scale: 1, x: 0 }}
          animate={isActive ? { scale: [1, 0.92, 1], x: [0, -2, 0] } : { scale: 1, x: 0 }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          style={{ originX: "25.5px", originY: "25.5px" }}
        />
      </motion.svg>
    </div>
  );
};