"use client"

import "scss/abstract/animations/globalAnimations.scss"
import contactStyle from "scss/pages/contact.module.scss";
import linkedIn from "@/svg/linkedin.svg";
import githubImage from "@/svg/github.svg";
import Image from 'next/image';
import { contextStore } from "@/app/store/Context";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

const Contact = () => {
    const contactSectionRef = useRef();
    const { changeSectionVisible } = contextStore()

    const { darkMode } = contextStore()
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
            entry.isIntersecting &&
                changeSectionVisible({ sectionVisibleValue: "contact" })
        })
        observer.observe(contactSectionRef.current)
    }, [])

    return (
        <section className={contactStyle.contact} id="contact">
            <motion.div className={`${contactStyle.contact__formContainer} ${toggleShadowClass}`} variants={showFromLeftAnimation} initial="initial" whileInView="animate" viewport={{ once: true }}>
                <form className={contactStyle.contact__formContainer__form} action="https://formspree.io/mjvapnag" method="POST">

                    <div className={contactStyle.contact__formContainer__form__title}>Send message</div>

                    <label className={contactStyle.contact__formContainer__form__labelName} htmlFor="name">Name</label>
                    <input className={contactStyle.contact__formContainer__form__name} id="name" type="text" name="name"
                        autoComplete="off" placeholder="  " required />

                    <label className={contactStyle.contact__formContainer__form__labelEmail} htmlFor="email">Email</label>
                    <input className={contactStyle.contact__formContainer__form__email} id="email" type="email" name="email"
                        autoComplete="off" placeholder="  " required />

                    <label className={contactStyle.contact__formContainer__form__labelAffair} htmlFor="affair">Affair</label>
                    <input className={contactStyle.contact__formContainer__form__affair} id="affair" type="text" name="affair"
                        autoComplete="off" placeholder="  " required />

                    <label className={contactStyle.contact__formContainer__form__labelTextarea1} htmlFor="textarea1">Message</label>
                    <textarea className={contactStyle.contact__formContainer__form__textarea1} id="textarea1" name="consultation"
                        placeholder=" "></textarea>

                    <input type="submit" value="Send" className={contactStyle.contact__formContainer__form__send} />

                </form>
            </motion.div>

            <motion.div className={contactStyle.contact__links} variants={showFromRightAnimation} initial="initial" whileInView="animate" viewport={{ once: true }}>
                <motion.div className={`${contactStyle.contact__links__linkedin} ${toggleShadowClass}`} whileHover={{ scale: 1.2 }}>
                    <a href="https://www.linkedin.com/in/federico-nicolas-aguirre/" target="_blank">
                        <Image src={linkedIn} alt="LinkedInImage" />
                    </a>
                </motion.div>
                <motion.div className={`${contactStyle.contact__links__github} ${toggleShadowClass}`} ref={contactSectionRef} whileHover={{ scale: 1.2 }}>
                    <a href="https://github.com/Federico-Aguirre" target="_blank">
                        <Image src={githubImage} alt="gitHubImage" />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Contact;