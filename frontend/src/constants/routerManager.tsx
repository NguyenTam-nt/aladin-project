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

const HomeAdmin = lazy(() =>
  import("@features/dashboard/home").then((module) => ({
    default: module.HomeAdmin,
  }))
);
const BannerAdmin = lazy(() =>
  import("@features/dashboard/banners").then((module) => ({
    default: module.BannerAdmin,
  }))
);
const PolicyAdmin = lazy(() =>
  import("@features/dashboard/Policy").then((module) => ({
    default: module.Policy,
  }))
);
const PolicyHandleAdmin = lazy(() =>
  import("@features/dashboard/Policy/components/PolicyHandle").then(
    (module) => ({ default: module.PolicyHandle })
  )
);
const ThanksCustomer = lazy(() =>
  import("@features/dashboard/thanks-customer").then((module) => ({
    default: module.ThanksCustomer,
  }))
);
const ThanksCustomerHandler = lazy(() =>
  import(
    "@features/dashboard/thanks-customer/components/ThanksCustomerHandler"
  ).then((module) => ({ default: module.ThanksCustomerHandler }))
);
const CategoryProduct = lazy(() =>
  import("@features/dashboard/category-product").then((module) => ({
    default: module.CategoryProduct,
  }))
);
const ProductAdmin = lazy(() =>
  import("@features/dashboard/product").then((module) => ({
    default: module.ProductAdmin,
  }))
);
const ProductHandler = lazy(() =>
  import("@features/dashboard/product/components/ProductHandler").then(
    (module) => ({ default: module.ProductHandler })
  )
);
const CommentAdmin = lazy(() =>
  import("@features/dashboard/comment").then((module) => ({
    default: module.CommentAdmin,
  }))
);

const PlaceAdmin = lazy(() =>
  import("@features/dashboard/place").then((module) => ({
    default: module.PlaceAdmin,
  }))
);
const PlaceAdminAdd = lazy(
  () => import("@features/dashboard/place/PlaceAdminAdd")
);

const ContactAdmin = lazy(() => import("@features/dashboard/contact"));
const VoucherAdmin = lazy(() => import("@features/dashboard/voucher"));
const VoucherAddAdmin = lazy(
  () => import("@features/dashboard/voucher/VoucherAdd")
);
const OrderFoodAdmin = lazy(() => import("@features/dashboard/order-food"));

interface routeMntype {
  path: string;
  exact?: boolean;
  name?: string;
  element: any;
  icon?: any;
  isHidden?: boolean;
}

function ManageHome() {
  return <div className="h-[2000px]">quản lý trang chủ</div>;
}
const ManageNews = lazy(() => import("@features/dashboard/news/index"));
const AddNew = lazy(() => import("@features/dashboard/news/AddNew"));
const EditNew = lazy(() => import("@features/dashboard/news/EditNew"));
const RecuitmentManage = lazy(
  () => import("@features/dashboard/recruit/index")
);
const AddRecruitment = lazy(
  () => import("@features/dashboard/recruit/AddRecruitment")
);
const EditRecruitemt = lazy(
  () => import("@features/dashboard/recruit/EditRecruitemt")
);
const ManageTableReserVation = lazy(
  () => import("@features/dashboard/table-reservation/index")
);

