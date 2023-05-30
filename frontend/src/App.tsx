import { TranslateProvider } from "@contexts/Translation";
import { RouterRoot } from "./navigation";
import { Suspense } from "react";
import ModalProvider from "@contexts/ModalContext";
import { useRefreshWeb } from "@hooks/useRefreshWeb";
import AuthProvider from "@contexts/AuthContext";
import { PopupProvider } from "@contexts/PopupContext";
import { LoadingData } from "@components/LoadingData";

function App() {
  useRefreshWeb();

  return (
    <Suspense fallback={<LoadingData />}>
      <AuthProvider>
          <TranslateProvider>
            <PopupProvider>
              <ModalProvider>
                <RouterRoot />
              </ModalProvider>
            </PopupProvider>
          </TranslateProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
