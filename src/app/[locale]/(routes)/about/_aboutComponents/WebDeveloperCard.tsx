"use client"

import React from "react"
import { 
  m, 
  HTMLMotionProps, 
  useMotionValue, 
  useTransform, 
  useSpring, 
  useReducedMotion, 
  Variants 
} from "framer-motion"
import Image from "next/image"

interface WebDeveloperCardProps extends HTMLMotionProps<"div"> {
  className?: string
  imageClassName?: string
  variants?: Variants
}

const WebDeveloperCard = ({ 
  className, 
  imageClassName, 
  variants, 
  initial = "hidden",
  whileInView = "visible",
  style,
  ...rest 
}: WebDeveloperCardProps) => {
  // Verificación de preferencia del usuario para reducir el movimiento
  const shouldReduceMotion = useReducedMotion()

  // Configuración del resorte
  const springConfig = { stiffness: 150, damping: 30 }

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Ángulos de rotación
  const rawRotateX = useTransform(y, [-0.5, 0.5], [15, -15])
  const rawRotateY = useTransform(x, [-0.5, 0.5], [-15, 15])

  const rotateX = useSpring(rawRotateX, springConfig)
  const rotateY = useSpring(rawRotateY, springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // Si el usuario activó la reducción de movimiento, anulo el cálculo 3D
    if (shouldReduceMotion) return

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
    if (shouldReduceMotion) return
    x.set(0)
    y.set(0)
  }

  return (
    <m.div
      className={className}
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
        cursor: "default", // Al no ser clickeable, el cursor no debe inducir a error
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible", 
        ...style
      }}
    >
      <m.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          scale: 1.1, 
          transformStyle: "preserve-3d",
          width: "84%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <m.div
          style={{
            transformStyle: "preserve-3d",
            transform: shouldReduceMotion ? "none" : "translateZ(100px)", 
          }}
        >
          <Image
            src="/svg/webDeveloper.svg"
            className={imageClassName}
            alt="" // Accesibilidad: Marcada como imagen decorativa para evitar lecturas innecesarias
            // ⚡ Le indicamos a Next.js el tamaño real según la pantalla:
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
            aria-hidden="true"
            priority
            width={400}
            height={400}
            style={{
              filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.35))",
              pointerEvents: "none"
            }}
          />
        </m.div>
      </m.div>
    </m.div>
  )
}

export default WebDeveloperCard