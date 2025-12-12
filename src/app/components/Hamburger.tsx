"use client"

import navbarStyle from "scss/base/navbar.module.scss"
import { useToggle } from "@uidotdev/usehooks";
import { motion, AnimatePresence } from "framer-motion";
import HiddenMenu from "./HiddenMenu";
import { contextStore } from "../store/Context";

const Hamburger = () => {
    const [show, toggle]: any = useToggle();

    const topLineAnimation = {
        open: {
            x: 0,
            y: 5,
            rotate: 45,
        },
        closed: {
            x: -5,
            y: -5,
            rotate: 0,
        }
    }

    const bottomLineAnimation = {
        open: {
            x: 0,
            y: 0,
            rotate: -45,
        },
        closed: {
            x: 5,
            y: 5,
            rotate: 0,
        }
    }

    const { darkMode } = contextStore()
    let toggleClass: string = darkMode ? "brightModeLetterClass" : "darkModeLetterClass";

    return (
        <motion.div className={navbarStyle.navbar__hamburgerContainer}>
            <motion.button
                onClick={toggle}
                className={navbarStyle.navbar__hamburger}
            >
                <motion.span
                    className={`${navbarStyle.navbar__hamburger__line1} ${toggleClass}`}
                    variants={topLineAnimation} initial={false} animate={show ? "open" : "closed"}
                >
                </motion.span>

                <motion.span
                    className={`${navbarStyle.navbar__hamburger__line2} ${toggleClass}`}
                    variants={bottomLineAnimation} initial={false} animate={show ? "open" : "closed"}
                >

                </motion.span>
            </motion.button>
            <AnimatePresence>{show && <HiddenMenu />}</AnimatePresence>
        </motion.div>
    )
}

export default Hamburger;