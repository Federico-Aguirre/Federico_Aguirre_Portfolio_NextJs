import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "../components/Navbar";
import { getTranslations } from "next-intl/server";

// Función dinámica para generar el <title> y <meta description> según el idioma
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "es";

  // Obtenemos las traducciones de la sección "metadata"
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"), // 👈 ESTA LÍNEA INYECTA LA METADESCRIPCIÓN
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

// Idiomas con lectura de derecha a izquierda (RTL)
const RTL_LOCALES = ["ar", "he", "fa", "ur", "dv"];

function getDirection(locale: string): "ltr" | "rtl" {
  return RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}

export interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validación de seguridad de idioma (Vinculada a la fuente única)
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  //Obtención segura de mensajes desde el servidor
  const messages = await getMessages();
  
  // Determinación de direccionalidad del idioma (LTR / RTL)
  const direction = getDirection(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      <div dir={direction} className="min-h-screen flex flex-col antialiased">
        <header role="banner" className="w-full z-50">
          <Navbar />
        </header>
        <div className="flex-1 w-full">
          {children}
        </div>
      </div>
    </NextIntlClientProvider>
  );
}