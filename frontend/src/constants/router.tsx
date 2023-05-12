import { lazy } from "react"


const HomePage = lazy(() => import("../features/home"))
const NewsPage = lazy(() => import("../features/news"))
const NewsDetailPage = lazy(() => import("../features/newsDetail"))
const CadresPage = lazy(() => import("../features/cadres"))
export const rootRouter = [
    {
        path: "/",
        element: HomePage,
    },
    {
        path: "/tin-tuc",
        element: NewsPage,
    },
    {
        path: "/chi-tiet-tin-tuc",
        element: NewsDetailPage,
    } ,
    {
        path: "/can-bo",
        element: CadresPage,
    } ,
]