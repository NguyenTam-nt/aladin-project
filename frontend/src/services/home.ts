import HttpService from "@configs/api"
import type { IUser } from "@typeRules/user"
import { getMicroService, microServices } from "./getMicroService"
import { apis } from "../constants/list-api"
import type { HomeTopicType, ITopicHome, ITopicType } from "@typeRules/home"

const api = getMicroService(`${apis.banner}`, microServices.home)
export const homeService = {
    getHomeTopicByType: (type:HomeTopicType):Promise<ITopicType> => {
        return HttpService.axiosClient.get(`${api}/${type}`) 
    },
    updateHomeTopic: (data:ITopicType):Promise<ITopicType> => {
        const api = getMicroService(`admin/${apis.banner}`, microServices.home)
        return HttpService.axiosClient.put(api, data)
    }
}