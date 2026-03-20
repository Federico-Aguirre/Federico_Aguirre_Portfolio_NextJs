"use client";

import React, { useState, useEffect, useId } from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const FramerMotionIcon = ({ isActive = true, size = 100, style, ...props }: IconProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [clientParticles, setClientParticles] = useState<{ id: number; targetX: number; targetY: number; delay: number; size: number; color: string }[]>([]);
  const uniqueId = useId();

  // 1. Evitar Hydration Mismatch: Generar partículas solo en el cliente
  useEffect(() => {
    setIsMounted(true);
    const generated = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      targetX: Math.cos((i * (360 / 24)) * (Math.PI / 180)) * (14 + Math.random() * 18),
      targetY: Math.sin((i * (360 / 24)) * (Math.PI / 180)) * (14 + Math.random() * 18),
      delay: Math.random() * 2,
      size: 1.2 + Math.random() * 1.8,
      color: i % 3 === 0 ? "#FF00AD" : i % 3 === 1 ? "#00D1FF" : "#7000FF"
    }));
    setClientParticles(generated);
  }, []);

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
      {/* NUBE DE PARTÍCULAS - Solo renderizada en cliente */}
      {isMounted && isActive && clientParticles.map((p) => (
        <motion.div
          key={`${uniqueId}-p-${p.id}`}
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

      {/* ICONO - Warning de Filtro corregido con formato consistente */}
      <motion.svg
        width="32px"
        height="32px"
        viewBox="3.7 3.7 43.6 43.6"
        style={{ 
          zIndex: 1, 
          overflow: "visible",
        }}
        initial={{ rotateY: 0, y: 0, filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))" }}
        animate={{ 
          rotateY: isActive ? [0, 15, -15, 0] : 0,
          y: isActive ? [0, -2, 0] : 0,
          filter: isActive 
            ? "drop-shadow(0px 0px 4px rgba(187,75,150,0.4))" 
            : "drop-shadow(0px 0px 0px rgba(0,0,0,0))"
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.path
          d="m47.3 3.7v21.8l-10.9 10.9-10.9 10.9-10.9-10.9 10.9-10.9v.1-.1z"
          fill="#59529d"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: isActive ? [-0.5, -2, -0.5] : 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path 
          d="m47.3 25.5v21.8l-10.9-10.9z" 
          fill="#5271b4" 
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: isActive ? [0, 3, 0] : 0, y: isActive ? [0, 3, 0] : 0 }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        />
        <motion.path
          d="m25.5 25.5-10.9 10.9-10.9 10.9v-43.6l10.9 10.9z"
          fill="#bb4b96"
          initial={{ scale: 1, x: 0, opacity: 1 }}
          animate={{ 
            scale: isActive ? [1, 0.92, 1] : 1, 
            x: isActive ? [0, -2, 0] : 0 
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          style={{ originX: "25.5px", originY: "25.5px" }}
        />
      </motion.svg>
    </div>
  );
};