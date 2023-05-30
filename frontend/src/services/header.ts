import { getApi } from "@commons/getAPi"
import HttpService from "@configs/api"
import type { IHeader } from "@typeRules/footer"


const api = getApi("header-navbars")
export const headerService = {
    getHeadetByLink: (link:string):Promise<IHeader[]> => {
        return HttpService.axiosClient.get(`${api}/item`, {params: {link}})
    },
    put: (data:IHeader):Promise<IHeader> => {
        return HttpService.axiosClient.post(`${api}/index`, data)
    },
    getByIndex: ():Promise<IHeader[]> => {
        return HttpService.axiosClient.get(`${api}/index`)
    }

}