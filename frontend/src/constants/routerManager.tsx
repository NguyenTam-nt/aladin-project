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
const PolicyAdmin = lazy(() => import("@features/dashboard/Policy").then(module => ({default: module.Policy})));
const PolicyHandleAdmin = lazy(() => import("@features/dashboard/Policy/components/PolicyHandle").then(module => ({default: module.PolicyHandle})));

interface routeMntype {
  path: string;
  exact?: boolean;
  name?: string;
  element: any;
  icon?: any;
  isHidden?: boolean;
}

function ManageHome() {
  return <div>quản lý trang chủ</div>;
}

export const pathsAdmin = {
  home: {
    prefix:  "trang-chu"
  },
  banner: {
    prefix:  "banner"
  },
  policy: {
    prefix: "chinh-sach",
    add: "them",
    update: "sua/:id"
  }

}

export const RouterManage: routeMntype[] = [
  {
    path: pathsAdmin.home.prefix,
    element: HomeAdmin,
    name: "navigation.navleft.home",
    icon: LinkHomeIcon,
  },
  {
    path: pathsAdmin.banner.prefix,
    element: BannerAdmin,
    name: "navigation.navleft.banner",
    icon: LinkBannerIcon,
  },
  {
    path: pathsAdmin.policy.prefix,
    element: PolicyAdmin,
    name: "navigation.navleft.policy",
    icon: LinkPolicyIcon,
  },
  {
    path: `${pathsAdmin.policy.prefix}/${pathsAdmin.policy.add}`,
    element: PolicyHandleAdmin,
    isHidden: true,
  },
  {
    path: `${pathsAdmin.policy.prefix}/${pathsAdmin.policy.update}`,
    element: PolicyHandleAdmin,
    isHidden: true,
  },
  {
    path: "cam-nhan-khach-hang",
    element: ManageHome,
    name: "navigation.navleft.customorReview",
    icon: LinkStarIcon,
  },
  {
    path: "danh-muc",
    element: ManageHome,
    name: "navigation.navleft.category",
    icon: LinkCategoryIcon,
  },
  {
    path: "san-pham",
    element: ManageHome,
    name: "navigation.navleft.product",
    icon: LinkProductIcon,
  },
  {
    path: "binh-luan",
    element: ManageHome,
    name: "navigation.navleft.comments",
    icon: LinkCommentIcon,
  },
  {
    path: "co-so",
    element: ManageHome,
    name: "navigation.navleft.place",
    icon: LinkPlaceIcon,
  },
  {
    path: "tin-tuc",
    element: ManageHome,
    name: "navigation.navleft.news",
    icon: LinkNewIcon,
  },
  {
    path: "tuyen-dung",
    element: ManageHome,
    name: "navigation.navleft.recuire",
    icon: LinkNewIcon,
  },
  {
    path: "lien-he",
    element: ManageHome,
    name: "navigation.navleft.contact",
    icon: LinkContacIcon,
  },
  {
    path: "yeu-cau-dat-ban",
    element: ManageHome,
    name: "navigation.navleft.tableReserVataion",
    icon: LinkTableIcon,
  },
  {
    path: "don-dat-mon",
    element: ManageHome,
    name: "navigation.navleft.foodOders",
    icon: LinkFootOrder,
  },
  {
    path: "voucher",
    element: ManageHome,
    name: "navigation.navleft.voucher",
    icon: LinkVoucherIcon
  },
];
