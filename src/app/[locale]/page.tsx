"use client";

import HomePage from "./(routes)/home/HomePage";
import About from "./(routes)/about/About";
import Project from "./(routes)/project/Project";
import Contact from "./(routes)/contact/Contact";
import {contextStore} from "@/store/Context";

export default function LocaleHome() {
  const darkMode = contextStore(state => state.darkMode);

  return (
    <main className={darkMode ? "darkModeClass" : "brightModeClass"}>
      <HomePage />
      <Project />
      <About />
      <Contact />
    </main>
  );
}
