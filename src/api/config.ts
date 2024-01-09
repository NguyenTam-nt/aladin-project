export const APP_BASE_URL = 'https://giangmyhotpot.vn';
export const APP_BASE_URL2 = 'http://101.99.6.31:3304';
export const SOCK_CLIENT_URL = 'https://giangmyhotpot.vn/websocket/tracker';
export const SOCK_CLIENT_URL2 = 'http://101.99.6.31:3303/websocket/tracker';
export const OTPCodeValue = '123456';
export const baseUrl = APP_BASE_URL;

export type IData<T> =
   {
      success: boolean
      data: T
    }

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
};

export const getMicroService = (api: string, service = microServices.home) => {
  return `/services/${service}/api/${api}`;
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
  USER: getMicroService('user', microServices.account),
  FLOOR: getMicroService('areas', microServices.restaurant),
  TABLE: getMicroService('table', microServices.restaurant),
  CATEGORIES: getMicroService('categories/select', microServices.restaurant),
  PRODUCTS: getMicroService('products', microServices.restaurant),
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
  ORDER_KITCHEN_NEW: getMicroServiceAdmin(
    'provisional/kitchen-new',
    microServices.restaurant,
  ),
  DELETE_BILL: getMicroServiceAdmin(
    'provisional/order/invoice',
    microServices.restaurant,
  ),
  REPORT_ALL: getMicroServiceAdmin('report/all-foods', microServices.restaurant),
  REPORT_DIST: getMicroServiceAdmin('report/dist', microServices.restaurant),
  COMPLETE_BILL: getMicroServiceAdmin(
    'provisional/order/complete',
    microServices.restaurant,
  ),
  // ORDER_KITCHEN_UPDATE_STATUS: getMicroServiceAdmin('provisional/kitchen', microServices.restaurant)
};
