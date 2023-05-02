import React from 'react'
import ReactDOM from 'react-dom/client'
import "@fontsource/nunito-sans"
import App from "./App"
import "./assets/css/index.css"
import {I18nextProvider} from "react-i18next"
import i18n from './i18n'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <I18nextProvider i18n={i18n}>
      <App />
  </I18nextProvider>
  ,
)
