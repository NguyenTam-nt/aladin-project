import { lazy } from "react";

export interface IRouter {
    path: string;
    name: string;
    element: any;
    isHiden?: boolean;
  }

  const HomePage = lazy(() => import("@features/home").then((module) => ({default: module.HomePage})))

  const DemoElement = () => {
    return <>Demo element</>
  }
  
  export const paths = {
    home: {
      prefix: "/",
    },
    about: {
        prefix: "/gioi-thieu",
    },
    sale: {
        prefix: "/khuyen-mai",
    },
    news: {
        prefix: "/tin-tuc",
    },
    order: {
        prefix: "/dat-ban",
    },
    memu: {
        prefix: "/thuc-don",
    },
    ecruitment: {
        prefix: "/tuyen-dung",
    },
    contact: {
        prefix: "/lien-he",
    },

  };
  

export const routersPublic:IRouter[] = [
    {
        path: paths.home.prefix,
        element: HomePage,
        name: "",
        isHiden: true,
    },
    {
        path: paths.memu.prefix,
        element: DemoElement,
        name: "navigation.header.memu",
    },
    {
        path: paths.news.prefix,
        element: DemoElement,
        name: "navigation.header.news",
    },
  
   
    {
        path: paths.order.prefix,
        element: DemoElement,
        name: "navigation.header.order",
    },
   
    {
        path: paths.about.prefix,
        element: DemoElement,
        name: "navigation.header.about",
    },
    {
        path: paths.ecruitment.prefix,
        element: DemoElement,
        name: "navigation.header.ecruitment",
    },
    {
        path: paths.contact.prefix,
        element: DemoElement,
        name: "navigation.header.contact",
    }
]