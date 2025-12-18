"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/createNavigation";
import { useTransition } from "react";
import Image from "next/image";
import navbarStyle from "scss/base/navbar.module.scss"

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale();

  // Lógica inversa: Si estoy en 'es', quiero ir a 'en' y viceversa
  const nextLocale = activeLocale === 'es' ? 'en' : 'es';

  // Configuración de la bandera que vamos a MOSTRAR (la del destino)
  const targetInfo = {
    es: { label: 'Español', flagSrc: '/svg/flags/Argentina-flag.svg' },
    en: { label: 'English', flagSrc: '/svg/flags/US-flag.svg' }
  };

  // Obtenemos la info del idioma AL QUE VAMOS A CAMBIAR
  const info = targetInfo[nextLocale];

  const onToggleLanguage = () => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className={navbarStyle.navbar__switcherContainer}>
      <button
        onClick={onToggleLanguage}
        className={navbarStyle.navbar__mainButton}
        disabled={isPending}
        type="button"
        title={`Cambiar a ${info.label}`} // Accesibilidad
      >
        <div className={navbarStyle.navbar__flagWrapper} data-flag={nextLocale}>
          <Image 
            src={info.flagSrc} 
            alt={info.label} 
            fill 
            className={navbarStyle.navbar__flagImage}
          />
        </div>
        {/* Opcional: Si quieres mostrar el texto del idioma destino */}
        <span className={navbarStyle.navbar__langCode}>
            {nextLocale}
        </span>
      </button>
    </div>
  );
}