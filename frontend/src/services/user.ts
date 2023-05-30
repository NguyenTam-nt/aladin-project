import { getApi } from "@commons/getAPi"
import HttpService from "@configs/api"
import type { IParams } from "@typeRules/pagination"

export const userService = {
    getInfo: () => {
        const api = getApi("keycloak/userinfo")
        return HttpService.axiosClient.get(api) 
    },
    getBySearch: (params:IParams, username = "") => {
        const api = getApi("keycloak/searchuser")
        return HttpService.axiosClient.get(api, {params: {...params, username}})
    }
}