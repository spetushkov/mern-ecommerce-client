import i18n from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import commonDE from '../assets/locales/de/common.json';
import validationDE from '../assets/locales/de/validation.json';
import commonEN from '../assets/locales/en/common.json';
import validationEN from '../assets/locales/en/validation.json';

// common is a default namespace (1-st element in the array below)
const resources = {
  en: { common: commonEN, validation: validationEN },
  de: { common: commonDE, validation: validationDE },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    keySeparator: '.',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
