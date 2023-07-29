import { ApiResponse } from './types';

export const APP_BASE_URL = 'https://giangmyhotpot.vn';
export const APP_BASE_URL2 = 'http://192.168.1.24:8090';
export const baseUrl = APP_BASE_URL;

export type IData<T> =
| ApiResponse<any>
| {
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

export const getMicroService = (api:string, service = microServices.home ) => {
  return `/services/${service}/api/${api}`;
};

export const getMicroServiceAdmin = (api:string, service = microServices.home) => {
  return `/services/${service}/api/admin/${api}`;
};

export const getMicroServiceSearchAdmin = (api:string, service = microServices.home) => {
  return `/services/${service}/api/admin/_search/${api}`;
};


export const getMicroSearchService = (api:string, service = microServices.home) => {
  return `/services/${service}/api/_search/${api}`;
};

export const timeout = 30000;

export const APIs = {
  USER: getMicroService('user', microServices.account),
  FLOOR: getMicroService('areas', microServices.restaurant),
  TABLE: getMicroService('table', microServices.restaurant),
  CATEGORIES: getMicroService('categories/select', microServices.restaurant),
  PRODUCTS: getMicroService('products', microServices.restaurant),
  PRODUCTS_ADMIN: getMicroServiceAdmin('products/infrastructure', microServices.restaurant)
};
