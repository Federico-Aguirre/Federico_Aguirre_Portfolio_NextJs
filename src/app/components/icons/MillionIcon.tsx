"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const MillionIcon = ({ isActive = true, size = 32, style, ...props }: IconProps) => {
  const [event, setEvent] = useState<'idle' | 'fade' | 'latido'>('idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      setEvent('idle');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    const triggerRandomEvent = () => {
      const delay = Math.random() * 2000 + 2000;
      
      timeoutRef.current = setTimeout(() => {
        const rand = Math.random();
        let duration = 0;

        // 50% de probabilidad para cada animación
        if (rand < 0.5) {
          setEvent('fade');
          duration = 1800; 
        } else {
          setEvent('latido');
          duration = 800; 
        }

        setTimeout(() => {
          setEvent('idle');
          triggerRandomEvent();
        }, duration);

      }, delay);
    };

    triggerRandomEvent();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isActive]);

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
        viewBox="0 0 230 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* FONDO ESTÁTICO */}
        <rect width="230" height="230" rx="115" fill="url(#paint0_linear_1416_10)" />
        
        {/* CAPA 1: Respiración Infinita */}
        <motion.g
          initial={{ originX: 115, originY: 115 }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* CAPA 2: Las Piezas */}
          
          {/* Pieza Inferior */}
          <motion.path
            d="M76.6934 175.657C83.8861 165.361 98.5235 158.313 115.411 158.313C132.298 158.313 146.936 165.361 154.128 175.657C146.936 185.952 132.298 193 115.411 193C98.5235 193 83.8861 185.952 76.6934 175.657Z"
            fill="url(#paint1_radial_1416_10)"
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={
              event === 'fade' ? { y: [0, 10, 0], opacity: [1, 0, 1] } :
              event === 'latido' ? { y: [0, -12, 0, -6, 0], opacity: 1 } :
              { y: 0, opacity: 1 } 
            }
            transition={{ duration: event === 'fade' ? 1.8 : 0.8, ease: "easeInOut" }}
          />
          
          {/* Pieza Superior */}
          <motion.path
            d="M76.4322 99.1594C83.6203 88.9734 98.2484 82 115.125 82C132.001 82 146.629 88.9734 153.818 99.1594C146.629 109.345 132.001 116.319 115.125 116.319C98.2484 116.319 83.6203 109.345 76.4322 99.1594Z"
            fill="url(#paint2_radial_1416_10)"
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={
              event === 'fade' ? { y: [0, -10, 0], opacity: [1, 0, 1] } :
              event === 'latido' ? { y: [0, 12, 0, 6, 0], opacity: 1 } :
              { y: 0, opacity: 1 }
            }
            transition={{ duration: event === 'fade' ? 1.8 : 0.8, ease: "easeInOut" }}
          />
          
          {/* Pieza Izquierda */}
          <motion.path
            d="M115.864 137.703C105.406 147.804 91.2221 153.479 76.4321 153.479C61.6422 153.479 47.4581 147.804 37 137.703L76.4322 99.1594L115.864 137.703Z"
            fill="url(#paint3_radial_1416_10)"
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={
              event === 'fade' ? { x: [0, -10, 0], opacity: [1, 0, 1] } :
              event === 'latido' ? { x: [0, 12, 0, 6, 0], opacity: 1 } :
              { x: 0, opacity: 1 }
            }
            transition={{ duration: event === 'fade' ? 1.8 : 0.8, ease: "easeInOut" }}
          />
          
          {/* Pieza Derecha */}
          <motion.path
            d="M193.344 137.722C182.886 147.823 168.702 153.498 153.912 153.498C139.122 153.498 124.938 147.823 114.479 137.722L153.912 99.1594L193.344 137.722Z"
            fill="url(#paint4_radial_1416_10)"
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={
              event === 'fade' ? { x: [0, 10, 0], opacity: [1, 0, 1] } :
              event === 'latido' ? { x: [0, -12, 0, -6, 0], opacity: 1 } :
              { x: 0, opacity: 1 }
            }
            transition={{ duration: event === 'fade' ? 1.8 : 0.8, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Gradientes Intactos */}
        <defs>
          <linearGradient id="paint0_linear_1416_10" x1="115" y1="0" x2="115" y2="230" gradientUnits="userSpaceOnUse"><stop /><stop offset="1" stopColor="#3F3062" /></linearGradient>
          <radialGradient id="paint1_radial_1416_10" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(115.411 175.656) rotate(92.849) scale(11.206 24.9789)"><stop stopColor="#845CE7" /><stop offset="1" stopColor="#AF73D8" /></radialGradient>
          <radialGradient id="paint2_radial_1416_10" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(115.172 117.749) rotate(92.7908) scale(23.0968 50.4359)"><stop stopColor="#845CE7" /><stop offset="1" stopColor="#AF73D8" /></radialGradient>
          <radialGradient id="paint3_radial_1416_10" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(115.172 117.749) rotate(92.7908) scale(23.0968 50.4359)"><stop stopColor="#845CE7" /><stop offset="1" stopColor="#AF73D8" /></radialGradient>
          <radialGradient id="paint4_radial_1416_10" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(115.172 117.749) rotate(92.7908) scale(23.0968 50.4359)"><stop stopColor="#845CE7" /><stop offset="1" stopColor="#AF73D8" /></radialGradient>
        </defs>
      </motion.svg>
    </div>
  );
};