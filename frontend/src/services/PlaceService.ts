import HttpService from "@configs/api";
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService";
import type { PlaceSelectType, PlaceType } from "@typeRules/place";
import type { IParams, IResponseData } from "@typeRules/index";
import { apis } from "@constants/list-api";

const suffix = "infrastructures"

const api = getMicroService(`${apis.infrastructures}`, microServices.restaurant)
const apiAdmin = getMicroServiceAdmin(`${apis.infrastructures}`, microServices.restaurant)
const PlaceService = {
    get: (params:IParams):Promise<IResponseData<PlaceType>> => {
        return HttpService.axiosClient.get(`${api}`, {params: {...params, page: Number(params.page) - 1}}) 
    },
    getById: (id:number):Promise<PlaceType> => {
        return HttpService.axiosClient.get(`${api}/${id}`) 
    },
    update: (data:PlaceType):Promise<PlaceType> => {
        return HttpService.axiosClient.put(apiAdmin, data)
    },
    post: (data:PlaceType):Promise<PlaceType> => {
       
        return HttpService.axiosClient.post(apiAdmin, data)
    },
    delete: (id:number) => {
        return HttpService.axiosClient.delete(`${apiAdmin}/${id}`)
    },
    patch: (id:number):Promise<PlaceType> => {
        return HttpService.axiosClient.patch(`${apiAdmin}/${id}`)
    },
    get_home: (params:IParams):Promise<IResponseData<PlaceType>> => {

        return HttpService.axiosClient.get(`${api}/home`, {params: {...params, page: Number(params.page) - 1}}) 
    },
    get_select: ():Promise<PlaceSelectType[]> => {

        return HttpService.axiosClient.get(`${api}/select`)
    }
}

export default PlaceService;