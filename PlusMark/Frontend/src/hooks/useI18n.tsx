import { useTranslation } from "react-i18next";

const useI18n = () => {
  const { t, i18n } = useTranslation();
  return { t, lang: i18n.language, i18n };
};

export default useI18n;
