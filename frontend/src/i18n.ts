import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import { resources } from './assets/locales'

i18n
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'vi', 'ko'],
    lng: localStorage.getItem('i18nextLng') ?? 'ko',
    fallbackLng: 'ko',
    resources,
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    },
  })
export default i18n
