import BannerIcon from "@assets/iconElements/BannerIcon";
import { ROUTES } from "./constants";
import PolicyIcon from "@assets/iconElements/PolicyIcon";
import IntroduceIcon from "@assets/iconElements/IntroduceIcon";
import AdviseIcon from "@assets/iconElements/AdviseIcon";
import ProductIcon from "@assets/iconElements/ProductIcon";
import VoucherIcon from "@assets/iconElements/VoucherIcon";
import CategoryIcon from "@assets/iconElements/CategoryIcon";
import OrderIcon from "@assets/iconElements/OrderIcon";

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
    icon: PolicyIcon,
  },
  {
    path: ROUTES.admin.introduce.index,
    name: "router.introduce",
    icon: IntroduceIcon,
  },
  {
    path: ROUTES.admin.advice.index,
    name: "router.request",
    icon: AdviseIcon,
  },
  {
    path: ROUTES.admin.cartegory.index,
    name: "router.category",
    icon: CategoryIcon,
  },
  {
    path: ROUTES.admin.products.index,
    name: "router.products",
    icon: ProductIcon,
  },
  {
    path: ROUTES.admin.voucher.index,
    name: "router.voucher",
    icon: VoucherIcon,
  },
  {
    path: ROUTES.admin.order.index,
    name: "router.order",
    icon: OrderIcon,
  },
];
