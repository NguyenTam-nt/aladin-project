import HttpService from "@configs/api";
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService";
import type { IParams, IResponseData } from "@typeRules/index";
import { apis } from "@constants/list-api";
import type { IContact } from "@typeRules/contact";

const api = getMicroService(`${apis.contact}`, microServices.feedback)
const pathSearch = getMicroService(`${apis.searchContact}`, microServices.feedback)
const apiAdmin = getMicroServiceAdmin(`${apis.contact}`, microServices.feedback)
const ContactService = {
    get: (params:any):Promise<IResponseData<IContact>> => {
        return HttpService.axiosClient.get(`${apiAdmin}?page=${Number(params.page)}&size=${params.size}${params.sort1 != undefined ? '&sort=' + params.sort1 : ""}&sort=${params.sort2}`) 
    },
    getById: (id:number):Promise<IContact> => {
        return HttpService.axiosClient.get(`${apiAdmin}/${id}`) 
    },
    update: (data:IContact):Promise<IContact> => {
        return HttpService.axiosClient.put(apiAdmin, data)
    },
    post: (data:IContact):Promise<IContact> => {
       
        return HttpService.axiosClient.post(api, data)
    },
    deleteAll: (ids: any[]) => {
      return HttpService.axiosClient.delete(`${apiAdmin}`, { data: ids})
    },
    search: async(params: IParams): Promise<IResponseData<IContact>> => {
        return await HttpService.axiosClient.get(pathSearch, {params});
    },
}

export default ContactService;