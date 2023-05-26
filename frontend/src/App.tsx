import { TranslateProvider } from "@contexts/Translation";
import { RouterRoot } from "./navigation";
import { Suspense } from "react";
import ModalProvider from "@contexts/ModalContext";
import { useRefreshWeb } from "@hooks/useRefreshWeb";
import AuthProvider from "@contexts/AuthContext";

function App() {
  useRefreshWeb()

  return (
    <Suspense>
      <AuthProvider>
      <TranslateProvider>
        <ModalProvider>
          <RouterRoot />
        </ModalProvider>
      </TranslateProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
