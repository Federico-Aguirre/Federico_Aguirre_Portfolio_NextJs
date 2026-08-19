"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const LinkedInIcon = ({
  isActive = false,
  size = 45,
  style,
  ...props
}: IconProps) => {
  const brandColor = "hsl(258, 86%, 52%)";

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
        width="100%"
        height="100%"
        viewBox="0 0 112.196 112.196"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
        aria-hidden="true"
        focusable="false"
      >
        <m.g
          animate={{
            scale: isActive ? 1.1 : 1,
            filter: isActive
              ? `drop-shadow(0 0 15px ${brandColor})`
              : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
          }}
          transition={{ duration: 0.4, ease: "backOut" }}
          style={{ transformOrigin: "center" }}
        >
          {/* Círculo de fondo con efecto pulso cuando está activo */}
          <m.circle
            cx="56.098"
            cy="56.097"
            r="56.098"
            fill={brandColor}
            animate={
              animateIcon
                ? {
                    scale: [1, 1.03, 1],
                  }
                : { scale: 1 }
            }
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "center" }}
          />

          {/* Logo 'in' central */}
          <m.path
            d="M89.616 60.611v23.128H76.207V62.161c0-5.418-1.936-9.118-6.791-9.118-3.705 0-5.906 2.491-6.878 4.903-.353.862-.444 2.059-.444 3.268v22.524h-13.41s.18-36.546 0-40.329h13.411v5.715c-.027.045-.065.089-.089.132h.089v-.132c1.782-2.742 4.96-6.662 12.085-6.662 8.822 0 15.436 5.764 15.436 18.149zm-54.96-36.642c-4.587 0-7.588 3.011-7.588 6.967 0 3.872 2.914 6.97 7.412 6.97h.087c4.677 0 7.585-3.098 7.585-6.97-.089-3.956-2.908-6.967-7.496-6.967zm-6.791 59.77H41.27v-40.33H27.865v40.33z"
            fill="#fff"
            animate={
              animateIcon
                ? {
                    y: [0, -1.5, 0],
                  }
                : { y: 0 }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </m.g>
      </m.svg>
    </div>
  );
};

export default LinkedInIcon;