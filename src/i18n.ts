import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Esta validación previene el error de undefined.json
  if (!locale) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default
  };
});