import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

export const SupabaseIcon = ({ isActive = false, ...props }: IconProps) => {
  const topPath = "M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z";
  const bottomPath = "M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z";

  // Colores
  const supabaseGreen = "#3ECF8E";
  const supabaseDark = "#249361";

  const centerOrigin = { originX: "55px", originY: "56px" };

  // --- CALIBRACIÓN DE VISIBILIDAD ---
  const waveVariants = {
    initial: { 
      scale: 1, 
      opacity: 0.8,    // 80% de opacidad inicial (bastante sólido)
      strokeWidth: 5   // 5px: El punto medio perfecto entre fino y grueso
    },
    animate: {
      scale: 2.2,      
      opacity: 0,
      // Truco visual: El grosor baja lentamente (5 -> 3) y solo al final se hace fino (0)
      // Esto hace que la onda se vea "gorda" durante casi todo el viaje.
      strokeWidth: [5, 3, 0], 
    }
  };

  const waveTransition = (delay: number) => ({
    duration: 2.2,
    repeat: Infinity,
    ease: "easeOut",
    delay: delay,
    times: [0, 0.7, 1] // Controla los tiempos del array de strokeWidth
  });

  const LightningOutline = () => (
    <g>
      <path d={topPath} />
      <path d={bottomPath} />
    </g>
  );

  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 110 113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ overflow: "visible" }}
    >
      <title>Supabase Solid Pulse</title>
      
      <defs>
        <linearGradient id="main-gradient" x1="53.9738" y1="54.974" x2="94.1635" y2="71.8295" gradientUnits="userSpaceOnUse">
          <stop stopColor={supabaseDark} />
          <stop offset="1" stopColor={supabaseGreen} />
        </linearGradient>
      </defs>

      {/* --- ONDAS (Visibles y Definidas) --- */}
      {isActive && (
        <g stroke={supabaseGreen} fill="none" strokeLinejoin="round" strokeLinecap="round">
          <motion.g
            variants={waveVariants} initial="initial" animate="animate"
            transition={waveTransition(1)} style={centerOrigin}
          >
             <LightningOutline />
          </motion.g>

          <motion.g
            variants={waveVariants} initial="initial" animate="animate"
            transition={waveTransition(0.5)} style={centerOrigin}
          >
             <LightningOutline />
          </motion.g>

          <motion.g
            variants={waveVariants} initial="initial" animate="animate"
            transition={waveTransition(0)} style={centerOrigin}
          >
             <LightningOutline />
          </motion.g>
        </g>
      )}

      {/* --- ICONO PRINCIPAL --- */}
      <motion.g
        animate={isActive ? { scale: [1, 1.08, 1] } : {}} 
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={centerOrigin}
      >
         <path d={topPath} fill={supabaseGreen} />
         <path d={bottomPath} fill="url(#main-gradient)" />
         <path d={bottomPath} fill="black" fillOpacity="0.2" style={{ mixBlendMode: "overlay" }} />
      </motion.g>
    </motion.svg>
  );
};