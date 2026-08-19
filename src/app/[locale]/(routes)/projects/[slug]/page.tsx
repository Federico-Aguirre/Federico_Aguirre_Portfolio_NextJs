"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { PROJECTS_DATA } from "@/data/projectsData";
import { useTranslations } from "next-intl";
import { useContextStore } from "@/store/Context";
import projectsStyle from "scss/pages/projects.module.scss";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const t = useTranslations("projects.projectDetail");
  
  const darkMode = useContextStore((state) => state.darkMode);
  const toggleClass: string = darkMode ? projectsStyle.darkModeLetterClass : projectsStyle.brightModeLetterClass;

  // Busca proyecto por slug con tipado seguro
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main 
        className={`${projectsStyle.projectDetailMain} ${toggleClass}`} 
        style={{ padding: "4rem", textAlign: "center", minHeight: "90vh", marginTop: "10dvh" }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{t("notFound")}</h1>
        <Link href="/" style={{ textDecoration: "underline" }} aria-label={t("backHomeLabel") || "Volver a la página de inicio"}>
          {t("backHome")}
        </Link>
      </main>
    );
  }

  // Extrae clave relativa y obtiene traducción de forma segura
  const relativeKey = project.descriptionKey 
    ? project.descriptionKey.replace("projects.projectDetail.", "")
    : "";

  let projectInfo: any = null;
  if (relativeKey) {
    try {
      projectInfo = t.raw(relativeKey);
    } catch (error) {
      console.warn("No se pudo obtener la traducción estructurada para:", relativeKey);
      projectInfo = t(relativeKey);
    }
  }

  const isComplexObject = typeof projectInfo === "object" && projectInfo !== null;

  // Normalizador de listas con tipado seguro
  const normalizeArray = (data: any): string[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === "object") return Object.values(data);
    return [];
  };

  // Extracción segura de datos traducidos
  const projectTitle = isComplexObject && projectInfo.title ? projectInfo.title : project.title;
  const stackTitle = isComplexObject ? projectInfo.stackTitle : null;
  const stackList = normalizeArray(isComplexObject ? (projectInfo.stackList || projectInfo.stack) : null);

  const featuresTitle = isComplexObject ? (projectInfo.featuresTitle || projectInfo.featureTitle) : null;
  const featuresList = normalizeArray(isComplexObject ? (projectInfo.featuresList || projectInfo.features) : null);

  const testingTitle = isComplexObject ? (projectInfo.testingTitle || projectInfo.testTitle) : null;
  const testingDesc = isComplexObject ? (projectInfo.testingDescription || projectInfo.testingDesc) : null;
  const testingList = normalizeArray(isComplexObject ? (projectInfo.testingList || projectInfo.testing) : null);

  // Helper para poner en negrita todo antes de los dos puntos ":" de forma accesible
  const renderListItem = (text: string) => {
    if (typeof text === "string" && text.includes(":")) {
      const parts = text.split(":");
      return (
        <>
          <strong style={{ fontWeight: 600 }}>{parts[0]}:</strong>
          {parts.slice(1).join(":")}
        </>
      );
    }
    return text;
  };

  return (
    <main 
      className={`${projectsStyle.projectDetailMain} ${toggleClass}`}
      style={{ 
        width: "100%", 
        margin: "0 auto", 
        boxSizing: "border-box",
        minHeight: "90dvh",
        marginTop: "10dvh",
        padding: "2rem 1rem"
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Encabezado Principal */}
        <header style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2.25rem", marginBottom: "0.5rem", lineHeight: 1.2 }}>
            {projectTitle}
          </h1>

          {isComplexObject && projectInfo.subtitle && (
            <p style={{ fontSize: "1.15rem", fontStyle: "italic", marginBottom: "1rem", color: "currentColor" }}>
              {projectInfo.subtitle}
            </p>
          )}
          
          <p style={{ color: "currentColor" }}>
            <strong style={{ fontWeight: 600 }}>{t("technologies")}:</strong> {project.dependencies}
          </p>
        </header>

        {/* Reproductor de Video Local HTML5 */}
        {project.videoUrl && (
          <figure style={{ marginBottom: "3rem", marginInline: 0, width: "100%" }}>
            <video
              src={project.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              aria-label={`${t("videoPlayerFor")} ${projectTitle}`}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "550px",
                borderRadius: "12px",
                display: "block",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                objectFit: "contain",
              }}
            >
              Tu navegador no soporta la reproducción de video HTML5.
            </video>
          </figure>
        )}

        <div className={projectsStyle.projectDetailContent} style={{ lineHeight: "1.75", fontSize: "1.05rem" }}>
          
          {isComplexObject ? (
            <>
              {/* 1. Descripción Principal */}
              {projectInfo.description && (
                <article style={{ marginBottom: "2.5rem" }}>
                  <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem", borderBottom: "1px solid currentColor", paddingBottom: "0.5rem" }}>
                    {t("aboutProject")}
                  </h2>
                  <p style={{ margin: 0 }}>{projectInfo.description}</p>
                </article>
              )}

              {/* 2. Stack Tecnológico */}
              {(stackTitle || stackList.length > 0) && (
                <article style={{ marginBottom: "2.5rem" }}>
                  {stackTitle && (
                    <h3 style={{ fontSize: "1.35rem", marginBottom: "1rem" }}>
                      {stackTitle}
                    </h3>
                  )}
                  {stackList.length > 0 && (
                    <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
                      {stackList.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "0.6rem" }}>{renderListItem(item)}</li>
                      ))}
                    </ul>
                  )}
                </article>
              )}

              {/* 3. Características Principales */}
              {(featuresTitle || featuresList.length > 0) && (
                <article style={{ marginBottom: "2.5rem" }}>
                  {featuresTitle && (
                    <h3 style={{ fontSize: "1.35rem", marginBottom: "1rem" }}>
                      {featuresTitle}
                    </h3>
                  )}
                  {featuresList.length > 0 && (
                    <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
                      {featuresList.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "0.6rem" }}>{renderListItem(item)}</li>
                      ))}
                    </ul>
                  )}
                </article>
              )}

              {/* 4. Calidad de Código & Testing */}
              {(testingTitle || testingDesc || testingList.length > 0) && (
                <article style={{ marginBottom: "2.5rem" }}>
                  {testingTitle && (
                    <h3 style={{ fontSize: "1.35rem", marginBottom: "1rem" }}>
                      {testingTitle}
                    </h3>
                  )}
                  {testingDesc && (
                    <p style={{ marginBottom: "1rem", color: "currentColor" }}>
                      {testingDesc}
                    </p>
                  )}
                  {testingList.length > 0 && (
                    <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
                      {testingList.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "0.6rem" }}>{renderListItem(item)}</li>
                      ))}
                    </ul>
                  )}
                </article>
              )}
            </>
          ) : (
            // Fallback si projectInfo es texto plano o nulo
            projectInfo && (
              <article style={{ marginBottom: "2.5rem" }}>
                <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem", borderBottom: "1px solid currentColor", paddingBottom: "0.5rem" }}>
                  {t("aboutProject")}
                </h2>
                <p style={{ margin: 0 }}>{projectInfo}</p>
              </article>
            )
          )}

        </div>

        <footer style={{ marginTop: "2rem", borderTop: "1px solid currentColor", paddingTop: "2rem", width: "100%" }}>
          <a
            href={project.liveUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={projectsStyle.visitSiteButton}
            style={{
              display: "inline-block",
              padding: "0.8rem 2rem",
              borderRadius: "10px",
              color: darkMode ? "hsl(0, 0%, 98%)" : "hsl(0, 0%, 2%)",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              border: "2px solid currentColor"
            }}
            aria-label={`${t("visitSite")} || "abre en nueva ventana"}`}
          >
            {t("visitSite")}
          </a>
        </footer>

      </div>
    </main>
  );
}