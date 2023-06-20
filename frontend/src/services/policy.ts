import HttpService from "@configs/api"
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService"
import { apis } from "../constants/list-api"
import type { INews, IParams, IResponseData } from "@typeRules/index"

const api = getMicroService(`${apis.policy}`, microServices.infor)
const apiAdmin = getMicroServiceAdmin(`${apis.policy}`, microServices.infor)
export const policyService = {
    getPolicy: (params:IParams):Promise<IResponseData<INews>> => {
        return HttpService.axiosClient.get(`${api}`, {params}) 
    },
    getPolicyById: (id:number):Promise<INews> => {
        return HttpService.axiosClient.get(`${api}/${id}`) 
    },
    updatePolicy: (data:INews):Promise<INews> => {
        return HttpService.axiosClient.put(apiAdmin, data)
    },
    postPolicy: (data:INews):Promise<INews> => {
       
        return HttpService.axiosClient.post(apiAdmin, data)
    },
    delete: (id:number) => {
        const api = getMicroServiceAdmin(`${apis.policy}/${id}`, microServices.infor)
        return HttpService.axiosClient.delete(api)
    }
}