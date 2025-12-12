"use client";

import { useState, useEffect, useRef } from "react";
import { contextStore } from "@/store/Context";
import TextSpan from "./TextSpan";
import CallToAction from "./CallToAction";
import ParticlesClient from "./ParticlesClient";
import homeStyle from "scss/pages/home.module.scss";

export default function HomePageClientWrapper() {
  const sentence = "Federico Aguirre Web Developer".split("");
  const homeSectionRef = useRef<HTMLDivElement | null>(null);
  const { changeSectionVisible, darkMode } = contextStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!homeSectionRef.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        changeSectionVisible({ sectionVisibleValue: "home" });
      }
    });
    observer.observe(homeSectionRef.current);
    return () => {
      if (homeSectionRef.current) observer.unobserve(homeSectionRef.current);
    };
  }, []);

  if (!isClient) return null;

  return (
    <section
      className={homeStyle.homePage}
      id="home"
    >
      <ParticlesClient />

      <div
        className={`${homeStyle.homePage__title} ${
          darkMode ? "darkModeLetterClass" : "brightModeLetterClass"
        }`}
        ref={homeSectionRef}
        style={{ position: "relative", zIndex: 10 }}
      >
        {sentence.map((letter, index) => (
          <TextSpan key={index}>
            <div>{letter === " " ? "\u00A0" : letter}</div>
          </TextSpan>
        ))}
      </div>

      <CallToAction />
    </section>
  );

}
