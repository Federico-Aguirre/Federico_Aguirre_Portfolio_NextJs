import MotionProvider from "./components/MotionProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";
import ScrollbarCustom from "./components/ScrollbarCustom";
import "scss/base/globals.scss";

// Configuración de la fuente local (ya incluye display: "swap")
const publicSans = localFont({
  src: [
    {
      path: "./localFonts/PublicSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-public-sans",
});

// Metadatos de viewport garantizando zoom accesible
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ⚡ Metadatos globales con tu información real
export const metadata: Metadata = {
  title: 'Federico Aguirre | Full Stack Developer',
  description:
    'Full Stack Web Developer specializing in scalable web applications, SaaS, and e-commerce built with Next.js, React, Node.js, and Laravel. | Desarrollador Web Full Stack especializado en aplicaciones web escalables, SaaS y e-commerce con Next.js, React, Node.js y Laravel.',
  openGraph: {
    title: 'Federico Aguirre | Full Stack Developer',
    description:
      'Full Stack Web Developer specializing in scalable web applications, SaaS, and e-commerce built with Next.js, React, Node.js, and Laravel. | Desarrollador Web Full Stack especializado en aplicaciones web escalables, SaaS y e-commerce con Next.js, React, Node.js y Laravel.',
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Obtención dinámica del idioma actual
  const locale = await getLocale();
  const messages = await getMessages();

  // Datos Estructurados (Schema.org / JSON-LD) para validar SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Federico Aguirre",
    jobTitle: "Full Stack Web Developer",
    url: "https://federico-aguirre-portfolio-next-js.vercel.app",
    knowsAbout: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Web Development",
      "Accessibility",
    ],
  };

  return (
    <html lang={locale} className={publicSans.variable} suppressHydrationWarning>
      <head>
        {/* Inyección de Schema.org en el servidor */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${publicSans.className} antialiased`}>
        {/* Skip Link: Permite a usuarios de teclado saltar directo al contenido */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          Skip to main content / Saltar al contenido principal
        </a>

        <NextIntlClientProvider messages={messages} locale={locale}>
          <MotionProvider>
            {/* ScrollbarCustom es el ÚNICO encargado de controlar el scroll de toda la web */}
            <ScrollbarCustom aria-label="Contenido principal de la página">
              {/* Estructura Semántica Principal con punto de anclaje para el Skip Link */}
              <main
                id="main-content"
                tabIndex={-1}
                className="outline-none w-full h-auto min-h-screen"
              >
                {children}
              </main>
            </ScrollbarCustom>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}