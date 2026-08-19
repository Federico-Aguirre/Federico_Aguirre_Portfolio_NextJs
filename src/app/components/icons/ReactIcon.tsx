"use client";

import React from "react";
import { m, Variants, SVGMotionProps } from "framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
  isActive?: boolean;
}

export const ReactIcon = ({
  isActive = false,
  style,
  ...props
}: IconProps) => {
  const color = "#61DAFB";

  // Transición de retorno suave al desactivar (idle)
  const smoothReturnTransition = {
    duration: 0.6,
    ease: "backOut",
  };

  // VARIANTE DEL NÚCLEO
  const coreVariants: Variants = {
    idle: {
      scale: 1,
      opacity: 1,
      transition: smoothReturnTransition,
    },
    active: {
      scale: [1, 1.25, 1],
      opacity: 1,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // GENERADOR DE VARIANTES PARA ANILLOS
  const createRingVariant = (
    baseAngle: number,
    duration: number,
    direction: number
  ): Variants => ({
    idle: {
      rotate: baseAngle,
      scaleX: 1,
      scaleY: 1,
      opacity: 0.6,
      transition: smoothReturnTransition,
    },
    active: {
      rotate: baseAngle + 360 * direction,
      scaleX: 1.1,
      scaleY: 1.1,
      opacity: 1,
      transition: {
        rotate: {
          duration,
          repeat: Infinity,
          ease: "linear",
        },
        scaleX: { duration: 0.5 },
        scaleY: { duration: 0.5 },
        opacity: { duration: 0.3 },
      },
    },
  });

  return (
    <m.svg
      viewBox="-13 -13 26 26"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="none"
      {...props}
      style={{ overflow: "visible", ...style }}
    >
      {/* NÚCLEO */}
      <m.circle
        cx="0"
        cy="0"
        r="2.05"
        fill={color}
        variants={coreVariants}
        initial="idle"
        animate={isActive ? "active" : "idle"}
      />

      {/* GRUPO DE ANILLOS */}
      <g stroke={color} strokeWidth="1.1" fill="none">
        {/* Anillo 1: Base (0°) - Gira Horario */}
        <m.ellipse
          rx="11"
          ry="4.2"
          variants={createRingVariant(0, 4, 1)}
          initial="idle"
          animate={isActive ? "active" : "idle"}
          style={{ transformOrigin: "0px 0px" }}
        />

        {/* Anillo 2: Inclinado (60°) - Gira Anti-Horario */}
        <m.ellipse
          rx="11"
          ry="4.2"
          variants={createRingVariant(60, 5, -1)}
          initial="idle"
          animate={isActive ? "active" : "idle"}
          style={{ transformOrigin: "0px 0px" }}
        />

        {/* Anillo 3: Inclinado (120°) - Gira Horario */}
        <m.ellipse
          rx="11"
          ry="4.2"
          variants={createRingVariant(120, 7, 1)}
          initial="idle"
          animate={isActive ? "active" : "idle"}
          style={{ transformOrigin: "0px 0px" }}
        />
      </g>
    </m.svg>
  );
};