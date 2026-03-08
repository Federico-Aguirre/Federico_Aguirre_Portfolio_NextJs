"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const ManualTestingIcon = ({ isActive = false, size = 40, style, ...props }: IconProps) => {
  const brandBlue = "#56ACE0";
  const brandYellow = "#FFC10D";

  return (
    <div
      data-active={isActive.toString()}
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
      <style>
        {`
          /* Flotación con leve rotación, simulando inspección activa */
          @keyframes inspectMotion {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-2px) rotate(-3deg); }
            75% { transform: translateY(-2px) rotate(3deg); }
          }

          /* Pulso del lente simulando escaneo/enfoque */
          @keyframes lensFocus {
            0%, 100% {
              filter: brightness(1) drop-shadow(0 0 0px transparent);
            }
            50% {
              filter: brightness(1.2) drop-shadow(0 0 12px ${brandBlue});
            }
          }

          /* Brillo en el mango de la lupa */
          @keyframes handleGlow {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.3) drop-shadow(0 0 6px ${brandYellow}); }
          }

          /* Oscilación de opacidad en las líneas (como si fuesen leídas) */
          @keyframes readLines {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; filter: drop-shadow(0 0 2px rgba(25, 79, 130, 0.5)); }
          }

          .test-group {
            transform-origin: center;
          }

          /* Animaciones activadas */
          div[data-active="true"] .test-group {
            animation: inspectMotion 3.5s ease-in-out infinite;
          }

          div[data-active="true"] .test-lens {
            animation: lensFocus 2.5s ease-in-out infinite;
          }

          div[data-active="true"] .test-handle {
            animation: handleGlow 3.5s ease-in-out infinite;
          }

          div[data-active="true"] .test-lines path {
            animation: readLines 2s ease-in-out infinite;
          }

          /* Transiciones base */
          .test-lens, .test-handle, .test-lines path {
            transition: all 0.3s ease;
          }
        `}
      </style>

      <motion.svg
        height="100%"
        width="100%"
        viewBox="0 0 392.722 392.722"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          objectFit: "contain",
          overflow: "visible",
        }}
        // LE DAMOS LOS VALORES INICIALES EXACTOS PARA QUE NO SE PIERDA
        initial={
          isActive
            ? {
                scale: 0.85, 
                opacity: 1,
                filter: `grayscale(0) drop-shadow(0px 6px 10px rgba(86, 172, 224, 0.35))`,
              }
            : {
                scale: 0.65, 
                opacity: 0.4,
                filter: "grayscale(1) drop-shadow(0px 0px 0px rgba(0,0,0,0))",
              }
        }
        animate={
          isActive
            ? {
                // ESCALA ACTIVA
                scale: 0.85, 
                opacity: 1,
                // Sombra de todo el icono combinando los colores predominantes
                filter: `grayscale(0) drop-shadow(0px 6px 10px rgba(86, 172, 224, 0.35))`,
              }
            : {
                // ESCALA INACTIVA
                scale: 0.65, 
                opacity: 0.4,
                filter: "grayscale(1) drop-shadow(0px 0px 0px rgba(0,0,0,0))",
              }
        }
        transition={{
          scale: { duration: 0.4, ease: "backOut" },
          filter: { duration: 0.5 },
          opacity: { duration: 0.3 },
        }}
      >
        <g className="test-group">
          {/* Base Blanca circular */}
          <path
            fill="#FFFFFF"
            d="M21.941,156.251c0,74.085,60.251,134.4,134.4,134.4s134.335-60.315,134.335-134.4 s-60.38-134.4-134.4-134.4C82.256,21.851,21.941,82.101,21.941,156.251z"
          />
          {/* Mango de la lupa (Amarillo) */}
          <path
            className="test-handle"
            fill="#FFC10D"
            d="M282.337,248.307c-0.065,0-0.065,0-0.129,0c-9.503,12.929-20.881,24.372-33.875,33.875 c0,0.065,0,0.065,0,0.129l81.39,81.39c8.727,8.727,23.984,9.891,33.939,0c9.374-9.374,9.374-24.566,0-33.939L282.337,248.307z"
          />
          {/* Anillo oscuro y marco exterior */}
          <path
            fill="#194F82"
            d="M379.177,314.311l-85.01-85.01c11.572-21.851,18.23-46.739,18.23-73.115 C312.397,70.012,242.385,0,156.276,0C70.167,0.065,0.155,70.077,0.155,156.251s70.012,156.186,156.186,156.186 c26.44,0,51.329-6.659,73.115-18.23l85.01,85.01c18.036,18.489,47.968,17.519,64.776,0 C397.019,361.244,397.019,332.154,379.177,314.311z M363.726,363.701c-10.02,9.891-25.277,8.727-33.939,0l-81.39-81.455 c0-0.065,0-0.065,0-0.129c12.929-9.503,24.372-20.881,33.875-33.875c0.065,0,0.065,0,0.129,0l81.39,81.39 C373.1,339.071,373.1,354.263,363.726,363.701z M290.611,156.251c0,74.085-60.251,134.4-134.4,134.4s-134.335-60.315-134.335-134.4 s60.251-134.4,134.4-134.4C230.361,21.851,290.611,82.101,290.611,156.251z"
          />
          {/* Lente celeste de la lupa */}
          <path
            className="test-lens"
            fill="#56ACE0"
            d="M156.276,268.735c-62.061,0-112.485-50.489-112.485-112.485S94.28,43.766,156.276,43.766 S268.761,94.19,268.761,156.251C268.825,218.246,218.401,268.735,156.276,268.735z"
          />
          {/* Líneas de código/checklist dentro de la lupa */}
          <g className="test-lines">
            <path fill="#194F82" d="M96.995,96.905H82.902c-6.012,0-10.925,4.848-10.925,10.925c0,6.012,4.848,10.925,10.925,10.925 h14.093c6.012,0,10.925-4.848,10.925-10.925C107.856,101.754,103.007,96.905,96.995,96.905z" />
            <path fill="#194F82" d="M96.995,143.644H82.902c-6.012,0-10.925,4.848-10.925,10.925c0,6.012,4.848,10.925,10.925,10.925 h14.093c6.012,0,10.925-4.848,10.925-10.925C107.856,148.493,103.007,143.644,96.995,143.644z" />
            <path fill="#194F82" d="M149.229,143.644c-6.012,0-10.925,4.848-10.925,10.925c0,6.012,4.848,10.925,10.925,10.925h14.093 c6.012,0,10.925-4.848,10.925-10.925c0-6.012-4.848-10.925-10.925-10.925H149.229L149.229,143.644z" />
            <path fill="#194F82" d="M229.65,143.644h-14.093c-6.012,0-10.925,4.848-10.925,10.925c0,6.012,4.848,10.925,10.925,10.925 h14.093c6.012,0,10.925-4.848,10.925-10.925S235.662,143.644,229.65,143.644z" />
            <path fill="#194F82" d="M229.65,193.681h-14.093c-6.012,0-10.925,4.848-10.925,10.925s4.848,10.925,10.925,10.925h14.093 c6.012,0,10.925-4.848,10.925-10.925S235.662,193.681,229.65,193.681z" />
            <path fill="#194F82" d="M140.567,118.691h66.198c6.012,0,10.925-4.848,10.925-10.925c0-6.012-4.848-10.925-10.925-10.925 h-66.198c-6.012,0-10.925,4.848-10.925,10.925C129.642,113.778,134.555,118.691,140.567,118.691z" />
            <path fill="#194F82" d="M96.995,193.681H82.902c-6.012,0-10.925,4.848-10.925,10.925s4.848,10.925,10.925,10.925h14.093 c6.012,0,10.925-4.848,10.925-10.925S103.007,193.681,96.995,193.681z" />
            <path fill="#194F82" d="M180.13,193.681h-39.499c-6.012,0-10.925,4.848-10.925,10.925s4.848,10.925,10.925,10.925h39.499 c6.012,0,10.925-4.848,10.925-10.925S186.143,193.681,180.13,193.681z" />
          </g>
        </g>
      </motion.svg>
    </div>
  );
};