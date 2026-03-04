import React from "react";
import { motion } from "framer-motion";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

export const TailwindIcon = ({ isActive = false, ...props }: IconProps) => {
  const topPath = "M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7Z";
  const bottomPath = "M2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z";

  // Color base de Tailwind
  const sky500 = "#0ea5e9";

  return (
    <motion.svg
      width="800px"
      height="800px"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Tailwind Full Sweep</title>

      <defs>
        {/* 1. LA MÁSCARA: La forma de las nubes */}
        <clipPath id="cloud-mask-full">
          <path d={topPath} />
          <path d={bottomPath} />
        </clipPath>

        {/* 2. EL GRADIENTE: La luz blanca en el centro */}
        <linearGradient id="wind-gradient-full" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={sky500} />
          <stop offset="40%" stopColor={sky500} />
          <stop offset="50%" stopColor="#ffffff" /> {/* El brillo blanco justo al medio */}
          <stop offset="60%" stopColor={sky500} />
          <stop offset="100%" stopColor={sky500} />
        </linearGradient>
      </defs>

      {/* CAPA BASE ESTÁTICA (Para que el icono se vea cuando no pasa el brillo) */}
      <g>
          <path d={topPath} fill={sky500} />
          <path d={bottomPath} fill={sky500} />
      </g>

      {/* CAPA DE ANIMACIÓN ENMASCARADA */}
      {/* El rectángulo brillante solo es visible DENTRO de la forma de las nubes */}
      <g clipPath="url(#cloud-mask-full)">
        {isActive && (
          <motion.rect
            // Hacemos el rectángulo MUY ancho para tener espacio de recorrido
            width="300%" 
            height="100%"
            fill="url(#wind-gradient-full)"
            // CORRECCIÓN MATEMÁTICA AQUÍ:
            // -200%: Empieza totalmente fuera a la izquierda
            initial={{ x: "-200%" }}
            // 100%: Termina totalmente fuera a la derecha (considerando su ancho de 300%)
            animate={{ 
                x: "100%" 
            }} 
            transition={{
              duration: 1.5, // Tiempo que tarda en cruzar
              repeat: Infinity,
              ease: "linear", // Velocidad constante
              repeatDelay: 0 // Pausa de medio segundo antes de volver a empezar
            }}
          />
        )}
      </g>
      
    </motion.svg>
  );
};