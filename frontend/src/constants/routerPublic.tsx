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

const TableReserVation = lazy(
  () => import("@features/news/user/TableReserVation")
);
const RecruitmentDetail = lazy(
  () => import("@features/recruitment/RecruitmentDetail")
);
const Recruitment = lazy(() => import("@features/recruitment/index"));
const News = lazy(() => import("@features/news/user/index"));
const NewDetail = lazy(() => import("@features/news/user/NewDetail"));
const ContactPage = lazy(() => import("@features/contact"));

const AboutUsPage = lazy(() => import("@features/about-us"));

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
  recruitment: {
    prefix: "/tuyen-dung",
  },
  recruitmentDetail: {
    prefix: "/tuyen-dung/:id",
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
    path: paths.memu.prefix,
    element: MenuPage,
    name: "navigation.header.memu",
  },
  {
    path: paths.sale.prefix,
    element: News,
    name: "navigation.header.sale",
    isHiden: true,
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
    isHiden: true,
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
    path: paths.recruitment.prefix,
    element: Recruitment,
    name: "navigation.header.ecruitment",
  },
  {
    path: paths.recruitmentDetail.prefix,
    element: RecruitmentDetail,
    name: "navigation.header.ecruitment",
    isHiden: true,
  },
  {
    path: paths.contact.prefix,
    element: ContactPage,
    name: "navigation.header.contact",
  },
];
