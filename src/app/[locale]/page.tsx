"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
// Se mantiene la importación estática de HomePage para que la pantalla inicial (LCP) cargue al instante
import HomePage from "./(routes)/home/HomePage";

// Carga diferida (Lazy Loading) de las secciones secundarias
const Projects = dynamic(() => import("./(routes)/projects/Projects"));
const About = dynamic(() => import("./(routes)/about/About"));
const Contact = dynamic(() => import("./(routes)/contact/Contact"));

export default function LocaleHome() {
  const t = useTranslations("header");

  return (
    <div className="flex flex-col w-full min-h-screen sectionContainer">
      {/* Región de anuncio imperceptible para lectores de pantalla */}
      <div className="sr-only" role="status" aria-live="polite">
        Página principal cargada.
      </div>

      <HomePage />
      <Projects />
      <About />
      <Contact />
    </div>
  );
}