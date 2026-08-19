'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

// Nombres nativos para garantizar la pronunciación correcta por el sintetizador de voz
const LOCALE_NAMES: Record<Locale, { nativeName: string; labelInCurrent: Record<Locale, string> }> = {
  es: {
    nativeName: 'Español',
    labelInCurrent: {
      es: 'Cambiar idioma a Español',
      en: 'Switch language to Spanish'
    }
  },
  en: {
    nativeName: 'English',
    labelInCurrent: {
      es: 'Cambiar idioma a Inglés',
      en: 'Switch language to English'
    }
  }
};

export function LocaleSwitcher() {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    
    // Reemplaza la ruta actual actualizando la cookie e prefijo de idioma sin recargar la app
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <nav aria-label="Selección de idioma / Language selection">
      <ul style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0, margin: 0 }}>
        {routing.locales.map((locale) => {
          const isActive = locale === currentLocale;
          const { nativeName, labelInCurrent } = LOCALE_NAMES[locale];

          return (
            <li key={locale}>
              <button
                type="button"
                onClick={() => handleLocaleChange(locale)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={labelInCurrent[currentLocale]}
                // Explicita el idioma en el que debe ser leído el texto nativo
                lang={locale}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: isActive ? '2px solid #00E5FF' : '1px solid #4B5563',
                  backgroundColor: isActive ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#E5E7EB',
                  fontWeight: isActive ? 'bold' : 'normal',
                  cursor: isActive ? 'default' : 'pointer',
                  outlineOffset: '2px'
                }}
              >
                <span aria-hidden="true">{locale.toUpperCase()}</span>
                <span className="sr-only"> - {nativeName}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}