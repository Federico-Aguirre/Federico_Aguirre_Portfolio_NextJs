"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const CssIcon = ({ isActive = true, size = 35, style, ...props }: IconProps) => {
  const [isStyling, setIsStyling] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [clientParticles, setClientParticles] = useState<{ id: number; x: number; delay: number; duration: number }[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ACCESIBILIDAD: Detectar preferencia de movimiento reducido
  const shouldReduceMotion = useReducedMotion();
  const animateIcon = isActive && !shouldReduceMotion;

  // 1. Evitar Hydration Mismatch: Generar partículas solo en el cliente
  useEffect(() => {
    setIsMounted(true);
    const generated = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 40,
      delay: Math.random() * 2,
      duration: 1 + Math.random() * 1
    }));
    setClientParticles(generated);
  }, []);

  const scheduleEvent = useCallback(() => {
    // Si no está activo o el usuario prefiere reducir animaciones, no programamos el evento
    if (!animateIcon) return; 
    
    const nextTime = 1200 + Math.random() * 2000;
    timeoutRef.current = setTimeout(() => {
      setIsStyling(true);
      setTimeout(() => {
        setIsStyling(false);
        scheduleEvent();
      }, 250);
    }, nextTime);
  }, [animateIcon]);

  useEffect(() => {
    if (animateIcon && isMounted) scheduleEvent();
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [animateIcon, isMounted, scheduleEvent]);

  return (
    <div 
      style={{ 
        position: "relative", 
        width: size, 
        height: size, 
        display: "inline-flex", 
        alignItems: "center", 
        justifyContent: "center", 
        overflow: "visible", 
        ...style 
      }} 
      {...props}
    >
      
      {/* PARTÍCULAS DE ESTILO - Renderizan solo si anima */}
      {isMounted && animateIcon && clientParticles.map((p) => (
        <m.div
          key={p.id}
          // ACCESIBILIDAD: Ocultar de lectores de pantalla
          aria-hidden="true"
          style={{ 
            position: "absolute", 
            width: "4px", 
            height: "1px", 
            backgroundColor: "#2965f1", 
            top: "-10%", 
            left: `calc(50% + ${p.x}px)` 
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: [0, 40], 
            opacity: [0, 0.8, 0] 
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay, 
            ease: "linear" 
          }}
        />
      ))}

      {/* width y height al 100% para que el contenedor interno se expanda */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
        <m.svg
          // ACCESIBILIDAD: Ocultar de lectores y quitar focus
          aria-hidden="true"
          focusable="false"
          width="100%" 
          height="100%" 
          viewBox="0 0 512 512"
          initial={{ skewX: 0, filter: "brightness(100%)" }}
          animate={animateIcon && isStyling ? { 
            skewX: [0, -10, 10, 0],
            filter: ["brightness(100%)", "brightness(150%)", "brightness(100%)"]
          } : { 
            skewX: 0, 
            filter: "brightness(100%)" 
          }}
          transition={{ duration: 0.2 }}
        >
          <path fill="#264de4" d="M72 460L30 0h451l-41 460-184 52" />
          <path fill="#2965f1" d="M256 37V472l149-41 35-394" />
          
          <m.path
            fill="#ebebeb" d="m114 94h142v56H119m5 58h132v57H129m3 28h56l4 45 64 17v59L139 382"
            initial={{ x: 0, opacity: 1 }}
            animate={animateIcon && isStyling ? { x: [-10, 5, 0] } : { x: 0 }}
          />
          <m.path
            fill="#ffffff" d="m256 208v57h69l-7 73-62 17v59l115-32 26-288H256v56h80l-5.5 58Z"
            initial={{ x: 0, opacity: 1 }}
            animate={animateIcon && isStyling ? { x: [10, -5, 0] } : { x: 0 }}
          />
        </m.svg>

        <AnimatePresence>
          {isStyling && animateIcon && (
            <m.div
              // ACCESIBILIDAD: Ocultar de lectores
              aria-hidden="true"
              style={{ 
                position: "absolute", 
                width: "120%", 
                height: "2px", 
                background: "white", 
                zIndex: 5, 
                left: "-10%", 
                boxShadow: "0 0 10px white" 
              }}
              initial={{ top: "0%", opacity: 0 }}
              animate={{ top: "100%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};