import { getApi } from "@commons/getAPi"
import HttpService from "@configs/api"

export const userService = {
    getInfo: () => {
        const api = getApi("keycloak/userinfo")
        return HttpService.axiosClient.get(api) 
    }
}