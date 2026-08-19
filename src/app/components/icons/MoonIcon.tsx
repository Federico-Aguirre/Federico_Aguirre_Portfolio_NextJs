"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";

interface MoonIconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const MoonIcon = ({
  isActive = true,
  size = 50,
  style,
  ...props
}: MoonIconProps) => {
  // ACCESIBILIDAD: Detectar preferencia de movimiento reducido
  const shouldReduceMotion = useReducedMotion();
  const animateIcon = isActive && !shouldReduceMotion;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      {...props}
    >
      <m.svg
        viewBox="0 0 35 32"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        // ACCESIBILIDAD: Ocultar SVG a lectores de pantalla
        aria-hidden="true"
        focusable="false"
        initial={{ rotate: 0, scale: 1 }}
        animate={
          animateIcon
            ? {
                rotate: [-4, 4, -4],
                scale: [1, 1.05, 1],
              }
            : { rotate: 0, scale: 1 }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <m.path
          d="M30.9,20.8c-2.2,6.1-8,10.2-14.5,10.2C7.9,31,1,24.2,1,15.8C1,8.7,5.9,2.6,12.9,1c0.3-0.1,0.7,0,1,0.3 c0.2,0.3,0.3,0.7,0.2,1c-0.5,1.4-0.8,2.9-0.8,4.4c0,7.3,6,13.2,13.4,13.2c1,0,2.1-0.1,3.1-0.4c0.3-0.1,0.7,0,1,0.3 C31,20.1,31.1,20.5,30.9,20.8z"
          fill="#FFC10A"
          animate={
            animateIcon
              ? {
                  fillOpacity: [1, 0.85, 1],
                }
              : { fillOpacity: 1 }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </m.svg>
    </div>
  );
};

export default MoonIcon;