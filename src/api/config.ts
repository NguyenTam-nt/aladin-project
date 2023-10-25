// export const APP_BASE_URL = 'https://giangmyhotpot.vn';
// export const APP_BASE_URL2 = 'http://192.168.1.24:8090';
export const APP_BASE_URL = 'http://192.168.1.16:9800';
export const APP_BASE_URL2 = 'http://192.168.1.16:9800';
export const baseUrl = APP_BASE_URL;
export const SOCK_CLIENNT_URL = 'https://giangmyhotpot.vn/websocket/tracker';
export const OTPCodeValue = '123456';

export type IData<T> = {
  success: boolean;
  data: T;
};

export const microServices = {
  home: 'home', // trang chủ
  account: 'account', // user
  background: 'background', // banner
  feel: 'feel', // cảm nhận khách hàng
  infor: 'information', // news
  media: 'media', // file
  feedback: 'feedback', // contact
  restaurant: 'restaurant', // restaurant
  recruit: 'recruitment', // tuyển dụng
  about: 'introduction',
  product: 'products',
  categories: 'categories',
  contact: 'contact',
  voucher: 'voucher',
  banner: 'banner',
  user: 'user',
  order: 'order',
};

export const getMicroService = (api: string, service = microServices.user) => {
  return `/api/${service}/${api}`;
};

export const getMicroServicePlustMark = (service = microServices.home) => {
  return `/api/${service}`;
};

export const getMicroServiceProductOutStandingPlustMark = (
  api: string,
  service = microServices.product,
) => {
  return `/api/${service}/${api}`;
};

export const getMicroServiceProductPlustMark = (
  service = microServices.product,
) => {
  return `/api/${service}`;
};

export const getMicroServiceContactPlustMark = (
  service = microServices.contact,
) => {
  return `/api/${service}`;
};
export const getMicroServiceCategoriesPlustMark = (
  service = microServices.categories,
) => {
  return `/api/${service}`;
};

export const getMicroServiceVoucher = (
  api: string,
  service = microServices.voucher,
) => {
  return `/api/${service}/${api}`;
};

export const getMicroServiceBanner = (
  api: string,
  service = microServices.banner,
) => {
  return `/api/${service}/${api}`;
};
export const getMicroServiceAdmin = (
  api: string,
  service = microServices.home,
) => {
  return `/services/${service}/api/admin/${api}`;
};

export const getMicroServiceSearchAdmin = (
  api: string,
  service = microServices.home,
) => {
  return `/services/${service}/api/admin/_search/${api}`;
};

export const getMicroSearchService = (
  api: string,
  service = microServices.home,
) => {
  return `/services/${service}/api/_search/${api}`;
};

export const timeout = 30000;

export const APIs = {
  ABOUT: getMicroServicePlustMark(microServices.about),
  PRODUCT_OUT_STANDING: getMicroServiceProductOutStandingPlustMark('featured'),
  PRODUCTS: getMicroServiceProductPlustMark(),
  CATEGORIES: getMicroServiceCategoriesPlustMark(),
  CATEGORIES_SUB: getMicroServiceCategoriesPlustMark(),
  CONTACT: getMicroServiceContactPlustMark(),
  VOUCHER_APPLY: getMicroServiceVoucher('order'),
  GET_BANNER_BY_NAME: getMicroServiceBanner('name'),
  USER: getMicroService('account-info', microServices.user),
  UPDATE_USER: getMicroServicePlustMark(microServices.user),
  ORDER: getMicroServicePlustMark(microServices.order),
  FLOOR: getMicroService('areas', microServices.restaurant),
  TABLE: getMicroService('table', microServices.restaurant),
  // CATEGORIES: getMicroService('categories/select', microServices.restaurant),
  // PRODUCTS: getMicroService('products', microServices.restaurant),
  TABLEID: getMicroServiceAdmin('provisional/order', microServices.restaurant),
  HISTORY: getMicroServiceAdmin('histories', microServices.restaurant),
  PRODUCTS_KITCHEN: getMicroServiceAdmin(
    'products/detail',
    microServices.restaurant,
  ),
  PRODUCTS_ADMIN: getMicroServiceAdmin(
    'products/infrastructure',
    microServices.restaurant,
  ),
  UPDATE_INVENTORY: getMicroServiceAdmin(
    'products/detail/inventory',
    microServices.restaurant,
  ),
  UPDATE_SHOW: getMicroServiceAdmin(
    'products/detail/show',
    microServices.restaurant,
  ),
  CANCEL_ITEM: getMicroServiceAdmin(
    'provisional/order/cancel',
    microServices.restaurant,
  ),
  TABLE_COMBINE: getMicroService('table/combine', microServices.restaurant),
  TABLE_DETACHED: getMicroService('table/detached', microServices.restaurant),
  COMBINE_PRODUCTS: getMicroServiceAdmin(
    'provisional/staff/combine',
    microServices.restaurant,
  ),
  DETACHED_PRODUCTS: getMicroServiceAdmin(
    'provisional/staff/detached',
    microServices.restaurant,
  ),
  ORDER_KITCHEN: getMicroServiceAdmin(
    'provisional/kitchen',
    microServices.restaurant,
  ),
  DELETE_BILL: getMicroServiceAdmin(
    'provisional/order/invoice',
    microServices.restaurant,
  ),
  REPORT_ALL: getMicroServiceAdmin('report/all', microServices.restaurant),
  REPORT_DIST: getMicroServiceAdmin('report/dist', microServices.restaurant),
  COMPLETE_BILL: getMicroServiceAdmin(
    'provisional/order/complete',
    microServices.restaurant,
  ),
  // ORDER_KITCHEN_UPDATE_STATUS: getMicroServiceAdmin('provisional/kitchen', microServices.restaurant)
};
