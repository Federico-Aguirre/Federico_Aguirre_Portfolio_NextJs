"use client";

import { contextStore } from "@/store/Context";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import homeStyle from "scss/pages/home.module.scss";
import { Link } from "react-scroll";

const CallToAction = () => {
  const { darkMode } = contextStore();
  const t = useTranslations();
  const locale = useLocale();

  const toggleShadowClass = darkMode ? "darkModeShadowClass" : "brightModeShadowClass";

  const animation = {
    initial: { opacity: 0, y: 200 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.3 } }
  };

  return (
    <motion.div
      key={locale} // remonta al cambiar idioma
      className={`${homeStyle.homePage__CallToAction} ${toggleShadowClass}`}
      variants={animation}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.2 }}
    >
      <Link to="project" smooth offset={-40} duration={500}>
        {t("watchProjects")}
      </Link>
    </motion.div>
  );
};

export default CallToAction;
