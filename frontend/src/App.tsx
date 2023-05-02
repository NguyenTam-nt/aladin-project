import { RouterProvider } from "react-router-dom"
import { TranslateProvider } from "@contexts/Translation"
import { router } from "./navigation"

function App() {
  return (
    <>
    <TranslateProvider>
      <RouterProvider router={router} />
    </TranslateProvider>
    </>
  )
}

export default App
