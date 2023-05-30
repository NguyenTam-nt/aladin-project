import { ICAbout } from "@assets/icons/AdminNavigation/ICAbout";
import { ICAccount } from "@assets/icons/AdminNavigation/ICAccount";
import { ICBanner } from "@assets/icons/AdminNavigation/ICBanner";
import { ICCadres } from "@assets/icons/AdminNavigation/ICCadres";
import { ICFile } from "@assets/icons/AdminNavigation/ICFile";
import { ICHome } from "@assets/icons/AdminNavigation/ICHome";
import { ICLibraryImage } from "@assets/icons/AdminNavigation/ICLibraryImage";
import { ICLibraryVideo } from "@assets/icons/AdminNavigation/ICLibraryVideo";
import { ICLogin } from "@assets/icons/AdminNavigation/ICLogin";
import { ICNews } from "@assets/icons/AdminNavigation/ICNews";
import { ICPassword } from "@assets/icons/AdminNavigation/ICPassword";
import { ICSubject } from "@assets/icons/AdminNavigation/ICSubject";
import { ICUser } from "@assets/icons/AdminNavigation/ICUser";
import { ICFooter } from "@assets/icons/ICFooter";
import { ICHeader } from "@assets/icons/ICHeader";
import { lazy } from "react";
import { Outlet } from "react-router-dom";


const Header = lazy(() => import("@features/dashboard/header").then(module => ({default: module.Header})))
const HandleNotice = lazy(() => import("@features/dashboard/Notice/components/Category/HandleNotice").then(module => ({default: module.HandleNotice})))
const Home = lazy(() => import("@features/dashboard/home").then(module => ({default: module.Home})))
const Brand = lazy(() => import("@features/dashboard/about/brand").then(module => ({default: module.Brand})))
const Brochure = lazy(() => import("@features/dashboard/about/brochure").then(module => ({default: module.Brochure})))
const Categories = lazy(() => import("@features/dashboard/about/general").then(module => ({default: module.General})))
const General = lazy(() => import("@features/dashboard/about/categories").then(module => ({default: module.Categories})))
const Structure = lazy(() => import("@features/dashboard/about/structure").then(module => ({default: module.Structure})))
const Account = lazy(() => import("@features/dashboard/accounts").then(module => ({default: module.Account})))
const Banner = lazy(() => import("@features/dashboard/banner").then(module => ({default: module.Banner})))
const Footer = lazy(() => import("@features/dashboard/components/footer").then(module => ({default: module.Footer})))
const InfoAccount = lazy(() => import("@features/dashboard/infoAccount").then(module => ({default: module.InfoAccount})))
const EditInfoAccount = lazy(() => import("@features/dashboard/infoAccount/EditInfoAccount").then(module => ({default: module.EditInfoAccount})))
const Login = lazy(() => import("@features/dashboard/login").then(module => ({default: module.Login})))
const ManageCadres = lazy(() => import("@features/dashboard/manageCadres").then(module => ({default: module.ManageCadres})))
const CreateCadres = lazy(() => import("@features/dashboard/manageCadres/CreateCadres").then(module => ({default: module.CreateCadres})))
const ManageLibraryImage = lazy(() => import("@features/dashboard/manageLibraryImage").then(module => ({default: module.ManageLibraryImage})))
const ManageAlbumDetail = lazy(() => import("@features/dashboard/manageLibraryImage/manageAlbumDetail"))
const ManageLibraryVideo = lazy(() => import("@features/dashboard/manageLibraryVideo").then(module => ({default: module.ManageLibraryVideo})))
const CreateSubject = lazy(() => import("@features/dashboard/manageSubject/CreateSubject").then(module => ({default: module.CreateSubject})))
const News = lazy(() => import("@features/dashboard/news").then(module => ({default: module.News})))
const CategoryNews = lazy(() => import("@features/dashboard/news/components/Category").then(module => ({default: module.CategoryNews})))
const HandleNews = lazy(() => import("@features/dashboard/news/components/Category/HandleNews").then(module => ({default: module.HandleNews})))
const EditPassword = lazy(() => import("@features/dashboard/password").then(module => ({default: module.EditPassword})))
const ManageSubject = lazy(() => import("@features/dashboard/manageSubject").then(module => ({default: module.ManageSubject})))

const DemoElement = () => {
  return (
    <p className="text-_32 text-[red] text-center">Trang này chưa code nhé!</p>
  );
};

const EmptyElement = () => {
  return <Outlet />;
};

export type IRouterAmin = {
  path: string;
  name?: string;
  element: any;
  icon?: any;
  isHidden?: boolean;
  subNavs?: {
    path: string;
    name: string;
    element: any;
  }[];
};

export const pathsAdmin = {
  header: {
    prefix: "header",
  },
  footer: {
    prefix: "footer",
  },
  account: {
    prefix: "tai-khoan",
  },
  login: {
    prefix: "dang-nhap",
  },
  banner: {
    prefix: "banner",
  },
  home: {
    prefix: "trang-chu",
  },
  about: {
    prefix: "gioi-thieu",
    general: "",
    brand: "thuong-hieu",
    structure: "co-cau-to-chuc-nhan-su",
    brochure: "brochure",
    category: "danh-muc-bai-viet",
  },
  news: {
    prefix: "tin-tuc",
  },
  news_category: {
    prefix: "danh-muc",
  },
  news_handle: {
    prefix: ":type",
  },
  notice: {
    prefix: "thong-bao",
  },
  documents: {
    prefix: "tai-lieu-van-ban",
  },
  cadres: {
    prefix: "can-bo",
    create_cadres : "them-can-bo"

  },
  subject: {
    prefix: "bo-mon",
    create_subject : "them-bo-mon"
  },
  library_image: {
    prefix: "thu-vien-hinh-anh",
    detail: "chi-tiet-album",
  },
  library_video: {
    prefix: "thu-vien-video",
  },
  info_account: {
    prefix: "thong-tin-tai-khoan",
    edit : "chinh-sua-thong-tin"
  },
  change_password: {
    prefix: "thay-doi-mat-khau",
  },
  logout: {
    prefix: "dang-xuat",
  },
};

