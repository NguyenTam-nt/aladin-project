import ScrollToTopElement from "@components/common/ScrollToTopElement";
import AuthService from "@services/AuthServices";
import "./utility/i18n";
import "@styles/index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { store } from "redux/store";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

declare global {
  interface Window {
    fbAsyncInit: any;
    FB: any;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
// const onAuthenticatedCallback = () => {
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ScrollToTop
        smooth
        component={<ScrollToTopElement />}
        className="bottom-10"
      />
    </BrowserRouter>
  </Provider>
);
// };

// AuthService.initKeycloak(onAuthenticatedCallback);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
