import HttpService from "@configs/api";
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService";
import type { IParams, IResponseData } from "@typeRules/index";
import { apis } from "@constants/list-api";
import type { IBill, IBillDetail, IBillGet } from "@typeRules/bill";

const api = getMicroService(`${apis.bills}`, microServices.restaurant)
const apiAdmin = getMicroServiceAdmin(`${apis.bills}`, microServices.restaurant)
const BillService = {
    get: (params:IParams):Promise<IResponseData<IBillGet>> => {
        return HttpService.axiosClient.get(`${apiAdmin}`, {params: {...params, page: Number(params.page) - 1}}) 
    },
    getById: (id:number):Promise<IBillDetail> => {
        return HttpService.axiosClient.get(`${apiAdmin}/${id}`) 
    },
    update: (data:IBill):Promise<IBill> => {
        return HttpService.axiosClient.put(apiAdmin, data)
    },
    post: (data:IBill):Promise<IBill> => {
       
        return HttpService.axiosClient.post(api, data)
    },
    delete: (id:number) => {
        return HttpService.axiosClient.delete(`${apiAdmin}/${id}`)
    },
    end: (id:number) => {
        return HttpService.axiosClient.patch(`${apiAdmin}/end/${id}`)
    },
    deleteAll: (ids: any[]) => {
        return HttpService.axiosClient.delete(`${apiAdmin}/all`, { data: ids})
    },
}

export default BillService;