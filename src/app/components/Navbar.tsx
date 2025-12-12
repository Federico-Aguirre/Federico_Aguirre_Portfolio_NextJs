"use client";

import navbarStyle from "scss/base/navbar.module.scss"
import BackgroundChange from "./BackgroundChange"
import { contextStore } from "@/store/Context"
import { Link } from "react-scroll"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import Hamburger from "./Hamburger"
import { useState, useEffect } from "react"

const Navbar = () => {
  const { sectionVisible, darkMode } = contextStore();
  let toggleClass: string = darkMode ? "darkModeLetterClass" : "brightModeLetterClass";

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // ---- FIX PRINCIPAL ----
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 800);
  }, []);
  // -----------------------

  useMotionValueEvent(scrollY, "change", (latest: number): void => {
    const previous: number = scrollY.getPrevious();
    if (latest > previous && latest > 150 && window.innerWidth < 800) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  })

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

  return (
    <motion.header
      className={`${navbarStyle.navbar} ${toggleClass}`}
      variants={showAnimation}
      animate={hidden ? "hidden" : "visible"}
    >
      <motion.nav variants={loadingAnimation} initial="initial" animate="animate">
        <div>
          <motion.div className={navbarStyle.navbar__homeLink} whileHover={{ scale: 1.2 }}>
            <Link to="home" smooth offset={-40} duration={500}
              style={{ color: sectionVisible.sectionVisibleValue === "home" && "hsl(194, 85%, 62%)" }}
            >
              home
            </Link>
          </motion.div>

          {/* ---- FIX: se renderiza SOLO en el cliente ---- */}
          {isMobile && <Hamburger />}
          {/* --------------------------------------------- */}

          <motion.div className={navbarStyle.navbar__projectLink} whileHover={{ scale: 1.2 }}>
            <Link to="project" smooth offset={-40} duration={500}
              style={{ color: sectionVisible.sectionVisibleValue === "project" && "hsl(194, 85%, 62%)" }}
            >
              project
            </Link>
          </motion.div>

          <motion.div className={navbarStyle.navbar__aboutLink} whileHover={{ scale: 1.2 }}>
            <Link to="about" smooth offset={-40} duration={500}
              style={{ color: sectionVisible.sectionVisibleValue === "about" && "hsl(194, 85%, 62%)" }}
            >
              about
            </Link>
          </motion.div>

          <motion.div className={navbarStyle.navbar__contactLink} whileHover={{ scale: 1.2 }}>
            <Link to="contact" smooth offset={-40} duration={500}
              style={{ color: sectionVisible.sectionVisibleValue === "contact" && "hsl(194, 85%, 62%)" }}
            >
              contact
            </Link>
          </motion.div>

          <BackgroundChange />
        </div>
      </motion.nav>
    </motion.header>
  );
}

export default Navbar;
