import HttpService from "@configs/api"
import { getMicroService, microServices } from "./getMicroService"
import { apis } from "../constants/list-api"
import type { HomeTopicType, ITopicType } from "@typeRules/home"

const api = getMicroService(`${apis.banner}`, microServices.home)
export const homeService = {
    getHomeTopicByType: (type:HomeTopicType):Promise<ITopicType> => {
        return HttpService.axiosClient.get(`${api}/${type}`) 
    },
    updateHomeTopic: (data:ITopicType):Promise<ITopicType> => {
        const api = getMicroService(`admin/${apis.banner}`, microServices.home)
        return HttpService.axiosClient.put(api, data)
    },
    deleteHomeTopic: (id:number) => {
        const api = getMicroService(`admin/${apis.banner}/${id}`, microServices.home)
        return HttpService.axiosClient.delete(api)
    }
}