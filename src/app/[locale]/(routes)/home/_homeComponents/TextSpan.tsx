"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useState } from "react";
import homeStyle from "scss/pages/home.module.scss";

const TextSpan = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const controls = useAnimationControls();

  const rubberBand = () => {
    controls.start({
      transform: [
        "scale3d(1, 1, 1)",
        "scale3d(1.4, .55, 1)",
        "scale3d(.75, 1.25, 1)",
        "scale3d(1.25, .85, 1)",
        "scale3d(.9, 1.05, 1)",
        "scale3d(1, 1, 1)"
      ]
    });
    setIsPlaying(true);
  };

  return (
    <motion.span
      className={homeStyle.homePage__title__span}
      initial="hidden"
      animate={controls}
      transition={{ staggerChildren: 0.1 }}
      aria-hidden
      onMouseOver={() => !isPlaying && rubberBand()}
      onAnimationComplete={() => setIsPlaying(false)}
    >
      {children}
    </motion.span>
  );
};

export default TextSpan;
