import { TranslateProvider } from "@contexts/Translation";
import { RouterRoot } from "./navigation";
import { Suspense } from "react";
import ModalProvider from "@contexts/ModalContext";
import { useRefreshWeb } from "@hooks/useRefreshWeb";

function App() {
  useRefreshWeb()

  return (
    <Suspense>
      <TranslateProvider>
        <ModalProvider>
          <RouterRoot />
        </ModalProvider>
      </TranslateProvider>
    </Suspense>
  );
}

export default App;
