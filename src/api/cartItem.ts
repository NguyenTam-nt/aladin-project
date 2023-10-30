import request from './request';
import {APIs} from './config';
import {IResponseApi} from './types';
import {handleError} from './handleError';
import {IITemCart} from 'src/redux/orderCart/slice';

export interface ICartItem {
  productDetailId: number;
  priceDetail: number;
  promoDetail: number;
  actualPriceDetail: number;
  stockQuantity: number;
  soldQuantity: number;
  addressWarehouse: string;
  imageDetailUrl: string;
  productDetailNameVn: string;
  productDetailNameKr: string;
  choose: boolean;
  quantitySelected: number;
  productId: number;
  attributes: {
    valueVn: string;
    valueKr: string;
    attributeNameVn: string;
    attributeNameKr: string;
  }[];
}

export interface IUpdateCart {
  id: number;
  userId: string;
  productDetailId: number;
  quantitySelected: number;
  choose: boolean;
}

export const getCartItemAPI = async (
  token: string,
): Promise<IResponseApi<IITemCart[]>> => {
  try {
    const result = await request(token).get(`${APIs.CART_ITEM}`);
    const {data} = await result;
    return {
      data: data,
      success: true,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const updateCartItem = async (
  token: string,
  datas: ICartItem[],
): Promise<IResponseApi<ICartItem[]>> => {
  try {
    const result = await request(token).put(`${APIs.CART_ITEM}/update`, datas);
    const {data} = await result;
    console.log('ressssss', data);

    return {
      data: data,
      success: true,
    };
  } catch (error) {
    return handleError(error);
  }
};
