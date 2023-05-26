import { getApi } from "@commons/getAPi";
import HttpService from "@configs/api";
import type { IParams } from "@typeRules/pagination";
import type { IUser } from "@typeRules/user";



export const userService = {
    get: (params: IParams):Promise<IUser> => {
        const api = getApi("users")
        return HttpService.axiosClient.get(api, {params})
    },
    getBySearch: (params: IParams, query: string):Promise<IUser> => {
        const api = getApi("_search/users")
        return HttpService.axiosClient.get(`${api}/${query}`, {params})
    }

}
