import i18next from "i18next";
import { resources } from "@assets/locales";
import { initReactI18next } from "react-i18next";

i18next
.use(initReactI18next) 
.init({
  fallbackLng: "ksl",
  resources,
  interpolation: {
    escapeValue: false 
  }
});

export default i18next;
