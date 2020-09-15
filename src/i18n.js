import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./i18n/en.json";
import fr from "./i18n/fr.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ["all"],
    defaultNS: "all",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for React
    },
    resources: { en: { all: en }, fr: { all: fr } },
    react: {
      transKeepBasicHtmlNodesFor: ["br", "p", "strong", "em"],
    },
  });

export default i18n;
