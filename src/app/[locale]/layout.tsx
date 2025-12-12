// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import Navbar from '../components/Navbar';


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = (await import(`../../locales/${params.locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <Navbar />
      {children}
    </NextIntlClientProvider>
  );
}
