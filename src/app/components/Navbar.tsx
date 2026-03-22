"use client";

import navbarStyle from "scss/base/navbar.module.scss"
import BackgroundChange from "./BackgroundChange"
import { contextStore } from "@/store/Context"
import { Link } from "react-scroll"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import Hamburger from "./Hamburger"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const t = useTranslations("header");
  const { sectionVisible, darkMode } = contextStore();
  let toggleClass: string = darkMode ? "darkModeLetterClass" : "brightModeLetterClass";

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true); // Nuevo estado para el inicio de página

  const activeColor = "hsl(194, 85%, 62%)";

  useEffect(() => {
    setIsMobile(window.innerWidth < 800);
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detectamos si el usuario está en el top de la página
  useMotionValueEvent(scrollY, "change", (latest: number): void => {
    // Si el scroll es menor a 100px, consideramos que estamos en Home
    setIsAtTop(latest < 100);

    const previous: number = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150 && window.innerWidth < 800) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const loadingAnimation = {
    initial: { opacity: 0, y: -60 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay: .5, duration: .3 }
    }
  };

  const showAnimation = {
    visible: { y: 0, transition: { duration: .3 } },
    hidden: { y: -60, transition: { duration: .3 } }
  };

  // Lógica de color robusta
  const getLinkStyle = (section: string) => {
    const current = sectionVisible.sectionVisibleValue;
    
    let isActive = false;
    if (section === "home") {
      // Home es activo si el Store lo dice O si el scroll está arriba de todo
      isActive = current === "home" || isAtTop;
    } else {
      // Las demás secciones dependen del Store y solo si NO estamos en el top
      isActive = current === section && !isAtTop;
    }

    return { color: isActive ? activeColor : "" };
  };

  return (
    <motion.header
      className={`${navbarStyle.navbar} ${toggleClass}`}
      variants={showAnimation}
      animate={hidden ? "hidden" : "visible"}
    >
      <motion.nav variants={loadingAnimation} initial="initial" animate="animate">
        <div>
          {/* HOME */}
          <motion.div className={navbarStyle.navbar__homeLink} whileHover={{ scale: 1.2 }}>
            <Link to="home" smooth offset={-100} duration={500}
              style={getLinkStyle("home")}
            >
              {t("home")}
            </Link>
          </motion.div>

          {isMobile && <Hamburger />}

          {/* PROJECTS */}
          <motion.div className={navbarStyle.navbar__projectsLink} whileHover={{ scale: 1.2 }}>
            <Link to="projects" smooth offset={-40} duration={500}
              style={getLinkStyle("projects")}
            >
              {t("projects")} 
            </Link>
          </motion.div>

          {/* ABOUT */}
          <motion.div className={navbarStyle.navbar__aboutLink} whileHover={{ scale: 1.2 }}>
            <Link to="about" smooth offset={-40} duration={500}
              style={getLinkStyle("about")}
            >
              {t("about")}
            </Link>
          </motion.div>

          {/* CONTACT */}
          <motion.div className={navbarStyle.navbar__contactLink} whileHover={{ scale: 1.2 }}>
            <Link to="contact" smooth offset={-40} duration={500}
              style={getLinkStyle("contact")}
            >
              {t("contact")}
            </Link>
          </motion.div>

          <BackgroundChange />
          <LanguageSwitcher />
        </div>
      </motion.nav>
    </motion.header>
  );
}

export default Navbar;