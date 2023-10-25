import { IResponseApi } from './types';
import { IParams } from '@typeRules';
import { APIs, IData } from './config';
import { handleError } from './handleError';
import request from './request';
import { IOrderItem, IOrderKitchen, OrderType } from 'src/typeRules/product';

// export interface IMenuItem {
//   id: number
//   code: string
//   linkMedia: string
//   percent: number
//   name: string
//   price: number
//   pricePromotion: number
//   show: boolean
//   isStar: boolean
//   priority: boolean
//   idCategory?: number
//     status? :string
// }

// export interface IMenuData {
//   totalElement: number
//   totalElementPage: number
//   list: IMenuItem[]
// }

// export interface IProductInCart {
//   id: number
//   idProduct : number
//   numProduct: number
//   createdDate: string
//   nameTable: string
//   idInvoice: number
//   createdBy: string
//   linkMedia: string
//   name: string
//   price: number
//   pricePromotion: number
//   state: 'COMPLETE' | 'CANCEL' | 'PROCESSING' | 'PROCESSING_CANCEL' | null
//   guide: null
//   note?: string
// }

export interface IAttributeFeValues {
  valueVn: string;
  valueKr: string;
}

export interface IFeValueDTOList {
  valueVn: string;
  valueKr: string;
}
export interface IAttributeImageFeS {
  imageUrl: string;
  feValueDTOList: IFeValueDTOList[];
}
export interface IAttributeFes {
  attributeFeValues: IAttributeFeValues[];
  attributeFeNameKr: string;
  attributeFeNameVn: string;
}
export interface IAttributes {
  valueVn: string;
  valueKr: string;
  attributeNameVn: string;
  attributeNameKr: string;
}
export interface IProductDetails {
  productDetailId: number;
  priceDetail: number;
  promoDetail: number;
  actualPriceDetail: number;
  stockQuantity: number;
  soldQuantity: number;
  addressWarehouse: string;
  imageDetailUrl: string;
  attributes: IAttributes[];
}

export interface IProduct {
  id?: number;
  productCode: string;
  productNameVn: string;
  productNameKr: string;
  categoryId: number;
  subCategoryId: number;
  price: number;
  promo: number;
  actualPrice: number;
  stockQuantity: number;
  salientFeaturesVn: string;
  salientFeaturesKr: string;
  detailVn: string;
  detailKr: string;
  specVn: string;
  specKr: string;
  featured: number;
  createAt: string;
  videoUrl: string;
  totalSoldQuantity: number;
  warehouse: {
    address: string;
  }[];
  attributeFes: IAttributeFes[];
  productDetails: IProductDetails[];
  images: {
    url: string;
  }[];
  attributeImageFeS: IAttributeImageFeS[];
}

export interface IProductOutStanding {
  id: number;
  productNameVn: string;
  productNameKr: string;
  salientFeaturedVn: string;
  salientFeaturedKr: string;
  image: string;
}
export const getProductsOutStanding = async (
  params: IParams,
): Promise<IResponseApi<IProductOutStanding[]>> => {
  try {
    const result = await request().get(`${APIs.PRODUCT_OUT_STANDING}`, {
      params,
    });
    const data = await result.data.content;

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getProductsApi = async (
  params: IParams,
): Promise<IResponseApi<IProduct[]>> => {
  try {
    const result = await request().get(`${APIs.PRODUCTS}`, {
      params,
    });
    const data = await result.data.content;
    const totalPages = await result.data.totalPages;
    const current = await result.data.number;
    return {
      success: true,
      data: data,
      page: {
        current: current,
        max: totalPages,
      },
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getProductsDetailApi = async (
  id: any,
  address: string,
): Promise<IResponseApi<IProduct>> => {
  try {
    const result = await request().get(
      `${APIs.PRODUCTS}/${id}?address=${address}`,
    );
    const data = await result.data;
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getProductsByKeywork = async (params: IParams): Promise<IResponseApi<IProduct[]>> => {
  try {
    const result = await request().get(`${APIs.PRODUCTS}/search`, {
      params,
    });
    const data = await result.data.content;
    const totalPages = await result.data.totalPages;
    const current = await result.data.number;
    return {
      success: true,
      data: data,
      page: {
        current: current,
        max: totalPages,
      },
    };
  } catch (error) {
    return handleError(error);
  }
}