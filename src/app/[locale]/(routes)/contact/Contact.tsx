"use client"

import "scss/abstract/animations/globalAnimations.scss"
import contactStyle from "scss/pages/contact.module.scss"
import linkedIn from "@/svg/linkedin.svg"
import githubImage from "@/svg/github.svg"
import Image from "next/image"
import { useContextStore } from "@/app/store/Context"
import { m, useReducedMotion } from "framer-motion"
import { useRef, useEffect, useState, startTransition } from "react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactFormData } from "@/lib/schemas/contactSchema"
import { sendContactForm } from "@/app/actions/contactAction"

const Contact = () => {
  const contactSectionRef = useRef<HTMLDivElement>(null)
  const { changeSectionVisible, darkMode } = useContextStore()
  const t = useTranslations("contact")
  
  const shouldReduceMotion = useReducedMotion()
  const toggleShadowClass: string = darkMode ? "darkModeShadowClass" : "brightModeShadowClass"

  // Estado para capturar cuándo el componente se montó (Control temporal anti-bot)
  const [mountTime, setMountTime] = useState<number>(0)
  const [serverStatus, setServerStatus] = useState<{ type: "idle" | "success" | "error"; message?: string }>({ type: "idle" })

  useEffect(() => {
    setMountTime(Date.now())
  }, [])

  // Integración React Hook Form + Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      affair: "",
      consultation: "",
      hp_company: "",
      formTimestamp: 0
    }
  })

  // Control manual de animación de Labels
  const [activeFields, setActiveFields] = useState({
    name: false, email: false, affair: false, consultation: false
  })

  const handleFocus = (field: keyof typeof activeFields) => {
    setActiveFields(prev => ({ ...prev, [field]: true }))
  }

  const handleBlur = (field: keyof typeof activeFields, value: string) => {
    if (value.trim() === "") {
      setActiveFields(prev => ({ ...prev, [field]: false }))
    }
  }

  const labelAnimation = (isActive: boolean) => ({
    y: isActive ? 0 : 20,
    scale: isActive ? 0.85 : 1,
    color: isActive ? "hsl(194, 85%, 62%)" : (darkMode ? "#f3f4f6" : "#111827") 
  })

  // Envío delegado al Server Action
  const onSubmit = async (data: ContactFormData) => {
    setServerStatus({ type: "idle" })
    
    // Inyecta el tiempo real de inicio
    const payload = { ...data, formTimestamp: mountTime }

    const response = await sendContactForm(payload)

    if (response.success) {
      setServerStatus({ type: "success", message: t("messages.success") })
      reset()
      setActiveFields({ name: false, email: false, affair: false, consultation: false })
    } else {
      const errorMsg = response.error ? t(`messages.${response.error}`) : t("messages.serverError")
      setServerStatus({ type: "error", message: errorMsg })
    }
  }

  const showFromLeftAnimation = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  const showFromRightAnimation = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  useEffect(() => {
    const currentRef = contactSectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startTransition(() => {
          changeSectionVisible("contact"); 
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

  return (
    <section 
      className={contactStyle.contact} 
      id="contact" 
      aria-labelledby="contact-title"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <m.div 
        className={`${contactStyle.contact__formContainer} ${toggleShadowClass}`} 
        variants={showFromLeftAnimation} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-50px" }}
        style={{willChange: "transform, opacity",}}
      >
        <form 
          className={contactStyle.contact__formContainer__form} 
          onSubmit={handleSubmit(onSubmit)} 
          noValidate
        >
          <p id="contact-title" className={contactStyle.contact__formContainer__form__title}>
            {t("sendMessage")}
          </p>

          {/* Campo TRAMPA HONEYPOT (Invisible para humanos, visible para bots) */}
          <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
            <label htmlFor="hp_company">Do not fill this field</label>
            <input 
              id="hp_company" 
              type="text" 
              tabIndex={-1} 
              autoComplete="off" 
              {...register("hp_company")} 
            />
          </div>

          {/* ----- CAMPO NOMBRE ----- */}
          <m.label 
            className={contactStyle.contact__formContainer__form__labelName} 
            htmlFor="name"
            animate={labelAnimation(activeFields.name)}
            style={{ originX: 0 }}
          >
            {t("name")}
          </m.label>
          <input 
            className={contactStyle.contact__formContainer__form__name} 
            id="name" 
            type="text" 
            autoComplete="name"
            placeholder=" "
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name", {
              onBlur: (e) => handleBlur("name", e.target.value)
            })}
            onFocus={() => handleFocus("name")}
          />
          {errors.name && (
            <span id="name-error" role="alert" style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "2px" }}>
              {t(`errors.${errors.name.message}`)}
            </span>
          )}

          {/* ----- CAMPO EMAIL ----- */}
          <m.label 
            className={contactStyle.contact__formContainer__form__labelEmail} 
            htmlFor="email"
            animate={labelAnimation(activeFields.email)}
            style={{ originX: 0 }}
          >
            {t("email")}
          </m.label>
          <input 
            className={contactStyle.contact__formContainer__form__email} 
            id="email" 
            type="email" 
            autoComplete="email"
            placeholder=" "
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email", {
              onBlur: (e) => handleBlur("email", e.target.value)
            })}
            onFocus={() => handleFocus("email")}
          />
          {errors.email && (
            <span id="email-error" role="alert" style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "2px" }}>
              {t(`errors.${errors.email.message}`)}
            </span>
          )}

          {/* ----- CAMPO ASUNTO ----- */}
          <m.label 
            className={contactStyle.contact__formContainer__form__labelAffair} 
            htmlFor="affair"
            animate={labelAnimation(activeFields.affair)}
            style={{ originX: 0 }}
          >
            {t("affair")}
          </m.label>
          <input 
            className={contactStyle.contact__formContainer__form__affair} 
            id="affair" 
            type="text" 
            autoComplete="off"
            placeholder=" "
            aria-required="true"
            aria-invalid={!!errors.affair}
            aria-describedby={errors.affair ? "affair-error" : undefined}
            {...register("affair", {
              onBlur: (e) => handleBlur("affair", e.target.value)
            })}
            onFocus={() => handleFocus("affair")}
          />
          {errors.affair && (
            <span id="affair-error" role="alert" style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "2px" }}>
              {t(`errors.${errors.affair.message}`)}
            </span>
          )}

          {/* ----- CAMPO MENSAJE ----- */}
          <m.label 
            className={contactStyle.contact__formContainer__form__labelTextarea1} 
            htmlFor="textarea1"
            animate={labelAnimation(activeFields.consultation)}
            style={{ originX: 0 }}
          >
            {t("message")}
          </m.label>
          <textarea 
            className={contactStyle.contact__formContainer__form__textarea1} 
            id="textarea1" 
            placeholder=" "
            aria-required="true"
            aria-invalid={!!errors.consultation}
            aria-describedby={errors.consultation ? "consultation-error" : undefined}
            {...register("consultation", {
              onBlur: (e) => handleBlur("consultation", e.target.value)
            })}
            onFocus={() => handleFocus("consultation")}
          ></textarea>
          {errors.consultation && (
            <span id="consultation-error" role="alert" style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "2px" }}>
              {t(`errors.${errors.consultation.message}`)}
            </span>
          )}

          {/* ----- MENTOR DE ESTADO ARIA-LIVE ----- */}
          <div aria-live="polite" aria-atomic="true" style={{ marginTop: "10px" }}>
            {serverStatus.type === "success" && (
              <p style={{ color: "#10b981", fontSize: "0.9rem", margin: 0 }}>{serverStatus.message}</p>
            )}
            {serverStatus.type === "error" && (
              <p style={{ color: "#ef4444", fontSize: "0.9rem", margin: 0 }}>{serverStatus.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            className={contactStyle.contact__formContainer__form__send}
            style={{ opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
          >
            {isSubmitting ? t("sending") : t("send")}
          </button>
        </form>
      </m.div>

      {/* ENLACES SOCIALES ACCESIBLES */}
      <m.div 
        className={contactStyle.contact__links} 
        ref={contactSectionRef} 
        variants={showFromRightAnimation} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }}
        style={{willChange: "transform, opacity"}}
      >
        <m.div 
          className={`${contactStyle.contact__links__linkedin} ${toggleShadowClass}`} 
          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
        >
          <a 
            href="https://www.linkedin.com/in/federico-nicolas-aguirre/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`${t("linkedinAlt")} (abre en una pestaña nueva)`}
          >
            <Image src={linkedIn} alt="" aria-hidden="true" />
          </a>
        </m.div>
        <m.div 
          className={`${contactStyle.contact__links__github} ${toggleShadowClass}`} 
          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
        >
          <a 
            href="https://github.com/Federico-Aguirre" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`${t("githubAlt")} (abre en una pestaña nueva)`}
          >
            <Image src={githubImage} alt="" aria-hidden="true" />
          </a>
        </m.div>
      </m.div>
    </section>
  )
}

export default Contact