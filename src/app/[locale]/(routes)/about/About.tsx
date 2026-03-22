"use client"

import "scss/abstract/animations/globalAnimations.scss"
import "scss/abstract/animations/aboutAnimations.scss"
import aboutStyle from "scss/pages/about.module.scss"

import SkillsRoulette from "./_aboutComponents/SkillsRoulette"
import WebDeveloperCard from "./_aboutComponents/WebDeveloperCard"

import Link from "next/link"
import { contextStore } from "@/store/Context"
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

const About = () => {
  const t = useTranslations("about")

  const aboutSectionRef = useRef<HTMLButtonElement | null>(null)
  const { changeSectionVisible, darkMode } = contextStore()
  const [toggleScrollClass, setToggleScrollClass] = useState("scrollToSkills")
  
  const toggleShadowClass = darkMode ? "darkModeShadowClass" : "brightModeShadowClass"

  // Variants para elementos internos (Studies y Badges)
  const fadeInVariant = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  }

  const badgeVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  const showFromLeftAnimation = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0 },
  }

  const showFromRightAnimation = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0 },
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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={`${aboutStyle.about__container__aboutScroll} ${toggleScrollClass}`} />

        {/* --- PESTAÑA SKILLS --- */}
        <button
          className={aboutStyle.about__container__skills}
          onClick={() => setToggleScrollClass("scrollToSkills")}
          ref={aboutSectionRef}
          style={{ position: "relative", zIndex: 10 }}
        >
          {t("skills")}
        </button>

        <div
          className={aboutStyle.about__container__skills__content}
          style={{ display: toggleScrollClass === "scrollToSkills" ? "grid" : "none", 
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "0px 20px 40px 20px",
            height: "100%",
            width: "100%",
            boxSizing: "border-box"
          }}
        >
          <div style={{ 
            display: "flex",
            width: "100%"
          }}>
            <SkillsRoulette />
          </div>
        </div>

        {/* --- PESTAÑA ESTUDIOS --- */}
        <button
          className={aboutStyle.about__container__studies}
          onClick={() => setToggleScrollClass("scrollToStudies")}
          style={{ position: "relative", zIndex: 10 }}
        >
          {t("studies")}
        </button>

        <div
          className={aboutStyle.about__container__studies__content}
          style={{
            display: toggleScrollClass === "scrollToStudies" ? "flex" : "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "0px 20px 40px 20px",
            height: "100%",
            width: "100%",
            boxSizing: "border-box"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", width: "100%", maxWidth: "600px" }}>
            
            <div className={aboutStyle.about__container__studies__content__title} style={{ marginBottom: "30px", fontSize: "2rem" }}>
              {t("studies")}
            </div>

            <motion.h3 
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}
            >
              {t("labels.title")}: {t("education.systemAnalyst")}
            </motion.h3>
            
            <motion.p 
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.1 }}
              style={{ margin: "5px 0", fontSize: "1.1rem" }}
            >
              {t("education.thirdYear")}
            </motion.p>
            
            <motion.p 
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.2 }}
              style={{ margin: "5px 0 30px 0", fontSize: "0.95rem", opacity: 0.7 }}
            >
              {t("obtainedIn").toUpperCase()}: <strong>{t("institution")}</strong>
            </motion.p>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "flex-start" }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ borderRadius: "8px" }}>
                <Link
                  href="https://drive.google.com/drive/folders/10ba68nUmdU_Oy7nGn8oUexGqy85KSSnU?usp=sharing"
                  target="_blank"
                  style={{
                    padding: "10px 24px",
                    borderRadius: "8px",
                    border: "1px solid currentColor",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontWeight: "bold",
                    display: "inline-block"
                  }}
                >
                  {t("certificatesLink")}
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ borderRadius: "8px" }}>
                <Link
                  href="https://drive.google.com/file/d/1Kl9MpGvMNTJ4vpDSfrtPnSeAnJ6cEMx6/view?usp=sharing"
                  target="_blank"
                  style={{
                    padding: "10px 24px",
                    borderRadius: "8px",
                    border: "1px solid currentColor",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontWeight: "bold",
                    display: "inline-block"
                  }}
                >
                  {t("resumeLink")}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- PESTAÑA ABOUT --- */}
        <button
          className={aboutStyle.about__container__text}
          onClick={() => setToggleScrollClass("scrollToAbout")}
          style={{ position: "relative", zIndex: 10 }}
        >
          {t("title")}
        </button>

        <div
          className={aboutStyle.about__container__text__content}
          style={{
            display: toggleScrollClass === "scrollToAbout" ? "flex" : "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            height: "100%",
            width: "100%",
            boxSizing: "border-box",  
            padding: "20px 40px"      
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "600px", textAlign: "left", boxSizing: "border-box" }}>
            
            <div className={aboutStyle.about__container__text__content__title} style={{ marginBottom: "20px", fontSize: "2rem" }}>
              {t("title")}
            </div>

            <div style={{
              maxHeight: "220px",
              overflowY: "auto",
              paddingRight: "15px",
              lineHeight: "1.7",
              fontSize: "0.95rem",
              scrollbarWidth: "thin",
              boxSizing: "border-box"
            }}>
              
              <div style={{ marginBottom: "25px", textAlign: "justify" }}>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <motion.span 
                    key={num}
                    initial={{ opacity: 0 }} // Valor explícito inicial
                    whileInView={{ opacity: 1 }} // Valor explícito final
                    transition={{ delay: num * 0.1 }}
                  >
                    {t(`description.line${num}`)}{" "}
                  </motion.span>
                ))}
              </div>

              <div style={{ 
                display: "flex", 
                flexDirection: "row", 
                gap: "15px", 
                flexWrap: "wrap",
                justifyContent: "flex-start",
                paddingBottom: "10px" 
              }}>
                {[
                  { icon: "💻", text: "Clean Code" },
                  { icon: "🚀", text: "Proactivo" },
                  { icon: "🧩", text: "Problem Solver" }
                ].map((badge, index) => (
                  <motion.div
                    key={index}
                    variants={badgeVariant}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: index * 0.1 }}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid currentColor", 
                      opacity: 0.8,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      userSelect: "none" 
                    }}
                  >
                    <span style={{ fontSize: "1.1rem" }}>{badge.icon}</span>
                    {badge.text}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <WebDeveloperCard 
        className={`${aboutStyle.about__containerWebDev} ${toggleShadowClass}`}
        imageClassName={aboutStyle.about__containerWebDev__image}
        variants={showFromRightAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      
    </section>
  )
}

export default About