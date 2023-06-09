import ModalProvider from "@contexts/ModalContext";
import { RouterRoot } from "navigation";

function App() {
  return (
    <ModalProvider>
      <RouterRoot />
    </ModalProvider>
  );
}

export default App;
