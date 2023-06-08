
import { lazy } from "react";

export interface IRouter {
  path: string;
  name: string;
  element: any;
  isHiden?: boolean;
}

const HomePage = lazy(() =>
  import("@features/home").then((module) => ({ default: module.HomePage }))
);

const MenuPage = lazy(() =>
  import("@features/menu").then((module) => ({ default: module.Menu }))
);

const PromotionPage = lazy(() => import("@features/promotion/user/index"));
const TableReserVation = lazy(
  () => import("@features/promotion/user/TableReserVation")
);

const ContactPage = lazy(() => import("@features/contact"));

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
}


export const routersPublic:IRouter[] = [
    {
        path: paths.home.prefix,
        element: HomePage,
        name: "",
        isHiden: true,
    },
    {
        path: paths.memu.prefix,
        element: MenuPage,
        name: "navigation.header.memu",
    },
    {
        path: paths.sale.prefix,
        element: PromotionPage,
        name: "navigation.header.sale",
        isHiden: true
      },
    {
        path: paths.news.prefix,
        element: DemoElement,
        name: "navigation.header.news",
    },
  
   
    {
        path: paths.order.prefix,
        element: TableReserVation,
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
        element: ContactPage,
        name: "navigation.header.contact",
    }
]
