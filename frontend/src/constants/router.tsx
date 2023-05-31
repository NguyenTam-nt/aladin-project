import NotFound from "@features/NotFound";
import { BrochurePage } from "@features/abouts/components/brochure";
import { Structure } from "@features/abouts/components/structure";
import AllSubject from "@features/subject/allSubject/AllSubject";

import { lazy } from "react";

const HomePage = lazy(() => import("@features/home"))
const AboutPage = lazy(() => import("@features/abouts"))
const NewsPage = lazy(() => import("@features/news"))
const LibraryImage = lazy(() => import("@features/libraryImage"))
const LibraryVideo = lazy(() => import("@features/libraryVideo"))
const CadresPage = lazy(() => import("@features/cadres"))
const NewsDetailPage = lazy(() => import("@features/newsDetail"))
const DocumentPage = lazy(() => import("@features/documents"))
const NoticePage = lazy(() => import("@features/notice"))
const SubjectPage = lazy(() => import("@features/subject"))
const GeneralPage = lazy(() => import("@features/abouts/components/general"))
const BrandPage = lazy(() => import("@features/abouts/components/Brand"))
const CadresDetailPage = lazy(() => import("@features/cadresDetail"))
const  SubjectDetailPage  = lazy(()=> import("@features/subjectsDetail"))
export interface IRouter {
  path: string;
  name: string;
  nameKo?: string;
  element: any;
  isHiden?: boolean;
  isHidenRouter?: boolean;
  isDetail?: boolean
  subNavs?: {
    path: string;
    name: string;
    element?: any;
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
    prefix: "/thong-bao",
    _notice: "",
    _government: "he-chinh-quy",
    _postgraduate: "he-sau-dai-hoc",
    _shortCourse: "khoa-hoc-ngan-han",
    detail: "chi-tiet-thong-bao",
  },
  documents: {
    prefix: "/tai-lieu-van-ban",
    _documents: "",
    _lesson: "bai-giang",
    _curriculum: "giao-trinh",
    _sample: "van-ban-mau",
    _library: "thu-vien",
    detail : "chi-tiet-tai-tieu"
  },
  cadres: {
    prefix: "/can-bo",
    cadres: "",
    primary: "can-bo-co-huu",
    internship: "can-bo-thuu-tap",
    detail : "chi-tiet-can-bo"
  },
  subject: {
    prefix: "/bo-mon",
    detail  : "chi-tiet-bo-mon"
  },
  library_image: {
    prefix: "/thu-vien-hinh-anh",
    library_image: "",
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
    element: NewsPage,
    isHidenRouter: true,
    subNavs: [
      {
        path: paths.news.news,
        name: "home.header.navigation.sub_news._news",
        isHiden: true,
      },
      {
        path: paths.news.train,
        name: "home.header.navigation.sub_news._train",
        // element: TrainingNews,
      },
      {
        path: paths.news.study,
        name: "home.header.navigation.sub_news._study",
        // element: StudyNews,
      },
      {
        path: paths.news.scholarship,
        name: "home.header.navigation.sub_news._scholarship",
        // element: ScholarshipNews,
      },
      {
        path: paths.news.student,
        name: "home.header.navigation.sub_news._student",
        // element: StudentNews,
      },
      {
        path: paths.news.event,
        name: "home.header.navigation.sub_news._event",
        // element: EventNews,
      },
      {
        path: paths.news.career,
        name: "home.header.navigation.sub_news._career",
        // element: CareerNews,
      },
      {
        path: paths.news.admissions,
        name: "home.header.navigation.admissions",
        // element: AdmissionsNews,
      }
    ],
  },
  {
    path: paths.notice.prefix,
    name: "home.header.navigation.notice",
    element: NoticePage,
    isHidenRouter: true,
    subNavs: [
      {
        path: paths.notice._notice,
        // element: AllNotice,
        name: "home.header.navigation.sub_notice._notice",
        isHiden: true,
      },
      {
        path: paths.notice._government,
        // element: AllNotice,
        name: "home.header.navigation.sub_notice._government",
        isHiden: true,
      },
      {
        path: paths.notice._postgraduate,
        // element: AllNotice,
        name: "home.header.navigation.sub_notice._postgraduate",
        isHiden: true,
      },
      {
        path: paths.notice._shortCourse,
        // element: AllNotice,
        name: "home.header.navigation.sub_notice._shortCourse",
        isHiden: true,
      },
      // {
      //   path: paths.notice.detail,
      //   element: NewsDetailPage,
      //   name: "home.header.navigation.sub_news._detail",
      //   isHiden: true,
      //   isDetail: true,
      // },
    ],
  },
  {
    path: paths.documents.prefix,
    name: "home.header.navigation.documents",
    element: DocumentPage,
    isHidenRouter: true,
    subNavs: [
      {
        path: paths.documents._documents,
        // element: AllDocument,
        name: "home.header.navigation.sub_documents._documents",
        isHiden: true,
      },
      {
        path: paths.documents._lesson,
        // element: AllDocument,
        name: "home.header.navigation.sub_documents._lessons",
        isHiden: true,
      },
      {
        path: paths.documents._curriculum,
        // element: AllDocument,
        name: "home.header.navigation.sub_documents._curriculum",
        isHiden: true,
      },
      {
        path: paths.documents._sample,
        // element: AllDocument,
        name: "home.header.navigation.sub_documents._sample",
        isHiden: true,
      },
      {
        path: paths.documents._library,
        // element: AllDocument,
        name: "home.header.navigation.sub_documents._library",
        isHiden: true,
      },
    ],
  },
  {
    path: paths.cadres.prefix,
    name: "home.header.navigation.cadres",
    element: CadresPage,
    isHiden: true,
    isHidenRouter: true,
    subNavs: [
      {
        path: paths.cadres.cadres,
        name: "home.header.navigation.sub_cadres._cadres",
        // element: AllCadres,
        isHiden: true,
      },
      {
        path: paths.cadres.primary,
        name: "home.header.navigation.sub_cadres._cadres1",
        // element: PrimaryCadres,
      },
      {
        path: paths.cadres.internship,
        name: "home.header.navigation.sub_cadres._cadres2",
        // element: InternshipCadres,
      },
    ],
  },
  {
    path: paths.subject.prefix,
    name: "home.header.navigation.subject",
    element: SubjectPage,
    subNavs: [
      {
        path: paths.library_image.library_image,
        name: "home.header.navigation._subject",
        element: AllSubject,
        isHiden: true,
      },
    ],
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
      },
    ],
  },
  {
    path: paths.video.prefix,
    name: "home.header.navigation.video",
    element: LibraryVideo,
    subNavs: [
      {
        path: paths.library_image.library_image,
        name: "home.header.navigation.library_video",
        element: LibraryVideo,
        isHiden: true,
      },
    ],
  }
];

export const routerDetail:IRouter[] = [
  {
    path: `${paths.news.prefix}/${paths.news.detail}`,
    element: NewsDetailPage,
    name: "home.header.navigation.sub_news._detail",
    isDetail: true,
  },
  {
    path: `${paths.cadres.prefix}/${paths.cadres.detail}`,
    element: CadresDetailPage,
    name: "home.header.navigation.sub_news._detail",
    isDetail: true,
  },
  {
    path: `${paths.notice.prefix}/${paths.notice.detail}`,
    element: NewsDetailPage,
    name: "home.header.navigation.sub_news._detail",
    isDetail: true,
  },
  {
    path: `${paths.documents.prefix}/${paths.documents.detail}`,
    element: NewsDetailPage,
    name: "home.header.navigation.sub_news._detail",
    isDetail: true,
  },
  {
    path: `${paths.subject.prefix}/${paths.subject.detail}`,
    element: SubjectDetailPage,
    name: "home.header.navigation.sub_news._detail",
    isDetail: true,
  },
  {
    path: "*",
    element: NotFound,
    name: ""
  }
]