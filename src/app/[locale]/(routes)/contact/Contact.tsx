"use client"

import "scss/abstract/animations/globalAnimations.scss"
import contactStyle from "scss/pages/contact.module.scss";
import linkedIn from "@/svg/linkedin.svg";
import githubImage from "@/svg/github.svg";
import Image from 'next/image';
import { contextStore } from "@/app/store/Context";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const Contact = () => {
    const contactSectionRef = useRef<HTMLDivElement>(null);
    const { changeSectionVisible, darkMode } = contextStore();
    const t = useTranslations("contact");

    let toggleShadowClass: string = darkMode ? "darkModeShadowClass" : "brightModeShadowClass";

    // Cambiamos "initial" y "animate" por "hidden" y "visible" para evitar conflictos
    const showFromLeftAnimation = {
        hidden: { opacity: 0, x: -200 },
        visible: { opacity: 1, x: 0, transition: { duration: .5 } }
    }

    const showFromRightAnimation = {
        hidden: { opacity: 0, x: 200 },
        visible: { opacity: 1, x: 0, transition: { duration: .5 } }
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

    // Estados para controlar cuándo los labels deben estar arriba
    const [activeFields, setActiveFields] = useState({
        name: false, email: false, affair: false, consultation: false
    });

    const handleFocus = (field: string) => {
        setActiveFields(prev => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field: string, value: string) => {
        // Solo vuelve a bajar si el input está vacío
        if (value.trim() === "") {
            setActiveFields(prev => ({ ...prev, [field]: false }));
        }
    };

    // Valores de animación para que sea fácil ajustarlos (sin la propiedad color)
    const labelAnimation = (isActive: boolean) => ({
        y: isActive ? -25 : 0, // Ajusta el -25 si quieres que suban más o menos
        scale: isActive ? 0.85 : 1
    });

    return (
        // Agregamos flex-direction column para que form e iconos se apilen uno debajo del otro
        <section className={contactStyle.contact} id="contact" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <motion.div 
                className={`${contactStyle.contact__formContainer} ${toggleShadowClass}`} 
                variants={showFromLeftAnimation} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
            >
                <form className={contactStyle.contact__formContainer__form} action="https://formspree.io/mjvapnag" method="POST">
                    <div className={contactStyle.contact__formContainer__form__title}>
                        {t("sendMessage")}
                    </div>

                    <motion.label 
                        className={contactStyle.contact__formContainer__form__labelName} 
                        htmlFor="name"
                        animate={labelAnimation(activeFields.name)}
                        style={{ originX: 0 }}
                    >
                        {t("name")}
                    </motion.label>
                    <input className={contactStyle.contact__formContainer__form__name} id="name" type="text" name="name"
                        autoComplete="off" placeholder="  " required 
                        onFocus={() => handleFocus("name")}
                        onBlur={(e) => handleBlur("name", e.target.value)}
                    />

                    <motion.label 
                        className={contactStyle.contact__formContainer__form__labelEmail} 
                        htmlFor="email"
                        animate={labelAnimation(activeFields.email)}
                        style={{ originX: 0 }}
                    >
                        {t("email")}
                    </motion.label>
                    <input className={contactStyle.contact__formContainer__form__email} id="email" type="email" name="email"
                        autoComplete="off" placeholder="  " required 
                        onFocus={() => handleFocus("email")}
                        onBlur={(e) => handleBlur("email", e.target.value)}
                    />

                    <motion.label 
                        className={contactStyle.contact__formContainer__form__labelAffair} 
                        htmlFor="affair"
                        animate={labelAnimation(activeFields.affair)}
                        style={{ originX: 0 }}
                    >
                        {t("affair")}
                    </motion.label>
                    <input className={contactStyle.contact__formContainer__form__affair} id="affair" type="text" name="affair"
                        autoComplete="off" placeholder="  " required 
                        onFocus={() => handleFocus("affair")}
                        onBlur={(e) => handleBlur("affair", e.target.value)}
                    />

                    <motion.label 
                        className={contactStyle.contact__formContainer__form__labelTextarea1} 
                        htmlFor="textarea1"
                        animate={labelAnimation(activeFields.consultation)}
                        style={{ originX: 0 }}
                    >
                        {t("message")}
                    </motion.label>
                    <textarea className={contactStyle.contact__formContainer__form__textarea1} id="textarea1" name="consultation"
                        placeholder=" "
                        onFocus={() => handleFocus("consultation")}
                        onBlur={(e) => handleBlur("consultation", e.target.value)}
                    ></textarea>
                    
                    <input type="submit" value={t("send")} className={contactStyle.contact__formContainer__form__send} />
                </form>
            </motion.div>

            {/* Pasamos el ref al contenedor padre en lugar del hijo para evitar saltos en hover */}
            <motion.div className={contactStyle.contact__links} ref={contactSectionRef} variants={showFromRightAnimation} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.div className={`${contactStyle.contact__links__linkedin} ${toggleShadowClass}`} whileHover={{ scale: 1.2 }}>
                    <a href="https://www.linkedin.com/in/federico-nicolas-aguirre/" target="_blank" rel="noopener noreferrer">
                        <Image src={linkedIn} alt={t("linkedinAlt")} />
                    </a>
                </motion.div>
                <motion.div className={`${contactStyle.contact__links__github} ${toggleShadowClass}`} whileHover={{ scale: 1.2 }}>
                    <a href="https://github.com/Federico-Aguirre" target="_blank" rel="noopener noreferrer">
                        <Image src={githubImage} alt={t("githubAlt")} />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Contact;