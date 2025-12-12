"use client"

import "scss/abstract/animations/globalAnimations.scss"
import "scss/abstract/animations/aboutAnimations.scss"
import aboutStyle from "scss/pages/about.module.scss"
import Image from 'next/image';
import Link from "next/link";
import { contextStore } from "@/store/Context"
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const About = () => {
    const cardX = useMotionValue(0);
    const cardY = useMotionValue(0);
    const rotateX = useTransform(cardY, [-300, 300], [30, -30]);
    const rotateY = useTransform(cardX, [-300, 300], [-30, 30]);

    const handleMouseMove = (event: any): void => {
        const offsetX: number = event.clientX - window.innerWidth / 2;
        const offsetY: number = event.clientY - window.innerHeight / 2;

        cardX.set(offsetX);
        cardY.set(offsetY);
    };

    const handleMouseLeave = (): void => {
        cardX.set(0);
        cardY.set(0);
    };

    const aboutSectionRef = useRef();
    const { changeSectionVisible } = contextStore();

    const [toggleScrollClass, setToggleScrollClass] = useState("scrollToSkills");
    const { darkMode } = contextStore();
    let toggleShadowClass: string = darkMode ? "darkModeShadowClass" : "brightModeShadowClass";

    const showFromLeftAnimation = {
        initial: { opacity: 0, x: -200 },
        animate: { opacity: 1, x: 0 }
    }

    const showFromRightAnimation = {
        initial: { opacity: 0, x: 200 },
        animate: { opacity: 1, x: 0 }
    }

    useEffect((): void => {
        const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
            const entry: IntersectionObserverEntry = entries[0];
            if (entry.isIntersecting) {
                changeSectionVisible({ sectionVisibleValue: "about" });
            }
        });
        if (aboutSectionRef.current) observer.observe(aboutSectionRef.current);
    }, []);

    return (
        <section className={aboutStyle.about} id="about">
            <motion.div className={`${aboutStyle.about__container} ${toggleShadowClass}`}
                variants={showFromLeftAnimation} initial="initial" whileInView="animate"
                viewport={{ once: true }}>

                <div className={`${aboutStyle.about__container__aboutScroll} ${toggleScrollClass}`}></div>

                <button className={aboutStyle.about__container__skills}
                    onClick={() => setToggleScrollClass("scrollToSkills")}
                    ref={aboutSectionRef}>Skills
                </button>

                <div className={aboutStyle.about__container__skills__content} style={{ display: toggleScrollClass === "scrollToSkills" ? 'grid' : 'none' }}>
                    <div className={aboutStyle.about__container__skills__content__languagesTitle}>
                        Skills
                    </div>
                    <ul className={aboutStyle.about__container__skills__content__languages1}>
                        <li>HTML</li>
                        <li>UX/UI design</li>
                        <li>Git+github</li>
                        <li>CSS</li>
                        <li>SASS</li>
                        <li>Bootstrap</li>
                        <li>TailwindCSS</li>
                        <li>JavaScript</li>
                        <li>EcmaScript</li>
                        <li>TypeScript</li>
                    </ul>
                    <ul className={aboutStyle.about__container__skills__content__languages2}>
                        <li>NodeJS</li>
                        <li>Express</li>
                        <li>ReactJS</li>
                        <li>NextJS</li>
                        <li>Redux</li>
                        <li>PHP</li>
                        <li>SQL</li>
                        <li>MySQL</li>
                        <li>Docker</li>
                    </ul>
                </div>

                <button className={aboutStyle.about__container__studies}
                    onClick={() => setToggleScrollClass("scrollToStudies")}>Studies
                </button>

                <div className={aboutStyle.about__container__studies__content} style={{ display: toggleScrollClass === "scrollToStudies" ? 'grid' : 'none' }}>
                    <div className={aboutStyle.about__container__studies__content__title}>Studies</div>
                    <div className={aboutStyle.about__container__studies__content__info}>TITLE: Systems Analyst - 3rd year</div>
                    <div className={aboutStyle.about__container__studies__content__info}>OBTAINED IN: Higher Technical formation Institute No. 12</div>

                    <motion.div className={aboutStyle.about__container__studies__content__certificates} whileHover={{ scale: 1.2 }}>
                        <Link href="https://drive.google.com/drive/folders/10ba68nUmdU_Oy7nGn8oUexGqy85KSSnU?usp=sharing"
                            target="_blank"
                            aria-label="CertificatesLink">
                            Certificates link
                        </Link>
                    </motion.div>

                    <motion.div className={aboutStyle.about__container__studies__content__CV} whileHover={{ scale: 1.2 }}>
                        <Link href="https://drive.google.com/file/d/1Kl9MpGvMNTJ4vpDSfrtPnSeAnJ6cEMx6/view?usp=sharing"
                            target="_blank" aria-label="ResumeLink">
                            Resume link
                        </Link>
                    </motion.div>
                </div>

                <button className={aboutStyle.about__container__text}
                    onClick={() => setToggleScrollClass("scrollToAbout")}>About me
                </button>

                <div className={aboutStyle.about__container__text__content} style={{ display: toggleScrollClass === "scrollToAbout" ? 'grid' : 'none' }}>
                    <div className={aboutStyle.about__container__text__content__title}>About me</div>
                    <div className={aboutStyle.about__container__text__content__info}>
                        I was always attracted to technology, and in 2018 I was able to start
                        with my learnings. I enjoy bringing ideas to life in the
                        browser, learning and overcoming new challenges. My
                        Specialty is front-end development with focus on producing
                        web pages and applications that are fast, easy to use,
                        With an optimal UX / UI design and accessible in a wide range of
                        Devices and browsers.
                    </div>
                </div>
            </motion.div>

            <motion.div
                style={{
                    transformStyle: "preserve-3d",
                    perspective: 800,
                    rotateX,
                    rotateY
                }}
                transition={{ velocity: 0 }}
                className={`${aboutStyle.about__containerWebDev} ${toggleShadowClass}`}
                variants={showFromRightAnimation} initial="initial" whileInView="animate" viewport={{ once: true }}
                onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    style={{
                        transformStyle: "preserve-3d",
                        perspective: 800,
                    }}
                    transition={{ velocity: 0 }}
                >
                    <Image
                        src="/svg/webDeveloper.svg"
                        className={aboutStyle.about__containerWebDev__image}
                        data-delay="1s"
                        alt="about image"
                        priority
                        width={400}
                        height={400}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}

export default About;
