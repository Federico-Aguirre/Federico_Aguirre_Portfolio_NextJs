"use client"
import React from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

interface WebDeveloperCardProps {
  className: string
  imageClassName: string
  variants: any
}

const WebDeveloperCard = ({ className, imageClassName, variants }: WebDeveloperCardProps) => {
  // Configuración del resorte
  const springConfig = { stiffness: 150, damping: 30 }

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Ángulos de rotación
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200, // Perspectiva ajustada
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // CORRECCIÓN 1: Evita que el contenedor corte la imagen si se sale de los bordes
        overflow: "visible", 
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          // CORRECCIÓN 2: Escala para recuperar el tamaño visual
          scale: 1.1, 
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            // CORRECCIÓN 3: Empujamos la imagen 100px hacia el frente.
            // Matemáticamente, para una rotación de 15 grados en un objeto de 400px, 
            // necesitamos al menos ~55px de espacio para que no choque con el fondo.
            // Ponemos 100px para ir sobrados y dar un efecto 3D más intenso.
            transform: "translateZ(100px)", 
          }}
        >
          <Image
            src="/svg/webDeveloper.svg"
            className={imageClassName}
            alt="Web Developer 3D Illustration"
            priority
            width={400}
            height={400}
            style={{
              filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.35))", // Sombra más dramática
              pointerEvents: "none"
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default WebDeveloperCard