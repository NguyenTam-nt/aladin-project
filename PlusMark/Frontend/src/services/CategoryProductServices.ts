import { some } from "@utility/helper";
import api from "./api";
import { ProductItem } from "./ProductServices";

const apiFiltercategory = "/filtercategory"
const apiTrademarkheader = "/trademarkheader"

export type ProductCategoryHeaderItem = {
  id: number
  categoryDetailName: string
}

export type ProductCategoryHeader = {
  id: number
  categoryName: string
  categoryNewDetails?: ProductCategoryHeaderItem[]
}

export type ResponseCategoryChild = {
  total: number,
  data: ProductCategoryHeaderItem[]
}

export type ResponseCategory = {
  total: number,
  data: ProductCategoryHeader[]
}

export type ProductTrademarkHeader = {
  id?: string,
  tradeMarkName: string,
  male: ProductCategoryHeader[],
  female: ProductCategoryHeader[]
}

// export type ResponseTrademarkHeader = {
//   status: string,
//   data: ProductTrademarkHeader[]
// }

const CategoryProductServices = {
 
  getFilterCategory: async (gender?: string, trademarkName?: string): Promise<ResponseCategory> => {

      let url = apiFiltercategory + "?"
      
      if(gender && gender.length > 0) {
        url += "gender=" + gender + "&"
      }

      if(trademarkName && trademarkName.length > 0) {
        url += "trademarkName=" + trademarkName
      }

      return api.get(url ).then(data => data.data)
  },

  getTrademarkHeader: async (): Promise<ProductTrademarkHeader[]> => {
    return api.get(apiTrademarkheader ).then(data => data.data.data)
  },

  getTrademarkDiffer: async (): Promise<ProductTrademarkHeader[]> => {
    return api.get("/trademarkfalse" ).then(data => data.data.data)
  },

  getTradeMarkSearch: async (gender?: string, categoryNewId?: string, categoryDetailNewId?: string): Promise<string[]> => {
    let url = "/filtertrademark?"
      
      if(gender && gender.length > 0) {
        url += "gender=" + gender + "&"
      }

      if(categoryNewId && categoryNewId.length > 0) {
        url += "categoryNewId=" + categoryNewId + "&"
      }

      if(categoryDetailNewId && categoryDetailNewId.length > 0) {
        url += "categoryDetail=" + categoryDetailNewId
      }
    return api.get(url).then(data => data.data.data)
  },

  // getCategorySearch: async (gender?: string, trademarkName?: string): Promise<some[]> => {
  //   let url = "/filtercategory?"
      
  //     if(gender && gender.length > 0) {
  //       url += "gender=" + gender + "&"
  //     }

  //     if(trademarkName && trademarkName.length > 0) {
  //       url += "trademarkName=" + trademarkName
  //     }

  //   return api.get(url).then(data => data.data.data)
  // },

  getCategoryDetailSearch: async (gender?: string, categoryNewId?: string, trademarkName?: string): Promise<ResponseCategoryChild> => {
    let url = "/filtercategorydetail?"
      
      if(gender && gender.length > 0) {
        url += "gender=" + gender + "&"
      }

      if(categoryNewId && categoryNewId.length > 0) {
        url += "categoryNewId=" + categoryNewId + "&"
      }

      if(trademarkName && trademarkName.length > 0) {
        url += "trademarkName=" + trademarkName
      }
    return api.get(url).then(data => data.data)
  },

  search: async (body: some, page: number, size: number, sort?: string, controller?:any): Promise<ProductItem[]> => {
    
    return api.post(`/itemsfilter?page=${page}&size=${size}&sort=` + sort, body, {
      signal: controller.signal
    }).then(data => data.data.data)
   
  }
}


export default CategoryProductServices;