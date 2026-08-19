"use client";

import React, { useState } from "react";
import styles from "scss/components/home/textSpan.module.scss";

export interface TextSpanProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
}

export const TextSpan = ({ children, text, className = "" }: TextSpanProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const content = children ?? text;

  if (!content) return null;

  const handleMouseEnter = () => {
    // Si no se está animando, activa la clase CSS de animación
    if (!isAnimating) {
      setIsAnimating(true);
    }
  };

  const handleAnimationEnd = () => {
    // Cuando la animación CSS termina, liberamos el bloqueo
    setIsAnimating(false);
  };

  return (
    <span
      className={`${styles.textSpan} ${isAnimating ? styles.rubberBand : ""} ${className}`}
      onMouseEnter={handleMouseEnter}
      onAnimationEnd={handleAnimationEnd}
    >
      {content}
    </span>
  );
};

export default TextSpan;