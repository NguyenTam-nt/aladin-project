import {useTranslation} from 'react-i18next';

const useI18n = () => {
  const {t, i18n} = useTranslation();
  const isVn = i18n.language == 'vi';
  const changeLanguage = (flag: 'vi' | 'ko') => {
    i18n.changeLanguage(flag);
  };
  return {t, lang: i18n.language, changeLanguage, isVn, i18n};
};

export default useI18n;
