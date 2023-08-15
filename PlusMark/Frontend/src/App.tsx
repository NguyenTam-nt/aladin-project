import ContextProvider from "@contexts/ContextProvider";
import DefaultLayout from "@layout/DefaultLayout";
import AppRoutes from "@routes/AppRoute";
import "@utility/i18n";

function App() {
  return (
    <ContextProvider>
      <DefaultLayout>
        <AppRoutes />
      </DefaultLayout>
    </ContextProvider>
  );
}

export default App;
