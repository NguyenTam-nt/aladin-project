import HttpService from "@configs/api";
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService";
import type { IParams, IResponseData } from "@typeRules/index";
import { apis } from "@constants/list-api";
import type { IVoucher, IVoucherGet } from "@typeRules/voucher";

const api = getMicroService(`${apis.vouchers}`, microServices.restaurant)
const apiAdmin = getMicroServiceAdmin(`${apis.vouchers}`, microServices.restaurant)
const VoucherService = {
    get: (params:IParams):Promise<IResponseData<IVoucherGet>> => {
        return HttpService.axiosClient.get(`${apiAdmin}`, {params: {...params, page: Number(params.page) - 1}}) 
    },
    getById: (id:number):Promise<IVoucher> => {
        return HttpService.axiosClient.get(`${apiAdmin}/${id}`) 
    },
    update: (data:IVoucher):Promise<IVoucher> => {
        return HttpService.axiosClient.put(apiAdmin, data)
    },
    post: (data:IVoucher):Promise<IVoucher> => {
       
        return HttpService.axiosClient.post(apiAdmin, data)
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
    patch: (id:number):Promise<IVoucher> => {
        return HttpService.axiosClient.patch(`${apiAdmin}/${id}`)
    },
    get_home: (params:IParams):Promise<IResponseData<IVoucher>> => {

        return HttpService.axiosClient.get(`${api}/home`, {params: {...params, page: Number(params.page) - 1}}) 
    }
}

export default VoucherService;