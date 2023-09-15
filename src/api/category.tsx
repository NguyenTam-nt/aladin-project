import {APIs, IData} from './config';
import request from './request';
import {IResponseApi, Image} from './types';
import {handleError} from './handleError';

export interface IImagesCategory {
  id?: number;
  url: string;
  categoryId: number;
}

export interface IImagesSubcategory {
  id: number;
  url: string;
  subCategoryId: number;
}

export interface ISubCategoryList {
  id: number;
  subCategoryNameVn: string;
  subCategoryNameKr: string;
  noteSubVn: string;
  noteSubKr: string;
  categoryId: number;
  imagesSubcategory: IImagesSubcategory[];
}
export interface ICategory {
  id: number;
  categoryNameVn: string;
  categoryNameKr: string;
  subCategoryList: ISubCategoryList[];
  imagesCategory: IImagesCategory[];
}
export const getCategoriesApi = async (): Promise<IResponseApi<ICategory[]>> => {
  try {
    const result = await request().get(`${APIs.CATEGORIES}`);
    const data = await result.data;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};
