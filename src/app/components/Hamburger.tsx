"use client"

import { useToggle } from "@uidotdev/usehooks";
import { m, AnimatePresence } from "framer-motion";
import HiddenMenu from "./HiddenMenu";
import { useContextStore } from "../store/Context";

// 1. Definimos que recibe la función de navegación
interface HamburgerProps {
    onNavigate: (e: React.MouseEvent, id: string) => void;
    styles: typeof import("scss/base/navbar.module.scss").default;
}

const Hamburger = ({ onNavigate, styles }: HamburgerProps) => {
    const [show, toggle] = useToggle(false);

    const topLineAnimation = {
        open: { x: 0, y: 5, rotate: 45 },
        closed: { x: -5, y: -5, rotate: 0 }
    }

    const bottomLineAnimation = {
        open: { x: 0, y: 0, rotate: -45 },
        closed: { x: 5, y: 5, rotate: 0 }
    }

    const darkMode = useContextStore((state) => state.darkMode);
    let toggleClass: string = darkMode ? "brightModeLetterClass" : "darkModeLetterClass";

    return (
        <m.div className={styles.navbar__hamburgerContainer}>
            <m.button
                onClick={() => toggle()}
                className={styles.navbar__hamburger}
                aria-expanded={show}
                aria-controls="mobile-menu"
                aria-label={show ? "Cerrar menú" : "Abrir menú"}
            >
                <m.span
                    className={`${styles.navbar__hamburger__line1} ${toggleClass}`}
                    variants={topLineAnimation} 
                    initial={show ? "open" : "closed"} 
                    animate={show ? "open" : "closed"}
                />

                <m.span
                    className={`${styles.navbar__hamburger__line2} ${toggleClass}`}
                    variants={bottomLineAnimation} 
                    initial={show ? "open" : "closed"} 
                    animate={show ? "open" : "closed"}
                />
            </m.button>
            
            <AnimatePresence>
                {/* 2. Le pasamos la función al menú oculto */}
                {show && <HiddenMenu onClose={toggle} onNavigate={onNavigate} />}
            </AnimatePresence>
        </m.div>
    )
}

export default Hamburger;