import { IParams } from '@typeRules';
import { APIs, IData } from './config';
import { handleError } from './handleError';
import request from './request';

export interface IMenuItem {
  id: number
  code: string
  linkMedia: string
  percent: number
  name: string
  price: number
  pricePromotion: number
  show: boolean
  isStar: boolean
  priority: boolean
  idCategory?: number
}

export interface IMenuData {
  totalElement: number
  totalElementPage: number
  list: IMenuItem[]
}

export const getProductsApi = async (
  id: number,
  page: number,
  size: number,
): Promise<IData<IMenuData>> => {
  try {
    const result = await request().get(
      `${APIs.PRODUCTS}?id=${id}&size=${size}&page=${page}`,
    );
    const data = await result.data.list;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};

export interface IItemProductKitchen {
  id: number
  code: string
  name:  string
  linkMedia:  string
  pricePromotion: number
  inventory: number
  show: boolean
  ncategory: string
  mcategory: string
}



export const getProductKitchenApi = async (
  id: number | undefined,
  page: number,
  size: number,
  menu?: string,
  sort?: string,
  state?: string,
): Promise<IData<IItemProductKitchen>> => {
  try {

    const result = await request().get(
      `${APIs.PRODUCTS_KITCHEN}?idCategory=${
        id || ''
      }&size=${size}&page=${page}&menu=${menu || ''}&state=${
        state || ''
      }&short=${sort || ''}`,
    );
    const data = await result.data.list;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};



export const getProductByCategory = async (
  params: IParams,
): Promise<IData<IMenuItem[]>> => {
  try {
    const result = await request().get(`${APIs.PRODUCTS_ADMIN}`, {
      params: {...params, page: Number(params.page)},
    });
    const data = await result.data.list;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};
