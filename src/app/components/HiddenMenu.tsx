"use client"

import navbarStyle from "scss/base/navbar.module.scss"
import { m } from "framer-motion";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

// 1. Añadimos onNavigate a las props
interface HiddenMenuProps {
    onClose: () => void;
    onNavigate: (e: React.MouseEvent, id: string) => void;
}

const HiddenMenu = ({ onClose, onNavigate }: HiddenMenuProps) => {
    const t = useTranslations("hiddenMenu");

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const hiddenMenuAnimation = {
        initial: { opacity: 0 },
        open: {
            opacity: 1,
            transition: { when: "beforeChildren", duration: 0.4, staggerChildren: 0.09 }
        },
        close: {
            opacity: 0,
            transition: { when: "afterChildren", duration: 0.4, staggerChildren: 0.09, staggerDirection: -1 }
        },
    }

    const linkAnimation = {
        initial: { y: 40, opacity: 0 },
        open: { y: 0, opacity: 1 },
        close: { y: 40, opacity: 0 },
    }

    const links = ["home", "projects", "about", "contact"];

    return (
        <m.nav
            id="mobile-menu" 
            className={navbarStyle.navbar__hiddenMenu}
            variants={hiddenMenuAnimation} 
            initial="initial" 
            animate="open" 
            exit="close"
            aria-label="Menú de navegación móvil"
        >
            {links.map((link) => (
                <m.div 
                    key={link} 
                    variants={linkAnimation} 
                    whileHover={{ scale: 1.2 }}
                    whileFocus={{ scale: 1.2 }}
                >
                    <button
                        onClick={(e) => {
                            onNavigate(e, link);
                            onClose(); // Cierra el menú móvil
                        }}
                        style={{
                            background: "none",
                            border: "none",
                            color: "inherit",
                            fontFamily: "inherit",
                            fontSize: "inherit",
                            cursor: "pointer",
                            padding: 0
                        }}
                    >
                        {t(link)}
                    </button>
                </m.div>
            ))}
        </m.nav>
    )
}

export default HiddenMenu;