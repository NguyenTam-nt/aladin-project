import { APIs, IData } from './config';
import { handleError } from './handleError';
import { IBodyPostProduct, IProductInCart, IResponseProductUpdate } from './products';
import request from './request';
import { IResponseApi } from './types';

export interface IFLoor {
  id: number
  name: string
  description: string
  ndinnerTable: number
  nseat: number
}

interface Infrastructure {
  id: number
  name: string
  address: string
}

export interface AreaInfo {
  infrastructure: Infrastructure
  area: IFLoor[]
}


export const getFloor = async (): Promise<IResponseApi<AreaInfo[]>> => {
  try {
    const result = await request().get(`${APIs.FLOOR}`);
    const {data} = await result;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};

export interface ITable {
  id: number
  name: string
  description: string | null
  state: string
  nseat: number
}

// Định nghĩa kiểu cho đối tượng "area"
export interface IFloorInfo {
  nameArea: string
  tables: ITable[]
}



export const getTable = async (
  areaId: number,
  stateCheckbox: string[],
): Promise<IResponseApi<IFloorInfo[]>> => {
  try {
    const result = await request().get(
      `${APIs.TABLE}/${areaId}${
        stateCheckbox.length > 0
          ? `?state=${stateCheckbox.join('&state=')}`
          : ''
      }`,
    );
    const {data} = await result;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};


export const getTableID = async (id : number): Promise<IResponseApi<IFloorInfo[]>> => {
  try {
    const result = await request().patch(`${APIs.TABLEID}?idTable=${id}`);


    const {data} = await result;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};

export const getTableCombine = async (
  id: number,
): Promise<IResponseApi<(IFloorInfo & {id: number})[]>> => {
  try {
    const result = await request().get(`${APIs.TABLE_COMBINE}/${id}`);
    const {data} = await result;

    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};


export const getTableDetached = async (
  id: number,
): Promise<IResponseApi<(IFloorInfo & {id: number})[]>> => {
  try {
    const result = await request().get(`${APIs.TABLE_DETACHED}/${id}`);
    const {data} = await result;

    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};



export const postCombineProduct = async (
  id: number,
  idTable: number,
  body: IBodyPostProduct[],
): Promise<IResponseApi<IResponseProductUpdate>> => {
  try {

    console.log('check ' , body);

    const result = await request().patch(
      `${APIs.COMBINE_PRODUCTS}/${id}/${idTable}`,
      body,
    );

    const {data} = await result;

    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};

export const postDetechedProduct = async (
  id: number,
  idTable : number ,
  body :  IBodyPostProduct[]
): Promise<IResponseApi<IResponseProductUpdate>> => {
  try {


    const result = await request().patch(`${APIs.DETACHED_PRODUCTS}/${id}/${idTable}` ,body );

    console.log('result' ,result);

    const {data} = await result;

    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};













