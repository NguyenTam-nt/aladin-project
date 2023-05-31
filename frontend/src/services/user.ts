import { getApi } from "@commons/getAPi"
import HttpService from "@configs/api"
import type { IParams } from "@typeRules/pagination"
import type { IResponseData } from "@typeRules/responsive"
import type { IUser, RoleUser } from "@typeRules/user"

export const userService = {
    getInfo: () => {
        const api = getApi("keycloak/userinfo")
        return HttpService.axiosClient.get(api) 
    },
    getBySearch: (params:IParams, username = ""):Promise<IResponseData<IUser>> => {
        const api = getApi("keycloak/searchuser")
        return HttpService.axiosClient.get(api, {params: {...params, username}})
    },
    post: (data:IUser):Promise<IUser> => {
        const api = getApi("keycloak/adduser")
        return HttpService.axiosClient.post(api, data)
    },
    updateRole: (userId:string, role:RoleUser):Promise<string> => {
        const api = getApi("keycloak/updateRole")
        return HttpService.axiosClient.put(`${api}/${userId}`, "", {
            params: {
                userId, role
            }
        })
    },
    delete: (userId:string):Promise<void> => {
        const api = getApi("keycloak/delete")
        return HttpService.axiosClient.delete(`${api}/${userId}`)
    },
    update: (data:IUser):Promise<IUser> => {
        const api = getApi("keycloak/update")
        return HttpService.axiosClient.put(`${api}`, data)
    }
}