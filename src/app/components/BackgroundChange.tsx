"use client"

import navbarStyle from "scss/base/navbar.module.scss"
import Image from "next/image";
import sun from "@/svg/sun.svg"
import moon from "@/svg/moon.svg"
import { motion } from "framer-motion";
import { contextStore } from "../store/Context";

const BackgroundChange = () => {
  let { darkMode } = contextStore()
  let { changeDarkMode } = contextStore()

  return (
    <motion.button className={navbarStyle.navbar__lightDarkButton} onClick={changeDarkMode} data-darkmode={darkMode}
      style={{justifySelf: darkMode ? "flex-start" : "flex-end"}}
      transition={{ duration: 2 }}
      >
      <motion.span 
        className={navbarStyle.navbar__lightDarkButton__circle}
        layout={true}
        style={{placeSelf: darkMode ? "flex-start" : "flex-end"}}
      >
      </motion.span>
      <div className={navbarStyle.navbar__lightDarkButton__sun}>
        <Image src={sun} fill alt="sun image" />
      </div>
      <div className={navbarStyle.navbar__lightDarkButton__moon}>
        <Image src={moon} fill alt="moon image" />
      </div>
    </motion.button>
  )
}

export default BackgroundChange;