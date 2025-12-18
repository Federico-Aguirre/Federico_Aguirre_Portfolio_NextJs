"use client"

import "scss/abstract/animations/globalAnimations.scss"
import contactStyle from "scss/pages/contact.module.scss";
import linkedIn from "@/svg/linkedin.svg";
import githubImage from "@/svg/github.svg";
import Image from 'next/image';
import { contextStore } from "@/app/store/Context";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

const Contact = () => {
    const contactSectionRef = useRef<HTMLDivElement>(null);
    const { changeSectionVisible, darkMode } = contextStore();
    const t = useTranslations("contact");

    let toggleShadowClass: string = darkMode ? "darkModeShadowClass" : "brightModeShadowClass";

    const showFromLeftAnimation = {
        initial: { opacity: 0, x: -200 },
        animate: {
            opacity: 1, x: 0,
            transition: {
                duration: .5,
            }
        }
    }

    const showFromRightAnimation = {
        initial: { opacity: 0, x: 200 },
        animate: {
            opacity: 1, x: 0,
            transition: {
                duration: .5,
            }
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
            const entry: IntersectionObserverEntry = entries[0];
            if (entry.isIntersecting) {
                changeSectionVisible({ sectionVisibleValue: "contact" });
            }
        });

        if (contactSectionRef.current) {
            observer.observe(contactSectionRef.current);
        }

        return () => observer.disconnect();
    }, [changeSectionVisible]);

    return (
        <section className={contactStyle.contact} id="contact">
            <motion.div 
                className={`${contactStyle.contact__formContainer} ${toggleShadowClass}`} 
                variants={showFromLeftAnimation} 
                initial="initial" 
                whileInView="animate" 
                viewport={{ once: true }}
            >
                <form className={contactStyle.contact__formContainer__form} action="https://formspree.io/mjvapnag" method="POST">
                    <div className={contactStyle.contact__formContainer__form__title}>
                        {t("sendMessage")}
                    </div>

                    <label className={contactStyle.contact__formContainer__form__labelName} htmlFor="name">
                        {t("name")}
                    </label>
                    <input className={contactStyle.contact__formContainer__form__name} id="name" type="text" name="name"
                        autoComplete="off" placeholder="  " required />

                    <label className={contactStyle.contact__formContainer__form__labelEmail} htmlFor="email">
                        {t("email")}
                    </label>
                    <input className={contactStyle.contact__formContainer__form__email} id="email" type="email" name="email"
                        autoComplete="off" placeholder="  " required />

                    <label className={contactStyle.contact__formContainer__form__labelAffair} htmlFor="affair">
                        {t("affair")}
                    </label>
                    <input className={contactStyle.contact__formContainer__form__affair} id="affair" type="text" name="affair"
                        autoComplete="off" placeholder="  " required />

                    <label className={contactStyle.contact__formContainer__form__labelTextarea1} htmlFor="textarea1">
                        {t("message")}
                    </label>
                    <textarea className={contactStyle.contact__formContainer__form__textarea1} id="textarea1" name="consultation"
                        placeholder=" "></textarea>
                    <input type="submit" value={t("send")} className={contactStyle.contact__formContainer__form__send} />
                </form>
            </motion.div>

            <motion.div className={contactStyle.contact__links} variants={showFromRightAnimation} initial="initial" whileInView="animate" viewport={{ once: true }}>
                <motion.div className={`${contactStyle.contact__links__linkedin} ${toggleShadowClass}`} whileHover={{ scale: 1.2 }}>
                    <a href="https://www.linkedin.com/in/federico-nicolas-aguirre/" target="_blank" rel="noopener noreferrer">
                        <Image src={linkedIn} alt={t("linkedinAlt")} />
                    </a>
                </motion.div>
                <motion.div className={`${contactStyle.contact__links__github} ${toggleShadowClass}`} ref={contactSectionRef} whileHover={{ scale: 1.2 }}>
                    <a href="https://github.com/Federico-Aguirre" target="_blank" rel="noopener noreferrer">
                        <Image src={githubImage} alt={t("githubAlt")} />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Contact;