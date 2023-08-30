import BannerIcon from "@assets/iconElements/BannerIcon";
import { ROUTES } from "./constants";

export type routeMntype = {
  path: string;
  exact?: boolean;
  name?: string;
  icon?: any;
  isHidden?: boolean;
};

export const RouterManage: routeMntype[] = [
  {
    path: ROUTES.admin.infomation.index,
    name: "router.banner",
    icon: BannerIcon,
  },
  {
    path: ROUTES.admin.policy.index,
    name: "router.policy",
    icon: BannerIcon,
  },
  {
    path: ROUTES.admin.introduce.index,
    name: "router.introduce",
    icon: BannerIcon,
  },
  {
    path: ROUTES.admin.advice.index,
    name: "router.request",
    icon: BannerIcon,
  },
  {
    path: ROUTES.admin.cartegory.index,
    name: "router.category",
    icon: BannerIcon,
  },
  {
    path: ROUTES.admin.products.index,
    name: "router.products",
    icon: BannerIcon,
  },
  {
    path: ROUTES.admin.voucher.index,
    name: "router.voucher",
    icon: BannerIcon,
  },
  {
    path: ROUTES.admin.order.index,
    name: "router.order",
    icon: BannerIcon,
  },
];