export const rootRouterAdmin = [
  {
    path: pathsAdmin.header.prefix,
    name: "admin.navigation._header",
    element: Header,
    icon: ICHeader,
  },
  {
    path: pathsAdmin.account.prefix,
    name: "admin.navigation._account",
    element: Account,
    icon: ICAccount,
  },
  {
    path: pathsAdmin.login.prefix,
    name: "admin.navigation._login",
    element: Login,
    icon: ICLogin,
  },
  {
      path: pathsAdmin.banner.prefix,
      name: "admin.navigation._banner",
      icon: ICBanner,
      element: Banner,
  },
  {
    path: pathsAdmin.home.prefix,
    name: "admin.navigation._home",
    element: Home,
    icon: ICHome,
  },
  // {
  //     path: pathsAdmin.about.prefix,
  //     name: "admin.navigation._about",
  //     element: DemoElement,
  //     icon: ICAbout
  // },
  {
    path: pathsAdmin.about.prefix,
    name: "admin.navigation._about",
    element: EmptyElement,
    icon: ICAbout,
    subNavs: [
      {
        path: pathsAdmin.about.general,
        name: "admin.navigation._sub_abouts._general",
        element: General,
      },
      {
        path: pathsAdmin.about.brand,
        name: "admin.navigation._sub_abouts._brand",
        element: Brand,
      },
      {
        path: pathsAdmin.about.structure,
        name: "admin.navigation._sub_abouts._structure",
        element: Structure,
      },
      {
        path: pathsAdmin.about.brochure,
        name: "admin.navigation._sub_abouts._brochure",
        element: Brochure,
      },
      {
        path: pathsAdmin.about.category,
        name: "admin.navigation._sub_abouts._category",
        element: Categories,
      },
    ],
  },
  {
    path: pathsAdmin.news.prefix,
    name: "admin.navigation._news",
    icon: ICNews,
    element: News,
  },
  {
    path: `${pathsAdmin.news.prefix}/${pathsAdmin.news_category.prefix}`,
    element: CategoryNews,
    isHidden: true,
  },
  {
    path: `${pathsAdmin.news.prefix}/${pathsAdmin.news_handle.prefix}`,
    element: HandleNews,
    isHidden: true,
  },
  // {
  //   path: pathsAdmin.notice.prefix,
  //   name: "admin.navigation._notice",
  //   element: Notice,
  //   icon: ICNotice,
  // },
  {
    path: `${pathsAdmin.notice.prefix}/${pathsAdmin.news_handle.prefix}`,
    element: HandleNotice,
    isHidden: true,
  },
  {
    path: pathsAdmin.documents.prefix,
    name: "admin.navigation._file",
    element: DemoElement,
    icon: ICFile,
  },
  {
    path: pathsAdmin.cadres.prefix,
    name: "admin.navigation._cadres",
    element: ManageCadres,
    icon: ICCadres,
  },
  {
    path: pathsAdmin.subject.prefix,
    name: "admin.navigation._subject",
    element: ManageSubject,
    icon: ICSubject,
  },
  {
    path: pathsAdmin.library_image.prefix,
    name: "admin.navigation._library_image",
    element: ManageLibraryImage,
    icon: ICLibraryImage,
  },
  {
    path: pathsAdmin.library_video.prefix,
    name: "admin.navigation._library_video",
    element: ManageLibraryVideo,
    icon: ICLibraryVideo,
  },
  {
    path: pathsAdmin.cadres.prefix + "/" + pathsAdmin.cadres.create_cadres,
    name: "admin.navigation.cadres._sub_cadres.create_cadres",
    element: CreateCadres,
    isHidden: true,
  },
  {
    path: pathsAdmin.subject.prefix + "/" + pathsAdmin.subject.create_subject,
    name: "admin.navigation.cadres._sub_cadres.create_cadres",
    element: CreateSubject,
    isHidden: true,
  },
  {
    path:
      pathsAdmin.library_image.prefix + "/" + pathsAdmin.library_image.detail,
    name: "admin.navigation._sub_image._detail",
    element: ManageAlbumDetail,
    isHidden: true,
  },
  {
    path:
      pathsAdmin.info_account.prefix + "/" + pathsAdmin.info_account.edit,
    name: "admin.navigation._user._edit_user",
    element: EditInfoAccount,
    isHidden: true,
  },
  {
    path: pathsAdmin.info_account.prefix,
    name: "admin.navigation._user",
    element: InfoAccount,
    icon: ICUser,
  },
  {
    path: pathsAdmin.change_password.prefix,
    name: "admin.navigation._password",
    element: EditPassword,
    icon: ICPassword,
  },
  {
    path: pathsAdmin.footer.prefix,
    name: "admin.navigation._footer",
    element: Footer,
    icon: ICFooter,
  },
];
