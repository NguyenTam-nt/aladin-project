import request from './request';
import {APIs, IData} from './config';
import {handleError} from './handleError';

export interface IChildCategory {
  id: number
  idParent: number
  isHome: boolean
  isMenu: string
  linkMedia: string | null
  name: string
  type: string
}


export interface ICategory {
  id: number
  name: string
  isHome: boolean
  isMenu: 'KITCHEN' | 'BAR' // Chỉ cho phép giá trị "KITCHEN" hoặc "BAR"
  type: 'PARENT' | 'CHILD' // Chỉ cho phép giá trị "PARENT" hoặc "CHILD"
  idParent: number
  listCategoryChild: IChildCategory[] // Mảng các MenuItem, có thể trống nếu không có submenu
}

export const getCategories = async (): Promise<IData<ICategory[]>> => {
  try {
    const result = await request().get(`${APIs.CATEGORIES}`);
    const {data} = await result;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e) as IData<ICategory[]>;
  }
};
