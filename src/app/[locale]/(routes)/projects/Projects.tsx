"use client"

import projectsStyle from "scss/pages/projects.module.scss"
import "scss/abstract/animations/globalAnimations.scss"
import Image from 'next/image';
import firstProject from "@/assets/cardImages/ReactJs-Chat-App/ReactJs-Chat-App.png";
import secondProject from "@/assets/cardImages/ReactJs-E-commerce/ReactJs-E-commerce.png";
import thirdProject from "@/assets/cardImages/Laravel-E-commerce/Laravel-E-commerce.jpg";
import fourthProject from "@/assets/cardImages/ChessJs/ChessJs.png";
import { contextStore } from "@/app/store/Context";
import { motion } from "framer-motion"
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

const Projects = () => {
  const projectsSectionRef = useRef<HTMLAnchorElement>(null);
  const { changeSectionVisible, darkMode } = contextStore();
  const t = useTranslations("projects");

  let toggleShadowClass: string = darkMode ? "darkModeShadowClass" : "brightModeShadowClass";

  const fadeInAnimationVariant = {
    initial: { opacity: 0, x: 0 },
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
    animate: { opacity: 1, x: 0 }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
      const entry: IntersectionObserverEntry = entries[0];
      if (entry.isIntersecting) {
        changeSectionVisible({ sectionVisibleValue: "projects" });
      }
    });

    if (projectsSectionRef.current) {
      observer.observe(projectsSectionRef.current);
    }

    return () => observer.disconnect();
  }, [changeSectionVisible]);

  return (
    <motion.section 
      className={projectsStyle.projects} 
      id="projects" 
      variants={fadeInAnimationVariant} 
      initial="initial" 
      whileInView="animate" 
      viewport={{ once: true }}
    >
      <motion.a href="https://federico-aguirre.github.io/ChatApp" target="_blank" className={`${projectsStyle.projects__card} ${toggleShadowClass}`} variants={fadeInChildrenAnimationVariant}>
        <div className={projectsStyle.projects__card__text}>
          React.js Chat App
        </div>
        <div className={projectsStyle.projects__card__hiddenText}>
          {t("dependencies")}: React.js, universal-cookie, CSS, Firebase.
        </div>
        <Image src={firstProject} alt={t("projectAlt")} loading="lazy" className={projectsStyle.projects__card__image} />
      </motion.a>

      <motion.a href="http://reactjs-ecommerce-by-federico-aguirre.netlify.app" target="_blank" className={`${projectsStyle.projects__card} ${toggleShadowClass}`} variants={fadeInChildrenAnimationVariant}>
        <div className={projectsStyle.projects__card__text}>
          React.js E-commerce
        </div>
        <div className={projectsStyle.projects__card__hiddenText}>
          {t("dependencies")}: React.js, Bootstrap, CSS, react-router-dom, Firebase.
        </div>

        <Image src={secondProject} alt={t("projectAlt")} loading="lazy" className={projectsStyle.projects__card__image} />
      </motion.a>

      <motion.a href="https://veterinaria-laravel.onrender.com" target="_blank" className={`${projectsStyle.projects__card} ${toggleShadowClass}`} variants={fadeInChildrenAnimationVariant}>
        <div className={projectsStyle.projects__card__text}>
          Laravel E-commerce
        </div>
        <div className={projectsStyle.projects__card__hiddenText}>
          {t("dependencies")}: Laravel, JavaScript, SASS, Tailwind, PHP Unit, Laravel Dusk, Laravel Socialite, Paypal SDK, OAuth 2.0, Render, Neon, Docker.
        </div>

        <Image src={thirdProject} alt={t("projectAlt")} loading="lazy" className={projectsStyle.projects__card__image} />
      </motion.a>

      <motion.a 
        href="https://chessappjs.netlify.app" 
        target="_blank" 
        className={`${projectsStyle.projects__card} ${toggleShadowClass}`} 
        variants={fadeInChildrenAnimationVariant} 
        ref={projectsSectionRef}
      >
        <div className={projectsStyle.projects__card__text}>
          Chess App
        </div>
        <div className={projectsStyle.projects__card__hiddenText}>
          {t("dependencies")}: HTML, CSS, JavaScript.
        </div>

        <Image src={fourthProject} alt={t("projectAlt")} loading="lazy" className={projectsStyle.projects__card__image} />
      </motion.a>
    </motion.section>
  )
}

export default Projects;