import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "../components/Navbar";
import type { Metadata } from "next";

// ⚡ Metadatos estáticos bilingües unificados para LinkedIn y redes sociales
export const metadata: Metadata = {
  metadataBase: new URL('https://federico-aguirre-portafolio-next-js.vercel.app'),
  title: 'Federico Aguirre | Full Stack Developer',
  description:
    'Full Stack Web Developer specializing in scalable web applications, SaaS, and e-commerce built with Next.js, React, Node.js, and Laravel. | Desarrollador Web Full Stack especializado en aplicaciones web escalables, SaaS y e-commerce con Next.js, React, Node.js y Laravel.',
  openGraph: {
    title: 'Federico Aguirre | Full Stack Developer',
    description:
      'Full Stack Web Developer specializing in scalable web applications, SaaS, and e-commerce built with Next.js, React, Node.js, and Laravel. | Desarrollador Web Full Stack especializado en aplicaciones web escalables, SaaS y e-commerce con Next.js, React, Node.js y Laravel.',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 2400,
        height: 1260,
        alt: 'Federico Aguirre - Portafolio Full Stack Developer',
      },
    ],
  },
};

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

  // Validación de seguridad de idioma
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Obtención segura de mensajes desde el servidor
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