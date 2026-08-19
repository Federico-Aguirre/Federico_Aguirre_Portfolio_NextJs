"use client";

import React from "react";
import { m, Variants, SVGMotionProps } from "framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
  isActive?: boolean;
}

export const SassIcon = ({
  isActive = false,
  style,
  ...props
}: IconProps) => {
  const pathData =
    "M258,88c-96,33-158,100-152,140s66,72,93,93h0c-35,18-79,45-78,80,2,48,54,33,76,19s44-53,30-94c31-8,58,2,66,8,31,22,15,47,4,51s-4,6,3,4,22-12,22-29c0-43-46-63-103-48-33-35-78-51-76-89,1-14,6-50,95-95s152-27,144,14c-12,62-120,104-158,68-2-4-9-7-5,4,20,50,182,27,189-79C410,79,329,64,258,88ZM172,408c-25,8-24-8-23-14,3-17,17-38,59-59C220,373,193,402,172,408Z";

  const brandColor = "#c69"; // Rosa Sass
  const contrastColor = "#ffffff"; // Blanco

  // ANIMACIÓN DEL CONTENEDOR (BOMBEO SUTIL)
  const bgVariants: Variants = {
    idle: {
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    active: {
      scale: [1, 0.96, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // ANIMACIÓN DEL TRAZADO (COMPILACIÓN DE SASS)
  const pathVariants: Variants = {
    idle: {
      pathLength: 1,
      fillOpacity: 1,
      strokeWidth: 0,
      strokeOpacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    active: {
      pathLength: [0, 1, 1],
      fillOpacity: [0, 0, 1],
      strokeWidth: [14, 14, 0],
      strokeOpacity: [1, 1, 0],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        times: [0, 0.7, 1], // 0-70%: Dibuja contorno | 70-100%: Rellena de color
        repeat: Infinity,
        repeatDelay: 0.5,
      },
    },
  };

  return (
    <m.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="100%"
      height="100%"
      {...props}
      style={{ overflow: "visible", ...style }}
    >
      <title>Sass Compilation</title>

      {/* FONDO ROSA */}
      <m.rect
        width="512"
        height="512"
        rx="64"
        fill={brandColor}
        variants={bgVariants}
        initial="idle"
        animate={isActive ? "active" : "idle"}
        style={{ transformOrigin: "256px 256px" }}
      />

      {/* LETRAS ANIMADAS */}
      <m.path
        d={pathData}
        fill={contrastColor}
        stroke={contrastColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="idle"
        animate={isActive ? "active" : "idle"}
      />
    </m.svg>
  );
};