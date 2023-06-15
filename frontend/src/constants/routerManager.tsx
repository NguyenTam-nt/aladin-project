import LinkBannerIcon from "@assets/icons/LinkBannerIcon";
import LinkCategoryIcon from "@assets/icons/LinkCategoryIcon";
import LinkCommentIcon from "@assets/icons/LinkCommentIcon";
import LinkContacIcon from "@assets/icons/LinkContacIcon";
import LinkFootOrder from "@assets/icons/LinkFootOrder";
import LinkHomeIcon from "@assets/icons/LinkHomeIcon";
import LinkNewIcon from "@assets/icons/LinkNewIcon";
import LinkPlaceIcon from "@assets/icons/LinkPlaceIcon";
import LinkPolicyIcon from "@assets/icons/LinkPolicyIcon";
import LinkProductIcon from "@assets/icons/LinkProductIcon";
import LinkStarIcon from "@assets/icons/LinkStarIcon";
import LinkTableIcon from "@assets/icons/LinkTableIcon";
import LinkVoucherIcon from "@assets/icons/LinkVoucherIcon";
import { lazy } from "react";


const HomeAdmin = lazy(() => import("@features/dashboard/home").then(module => ({default: module.HomeAdmin})));
const BannerAdmin = lazy(() => import("@features/dashboard/banners").then(module => ({default: module.BannerAdmin})));

interface routeMntype {
  path: string;
  exact?: boolean;
  name: string;
  element: any;
  icon: any;
}

function ManageHome() {
  return <div>quản lý trang chủ</div>;
}

export const RouterManage: routeMntype[] = [
  {
    path: "/quan-ly",
    exact: true,
    element: HomeAdmin,
    name: "navigation.navleft.home",
    icon: (color: any) => <LinkHomeIcon color={color} />,
  },
  {
    path: "banner",
    element: BannerAdmin,
    name: "navigation.navleft.banner",
    icon: (color: any) => <LinkBannerIcon color={color} />,
  },
  {
    path: "chinh-sach",
    element: ManageHome,
    name: "navigation.navleft.policy",
    icon: (color: any) => <LinkPolicyIcon color={color} />,
  },
  {
    path: "cam-nhan-khach-hang",
    element: ManageHome,
    name: "navigation.navleft.customorReview",
    icon: (color: any) => <LinkStarIcon color={color} />,
  },
  {
    path: "danh-mục",
    element: ManageHome,
    name: "navigation.navleft.category",
    icon: (color: any) => <LinkCategoryIcon color={color} />,
  },
  {
    path: "san-pham",
    element: ManageHome,
    name: "navigation.navleft.product",
    icon: (color: any) => <LinkProductIcon color={color} />,
  },
  {
    path: "binh-luan",
    element: ManageHome,
    name: "navigation.navleft.comments",
    icon: (color: any) => <LinkCommentIcon color={color} />,
  },
  {
    path: "co-so",
    element: ManageHome,
    name: "navigation.navleft.place",
    icon: (color: any) => <LinkPlaceIcon color={color} />,
  },
  {
    path: "tin-tuc",
    element: ManageHome,
    name: "navigation.navleft.news",
    icon: (color: any) => <LinkNewIcon color={color} />,
  },
  {
    path: "tuyen-dung",
    element: ManageHome,
    name: "navigation.navleft.recuire",
    icon: (color: any) => <LinkNewIcon color={color} />,
  },
  {
    path: "lien-he",
    element: ManageHome,
    name: "navigation.navleft.contact",
    icon: (color: any) => <LinkContacIcon color={color} />,
  },
  {
    path: "yeu-cau-dat-ban",
    element: ManageHome,
    name: "navigation.navleft.tableReserVataion",
    icon: (color: any) => <LinkTableIcon color={color} />,
  },
  {
    path: "don-dat-mon",
    element: ManageHome,
    name: "navigation.navleft.foodOders",
    icon: (color: any) => <LinkFootOrder color={color} />,
  },
  {
    path: "voucher",
    element: ManageHome,
    name: "navigation.navleft.voucher",
    icon: (color: any) => <LinkVoucherIcon color={color} />,
  },
];
