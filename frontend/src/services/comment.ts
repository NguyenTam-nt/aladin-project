import HttpService from "@configs/api"
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService"
import { apis } from "../constants/list-api"
import type { IParams, IResponseData } from "@typeRules/index"
import type { IProduct } from "@typeRules/product"

const api = getMicroService(`${apis.product}`, microServices.restaurant)
const apiAdmin = getMicroServiceAdmin(`${apis.product}`, microServices.restaurant)
export const productService = {
    get: (params:IParams):Promise<IResponseData<IProduct>> => {
        return HttpService.axiosClient.get(`${api}`, {params: {...params, page: Number(params.page) - 1}}) 
    },
    getById: (id:number):Promise<IProduct> => {
        return HttpService.axiosClient.get(`${api}/${id}`) 
    },
    update: (data:IProduct):Promise<IProduct> => {
        return HttpService.axiosClient.put(apiAdmin, data)
    },
    post: (data:IProduct):Promise<IProduct> => {
       
        return HttpService.axiosClient.post(apiAdmin, data)
    },
    delete: (id:number) => {
        return HttpService.axiosClient.delete(`${apiAdmin}/${id}`)
    },
    patchShow: (id:number):Promise<IProduct> => {
        return HttpService.axiosClient.patch(`${apiAdmin}/show/${id}`)
    },
    patchHome: (id:number):Promise<IProduct> => {
        return HttpService.axiosClient.patch(`${apiAdmin}/priority/${id}`)
    },
    checkCode: (code:string):Promise<IProduct> => {
        return HttpService.axiosClient.get(`${apiAdmin}/check/${code}`)
    }
}
// /api/admin/products/priority/{id},