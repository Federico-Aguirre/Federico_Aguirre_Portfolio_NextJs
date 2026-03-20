"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const ExpressJsIcon = ({ isActive = true, size = 100, style, ...props }: IconProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchPositions, setGlitchPositions] = useState<{x: number, y: number, color: string}[]>([]);
  const [clientPackets, setClientPackets] = useState<{ id: number; y: number; delay: number; duration: number; width: number }[]>([]);
  const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const expressPath = "M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 0 1 0 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z";

  // 1. Efecto de montaje para evitar Hydration Mismatch
  useEffect(() => {
    setIsMounted(true);
    const generatedPackets = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      y: (Math.random() - 0.5) * 25,
      delay: Math.random() * 2,
      duration: 0.8 + Math.random() * 1.2,
      width: 3 + Math.random() * 10
    }));
    setClientPackets(generatedPackets);
  }, []);

  const scheduleGlitch = () => {
    if (!isActive) return;
    const nextGlitchTime = 800 + Math.random() * 1700;

    glitchTimeoutRef.current = setTimeout(() => {
      setGlitchPositions(Array.from({ length: 3 }).map(() => ({
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 30,
        color: ["#00FFFF", "#FF00FF", "#FFFFFF"][Math.floor(Math.random() * 3)]
      })));
      setIsGlitching(true);
      
      setTimeout(() => {
        setIsGlitching(false);
        scheduleGlitch();
      }, 120); 
    }, nextGlitchTime);
  };

  useEffect(() => {
    if (isActive && isMounted) scheduleGlitch();
    return () => { if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current); };
  }, [isActive, isMounted]);

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
      {/* FLUJO DE DATOS - Warning 2 arreglado con isMounted */}
      {isMounted && isActive && clientPackets.map((p, index) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            height: "1px",
            width: p.width,
            backgroundColor: index % 2 === 0 ? "#61DAFB" : "#ffffff",
            zIndex: 0,
            top: `calc(50% + ${p.y}px)`,
            left: "-10%",
          }}
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: [0, 120], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}

      <div style={{ position: "relative", width: "40px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        
        <motion.svg
          key={isActive ? "active-express" : "inactive-express"} 
          width="32px" height="32px" viewBox="0 0 24 24" fill="#fff"
          style={{ zIndex: 10, overflow: "visible" }}
          // CORRECCIÓN: Filtro simplificado y consistente para evitar Warning 1
          initial={{ x: 0, skewX: 0, filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))" }}
          animate={isActive && isGlitching ? { 
            x: [0, -4, 4, 0],
            skewX: [0, 15, -15, 0],
            filter: [
              "drop-shadow(3px 0px 0px rgba(255,0,255,0.8)) drop-shadow(-3px 0px 0px rgba(0,255,255,0.8))",
              "drop-shadow(-3px 0px 0px rgba(255,0,255,0.8)) drop-shadow(3px 0px 0px rgba(0,255,255,0.8))",
              "drop-shadow(0px 0px 0px rgba(0,0,0,0))"
            ]
          } : { 
            x: 0, 
            skewX: 0, 
            filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))" 
          }}
          transition={{ duration: 0.1 }}
        >
          <path d={expressPath} />
        </motion.svg>

        <AnimatePresence>
          {isMounted && isActive && isGlitching && glitchPositions.map((pos, i) => (
            <motion.svg
              key={`glitch-${i}`}
              width="32px" height="32px" viewBox="0 0 24 24"
              fill={pos.color}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.9 }}
              animate={{ opacity: [0, 0.7, 0], x: pos.x, y: pos.y, scale: 0.9 }}
              exit={{ opacity: 0 }}
              style={{ position: "absolute", zIndex: i, pointerEvents: "none" }}
            >
              <path d={expressPath} />
            </motion.svg>
          ))}
        </AnimatePresence>

        {/* LÍNEA DE INTERFERENCIA */}
        <AnimatePresence>
          {isMounted && isActive && isGlitching && (
            <motion.div
              style={{
                position: "absolute",
                width: "150%",
                height: "2px",
                background: "rgba(255,255,255,0.9)",
                zIndex: 20,
                left: "-25%",
              }}
              initial={{ top: "0%", opacity: 0 }}
              animate={{ 
                top: ["20%", "80%", "40%"], 
                opacity: [0, 1, 0] 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};