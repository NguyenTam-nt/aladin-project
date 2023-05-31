import { getApi } from "@commons/getAPi"
import HttpService from "@configs/api"
import type { IFooter, IFooterInfo } from "@typeRules/footer";
import type { IResponseData } from "@typeRules/responsive";

const footerApi = getApi("footer-link-news")
const footerInfoApi = getApi("footer-info")

export const footerService = {
    get: ():Promise<IFooter[]> => {
        return HttpService.axiosClient.get(footerApi, {params: {sort: "id,asc"}})
    },
    put: (data:IFooter[], id:number):Promise<IFooter[]> => {
        return HttpService.axiosClient.put(`${footerApi}/change-item/${id}`, data)
    },
    getFooterInfo: ():Promise<IResponseData<IFooterInfo>> => {

        return HttpService.axiosClient.get(footerInfoApi, {params: {sort: "id,asc"}})
    },
    putFooterInfo: (data:IFooterInfo):Promise<IResponseData<IFooterInfo>> => {
        
        return HttpService.axiosClient.put(`${footerInfoApi}/${data.id}`, data)
    }
}