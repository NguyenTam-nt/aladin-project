import ModalProvider from "@contexts/ModalContext";
import { RouterRoot } from "navigation";
import { useEffect } from "react";
import { prefixRootRoute } from "./constants";
import { useLocation } from "react-router-dom";
import { ContactProvider } from "@contexts/ContactContext";
import { OrderProvider } from "@contexts/OrderContext";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if(location.pathname.includes(prefixRootRoute.admin)) {
      document.body.style.overflowX = 'auto';
    }else {
      document.body.style.overflowX = 'hidden';
    }
  }, [location.pathname, location.search]);
  return (
    <ModalProvider>
      <OrderProvider>
        <ContactProvider>
          <RouterRoot />
        </ContactProvider>
      </OrderProvider>
    </ModalProvider>
  );
}

export default App;
