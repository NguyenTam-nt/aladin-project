import i18n from "@configs/i18n";
import { useTranslation } from "react-i18next";

export const LANGUAGE = [
  { label: "VNI", value: "vi" },
];
export default function useTranslate() {
  const { t: translate } = useTranslation();
  const langStorage = localStorage.getItem("i18nextLng");
  const currentLang =
    LANGUAGE.find((_lang) => _lang.value === langStorage) || LANGUAGE[0];
  const handleChangeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
  };
  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGUAGE,
  };
}
