import HttpService from "@configs/api"
import type { IUser } from "@typeRules/user"
import { getMicroService, microServices } from "./getMicroService"
import { apis } from "../constants/list-api"

export const userService = {
    getInfo: ():Promise<IUser> => {
        const api = getMicroService(apis.user, microServices.account)
        return HttpService.axiosClient.get(api) 
    },
}