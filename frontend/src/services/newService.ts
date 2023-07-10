import { apis } from "@constants/list-api"
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService"
import HttpService from "@configs/api"
import type { Data_ListNew, newItem_type } from "@typeRules/new"
import type { IParams } from "@typeRules/index"


const pathUser = getMicroService(`${apis.new}`, microServices.infor)
const pathSearch = getMicroService(`${apis.searchNew}`, microServices.infor)
const pathAddmin = getMicroServiceAdmin(`${apis.new}`, microServices.infor)

export const newService = {
    getNews: async(params: IParams): Promise<Data_ListNew> => {
        return await HttpService.axiosClient.get(pathUser, {params});
    },
    getNewById: async(id:number): Promise<newItem_type>=>{
        return await HttpService.axiosClient.get(`${pathUser}/${id}`)
    },
    postOrPutNew: async(data: newItem_type, id?: number): Promise<newItem_type> => {
        if(id) return await HttpService.axiosClient.put(pathAddmin, data)
        return HttpService.axiosClient.post(pathAddmin, data)
    },
    deleteNewId: async(id:number): Promise<any>=> {
        return await HttpService.axiosClient.delete(`${pathAddmin}/${id}`)
    },
    patchPriorityNew: async(id:number): Promise<newItem_type>=> {
        return await HttpService.axiosClient.patch(`${pathAddmin}/${id}`)
    },
    searchNews: async(params: IParams): Promise<Data_ListNew> => {
        return await HttpService.axiosClient.get(pathSearch, {params});
    },
}