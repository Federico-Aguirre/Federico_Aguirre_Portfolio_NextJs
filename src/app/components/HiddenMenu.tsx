"use client"

import navbarStyle from "scss/base/navbar.module.scss"
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-scroll"

const HiddenMenu = () => {

    const [showNav, setShowNav] = useState(true);

    const hiddenMenuAnimation = {
        initial: {
            opacity: 0,
        },
        open: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                duration: 0.4,
                staggerChildren: 0.09,
            }
        },
        close: {
            opacity: 0,
            transition: {
                when: "afterChildren",
                duration: 0.4,
                staggerChildren: 0.09,
                staggerDirection: -1,
            }
        },
    }

    const linkAnimation = {
        initial: {
            y: 40,
            opacity: 0,
        },
        open: {
            y: 0,
            opacity: 1,
        },
        close: {
            y: 40,
            opacity: 0,
        },
    }

    return (
        <motion.nav
            className={navbarStyle.navbar__hiddenMenu}
            variants={hiddenMenuAnimation} initial="initial" animate={showNav ? "open" : "close"} exit="close"
        >
            <motion.div variants={linkAnimation} whileHover={{ scale: 1.2 }}>
                <Link to={"home"} smooth={true} offset={-40} duration={500} onClick={(): void => setShowNav(false)}>home</Link>
            </motion.div>
            <motion.div variants={linkAnimation} whileHover={{ scale: 1.2 }}>
                <Link to={"project"} smooth={true} offset={-40} duration={500} onClick={(): void => setShowNav(false)}>project</Link>
            </motion.div>
            <motion.div variants={linkAnimation} whileHover={{ scale: 1.2 }}>
                <Link to={"about"} smooth={true} offset={-40} duration={500} onClick={(): void => setShowNav(false)}>about</Link>
            </motion.div>
            <motion.div variants={linkAnimation} whileHover={{ scale: 1.2 }}>
                <Link to={"contact"} smooth={true} offset={-40} duration={500} onClick={(): void => setShowNav(false)}>contact</Link>
            </motion.div>
        </motion.nav>
    )
}

export default HiddenMenu;