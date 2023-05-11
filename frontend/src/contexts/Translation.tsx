import { ReactNode, createContext, useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";

export enum Ilanguage {
  vi = "vi",
  // en = "en",
  ko = "ko",
}

interface TranslateState {
  currentLanguage: Ilanguage;
  setLanguage: (language: Ilanguage) => void;
  t: any;
  isVn: boolean
}

export const TranslateContext = createContext<TranslateState>({
  currentLanguage: (localStorage.getItem("i18nextLng") as Ilanguage) ?? "vi",
  setLanguage: (language: Ilanguage) => {},
  t: null,
  isVn: true
});

type Props = {
  children: ReactNode;
};

export const TranslateProvider = ({ children }: Props) => {
  const [currentLanguage, setCurrentLanguage] = useState<Ilanguage>(
    (localStorage.getItem("i18nextLng") as Ilanguage) ?? "vi"
  );
  const { t, i18n } = useTranslation();

  const isVn = useMemo(() => currentLanguage === Ilanguage.vi, [currentLanguage])

  const setLanguage = (language: Ilanguage) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  }

  const data = useMemo(() => ({
    t,
    setLanguage,
    currentLanguage,
    isVn
  }), [currentLanguage, t])

  return (
    <TranslateContext.Provider
      value={data}
    >
      {children}
    </TranslateContext.Provider>
  );
};
