"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size?: number | string;
}

export const FirebaseIcon = ({ isActive = true, size = 100, style, ...props }: IconProps) => {
  // Generamos 12 "brasas" o chispas que suben
  const embers = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: -10 + Math.random() * 20,
    // Pre-calculamos el zigzag para evitar el Math.random en el animate
    zigzag: (Math.random() * 10 - 5),
    delay: Math.random() * 2,
    duration: 1.5 + Math.random() * 1,
    size: 1 + Math.random() * 2
  })), []);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: "32px", 
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "4px",
        overflow: "visible",
        ...style
      }}
      {...props}
    >
      {/* CHISPAS / BRASAS */}
      {isActive && embers.map((e) => (
        <motion.div
          key={e.id}
          style={{
            position: "absolute",
            width: e.size,
            height: e.size,
            backgroundColor: "#FFCA28",
            borderRadius: "50%",
            zIndex: 0,
            bottom: "50%",
            boxShadow: "0 0 4px #FFA000",
          }}
          // CORRECCIÓN: initial y uso de zigzag pre-calculado
          initial={{ y: 0, x: e.x, opacity: 0, scale: 1 }}
          animate={{
            y: [0, -25], 
            x: [e.x, e.x + e.zigzag, e.x], 
            opacity: [0, 1, 0],
            scale: [1, 0.5]
          }}
          transition={{
            duration: e.duration,
            repeat: Infinity,
            delay: e.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* ICONO DE FIREBASE */}
      <motion.svg
        width="32px"
        height="32px"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 1, overflow: "visible" }}
        // CORRECCIÓN: initial para scale y filter
        initial={{ scale: 1, filter: "drop-shadow(0 0 2px rgba(255,160,0,0.4))" }}
        animate={isActive ? {
          scale: [1, 1.03, 1],
          filter: [
            "drop-shadow(0 0 2px rgba(255,160,0,0.4))",
            "drop-shadow(0 0 6px rgba(255,160,0,0.7))",
            "drop-shadow(0 0 2px rgba(255,160,0,0.4))"
          ]
        } : { scale: 1, filter: "drop-shadow(0 0 2px rgba(255,160,0,0.0))" }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Capa trasera */}
        <motion.path
          d="M5.8,24.6l.17-.237L13.99,9.149l.017-.161L10.472,2.348a.656.656,0,0,0-1.227.207Z"
          fill="#ffc24a"
          initial={{ opacity: 0.8 }}
          animate={isActive ? { opacity: [0.8, 1, 0.8] } : { opacity: 0.8 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        
        <path d="M5.9,24.42l.128-.25L13.965,9.114,10.439,2.448a.6.6,0,0,0-1.133.206Z" fill="#ffa712" />
        
        {/* Llama pequeña superior */}
        <motion.path
          d="M16.584,14.01l2.632-2.7L16.583,6.289a.678.678,0,0,0-1.195,0L13.981,8.971V9.2Z"
          fill="#f4bd62"
          initial={{ y: 0 }}
          animate={isActive ? { y: [0, -0.5, 0] } : { y: 0 }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />

        <path d="M16.537,13.9l2.559-2.62L16.537,6.4a.589.589,0,0,0-1.074-.047L14.049,9.082l-.042.139Z" fill="#ffa50e" />
        <polygon points="5.802 24.601 5.879 24.523 6.158 24.41 16.418 14.188 16.548 13.834 13.989 8.956 5.802 24.601" fill="#f6820c" />
        
        {/* Base frontal */}
        <motion.path
          d="M16.912,29.756,26.2,24.577,23.546,8.246A.635.635,0,0,0,22.471,7.9L5.8,24.6l9.233,5.155a1.927,1.927,0,0,0,1.878,0"
          fill="#fde068"
          initial={{ fill: "#fde068" }}
          animate={isActive ? { fill: ["#fde068", "#ffeb99", "#fde068"] } : { fill: "#fde068" }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        <path d="M26.115,24.534,23.483,8.326a.557.557,0,0,0-.967-.353L5.9,24.569l9.131,5.1a1.912,1.912,0,0,0,1.863,0Z" fill="#fcca3f" />
        <path d="M16.912,29.6a1.927,1.927,0,0,1-1.878,0L5.876,24.522,5.8,24.6l9.233,5.155a1.927,1.927,0,0,0,1.878,0L26.2,24.577l-.023-.14Z" fill="#eeab37" />
      </motion.svg>
    </div>
  );
};