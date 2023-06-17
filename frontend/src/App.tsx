import ModalProvider from "@contexts/ModalContext";
import { RouterRoot } from "navigation";
import { useEffect } from "react";
import { prefixRootRoute } from "./constants";
import { useLocation } from "react-router-dom";
import { ContactProvider } from "@contexts/ContactContext";
import { OrderProvider } from "@contexts/OrderContext";
import AuthProvider from "@contexts/AuthContext";

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
      <AuthProvider>
      <OrderProvider>
        <ContactProvider>
          <RouterRoot />
        </ContactProvider>
      </OrderProvider>
      </AuthProvider>
    </ModalProvider>
  );
}

export default App;
