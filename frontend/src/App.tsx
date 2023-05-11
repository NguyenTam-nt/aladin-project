import { RouterProvider } from "react-router-dom"
import { TranslateProvider } from "@contexts/Translation"
import { router } from "./navigation"
import { Suspense } from "react"

function App() {
  return (
    <Suspense>
    <TranslateProvider>
      <RouterProvider router={router} />
    </TranslateProvider>
    </Suspense>
  )
}

export default App
