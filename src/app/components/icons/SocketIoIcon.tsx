"use client";

import React, { useId } from "react";
import { m, Variants, SVGMotionProps } from "framer-motion";

interface IconProps extends SVGMotionProps<SVGSVGElement> {
  isActive?: boolean;
}

export const SocketIoIcon = ({
  isActive = false,
  style,
  ...props
}: IconProps) => {
  // Genera un ID único para evitar colisiones si hay múltiples íconos en pantalla
  const filterId = useId();

  const pathData =
    "M15.917 0.021c-1.339 0.005-2.672 0.172-3.969 0.505-6.24 1.552-11.193 7.203-11.828 13.613-0.787 6.063 2.281 12.381 7.525 15.511 5.152 3.224 12.125 3.095 17.167-0.296 4.532-2.943 7.349-8.303 7.183-13.715-0.077-5.353-3.083-10.557-7.683-13.307-2.505-1.547-5.452-2.323-8.395-2.312zM15.828 2.281c6.593-0.011 13.052 5.088 13.713 11.901 1.261 7.547-5.005 15.219-12.651 15.443-7.271 0.724-14.303-5.443-14.511-12.745-0.541-5.911 3.36-11.781 8.932-13.735 1.437-0.572 2.969-0.864 4.516-0.859zM22.62 6.584c-3.584 2.78-7.016 5.744-10.521 8.609 1.604 0.020 3.219 0.020 4.828 0.009 1.88-2.885 3.813-5.733 5.693-8.619zM15.068 16.787c-1.88 2.891-3.817 5.744-5.699 8.635 3.595-2.776 7.011-5.76 10.537-8.609-1.615-0.020-3.229-0.025-4.839-0.025z";

  const baseColor = "#ffffff";
  const energyColor = "#00efff";

  // VARIANTES DE ANIMACIÓN
  const circuitVariants: Variants = {
    idle: {
      opacity: 0,
      strokeDashoffset: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    active: {
      opacity: 1,
      strokeDashoffset: [0, -200],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <m.svg
      width="100%"
      height="100%"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ overflow: "visible", ...style }}
    >
      <title>Socket.io Data Flow</title>

      <defs>
        <filter id={filterId}>
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* CAPA BASE: ICONO BLANCO SÓLIDO */}
      <path d={pathData} fill={baseColor} />

      {/* GLOW DE NEÓN POSTERIOR */}
      <m.path
        d={pathData}
        fill="none"
        stroke={energyColor}
        strokeWidth="2"
        strokeDasharray="10 100"
        opacity="0.6"
        filter={`url(#${filterId})`}
        variants={circuitVariants}
        initial="idle"
        animate={isActive ? "active" : "idle"}
      />

      {/* LÍNEA DE ENERGÍA PRINCIPAL */}
      <m.path
        d={pathData}
        fill="none"
        stroke={energyColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="10 100"
        variants={circuitVariants}
        initial="idle"
        animate={isActive ? "active" : "idle"}
      />
    </m.svg>
  );
};