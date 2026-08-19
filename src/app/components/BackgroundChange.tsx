"use client";

import Image from "next/image";
import sun from "@/svg/sun.svg";
import moon from "@/svg/moon.svg";
import { m } from "framer-motion";
import { useContextStore } from "../store/Context";
import { useTranslations } from "next-intl";

interface BackgroundChangeProps {
    styles: typeof import("scss/base/navbar.module.scss").default;
}

const BackgroundChange = ({ styles }: BackgroundChangeProps) => {
  const t = useTranslations("header");
  const { darkMode, toggleDarkMode } = useContextStore(); 

  return (
    <m.button 
      className={styles.navbar__lightDarkButton} 
      onClick={() => toggleDarkMode()} 
      data-darkmode={darkMode}
      role="switch" 
      aria-checked={darkMode} 
      aria-label="Alternar modo oscuro" 
    >
      <m.span 
        className={styles.navbar__lightDarkButton__circle}
        animate={{ x: darkMode ? "40px" : "0" }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }} 
        aria-hidden="true" 
      />
      
      <div className={styles.navbar__lightDarkButton__moon} aria-hidden="true" style={{ pointerEvents: 'none' }}>
        <Image src={moon} fill alt="" />
      </div>
      <div className={styles.navbar__lightDarkButton__sun} aria-hidden="true" style={{ pointerEvents: 'none' }}>
        <Image src={sun} fill alt="" />
      </div>
    </m.button>
  );
};

export default BackgroundChange;