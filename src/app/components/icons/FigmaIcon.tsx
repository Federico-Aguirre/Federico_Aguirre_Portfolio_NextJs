"use client";

import React, { useMemo, useState, useEffect } from "react";
import { m, useReducedMotion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const FigmaIcon = ({ isActive = true, size = 40, style, ...props }: IconProps) => {
  const [isMounted, setIsMounted] = useState(false);

  // ACCESIBILIDAD: Detectar preferencia de movimiento reducido
  const shouldReduceMotion = useReducedMotion();
  const animateIcon = isActive && !shouldReduceMotion;

  // Evitar hydration mismatch renderizando elementos aleatorios solo en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        height: size, 
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "4px",
        overflow: "visible",
        ...style
      }}
      {...props}
    >
      {/* NODOS VECTORIALES - Ocultos para lectores de pantalla y solo montados en el cliente */}
      {isMounted && animateIcon && nodes.map((n) => (
        <m.div
          key={n.id}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "3px",
            height: "3px",
            border: `1px solid ${n.color}`,
            backgroundColor: "white",
            zIndex: 0,
          }}
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

      <m.svg
        width="100%"
        height="100%"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 1, overflow: "visible" }}
        aria-hidden="true"
        focusable="false"
        initial={{ rotate: 0 }}
        animate={animateIcon ? { rotate: [0, 5, -5, 0] } : { rotate: 0 }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Pieza Roja */}
        <m.path
          fill="#e64a19"
          d="M26,17h-8c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h8V17z"
          initial={{ x: 0, y: 0 }}
          animate={animateIcon ? { x: [-1, -3, -1], y: [-1, -3, -1] } : { x: 0, y: 0 }}
          transition={springTransition(0)}
        />
        {/* Pieza Naranja */}
        <m.path
          fill="#ff7043"
          d="M32,17h-7V3h7c3.866,0,7,3.134,7,7v0C39,13.866,35.866,17,32,17z"
          initial={{ x: 0, y: 0 }}
          animate={animateIcon ? { x: [1, 3, 1], y: [-1, -3, -1] } : { x: 0, y: 0 }}
          transition={springTransition(0.1)}
        />
        {/* Pieza Morada */}
        <m.path
          fill="#7c4dff"
          d="M25,31h-7c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7V31z"
          initial={{ x: 0 }}
          animate={animateIcon ? { x: [-1, -4, -1] } : { x: 0 }}
          transition={springTransition(0.2)}
        />
        {/* Círculo Azul */}
        <m.circle
          cx="32" cy="24" r="7"
          fill="#29b6f6"
          initial={{ scale: 1, x: 0 }}
          animate={animateIcon ? { scale: [1, 1.2, 1], x: [0, 2, 0] } : { scale: 1, x: 0 }}
          transition={springTransition(0.3)}
        />
        {/* Pieza Verde */}
        <m.path
          fill="#66bb6a"
          d="M18,45L18,45c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7v7C25,41.866,21.866,45,18,45z"
          initial={{ y: 0, x: 0 }}
          animate={animateIcon ? { y: [1, 4, 1], x: [-1, -2, -1] } : { y: 0, x: 0 }}
          transition={springTransition(0.4)}
        />
      </m.svg>
    </div>
  );
};