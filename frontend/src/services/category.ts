import HttpService from "@configs/api"
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService"
import { apis } from "../constants/list-api"
import type { IParams, IResponseData, IReview } from "@typeRules/index"
import type { ICategory } from "@typeRules/category"
import type { PlaceType } from "@typeRules/place"

const api = getMicroService(`${apis.category}`, microServices.restaurant)
const apiAdmin = getMicroServiceAdmin(`${apis.category}`, microServices.restaurant)
export const categoryService = {
    get: (params:IParams):Promise<IResponseData<ICategory>> => {
        return HttpService.axiosClient.get(`${apiAdmin}`, {params: {...params, page: Number(params.page)}}) 
    },
    getById: (id:number):Promise<ICategory> => {
        return HttpService.axiosClient.get(`${apiAdmin}/${id}`) 
    },
    update: (data:ICategory):Promise<ICategory> => {
        return HttpService.axiosClient.put(apiAdmin, data)
    },
    post: (data:ICategory):Promise<ICategory> => {
       
        return HttpService.axiosClient.post(apiAdmin, data)
    },
    delete: (id:number) => {
        return HttpService.axiosClient.delete(`${apiAdmin}/${id}`)
    },
    patch: (id:number):Promise<ICategory> => {
        return HttpService.axiosClient.patch(`${apiAdmin}/${id}`)
    },
    getAll: ():Promise<ICategory[]> => {
        return HttpService.axiosClient.get(`${apiAdmin}/select`)
    },
    getAllPlace: ():Promise<PlaceType[]> => {
        const apiAdmin = getMicroService(`${apis.infrastructures}`, microServices.restaurant)
        return HttpService.axiosClient.get(`${apiAdmin}/select`)
    },
    getAllPlaceHome: (params:IParams):Promise<IResponseData<PlaceType>> => {
        const api = getMicroService(`${apis.infrastructures}`, microServices.restaurant)
        return HttpService.axiosClient.get(`${api}/home`, {params: {...params, page: Number(params.page)}})
    }
}