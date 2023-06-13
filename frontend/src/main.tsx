import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import i18n from "@configs/i18n";
import { I18nextProvider } from "react-i18next";
import "./assets/css/index.css";
import { BrowserRouter } from "react-router-dom";
import HttpService from "@configs/api";
import keycloakService from "@services/keycloakService";

const App = lazy(() => import("./App"))

const render = () => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Suspense>
          <App />
        </Suspense>
      </BrowserRouter>
    </I18nextProvider>
  );
} 


HttpService.configure()
keycloakService.initKeycloak(render)
 