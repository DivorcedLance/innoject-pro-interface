import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import zhCN from './locales/zh-CN.json';
import ru from './locales/ru.json';
import nl from './locales/nl.json';
import sv from './locales/sv.json';

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  },
  fr: {
    translation: fr
  },
  de: {
    translation: de
  },
  it: {
    translation: it
  },
  pt: {
    translation: pt
  },
  ja: {
    translation: ja
  },
  ko: {
    translation: ko
  },
  'zh-CN': {
    translation: zhCN
  },
  ru: {
    translation: ru
  },
  nl: {
    translation: nl
  },
  sv: {
    translation: sv
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      // Configure language detection
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
