"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const DockerIcon = ({ isActive = true, size = 100, style, ...props }: IconProps) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Burbujas de fondo constantes
  const bubbles = useMemo(() => Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 30,
    delay: Math.random() * 2,
    duration: 1.5 + Math.random() * 1
  })), []);

  const scheduleEvent = () => {
    if (!isActive) return;
    const nextTime = 1000 + Math.random() * 2500;
    timeoutRef.current = setTimeout(() => {
      setIsDeploying(true);
      setTimeout(() => {
        setIsDeploying(false);
        scheduleEvent();
      }, 400); 
    }, nextTime);
  };

  useEffect(() => {
    if (isActive) scheduleEvent();
    else {
      setIsDeploying(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [isActive]);

  return (
    <div style={{ position: "relative", width: size, height: "32px", display: "inline-flex", alignItems: "center", justifyContent: "center", overflow: "visible", ...style }} {...props}>
      {/* BURBUJAS DE FONDO - CORREGIDAS */}
      {isActive && bubbles.map((b) => (
        <motion.div
          key={b.id}
          style={{ position: "absolute", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#1794D4", bottom: "20%", left: `calc(50% + ${b.x}px)` }}
          // CORRECCIÓN: initial para evitar saltos de hidratación
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{ y: [0, -40], opacity: [0, 0.7, 0], scale: [0.5, 1.2] }}
          transition={{ duration: b.duration, repeat: Infinity, delay: b.delay, ease: "easeOut" }}
        />
      ))}

      <motion.svg
        key={isActive ? "docker-active" : "docker-inactive"}
        width="32px" height="32px" viewBox="0 0 32 32" fill="none"
        // CORRECCIÓN: initial para las propiedades de movimiento
        initial={{ y: 0, rotate: 0, scale: 1 }}
        animate={isActive && isDeploying ? { 
          y: [0, -5, 2, 0], 
          rotate: [0, -5, 5, 0],
          scale: [1, 1.1, 0.9, 1] 
        } : { y: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <circle cx="16" cy="16" r="14" fill="#1794D4" />
        <path d="M6.00155 16.9414C6.17244 19.8427 7.90027 24 14 24C20.8 24 23.8333 19 24.5 16.5C25.3333 16.5 27.2 16 28 14C27.5 13.5 25.5 13.5 24.5 14C24.5 13.2 24 11.5 23 11C22.3333 11.6667 21.3 13.4 22.5 15C22 16 20.6667 16 20 16H6.9429C6.41342 16 5.97041 16.4128 6.00155 16.9414Z" fill="white" />
        
        {/* Cuadraditos - CORREGIDOS */}
        {[
          "M18 7H16V9H18V7Z", "M10 10H12V12H10V10Z", "M9 13H7V15H9V13Z",
          "M10 13H12V15H10V13Z", "M15 13H13V15H15V13Z", "M16 13H18V15H16V13Z",
          "M21 13H19V15H21V13Z", "M15 10H13V12H15V10Z", "M16 10H18V12H16V10Z"
        ].map((d, i) => (
          <motion.path 
            key={i} d={d} fill="white" 
            // CORRECCIÓN: initial para opacidad y escala en cada contenedor
            initial={{ opacity: 1, scale: 1 }}
            animate={isDeploying ? { opacity: [1, 0, 1], scale: [1, 1.2, 1] } : { opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
          />
        ))}
      </motion.svg>
    </div>
  );
};