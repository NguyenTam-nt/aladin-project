import BrandPage from "@features/abouts/components/Brand";
import GeneralPage from "@features/abouts/components/general";
import React, { lazy } from "react";
import { Outlet } from "react-router-dom";

const HomePage = lazy(() => import("../features/home"));
const AboutPage = lazy(() => import("../features/abouts"));
const NewsPage = lazy(() => import("../features/news"));
const NewsDetailPage = lazy(() => import("../features/newsDetail"));
const CadresPage = lazy(() => import("../features/cadres"));

const DemoElement = () => (
  <div className="text-_40 text-[red] font-bold flex justify-center h-[100px] items-center">
    Trang này chưa code đâu nhé!
  </div>
);
const NullElement = () => <Outlet></Outlet>;

interface IRouter {
  path: string;
  name: string;
  element: any;
  isHiden?: boolean;
  subNavs?: {
    path: string;
    name: string;
    element: any;
    isHiden?: boolean;
    isDetail?: boolean;
  }[];
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
    brochure: "brochure",
  },
  news: {
    prefix: "/tin-tuc",
    news: "",
    train: "dao-tao",
    study: "nghien-cuu-khoa-hoc",
    scholarship: "hoc-bong",
    student: "sinh-vien",
    event: "su-kien",
    career: "co-hoi-nghe-nghiep",
    admissions: "tuyen-sinh",
    detail: "chi-tiet-tin-tuc",
  },
  notice: {
    prefix: "thông báo",
  },
  documents: {
    prefix: "tai-lieu-van-ban",
  },
  cadres: {
    prefix: "/can-bo",
    cadres: "",
    primary: "can-bo-co-huu",
    internship: "can-bo-thuu-tap",
  },
  subject: {
    prefix: "/bo-mon",
  },
  library_image: {
    prefix: "/thu-vien-hinh-anh",
  },
  video: {
    prefix: "/video",
  },
};

export const rootRouter: IRouter[] = [
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
        element: GeneralPage,
      },
      {
        path: paths.about.brand,
        name: "home.header.navigation.sub_abouts._brand",
        element: BrandPage,
      },
      {
        path: paths.about.structure,
        name: "home.header.navigation.sub_abouts._structure",
        element: DemoElement,
      },
      {
        path: paths.about.brochure,
        name: "home.header.navigation.sub_abouts._brochure",
        element: DemoElement,
      },
    ],
  },
  {
    path: paths.news.prefix,
    name: "home.header.navigation.news",
    element: NullElement,
    subNavs: [
      {
        path: paths.news.news,
        name: "home.header.navigation.sub_news._news",
        element: NewsPage,
        isHiden: true,
      },
      {
        path: paths.news.train,
        name: "home.header.navigation.sub_news._train",
        element: DemoElement,
      },
      {
        path: paths.news.study,
        name: "home.header.navigation.sub_news._study",
        element: DemoElement,
      },
      {
        path: paths.news.scholarship,
        name: "home.header.navigation.sub_news._scholarship",
        element: DemoElement,
      },
      {
        path: paths.news.student,
        name: "home.header.navigation.sub_news._student",
        element: DemoElement,
      },
      {
        path: paths.news.event,
        name: "home.header.navigation.sub_news._event",
        element: DemoElement,
      },
      {
        path: paths.news.career,
        name: "home.header.navigation.sub_news._career",
        element: DemoElement,
      },
      {
        path: paths.news.admissions,
        name: "home.header.navigation.admissions",
        element: DemoElement,
      },
      {
        path: paths.news.detail,
        element: NewsDetailPage,
        name: "home.header.navigation.sub_news._detail",
        isHiden: true,
        isDetail: true,
      },
    ],
  },
  {
    path: paths.notice.prefix,
    name: "home.header.navigation.notice",
    element: DemoElement,
  },
  {
    path: paths.documents.prefix,
    name: "home.header.navigation.documents",
    element: DemoElement,
  },
  {
    path: paths.cadres.prefix,
    name: "home.header.navigation.cadres",
    element: NullElement,
    isHiden: true,
    subNavs: [
      {
        path: paths.cadres.cadres,
        name: "home.header.navigation.sub_cadres._cadres",
        element: CadresPage,
        isHiden: true,
      },
      {
        path: paths.cadres.primary,
        name: "home.header.navigation.sub_cadres._cadres1",
        element: DemoElement,
      },
      {
        path: paths.cadres.internship,
        name: "home.header.navigation.sub_cadres._cadres2",
        element: DemoElement,
      },
    ],
  },
  {
    path: paths.subject.prefix,
    name: "home.header.navigation.subject",
    element: DemoElement,
  },
  {
    path: paths.library_image.prefix,
    name: "home.header.navigation.library_image",
    element: DemoElement,
  },
  {
    path: paths.video.prefix,
    name: "home.header.navigation.video",
    element: DemoElement,
  },
];
