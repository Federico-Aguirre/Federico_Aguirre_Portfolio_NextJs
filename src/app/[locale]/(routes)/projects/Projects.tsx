"use client";

import { useState, useRef, useEffect, useCallback, useMemo, startTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import { useContextStore } from "@/app/store/Context";
import { PROJECTS_DATA, type Project } from "@/data/projectsData";
import projectsStyle from "scss/pages/projects.module.scss";
import "scss/abstract/animations/globalAnimations.scss";

// Función utilitaria para dividir el array en bloques con tipado estricto
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

type Category = "main" | "lab";

export const Projects = () => {
  const projectsSectionRef = useRef<HTMLElement>(null);
  const changeSectionVisible = useContextStore((state) => state.changeSectionVisible);
  const darkMode = useContextStore((state) => state.darkMode);
  const t = useTranslations("projects");
  const shouldReduceMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState<Category>("main");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Filtrado y segmentación memoizada de proyectos
  const projectChunks = useMemo(() => {
    const filteredProjects = PROJECTS_DATA.filter((project: Project) =>
      project.category ? project.category === activeCategory : true
    );
    return chunkArray(filteredProjects, 4);
  }, [activeCategory]);

  const toggleShadowClass = darkMode
    ? "darkModeShadowClass"
    : "brightModeShadowClass";

    const toggleShadowClassSkyBlue = darkMode
    ? "darkModeShadowClassSkyBlue"
    : "brightModeShadowClassSkyBlue";

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false, 
    duration: shouldReduceMotion ? 0 : 35,
  });

  const handlePrev = useCallback(() => {
    if (emblaApi && emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev();
    } else {
      setActiveCategory((prev) => (prev === "main" ? "lab" : "main"));
    }
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (emblaApi && emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      setActiveCategory((prev) => (prev === "main" ? "lab" : "main"));
    }
  }, [emblaApi]);

  const updateEmblaState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    updateEmblaState(); // Sincroniza al montar la nueva categoría

    emblaApi.on("select", updateEmblaState);
    emblaApi.on("reInit", updateEmblaState);

    return () => {
      emblaApi.off("select", updateEmblaState);
      emblaApi.off("reInit", updateEmblaState);
    };
  }, [emblaApi, updateEmblaState]);

  // Observer de visibilidad de sección
  useEffect(() => {
    const currentRef = projectsSectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startTransition(() => {
          changeSectionVisible("projects"); 
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

  const sectionAnimationVariant = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.4 },
    },
  };

  const contentAnimationVariant = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6 },
    },
  };

  return (
    <m.section
      className={projectsStyle.projects}
      id="projects"
      ref={projectsSectionRef}
      variants={sectionAnimationVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      tabIndex={-1}
      aria-labelledby="projects-heading"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        transform: "translateZ(0)"
      }}
    >
      <m.div
        variants={contentAnimationVariant}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          width: "80%",
          maxWidth: "1100px",
          margin: "0 auto",
          boxSizing: "border-box",
          willChange: "transform, opacity",
        }}
      >
        <p id="projects-heading" className="sr-only">
          {t("title") || "Sección de Proyectos"}
        </p>

        <div
          role="tablist"
          aria-label={t("categoryFilter") || "Filtrar proyectos por categoría"}
          style={{
            display: "flex",
            gap: "1.5rem",
            marginBottom: "0rem",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <button
            role="tab"
            id="tab-main"
            aria-selected={activeCategory === "main"}
            aria-controls="panel-projects"
            onClick={() => setActiveCategory("main")}
            className={`focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:outline-none 
              ${activeCategory === "main" ? toggleShadowClassSkyBlue : ""}`}
            style={{
              padding: "0.75rem 1.75rem",
              borderRadius: "30px",
              border: "2px solid",
              borderColor: activeCategory === "main"
                ? "hsl(194, 85%, 62%)"
                : darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
              backgroundColor: activeCategory === "main" ? "hsl(194, 85%, 62%)" : darkMode ? "hsl(0, 0%, 20%)" : "hsl(0, 0%, 90%)",
              color: activeCategory === "main" ? "#fff" : darkMode ? "#fff" : "#000",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {t("mainProjects") || "Proyectos Principales"}
          </button>

          <button
            role="tab"
            id="tab-lab"
            aria-selected={activeCategory === "lab"}
            aria-controls="panel-projects"
            onClick={() => setActiveCategory("lab")}
            className={`focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:outline-none 
              ${activeCategory === "lab" ? toggleShadowClassSkyBlue : ""}`}
            style={{
              padding: "0.75rem 1.75rem",
              borderRadius: "30px",
              border: "2px solid",
              borderColor: activeCategory === "lab"
                ? "hsl(194, 85%, 62%)"
                : darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
              backgroundColor: activeCategory === "lab" ? "hsl(194, 85%, 62%)" : darkMode ? "hsl(0, 0%, 20%)" : "hsl(0, 0%, 90%)",
              color: activeCategory === "lab" ? "#fff" : darkMode ? "#fff" : "#000",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {t("labProjects") || "Laboratorio"}
          </button>
        </div>

        <div
          id="panel-projects"
          role="tabpanel"
          aria-labelledby={activeCategory === "main" ? "tab-main" : "tab-lab"}
          aria-roledescription="carousel"
          aria-label={
            activeCategory === "main"
              ? "Carrusel de Proyectos Principales"
              : "Carrusel de Proyectos de Laboratorio"
          }
          style={{ position: "relative", width: "100%", padding: "0 3.5rem" }}
        >
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {`Mostrando página ${selectedIndex + 1} de ${
              scrollSnaps.length || 1
            } de proyectos ${
              activeCategory === "main" ? "principales" : "de laboratorio"
            }`}
          </div>

          <button
            onClick={handlePrev}
            aria-label={`${t("previousSlide") || "Diapositiva anterior"}`}
            style={{
              position: "absolute",
              left: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: darkMode ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)",
              border: "1px solid",
              borderColor: darkMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: darkMode ? "#000" : "#fff",
              zIndex: 10,
              boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            }}
            className="focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <AnimatePresence mode="wait">
            <m.div
              key={activeCategory}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -50 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              style={{ width: "100%" }}
            >
              <div
                className="embla"
                ref={emblaRef}
                style={{ width: "100%" }}
              >
                <div
                  className="embla__container"
                  style={{ display: "flex", touchAction: "pan-y pinch-zoom" }}
                >
                  {projectChunks.length > 0 ? (
                    projectChunks.map((chunk, chunkIndex) => (
                      <div
                        className="embla__slide"
                        key={`${activeCategory}-chunk-${chunkIndex}`}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`Página ${chunkIndex + 1} de ${projectChunks.length}`}
                        style={{
                          flex: "0 0 100%",
                        }}
                      >
                        <div
                          className={projectsStyle.slideContent}
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignContent: "center",
                            gap: "20px",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "20px",
                          }}
                        >
                          {chunk.map((project: Project) => (
                            <Link
                              key={project.slug}
                              href={`/projects/${project.slug}`}
                              className={`${projectsStyle.projects__card} ${toggleShadowClass}`}
                              aria-label={`Proyecto ${project.title}. Dependencias: ${project.dependencies}`}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                maxWidth: "220px",
                                height: "220px",
                                aspectRatio: "1 / 1",
                                textDecoration: "none",
                                margin: 0,
                                position: "relative",
                                borderRadius: "20px",
                                overflow: "hidden",
                              }}
                            >
                              <div className={projectsStyle.projects__card__text}>{project.title}</div>

                              <div className={projectsStyle.projects__card__hiddenText} style={{ position: "relative", zIndex: 1 }}>
                                <span className="sr-only">Dependencias: </span>
                                {project.dependencies}
                              </div>

                              {/* Contenedor absoluto que fije las dimensiones del fondo independientemente del slider */}
                              <div
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  zIndex: 0,
                                }}
                              >
                                <Image
                                  src={project.image}
                                  alt={`Captura de pantalla de la interfaz de ${project.title}`}
                                  loading="lazy"
                                  width={200}
                                  height={200}
                                  quality={70}
                                  sizes="(max-width: 640px) 100vw, 250px"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        flex: "0 0 100%",
                        textAlign: "center",
                        padding: "2rem",
                        opacity: 0.8,
                      }}
                    >
                      {t("noProjects") || "No hay proyectos en esta categoría."}
                    </div>
                  )}
                </div>
              </div>
            </m.div>
          </AnimatePresence>

          <button
            onClick={handleNext}
            aria-label={`${t("nextSlide") || "Diapositiva siguiente"}`}
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: darkMode ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)",
              border: "1px solid",
              borderColor: darkMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: darkMode ? "#000" : "#fff",
              zIndex: 10,
              boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            }}
            className="focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </m.div>
    </m.section>
  );
};

export default Projects;