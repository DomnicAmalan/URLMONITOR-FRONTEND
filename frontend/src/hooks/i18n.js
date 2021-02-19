import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locate/en/translate.json';
import translationTA from './locate/ta/translate.json';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'ta'];

const resources = {
  en: {
    translation: translationEN,
  },
  ta: {
    translation: translationTA,
  },
};
const userLang = navigator.language || navigator.userLanguage;
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,
    lng: userLang,
    detection: {
      checkWhitelist: true,
    },
    debug: false,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