export const pathsAdmin = {
  home: {
    prefix: "trang-chu",
  },
  banner: {
    prefix: "banner",
  },
  place: {
    prefix: "co-so",
    add: "them",
    update: ":id",
  },
  voucher: {
    prefix: "voucher",
    add: "them",
    update: ":id",
  },
  orderFood: {
    prefix: "dat-mon",
  },
  contact: {
    prefix: "lien-he",
  },
  policy: {
    prefix: "chinh-sach",
    add: "them",
    update: ":id",
  },
  thankCustomer: {
    prefix: "cam-nhan-khach-hang",
    add: "them",
    update: ":id",
  },
  category: {
    prefix: "danh-muc",
  },
  product: {
    prefix: "san-pham",
    add: "them",
    update: ":id",
  },
  comment: {
    prefix: "binh-luan",
  },
  news: {
    prefix: "tin-tuc",
    add: "them",
    update: ":id",
  },
  recuire: {
    prefix: "tuyen-dung",
    add: "them",
    update: ":id",
  },
  tableReserVation: {
    prefix: "yeu-cau-dat-ban",
    add: "them",
    update: ":id",
  },
};

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
    path: pathsAdmin.thankCustomer.prefix,
    element: ThanksCustomer,
    name: "navigation.navleft.customorReview",
    icon: LinkStarIcon,
  },
  {
    path: `${pathsAdmin.thankCustomer.prefix}/${pathsAdmin.thankCustomer.add}`,
    element: ThanksCustomerHandler,
    isHidden: true,
  },
  {
    path: `${pathsAdmin.thankCustomer.prefix}/${pathsAdmin.thankCustomer.update}`,
    element: ThanksCustomerHandler,
    isHidden: true,
  },
  {
    path: pathsAdmin.category.prefix,
    element: CategoryProduct,
    name: "navigation.navleft.category",
    icon: LinkCategoryIcon,
  },
  {
    path: pathsAdmin.product.prefix,
    element: ProductAdmin,
    name: "navigation.navleft.product",
    icon: LinkProductIcon,
  },
  {
    path: `${pathsAdmin.product.prefix}/${pathsAdmin.product.add}`,
    element: ProductHandler,
    isHidden: true,
  },
  {
    path: `${pathsAdmin.product.prefix}/${pathsAdmin.product.update}`,
    element: ProductHandler,
    isHidden: true,
  },
  {
    path: pathsAdmin.comment.prefix,
    element: CommentAdmin,
    name: "navigation.navleft.comments",
    icon: LinkCommentIcon,
  },
  {
    path: pathsAdmin.place.prefix,
    element: PlaceAdmin,
    name: "navigation.navleft.place",
    icon: LinkPlaceIcon,
  },
  {
    path: `${pathsAdmin.place.prefix}/${pathsAdmin.place.add}`,
    element: PlaceAdminAdd,
    isHidden: true,
  },
  {
    path: `${pathsAdmin.place.prefix}/${pathsAdmin.place.update}`,
    element: PlaceAdminAdd,
    isHidden: true,
  },
  {
    path: pathsAdmin.news.prefix,
    element: ManageNews,
    name: "navigation.navleft.news",
    icon: LinkNewIcon,
  },
  {
    path: `${pathsAdmin.news.prefix}/${pathsAdmin.news.add}`,
    element: AddNew,
    isHidden: true,
    name: "navigation.navleft.news",
    icon: LinkNewIcon,
  },
  {
    path: `${pathsAdmin.news.prefix}/${pathsAdmin.news.update}`,
    element: EditNew,
    isHidden: true,
    name: "navigation.navleft.news",
    icon: LinkNewIcon,
  },
  {
    path: pathsAdmin.recuire.prefix,
    element: RecuitmentManage,
    name: "navigation.navleft.recuire",
    icon: LinkNewIcon,
  },
  {
    path: `${pathsAdmin.recuire.prefix}/${pathsAdmin.recuire.add}`,
    isHidden: true,
    element: AddRecruitment,
    name: "navigation.navleft.recuire",
    icon: LinkNewIcon,
  },
  {
    path: `${pathsAdmin.recuire.prefix}/${pathsAdmin.recuire.update}`,
    isHidden: true,
    element: EditRecruitemt,
    name: "navigation.navleft.recuire",
    icon: LinkNewIcon,
  },
  {
    path: pathsAdmin.contact.prefix,
    element: ContactAdmin,
    name: "navigation.navleft.contact",
    icon: LinkContacIcon,
  },
  {
    path: pathsAdmin.tableReserVation.prefix,
    element: ManageTableReserVation,
    name: "navigation.navleft.tableReserVataion",
    icon: LinkTableIcon,
  },
  {
    path: pathsAdmin.orderFood.prefix,
    element: OrderFoodAdmin,
    name: "navigation.navleft.foodOders",
    icon: LinkFootOrder,
  },
  {
    path: pathsAdmin.voucher.prefix,
    element: VoucherAdmin,
    name: "navigation.navleft.voucher",
    icon: LinkVoucherIcon,
  },
  {
    path: `${pathsAdmin.voucher.prefix}/${pathsAdmin.voucher.add}`,
    element: VoucherAddAdmin,
    isHidden: true,
  },
  {
    path: `${pathsAdmin.voucher.prefix}/${pathsAdmin.voucher.update}`,
    element: VoucherAddAdmin,
    isHidden: true,
  },
];
