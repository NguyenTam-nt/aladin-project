import AllCadres from "@features/cadres/allCadres/AllCadres"
import InternshipCadres from "@features/cadres/internshipCadres/InternshipCadres"
import PrimaryCadres from "@features/cadres/primaryCadres/PrimaryCadres"
import LibraryVideo from "@features/libraryVideo"
import AllNews from "@features/news/allNews"
import CareerNews from "@features/news/careerNews/CareerNews"
import EventNews from "@features/news/eventNews/EventNews"
import ScholarshipNews from "@features/news/scholarshipNews/ScholarshipNews"
import StudentNews from "@features/news/studentNews/StudentNews"
import StudyNews from "@features/news/studyNews/studyNews"
import TrainingNews from "@features/news/trainingNews/trainingNews"
import { BrochurePage } from "@features/abouts/components/brochure";
import { Structure } from "@features/abouts/components/structure";
import React, { lazy } from "react";
import { Outlet } from "react-router-dom";





const HomePage = lazy(() => import("../features/home"))
const AboutPage = lazy(() => import("../features/abouts"))
const GeneralPage = lazy(() => import("../features/abouts/components/general"))
const BrandPage = lazy(() => import("../features/abouts/components/Brand"))
const NewsDetailPage = lazy(() => import("../features/newsDetail"))
const LibraryImage  =lazy(() => import("../features/libraryImage"))

const DemoElement = () => <div className="text-_40 text-[red] font-bold flex justify-center h-[100px] items-center">Trang này chưa code đâu nhé!</div>
const NullElement = () => <Outlet></Outlet>

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
    prefix: "/thu-vien-hinh-anh" ,
        library_image : ""
,
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
        element: Structure,
      },
      {
        path: paths.about.brochure,
        name: "home.header.navigation.sub_abouts._brochure",
        element: BrochurePage,
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
        element: AllNews,
        isHiden: true,
      },
      {
        path: paths.news.train ,
        name: "home.header.navigation.sub_news._train",
        element: TrainingNews,
      },
      {
        path: paths.news.study,
        name: "home.header.navigation.sub_news._study",
        element: StudyNews,
      },
      {
        path: paths.news.scholarship,
        name: "home.header.navigation.sub_news._scholarship",
        element: ScholarshipNews,
      },
      {
        path: paths.news.student,
        name: "home.header.navigation.sub_news._student",
        element: StudentNews,
      },
      {
        path: paths.news.event,
        name: "home.header.navigation.sub_news._event",
        element: EventNews,
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
        element: AllCadres,
        isHiden: true,
      },
      {
        path: paths.cadres.primary,
        name: "home.header.navigation.sub_cadres._cadres1",
        element: PrimaryCadres,
      },
      {
        path: paths.cadres.internship,
        name: "home.header.navigation.sub_cadres._cadres2",
        element: InternshipCadres,
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
    element: LibraryImage,
    subNavs: [
      {
        path: paths.library_image.library_image,
        name: "home.header.navigation.library_image",
        element: LibraryImage,
        isHiden: true,
      },]
  },
  {
    path: paths.video.prefix,
    name: "home.header.navigation.library_video",
    element: LibraryVideo,
    subNavs: [
      {
        path: paths.library_image.library_image,
        name: "home.header.navigation.library_video",
        element: LibraryVideo,
        isHiden: true,
      },]
  },
];
