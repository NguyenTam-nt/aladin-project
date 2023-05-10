import { lazy } from "react"


const HomePage = lazy(() => import("../features/home"))



export const rootRouter = [
    {
        path: "/",
        element: HomePage,
    }
]