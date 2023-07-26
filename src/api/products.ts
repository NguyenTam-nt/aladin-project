import request from './request';
import { APIs, IData } from './config';
import { handleError } from './handleError';
import { IUserInfo } from 'src/redux/reducers/AuthSlice';

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
  }

export   interface IMenuData {
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

