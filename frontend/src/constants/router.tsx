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

export const paths = {
    home: {
        prefix: "/",
    },
    about: {
        prefix: "/gioi-thieu",
        general: "",
        brand: "thuong-hieu",
        structure: "co-cau-to-chuc-nhan-su",
        brochure: "brochure"
    },
    news: {
        prefix: "/tin-tuc",
        train: "dao-tao",
        study: "nghien-cuu-khoa-hoc",
        scholarship: "hoc-bong",
        student: "sinh-vien",
        event: "su-kien",
        career: "co-hoi-nghe-nghiep",
        detail: "chi-tiet-tin-tuc",
    },
    admissions: {
        prefix: "/tuyen-sinh"
    },
    documents: {
        prefix: "tai-lieu-van-ban"
    },
    cadres: {
        prefix: "/can-bo"
    },
    subject: {
        prefix: "/bo-mon"
    },
    library_image: {
        prefix: "/thu-vien-hinh-anh"
    },
    video: {
        prefix: "/video"
    }
   
}

export const rootRouter:IRouter[] = [
    {
        path: paths.home.prefix,
        name: "home.header.navigation.home",
        element: HomePage,
    },
    {
        path: paths.about.prefix,
        name: "home.header.navigation.about",
        element: AboutPage,
        subNavs: [
            {
                path: paths.about.general,
                name: "home.header.navigation.sub_abouts._general",
                element: GeneralPage
            },
            {
                path: paths.about.brand,
                name: "home.header.navigation.sub_abouts._brand",
                element: DemoElement
            },
            {
                path: paths.about.structure,
                name: "home.header.navigation.sub_abouts._structure",
                element:DemoElement
            },
            {
                path: paths.about.brochure,
                name: "home.header.navigation.sub_abouts._brochure",
                element: DemoElement
            }
        ]
    },
    {
        path: paths.news.prefix,
        name: "home.header.navigation.news",
        element: NewsPage,
        subNavs: [
            {
                path: paths.news.train,
                name: "home.header.navigation.sub_news._train",
                element: DemoElement,
            },
            {
                path: paths.news.study,
                name: "home.header.navigation.sub_news._study",
                element: DemoElement
            },
            {
                path: paths.news.scholarship,
                name: "home.header.navigation.sub_news._scholarship",
                element:DemoElement
            },
            {
                path:  paths.news.student,
                name: "home.header.navigation.sub_news._student",
                element: DemoElement
            },
            {
                path: paths.news.event,
                name: "home.header.navigation.sub_news._event",
                element: DemoElement
            },
            {
                path: paths.news.career,
                name: "home.header.navigation.sub_news._career",
                element: DemoElement
            },  
            {
                path: paths.news.detail,
                element: NewsDetailPage,
                name: "home.header.navigation.sub_news._detail",
                isHiden: true
            },
        ]
    },
    {
        path: paths.admissions.prefix,
        name: "home.header.navigation.admissions",
        element: DemoElement
    },
    {
        path: paths.documents.prefix,
        name: "home.header.navigation.documents",
        element: DemoElement
    },
    {
        path: paths.cadres.prefix,
        name: "home.header.navigation.cadres",
        element: CadresPage
    },
    {
        path: paths.subject.prefix,
        name: "home.header.navigation.subject",
        element: DemoElement
    },
    {
        path: paths.library_image.prefix,
        name: "home.header.navigation.library_image",
        element: DemoElement
    },
    {
        path: paths.video.prefix,
        name: "home.header.navigation.video",
        element: DemoElement
    },
]