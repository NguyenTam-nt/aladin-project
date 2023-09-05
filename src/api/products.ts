
import { IResponseApi } from './types';
import {IParams} from '@typeRules';
import {APIs, IData} from './config';
import {handleError} from './handleError';
import request from './request';
import { IOrderItem, IOrderKitchen, OrderType } from 'src/typeRules/product';

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
    status? :string
}

export interface IMenuData {
  totalElement: number
  totalElementPage: number
  list: IMenuItem[]
}

export interface IProductInCart {
  id: number
  idProduct : number
  numProduct: number
  createdDate: string
  nameTable: string
  idInvoice: number
  createdBy: string
  linkMedia: string
  name: string
  price: number
  pricePromotion: number
  state: 'COMPLETE' | 'CANCEL' | 'PROCESSING' | 'PROCESSING_CANCEL' | null
  guide: null
  note?: string
}

export const getProductsApi = async (
  id: number,
  page: number,
  size: number,
): Promise<IResponseApi<IMenuData>> => {
  try {
    const result = await request().get(
      `${APIs.PRODUCTS_ADMIN}?id=${id}&size=${size}&page=${page}`,
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
  name: string
  linkMedia: string
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
): Promise<IResponseApi<IItemProductKitchen>> => {
  try {
    const result = await request().get(`${APIs.PRODUCTS_KITCHEN}`, {
      params: {
        idCategory: id,
        page,
        size,
        menu,
        sort,
        state,
      },
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

export const getSearchProductKitchenApi = async (
  id: number | undefined,
  page: number,
  size: number,
  menu?: string,
  sort?: string,
  state?: string,
  query? : string
): Promise<IResponseApi<IItemProductKitchen>> => {
  try {
    const result = await request().get(`${APIs.PRODUCTS_KITCHEN}/_search`, {
      params: {
        idCategory: id,
        page,
        size,
        menu,
        sort,
        state,
        query,
      },
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


export const getProductByCategory = async (
  params: IParams,
): Promise<IResponseApi<IMenuItem[]>> => {
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

export const getOrerKitchen = async (params: IParams, fileterItem: string):Promise<IResponseApi<IOrderKitchen>> => {
  try {
    const result = await request().get(`${APIs.ORDER_KITCHEN}/${fileterItem}`, {
      params: {...params},
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

export const updateOrerKitchenOnlyState = async (
  state: OrderType,
  idOrder: number,
  id: number,
  reason = '',
): Promise<IResponseApi<IOrderItem[]>> => {
  try {
console.log({
 api: `${
    APIs.ORDER_KITCHEN
  }/${state}/${idOrder}/${id}?answer=${!reason}&reason=${reason}`
})
    const result = await request().patch(
      `${
        APIs.ORDER_KITCHEN
      }/${state}/${idOrder}/${id}?answer=${!reason}&reason=${reason}`,
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

export const updateOrerKitchenAllState = async (
  state: OrderType,
  idOrder: number,
  id: number,
  reason = '',
): Promise<IResponseApi<IOrderKitchen>> => {
  console.log({
    api:  `${
      APIs.ORDER_KITCHEN
    }/all/${state}/${idOrder}/${id}?answer=${!reason}&reason=${reason}`
   })
  try {
    const result = await request().patch(
      `${
        APIs.ORDER_KITCHEN
      }/all/${state}/${idOrder}/${id}?answer=${!reason}&reason=${reason}`,
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


export const UpdateInventoryProduct =  async (
  id: number | undefined,
  inventory : string
): Promise<IResponseApi<IItemProductKitchen>> => {
  try {


    const result = await request().patch(
      `${APIs.UPDATE_INVENTORY}?id=${id}&inventory=${inventory}`,
    );

    const data = await result.data;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};

export const UpdateShowProduct = async (
  id: number | undefined,
): Promise<IResponseApi<IItemProductKitchen>> => {
  try {
    const result = await request().patch(`${APIs.UPDATE_SHOW}?id=${id}`);

    const data = await result.data;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};




export const getProductInCartApi = async (
  id: number | undefined,
): Promise<IResponseApi<IProductInCart>> => {
  try {
    const result = await request().get(`${APIs.TABLEID}/${id}`);

    const data = await result.data;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};


export interface IBodyPostProduct {
  id?: number
  idProduct: number
  numProduct: number
  linkMedia: string
  state:  string | null
}


export const postProductToKitchen = async (
  id: number | undefined,
  body :  IBodyPostProduct[]
): Promise<IResponseApi<IProductInCart>> => {
  try {
    const result = await request().post(`${APIs.TABLEID}/${id}` ,body);
    const data = await result.data;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};

export interface IResponseProductUpdate {
  idInvoice : number
  nameTable : string
  list : IProductInCart[]
}

export const cancelProductItem = async (
  id: number | undefined,
  body: IBodyPostProduct[],
): Promise<IResponseApi<IResponseProductUpdate>> => {
  try {
    const result = await request().patch(`${APIs.CANCEL_ITEM}/${id}`, body);

    const data = await result.data;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};

export const deleteBillApi = async (
  id: number | undefined,
): Promise<IResponseApi<IResponseProductUpdate>> => {
  try {

    const result = await request().delete(`${APIs.DELETE_BILL}/${id}`);
    const data = await result.data;

    return {
      success: true,
      data: data,
    };
  } catch (e) {
    console.log('eeeee', e);

    return handleError(e);
  }
};



