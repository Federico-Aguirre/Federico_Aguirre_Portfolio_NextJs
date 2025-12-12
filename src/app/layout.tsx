// src/app/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import localFont from 'next/font/local';

// 🔥 TODOS los estilos globales van acá
import "scss/abstract/variables.scss";
import "scss/base/globals.scss";
import "scss/abstract/animations/globalAnimations.scss";

const public_Sans = localFont({
  src: './localFonts/PublicSans-Medium.ttf'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={public_Sans.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
