import { ICAbout } from "@assets/icons/AdminNavigation/ICAbout";
import { ICAccount } from "@assets/icons/AdminNavigation/ICAccount";
import { ICCadres } from "@assets/icons/AdminNavigation/ICCadres";
import { ICFile } from "@assets/icons/AdminNavigation/ICFile";
import { ICHome } from "@assets/icons/AdminNavigation/ICHome";
import { ICLibraryImage } from "@assets/icons/AdminNavigation/ICLibraryImage";
import { ICLibraryVideo } from "@assets/icons/AdminNavigation/ICLibraryVideo";
import { ICLogin } from "@assets/icons/AdminNavigation/ICLogin";
import { ICNews } from "@assets/icons/AdminNavigation/ICNews";
import { ICNotice } from "@assets/icons/AdminNavigation/ICNotice";
import { ICPassword } from "@assets/icons/AdminNavigation/ICPassword";
import { ICSubject } from "@assets/icons/AdminNavigation/ICSubject";
import { ICUser } from "@assets/icons/AdminNavigation/ICUser";
import { Brand } from "@features/dashboard/about/brand";
import { Brochure } from "@features/dashboard/about/brochure";
import { Categories } from "@features/dashboard/about/categories";
import { General } from "@features/dashboard/about/general";
import { Structure } from "@features/dashboard/about/structure";
import { Account } from "@features/dashboard/accounts";
import { Home } from "@features/dashboard/home";
import { Login } from "@features/dashboard/login";
import { ManageCadres } from "@features/dashboard/manageCadres";
import { ManageLibraryImage } from "@features/dashboard/manageLibraryImage";
import ManageAlbumDetail from "@features/dashboard/manageLibraryImage/manageAlbumDetail";
import { News } from "@features/dashboard/news";
import { Outlet } from "react-router-dom";

const DemoElement = () => {
    return <p className="text-_32 text-[red] text-center">Trang này chưa code nhé!</p>
}

const EmptyElement = () => {
    return <Outlet />
}

export type IRouterAmin = {
 
        path: string;
        name: string;
        element: any;
        icon?: any;
        isHidden?: boolean;
        subNavs?: {
            path: string,
            name: string,
            element: any,
        }[]
}

export const pathsAdmin = {
    account: {
        prefix: "tai-khoan"
    },
    login: {
        prefix: "dang-nhap"
    },
    banner: {
        prefix: "banner"
    },
    home:{
        prefix: "trang-chu"
    },
    about: {
        prefix: "gioi-thieu",
        general: "",
        brand: "thuong-hieu",
        structure: "co-cau-to-chuc-nhan-su",
        brochure: "brochure",
        category: "danh-muc-bai-viet",
    },
    news:{
        prefix: "tin-tuc"
    },
    notice: {
        prefix: "thong-bao"
    },
    documents: {
        prefix: "tai-lieu-van-ban"
    },
    cadres: {
        prefix: "can-bo"
    },
    subject: {
        prefix: "bo-mon",
    },
    library_image: {
        prefix: "thu-vien-hinh-anh" ,
        detail : "chi-tiet-album"

    },
    video: {
        prefix: "video",
    },
    info_account: {
        prefix: "thong-tin-tai-khoan",
    },
    change_password: {
        prefix: "thay-doi-mat-khau",
    },
    logout: {
        prefix: "dang-xuat",
    },

  };

//   {
//     "admin": {
//         "navigation": {
//             "_account": "계정 관리",
//             "_login": "로그인 페이지 관리",
//             "_banner": "배너 관리",
//             "_home": "홈페이지 관리",
//             "_about": "추천 관리",
//             "_news": "뉴스 관리",
//             "_notice": "알림 관리",
//             "_file": "문서 관리 - 텍스트",
//             "_cadres": "직원 관리",
//             "_subject": "과목 관리",
//             "_library_image": "이미지 라이브러리 관리",
//             "_library_video": "비디오 라이브러리 관리",
//             "_user": "계정 정보",
//             "_password": "비밀번호 변경",
//             "_logout": "로그아웃"
//         }
//     }
// }
  

export const rootRouterAdmin = [
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
  // {
  //     path: pathsAdmin.banner,
  //     name: "admin.navigation._banner",
  //     element: DemoElement,
  // },
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
    path: pathsAdmin.notice.prefix,
    name: "admin.navigation._notice",
    element: DemoElement,
    icon: ICNotice,
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
    element: DemoElement,
    icon: ICSubject,
  },
  {
    path: pathsAdmin.library_image.prefix,
    name: "admin.navigation._library_image",
    element: ManageLibraryImage,
    icon: ICLibraryImage,
  },
  {
    path:
      pathsAdmin.library_image.prefix + "/" + pathsAdmin.library_image.detail,
    name: "admin.navigation._sub_image._detail",
    element: ManageAlbumDetail,
    isHidden: true,
  },
  {
    path: pathsAdmin.info_account.prefix,
    name: "admin.navigation._user",
    element: DemoElement,
    icon: ICUser,
  },
  {
    path: pathsAdmin.change_password.prefix,
    name: "admin.navigation._password",
    element: DemoElement,
    icon: ICPassword,
  },
];