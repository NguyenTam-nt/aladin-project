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

const ContactPage = lazy(() => import("@features/contact"));
const AboutUsPage = lazy(() => import("@features/about-us"));

const DemoElement = () => {
  return <>Demo element</>;
};
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
  NewDetail: {
    prefix: "/tin-tuc/:id",
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
        element: MenuPage,
        name: "navigation.header.memu",
    },
    {
        path: paths.sale.prefix,
        element: News,
        name: "navigation.header.sale",
        isHiden: true
      },
    {
        path: paths.news.prefix,
        element: News,
        name: "navigation.header.news",
    },
    {
      path: paths.NewDetail.prefix,
      element: NewDetail,
      name: "navigation.header.newDetail",
    },
   
    {
        path: paths.order.prefix,
        element: TableReserVation,
        name: "navigation.header.order",
    },
   
    {
        path: paths.about.prefix,
        element: AboutUsPage,
        name: "navigation.header.about",
    },
    {
        path: paths.ecruitment.prefix,
        element: Recruitment,
        name: "navigation.header.ecruitment",
    },
    {
        path: paths.contact.prefix,
        element: ContactPage,
        name: "navigation.header.contact",
    }
]
