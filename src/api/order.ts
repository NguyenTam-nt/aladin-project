import {APIs} from './config';
import {handleError} from './handleError';
import request from './request';
import {IResponseApi} from './types';

export interface IProductOrder {
  id?: number;
  orderId?: number;
  productNameVn: 'string';
  productNameKr: 'string';
  productDetailId: number;
  quantityOder: number;
  actualPrice: number;
  price: number;
  addressWarehouse: 'string';
  image: 'string';
}

export interface IOrder {
  id: number;
  fullName: string;
  email: string;
  address: string;
  note: string;
  paymentType: string;
  totalPrice: 0;
  voucherPrice: 0;
  totalPriceActual: 0;
  productOrders: IProductOrder[];
  status: string;
  orderTime: string;
  voucherCode: string;
  orderCode: string;
  phoneNumber: string;
  userId: string;
  softStatus: 0;
}

export const craeteOrderApi = async (
  datas: any,
): Promise<IResponseApi<IOrder>> => {
  try {
    const result = await request().post(`${APIs.ORDER}`, datas);
    const {data} = await result;
    return {
      data: data,
      success: true,
    };
  } catch (e) {
    return handleError(e);
  }
};
