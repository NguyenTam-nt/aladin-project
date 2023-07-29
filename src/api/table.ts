import { APIs, IData } from './config';
import { handleError } from './handleError';
import request from './request';

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


export const getFloor = async (): Promise<IData<AreaInfo[]>> => {
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



export const getTable = async (areaId : number , stateCheckbox : string[]): Promise<IData<IFloorInfo[]>> => {
  try {
    const result = await request().get(`${APIs.TABLE}/${areaId}${stateCheckbox.length > 0 ? `?state=${stateCheckbox.join('&state=')}` : ''}`);
    const {data} = await result;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};


export const getTableID = async (id : number): Promise<IData<IFloorInfo[]>> => {
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





