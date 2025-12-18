"use client";

import HomePage from "./(routes)/home/HomePage";
import About from "./(routes)/about/About";
import Projects from "./(routes)/projects/Projects";
import Contact from "./(routes)/contact/Contact";
import {contextStore} from "@/store/Context";

export default function LocaleHome() {
  const darkMode = contextStore(state => state.darkMode);

  return (
    <main className={darkMode ? "darkModeClass" : "brightModeClass"}>
      <HomePage />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
