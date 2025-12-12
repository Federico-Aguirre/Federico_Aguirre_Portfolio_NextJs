"use client"

import projectStyle from "scss/pages/project.module.scss"
import "scss/abstract/animations/globalAnimations.scss"
import Image from 'next/image';
import firstProject from "@/assets/cardImages/ReactJs-Chat-App/ReactJs-Chat-App.png";
import secondProject from "@/assets/cardImages/ReactJs-E-commerce/ReactJs-E-commerce.png";
import thirdProject from "@/assets/cardImages/Employee-CRUD/Employee-CRUD.png";
import fourthProject from "@/assets/cardImages/ChessJs/ChessJs.png";
import { contextStore } from "@/app/store/Context";
import { motion } from "framer-motion"
import { useRef, useEffect } from "react";

const Project = () => {
  const projectSectionRef = useRef();
  const { changeSectionVisible } = contextStore()
  const { darkMode } = contextStore()
  let toggleShadowClass: string = darkMode ? "darkModeShadowClass" : "brightModeShadowClass";

  const fadeInAnimationVariant = {
    initial: {
      opacity: 0,
      x: 0
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: .18,
        duration: 1,
      }
    }
  }

  const fadeInChildrenAnimationVariant = {
    initial: { opacity: 0, x: -200 },
    animate: { opacity: 1, x: -0 }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
      const entry: IntersectionObserverEntry = entries[0];
      entry.isIntersecting &&
        changeSectionVisible({ sectionVisibleValue: "project" })
    })
    observer.observe(projectSectionRef.current)
  }, [])

  return (
    <motion.section className={projectStyle.project} id="project" variants={fadeInAnimationVariant} initial="initial" whileInView="animate" viewport={{ once: true }}>
      <motion.a href="https://federico-aguirre.github.io/ChatApp" target="_blank" className={`${projectStyle.project__card} ${toggleShadowClass}`} variants={fadeInChildrenAnimationVariant}>
        <div className={projectStyle.project__card__text}>
          React.js Chat App
        </div>
        <div className={projectStyle.project__card__hiddenText}>
          Dependencies: React.js, universal-cookie, CSS, Firebase.
        </div>
        <Image src={firstProject} alt="Project image" loading="lazy" className={projectStyle.project__card__image} />
      </motion.a>

      <motion.a href="http://reactjs-ecommerce-by-federico-aguirre.netlify.app" target="_blank" className={`${projectStyle.project__card} ${toggleShadowClass}`} variants={fadeInChildrenAnimationVariant}>
        <div className={projectStyle.project__card__text}>
          React.js E-commerce
        </div>
        <div className={projectStyle.project__card__hiddenText}>
          Dependencies: React.js, Bootstrap, CSS, react-router-dom, Firebase.
        </div>
        <Image src={secondProject} alt="Project image" loading="lazy" className={projectStyle.project__card__image} />
      </motion.a>

      <motion.a href="http://reactjs-sql-employee-crud.netlify.app" target="_blank" className={`${projectStyle.project__card} ${toggleShadowClass}`} variants={fadeInChildrenAnimationVariant}>
        <div className={projectStyle.project__card__text}>
          React.js SQL Employee CRUD
        </div>
        <div className={projectStyle.project__card__hiddenText}>
          Dependencies: React.js, MySQL, React-router-dom, Supabase, Axios,
          Body-parser, Cors, Nodemon, Wouter.
        </div>
        <Image src={thirdProject} alt="Project image" loading="lazy" className={projectStyle.project__card__image} />
      </motion.a>

      <motion.a href="https://chessappjs.netlify.app" target="_blank" className={`${projectStyle.project__card} ${toggleShadowClass}`} variants={fadeInChildrenAnimationVariant} ref={projectSectionRef}>
        <div className={projectStyle.project__card__text}>
          Chess App
        </div>
        <div className={projectStyle.project__card__hiddenText}>
          Dependencies: HTML, CSS, JavaScript.
        </div>
        <Image src={fourthProject} alt="Project image" loading="lazy" className={projectStyle.project__card__image} />
      </motion.a>
    </motion.section>
  )
}

export default Project;