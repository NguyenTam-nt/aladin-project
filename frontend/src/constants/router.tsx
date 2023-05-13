import React, { lazy, LazyExoticComponent } from "react"


const HomePage = lazy(() => import("../features/home"))
const AboutPage = lazy(() => import("../features/abouts"))
const GeneralPage = lazy(() => import("../features/abouts/components/general"))
const NewsPage = lazy(() => import("../features/news"))
const NewsDetailPage = lazy(() => import("../features/newsDetail"))
const CadresPage = lazy(() => import("../features/cadres"))

const DemoElement = () => <div>Xin chào</div>

interface IRouter {
    path: string,
    name: string,
    element: any
    subNavs?: {
        path: string,
        name: string,
        element: any
        isHiden?: boolean
    }[]
}

export const rootRouter:IRouter[] = [
    {
        path: "/",
        name: "home.header.navigation.home",
        element: HomePage,
    },
    {
        path: "/gioi-thieu",
        name: "home.header.navigation.about",
        element: AboutPage,
        subNavs: [
            {
                path: "",
                name: "home.header.navigation.sub_abouts._general",
                element: GeneralPage
            },
            {
                path: "thuong-hieu",
                name: "home.header.navigation.sub_abouts._brand",
                element: DemoElement
            },
            {
                path: "co-cau-to-chuc-nhan-su",
                name: "home.header.navigation.sub_abouts._structure",
                element:DemoElement
            },
            {
                path: "brochure",
                name: "home.header.navigation.sub_abouts._brochure",
                element: DemoElement
            }
        ]
    },
    {
        path: "/tin-tuc",
        name: "home.header.navigation.news",
        element: NewsPage,
        subNavs: [
            {
                path: "dao-tao",
                name: "home.header.navigation.sub_news._train",
                element: DemoElement,
            },
            {
                path: "nghien-cuu-khoa-hoc",
                name: "home.header.navigation.sub_news._study",
                element: DemoElement
            },
            {
                path: "hoc-bong",
                name: "home.header.navigation.sub_news._scholarship",
                element:DemoElement
            },
            {
                path: "sinh-vien",
                name: "home.header.navigation.sub_news._student",
                element: DemoElement
            },
            {
                path: "su-kien",
                name: "home.header.navigation.sub_news._event",
                element: DemoElement
            },
            {
                path: "co-hoi-nghe-nghiep",
                name: "home.header.navigation.sub_news._career",
                element: DemoElement
            },  
            {
                path: "chi-tiet-tin-tuc",
                element: NewsDetailPage,
                name: "home.header.navigation.sub_news._detail",
                isHiden: true
            },
        ]
    },
    {
        path: "/tuyen-sinh",
        name: "home.header.navigation.admissions",
        element: DemoElement
    },
    {
        path: "/tai-lieu-van-ban",
        name: "home.header.navigation.documents",
        element: DemoElement
    },
    {
        path: "/can-bo",
        name: "home.header.navigation.cadres",
        element: CadresPage
    },
    {
        path: "/bo-mon",
        name: "home.header.navigation.subject",
        element: DemoElement
    },
    {
        path: "/thu-vien-hinh-anh",
        name: "home.header.navigation.library_image",
        element: DemoElement
    },
    {
        path: "/video",
        name: "home.header.navigation.video",
        element: DemoElement
    },
]