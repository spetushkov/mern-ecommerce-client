import i18n from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import httpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .use(httpBackend)
  .init({
    backend: {
      loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['common'],
    defaultNS: 'common',
    nonExplicitSupportedLngs: true,
    supportedLngs: ['en', 'de'],
    load: 'languageOnly',
    fallbackLng: false,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
