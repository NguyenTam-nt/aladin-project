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
const PromotionPage = lazy(() => import("@features/promotion/user/index"));
const TableReserVation = lazy(
  () => import("@features/promotion/user/TableReserVation")
);

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
  order: {
    prefix: "/dat-ban",
  },
  memu: {
    prefix: "/thuc-don",
  },
  news: {
    prefix: "/tin-tuc",
  },
  contact: {
    prefix: "/lien-he",
  },
};

export const routersPublic: IRouter[] = [
  {
    path: paths.home.prefix,
    element: HomePage,
    name: "",
    isHiden: true,
  },
  {
    path: paths.about.prefix,
    element: DemoElement,
    name: "navigation.header.about",
  },
  {
    path: paths.sale.prefix,
    element: PromotionPage,
    name: "navigation.header.sale",
  },
  {
    path: paths.order.prefix,
    element: TableReserVation,
    name: "navigation.header.order",
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
    path: paths.contact.prefix,
    element: DemoElement,
    name: "navigation.header.contact",
  },
];