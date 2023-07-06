import HttpService from "@configs/api";
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService";
import type { IParams, IResponseData } from "@typeRules/index";
import { apis } from "@constants/list-api";
import type { IVoucher, IVoucherGet, VoucherCheckPriceDTO } from "@typeRules/voucher";

const api = getMicroService(`${apis.vouchers}`, microServices.restaurant)
const apiAdmin = getMicroServiceAdmin(`${apis.vouchers}`, microServices.restaurant)
const pathSearch = getMicroService(`${apis.searchVouchers}`, microServices.restaurant)
const VoucherService = {
    get: (params:IParams):Promise<IResponseData<IVoucherGet>> => {
        return HttpService.axiosClient.get(`${apiAdmin}`, {params: params}) 
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
    },
    checkPrice: (request: VoucherCheckPriceDTO ):Promise<VoucherCheckPriceDTO> => {

        return HttpService.axiosClient.patch(`${api}/check/home`, request) 
    },
    checkExist: (code: string ):Promise<any> => {

        return HttpService.axiosClient.get(`${api}/check/${code}`) 
    },
    search: async(params: IParams): Promise<IResponseData<IVoucherGet>> => {
        return await HttpService.axiosClient.get(pathSearch, {params});
    },
}

export default VoucherService;