export const APP_BASE_URL = 'https://marketmoa.com.vn';
export const APP_BASE_URL2 = 'http://101.99.6.31:19800';
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
};
