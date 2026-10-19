"use client";

import { useTranslations } from "next-intl";
import footerStyle from "scss/components/footer.module.scss";

export default function PortfolioFooter() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className={footerStyle.footer}>
      <p className={footerStyle.footerMessage}>{t("thanks")}</p>
      <p className={footerStyle.footerCopyright}>
        <span>© {currentYear} Federico Aguirre</span>
        <span className={footerStyle.footerSeparator} aria-hidden="true">·</span>
        <span>{t("builtWith")}</span>
      </p>
    </footer>
  );
}
