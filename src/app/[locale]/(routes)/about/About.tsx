"use client"

import "scss/abstract/animations/globalAnimations.scss"
import "scss/abstract/animations/aboutAnimations.scss"
import aboutStyle from "scss/pages/about.module.scss"

import SkillsRoulette from "./_aboutComponents/SkillsRoulette"
import WebDeveloperCard from "./_aboutComponents/WebDeveloperCard"

// Se eliminó 'Image' porque ahora vive dentro de WebDeveloperCard
import Link from "next/link"
import { contextStore } from "@/store/Context"
import { useRef, useState, useEffect } from "react"
// Se eliminaron useMotionValue y useTransform porque esa lógica ahora está en el componente hijo
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

const About = () => {
  const t = useTranslations("about")

  // NOTA: Se eliminó toda la lógica de cardX, cardY, rotateX, rotateY y handlers
  // porque ahora el componente WebDeveloperCard se encarga de su propia física.

  const aboutSectionRef = useRef<HTMLButtonElement | null>(null)
  const { changeSectionVisible, darkMode } = contextStore()
  const [toggleScrollClass, setToggleScrollClass] = useState("scrollToSkills")
  
  const toggleShadowClass = darkMode ? "darkModeShadowClass" : "brightModeShadowClass"

  const showFromLeftAnimation = {
    initial: { opacity: 0, x: -200 },
    animate: { opacity: 1, x: 0 },
  }

  const showFromRightAnimation = {
    initial: { opacity: 0, x: 200 },
    animate: { opacity: 1, x: 0 },
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        changeSectionVisible({ sectionVisibleValue: "about" })
      }
    })

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current)
    }
  }, [changeSectionVisible])

  return (
    <section className={aboutStyle.about} id="about">
      <motion.div
        className={`${aboutStyle.about__container} ${toggleShadowClass}`}
        variants={showFromLeftAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className={`${aboutStyle.about__container__aboutScroll} ${toggleScrollClass}`} />

        <button
          className={aboutStyle.about__container__skills}
          onClick={() => setToggleScrollClass("scrollToSkills")}
          ref={aboutSectionRef}
        >
          {t("skills")}
        </button>

        <div
          className={aboutStyle.about__container__skills__content}
          style={{ display: toggleScrollClass === "scrollToSkills" ? "grid" : "none" }}
        >
          <div>
            <SkillsRoulette />
          </div>
        </div>

        <button
          className={aboutStyle.about__container__studies}
          onClick={() => setToggleScrollClass("scrollToStudies")}
        >
          {t("studies")}
        </button>

        <div
          className={aboutStyle.about__container__studies__content}
          style={{
            display: toggleScrollClass === "scrollToStudies" ? "grid" : "none",
          }}
        >
          <div className={aboutStyle.about__container__studies__content__title}>
            {t("studies")}
          </div>

          <div className={aboutStyle.about__container__studies__content__info}>
            {t("labels.title")}: {t("education.systemAnalyst")} –{" "}
            {t("education.thirdYear")}
          </div>

          <div className={aboutStyle.about__container__studies__content__info}>
            {t("obtainedIn").toUpperCase()}: {t("institution")}
          </div>

          <motion.div
            className={aboutStyle.about__container__studies__content__certificates}
            whileHover={{ scale: 1.2 }}
          >
            <Link
              href="https://drive.google.com/drive/folders/10ba68nUmdU_Oy7nGn8oUexGqy85KSSnU?usp=sharing"
              target="_blank"
              aria-label={t("certificatesLink")}
            >
              {t("certificatesLink")}
            </Link>
          </motion.div>

          <motion.div
            className={aboutStyle.about__container__studies__content__CV}
            whileHover={{ scale: 1.2 }}
          >
            <Link
              href="https://drive.google.com/file/d/1Kl9MpGvMNTJ4vpDSfrtPnSeAnJ6cEMx6/view?usp=sharing"
              target="_blank"
              aria-label={t("resumeLink")}
            >
              {t("resumeLink")}
            </Link>
          </motion.div>
        </div>

        <button
          className={aboutStyle.about__container__text}
          onClick={() => setToggleScrollClass("scrollToAbout")}
        >
          {t("title")}
        </button>

        <div
          className={aboutStyle.about__container__text__content}
          style={{
            display: toggleScrollClass === "scrollToAbout" ? "grid" : "none",
          }}
        >
          <div className={aboutStyle.about__container__text__content__title}>
            {t("title")}
          </div>

          <div className={aboutStyle.about__container__text__content__info}>
            <p>{t("description.line1")}</p>
            <p>{t("description.line2")}</p>
            <p>{t("description.line3")}</p>
            <p>{t("description.line4")}</p>
            <p>{t("description.line5")}</p>
            <p>{t("description.line6")}</p>
            <p>{t("description.line7")}</p>
          </div>
        </div>
      </motion.div>

      {/* AQUÍ ESTÁ EL CAMBIO: Se sustituyó el bloque manual por el componente */}
      <WebDeveloperCard 
        className={`${aboutStyle.about__containerWebDev} ${toggleShadowClass}`}
        imageClassName={aboutStyle.about__containerWebDev__image}
        variants={showFromRightAnimation}
      />
      
    </section>
  )
}

export default About