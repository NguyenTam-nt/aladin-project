import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import "@fontsource/nunito-sans"
import "./assets/css/index.css"
import {I18nextProvider} from "react-i18next"
import i18n from './i18n'
import {BrowserRouter} from "react-router-dom"
import keycloakService from '@services/keycloakService'
import HttpService from '@configs/api'
import { LoadingData } from '@components/LoadingData'

const App = lazy(() => import("./App"))

const render = () => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
      <Suspense fallback={<LoadingData />}>
        <App />
      </Suspense>
      </BrowserRouter>
    </I18nextProvider>
    ,
  )
} 

HttpService.configure()
keycloakService.initKeycloak(render)
