import HttpService from "@configs/api";
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService";
import type { IParams, IResponseData } from "@typeRules/index";
import { apis } from "@constants/list-api";
import type { IContact } from "@typeRules/contact";

const api = getMicroService(`${apis.contact}`, microServices.feedback)
const apiAdmin = getMicroServiceAdmin(`${apis.contact}`, microServices.feedback)
const ContactService = {
    get: (params:any):Promise<IResponseData<IContact>> => {
        return HttpService.axiosClient.get(`${apiAdmin}?page=${Number(params.page) - 1}&size=${params.size}&sort=${params.sort1}&sort=${params.sort2}`) 
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
}

export default ContactService;