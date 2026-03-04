"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

export const RestApiIcon = ({ isActive = false, ...props }: IconProps) => {
  const white = "#ffffff";
  const cyan = "#00efff";
  const violet = "#bf5af2";

  const n = {
    tl: { x: 4, y: 4 },  tr: { x: 16, y: 4 },
    bl: { x: 4, y: 16 }, br: { x: 16, y: 16 },
  };

  const originalPathD = "M16 13c-1.3 0-2.4.8-2.8 2H9c0-.7-.2-1.3-.5-1.8l7.1-7.3c.3 0 .6.1.9.1C17.9 6 19 4.9 19 3.5S17.9 1 16.5 1 14 2.1 14 3.5c0 .3.1.7.2 1l-7 7.2c-.6-.5-1.4-.7-2.2-.7V6.8C6.2 6.4 7 5.3 7 4c0-1.7-1.3-3-3-3S1 2.3 1 4c0 1.3.8 2.4 2 2.8v4.7c-1.2.7-2 2-2 3.4 0 2.2 1.8 4 4 4 1.5 0 2.8-.8 3.4-2h4.7c.4 1.1 1.5 2 2.8 2 1.6 0 3-1.3 3-3C19 14.3 17.6 13 16 13z";

  // --- CONFIGURACIÓN DE TIEMPOS CON PAUSA ---
  // Dividimos la animación en 5 puntos de control para crear la pausa final.
  // [0, 0.25, 0.5, 0.75, 1]
  const loopConfig = {
    duration: 4, 
    ease: "linear",
    repeat: Infinity,
    times: [0, 0.25, 0.5, 0.8, 1] // Ajustado: el paso 3 al 4 es más largo (0.5 a 0.8)
  };

  const fadeTransition = { duration: 0.5, ease: "easeInOut" };

  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ overflow: "visible", ...props.style }}
    >
      <title>REST API Final</title>

      {/* NODOS ESTRUCTURALES */}
      <circle cx={n.tl.x} cy={n.tl.y} r="2" fill={white} />
      <circle cx={n.tr.x} cy={n.tr.y} r="2" fill={white} />
      <circle cx={n.bl.x} cy={n.bl.y} r="2" fill={white} />
      <circle cx={n.br.x} cy={n.br.y} r="2" fill={white} />

      {/* CAPA SÓLIDA (INACTIVO) 
         Se desvanece suavemente al activar.
      */}
      <motion.path
        d={originalPathD}
        fill={white}
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={fadeTransition}
      />

      {/* CAPA DE ANIMACIÓN (ACTIVO) 
         Aparece suavemente al activar.
      */}
      <motion.g 
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={fadeTransition}
      >
        {/* FASE 1 & 4: BORDE BLANCO 
          CLAVE: strokeLinecap="butt" -> Elimina el punto/círculo cuando la línea es corta.
          
          Secuencia:
          0 -> 0.25: [1 -> 0] (Desaparece)
          0.25 -> 0.5: [0] (Espera)
          0.5 -> 0.8: [0] (Espera larga mientras Violeta termina)
          0.8 -> 1.0: [0 -> 1] (Reaparece al final)
        */}
        <motion.path
          d={originalPathD}
          fill="none" 
          stroke={white} 
          strokeWidth="1.5" 
          strokeLinecap="butt" // <--- ESTO ELIMINA EL PUNTO
          strokeLinejoin="round" // Mantiene las esquinas suaves
          animate={{ pathLength: isActive ? [1, 0, 0, 0, 1] : 1 }}
          transition={isActive ? loopConfig : { duration: 0 }}
        />

        {/* FASE 2: FLECHA CYAN
          0 -> 0.25: [0 -> 1] (Crece mientras blanco se va)
          0.25 -> 0.5: [1 -> 0] (Desaparece)
        */}
        <motion.path
          d={`M${n.tl.x} ${n.tl.y} L${n.br.x} ${n.br.y} M${n.bl.x} ${n.bl.y} L${n.tr.x} ${n.tr.y}`}
          fill="none" stroke={cyan} strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? [0, 1, 0, 0, 0] : 0 }}
          transition={isActive ? loopConfig : { duration: 0 }}
        />

        {/* FASE 3: ZETA VIOLETA
          0.25 -> 0.5: [0 -> 1] (Crece)
          0.5 -> 0.8: [1 -> 0] (Desaparece lentamente)
          0.8: (Termina totalmente antes de que el blanco vuelva)
        */}
        <motion.path
          d={`M${n.tl.x} ${n.tl.y} L${n.tr.x} ${n.tr.y} L${n.bl.x} ${n.bl.y} L${n.br.x} ${n.br.y}`}
          fill="none" stroke={violet} strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? [0, 0, 1, 0, 0] : 0 }}
          transition={isActive ? loopConfig : { duration: 0 }}
        />
      </motion.g>
    </motion.svg>
  );
};