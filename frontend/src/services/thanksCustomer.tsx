import HttpService from "@configs/api"
import { getMicroServiceSearchAdmin, getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService"
import { apis } from "../constants/list-api"
import type { IParams, IResponseData, IReview } from "@typeRules/index"

const api = getMicroService(`${apis.thanksCustomer}`, microServices.feel)
const apiAdmin = getMicroServiceAdmin(`${apis.thanksCustomer}`, microServices.feel)

export const reviewService = {
    get: (params:IParams):Promise<IResponseData<IReview>> => {
        return HttpService.axiosClient.get(`${api}`, {params: {...params, page: Number(params.page) - 1}}) 
    },
    getById: (id:number):Promise<IReview> => {
        return HttpService.axiosClient.get(`${api}/${id}`) 
    },
    update: (data:IReview):Promise<IReview> => {
        return HttpService.axiosClient.put(apiAdmin+"/"+data.id, data)
    },
    post: (data:IReview):Promise<IReview> => {
       
        return HttpService.axiosClient.post(apiAdmin, data)
    },
    delete: (id:number) => {
        return HttpService.axiosClient.delete(`${apiAdmin}/${id}`)
    },
    patch: (id:number):Promise<IReview> => {
        return HttpService.axiosClient.patch(`${apiAdmin}/${id}`)
    },
    get_home: (params:IParams):Promise<IResponseData<IReview>> => {

        return HttpService.axiosClient.get(`${api}/home`, {params: {...params, page: Number(params.page) - 1}}) 
    },
    getSearch: (params:IParams):Promise<IResponseData<IReview>> => {
        const apiAdmin = getMicroServiceSearchAdmin(`${apis.thanksCustomer}`, microServices.feel)
        return HttpService.axiosClient.get(`${apiAdmin}`, {params: {...params, page: Number(params.page) - 1, query: `"${params?.query}"`}}) 
    }
}