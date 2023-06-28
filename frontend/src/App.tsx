import ModalProvider from "@contexts/ModalContext";
import { RouterRoot } from "navigation";
import { useEffect, useRef, useState } from "react";
import { prefixRootRoute } from "./constants";
import { useLocation } from "react-router-dom";
import { OrderProvider } from "@contexts/OrderContext";
import AuthProvider from "@contexts/AuthContext";
import { MenuSideRight } from "@components/MenuSideRight";
//@ts-ignore
import DeviceOrientation, { Orientation } from "react-screen-orientation";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (location.pathname.includes(prefixRootRoute.admin)) {
      document.body.style.overflowX = "auto";
    } else {
      document.body.style.overflowX = "hidden";
    }
  }, [location.pathname, location.search]);
  return (
    <AuthProvider>
      <ModalProvider>
        <OrderProvider>
          <RouterRoot />
          <MenuSideRight />
        </OrderProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
