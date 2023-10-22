import { APIs } from './config';
import request from './request';
import { IResponseApi } from './types';
import { handleError } from './handleError';

export interface IImagesCategory {
  id?: number;
  url: string;
  categoryId: number;
}

export interface IImagesSubcategory {
  url: string;
}

export interface ISubCategoryList {
  id: number;
  subCategoryNameVn: string;
  subCategoryNameKr: string;
  noteSubVn: string;
  noteSubKr: string;
  categoryId?: number;
  imagesSubcategory: IImagesSubcategory[];
}
export interface ICategory {
  id: number;
  categoryNameVn: string;
  categoryNameKr: string;
  subCategoryList: ISubCategoryList[];
  imagesCategory: IImagesCategory[];
}

export interface ICaterorySub {
  id: number;
  subCategoryNameVn: string;
  subCategoryNameKr: string;
  noteSubVn: string;
  noteSubKr: string;
  categoryId?: number;
  imagesSubcategory: {
    id: number,
    url: string,
    subCategoryId: number
  }[]
}
export const getCategoriesApi = async (): Promise<
  IResponseApi<ICategory[]>
> => {
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
export const getCategororyByIDApi = async (
  id: number,
): Promise<IResponseApi<ICategory>> => {
  try {
    const result = await request().get(`${APIs.CATEGORIES}/${id}`);
    const data = await result.data;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};

export const getCategoriesBySub = async (): Promise<IResponseApi<ICaterorySub[]>> => {
  try {
    const result = await request().get(`${APIs.CATEGORIES_SUB}/sub`);
    const data = await result.data;
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return handleError(e);
  }
}
