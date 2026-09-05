"use client"

import "scss/abstract/animations/globalAnimations.scss"
import "scss/abstract/animations/aboutAnimations.scss"
import aboutStyle from "scss/pages/about.module.scss"

import SkillsRoulette from "./_aboutComponents/SkillsRoulette"
import WebDeveloperCard from "./_aboutComponents/WebDeveloperCard"

import Link from "next/link"
import { useContextStore } from "@/store/Context"
import { useRef, useState, useEffect, startTransition } from "react"
import { m, useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"

type TabType = "skills" | "studies" | "about"

const About = () => {
  const t = useTranslations("about")

  // Detección de movimiento reducido
  const shouldReduceMotion = useReducedMotion()

  // Ref asignado correctamente a la sección principal
  const aboutSectionRef = useRef<HTMLElement | null>(null)
  const { changeSectionVisible, darkMode } = useContextStore()
  
  // Estado simplificado de la pestaña activa
  const [activeTab, setActiveTab] = useState<TabType>("skills")

  const toggleShadowClass = darkMode ? "darkModeShadowClass" : "brightModeShadowClass"

  // Mapeo dinámico de clase CSS según la pestaña
  const getScrollClass = () => {
    switch (activeTab) {
      case "skills":
        return "scrollToSkills"
      case "studies":
        return "scrollToStudies"
      case "about":
        return "scrollToAbout"
      default:
        return "scrollToSkills"
    }
  }

  // Variants adaptados a la preferencia de movimiento
  const fadeInVariant = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -10 },
    visible: { opacity: 1, x: 0 }
  }

  const badgeVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { opacity: 0.8, y: 0 }
  }

  const showFromLeftAnimation = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: shouldReduceMotion ? 0 : 0.5 } }
  };

  const showFromRightAnimation = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  const estudios = [
    { titulo: t('qualifications.title1'), instituto: "Instituto De Formación Técnica Nro. 12" },
    { titulo: t('qualifications.title2'), instituto: "Codo A Codo" },
    { titulo: t('qualifications.title3'), instituto: "Aprende Programando Virtual" },
    { titulo: t('qualifications.title4'), instituto: "Polo TIC Misiones" },
    { titulo: t('qualifications.title5'), instituto: "Fundación Telefónica" },
    { titulo: t('qualifications.title6'), instituto: "Solo Learn" }
  ];

  // Observador de intersección vinculado a la sección completa
  useEffect(() => {
    const currentRef = aboutSectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startTransition(() => {
          changeSectionVisible("about"); 
        });
      }
    }, { 
      threshold: 0.3,
      rootMargin: "-10% 0px -10% 0px" 
    });

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [changeSectionVisible]);

  return (
    <section 
      className={aboutStyle.about} 
      id="about" 
      ref={aboutSectionRef}
      aria-label={t("title")}
    >
      <m.div
        className={`${aboutStyle.about__container} ${toggleShadowClass}`}
        variants={showFromLeftAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
          style={{
            willChange: "transform, opacity", // Pista directa para la GPU
          }}
      >
        <div role="tablist" aria-label="Secciones de perfil" style={{ display: "contents" }}>
          <div className={`${aboutStyle.about__container__aboutScroll} ${getScrollClass()}`} aria-hidden="true" />

          <button
            id="tab-skills"
            role="tab"
            aria-selected={activeTab === "skills"}
            aria-controls="panel-skills"
            className={aboutStyle.about__container__skills}
            onClick={() => setActiveTab("skills")}
            type="button"
          >
            {t("skills")}
          </button>

          <button
            id="tab-studies"
            role="tab"
            aria-selected={activeTab === "studies"}
            aria-controls="panel-studies"
            className={aboutStyle.about__container__studies}
            onClick={() => setActiveTab("studies")}
            type="button"
          >
            {t("studiesTitle")}
          </button>

          <button
            id="tab-about"
            role="tab"
            aria-selected={activeTab === "about"}
            aria-controls="panel-about"
            className={aboutStyle.about__container__text}
            onClick={() => setActiveTab("about")}
            type="button"
          >
            {t("title")}
          </button>
        </div>


        {/* --- PANEL HABILIDADES --- */}
        <div
          id="panel-skills"
          role="tabpanel"
          aria-labelledby="tab-skills"
          tabIndex={0}
          className={aboutStyle.about__container__skills__content}
          style={{ display: activeTab === "skills" ? undefined : "none" }}
        >
          <div style={{ 
            display: "grid", 
            placeItems: "center",
            width: "100%", 
            flexGrow: 1,
            minHeight: "350px"
          }}>
            <SkillsRoulette />
          </div>
        </div>

        {/* --- PANEL ESTUDIOS --- */}
        <div
          id="panel-studies"
          role="tabpanel"
          aria-labelledby="tab-studies"
          tabIndex={0}
          className={aboutStyle.about__container__studies__content}
          style={{ display: activeTab === "studies" ? undefined : "none" }}
        >
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center",
            textAlign: "center",
            width: "100%", 
            height: "100%",
            maxWidth: "600px",
            margin: "0 auto" 
          }}>
            
            <p className={aboutStyle.about__container__studies__content__title} style={{ marginBottom: "30px", fontSize: "2rem" }}>
              {t("studies")}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      
            {estudios.map((estudio, index) => (
              <div 
                key={index} 
                style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}
              >
                <span style={{ margin: 0, fontWeight: "bold", color: "#fff" }}>
                  {estudio.titulo}
                </span>
                
                <span style={{ color: "#00E5FF" }}>|</span>
                
                <span style={{ color: "#aaa", fontSize: "0.9em" }}>
                  {estudio.instituto}
                </span>
              </div>
            ))}

          </div>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", paddingTop: "25px" }}>
              <m.div 
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }} 
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }} 
                style={{ borderRadius: "8px" }}
              >
                <Link
                  href="https://drive.google.com/drive/folders/10ba68nUmdU_Oy7nGn8oUexGqy85KSSnU?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("certificatesLink")} (abre en una pestaña nueva)`}
                  style={{ padding: "10px 24px", borderRadius: "8px", border: "1px solid currentColor", textDecoration: "none", fontSize: "0.95rem", fontWeight: "bold", display: "inline-block" }}
                >
                  {t("certificatesLink")}
                </Link>
              </m.div>

              <m.div 
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }} 
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }} 
                style={{ borderRadius: "8px" }}
              >
                <Link
                  href={t('url')}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("resumeLink")} (abre en una pestaña nueva)`}
                  style={{ padding: "10px 24px", borderRadius: "8px", border: "1px solid currentColor", textDecoration: "none", fontSize: "0.95rem", fontWeight: "bold", display: "inline-block" }}
                >
                  {t("resumeLink")}
                </Link>
              </m.div>
            </div>
          </div>
        </div>

        {/* --- PANEL SOBRE MÍ --- */}
        <div
          id="panel-about"
          role="tabpanel"
          aria-labelledby="tab-about"
          tabIndex={0}
          className={aboutStyle.about__container__text__content}
          style={{ display: activeTab === "about" ? undefined : "none" }}
        >
          <div style={{ display: "flex", flexDirection: "column", width: "90%", maxWidth: "600px", textAlign: "left", boxSizing: "border-box", placeSelf: "center" }}>
            
            <p className={aboutStyle.about__container__text__content__title} style={{ marginBottom: "20px", fontSize: "2rem" }}>
              {t("title")}
            </p>

            <div className="custom-internal-scrollbar" style={{ maxHeight: "220px", overflowY: "auto", paddingRight: "15px", lineHeight: "1.7", fontSize: "0.95rem", boxSizing: "border-box" }}>
              
              <p style={{ marginBottom: "25px", textAlign: "justify" }}>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <m.span 
                    key={num}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: shouldReduceMotion ? 0 : num * 0.1 }}
                  >
                    {t(`description.line${num}`)}{" "}
                  </m.span>
                ))}
              </p>

              <div style={{ display: "flex", flexDirection: "row", gap: "15px", flexWrap: "wrap", justifyContent: "flex-start", paddingBottom: "10px" }}>
                {[
                  { icon: "💻", text: "Clean Code" },
                  { icon: "🚀", text: "Proactivo" },
                  { icon: "🧩", text: "Problem Solver" }
                ].map((badge, index) => (
                  <m.div
                    key={index}
                    variants={badgeVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ 
                      duration: shouldReduceMotion ? 0 : 0.3, 
                      delay: shouldReduceMotion ? 0 : index * 0.05 }}
                    style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid currentColor", display: "flex", 
                      alignItems: "center", gap: "8px", fontSize: "0.85rem", fontWeight: "bold", userSelect: "none", willChange: "transform, opacity",}}
                  >
                    <span aria-hidden="true" style={{ fontSize: "1.1rem" }}>{badge.icon}</span>
                    <span>{badge.text}</span>
                  </m.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </m.div>

      <WebDeveloperCard 
        className={`${aboutStyle.about__containerWebDev} ${toggleShadowClass}`}
        imageClassName={aboutStyle.about__containerWebDev__image}
        variants={showFromRightAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{willChange: "transform, opacity",}}
      />
      
    </section>
  )
}

export default About