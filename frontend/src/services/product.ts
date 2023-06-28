import HttpService from "@configs/api"
import { getMicroService, getMicroServiceAdmin, microServices, getMicroServiceSearchAdmin } from "./getMicroService"
import { apis } from "../constants/list-api"
import type { IParams, IResponseData } from "@typeRules/index"
import type { IProduct, IProductHome } from "@typeRules/product"

const api = getMicroService(`${apis.product}`, microServices.restaurant)
const apiAdmin = getMicroServiceAdmin(`${apis.product}`, microServices.restaurant)
export const productService = {
    get: (params:IParams):Promise<IResponseData<IProduct>> => {
        return HttpService.axiosClient.get(`${api}`, {params: {...params, page: Number(params.page) - 1}}) 
    },
    getHome: ():Promise<IProductHome[]> => {
        return HttpService.axiosClient.get(`${api}/home`) 
    },
    getPromotion: ():Promise<IProduct[]> => {
        return HttpService.axiosClient.get(`${api}/promotion`) 
    },
    getById: (id:number):Promise<IProduct> => {
        return HttpService.axiosClient.get(`${api}/${id}`) 
    },
    getAdminById: (id:number):Promise<IProduct> => {
        return HttpService.axiosClient.get(`${apiAdmin}/${id}`) 
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
    },
    search: (params:IParams):Promise<IResponseData<IProduct>> => {
        const apiAdmin = getMicroServiceSearchAdmin(apis.product,  microServices.restaurant)
        return HttpService.axiosClient.get(`${apiAdmin}`, {params: {...params, page: Number(params.page) - 1, query: `*${params?.query}*`}})
    }
}