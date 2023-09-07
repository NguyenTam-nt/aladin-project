import { ListVoucherType, VoucherType, paramVoucher } from "commons/contannt";
import queryString from "query-string";
import api from "./api";
import { IVoucher } from "./Types/voucher";
import { IRespone } from "./Types/respone";

const path = '/voucher'
const VoucherServices = {
    getVoucher: async (param: paramVoucher): Promise<ListVoucherType> => {
        const result = await api.get(`${path}?${queryString.stringify(param, { skipNull: true })}`)
        return result.data
    },
    getVoucherById: async (id: string): Promise<any> => {
        // const result = await api.get(`${path}/${id}`)
        // return result.data
        return await api.get(`${path}/${id}`);
    },
    deleteVoucher: async (id: string): Promise<any> => {
        return api.delete(`${path}/${id}`)
    },
    addOrUpdateVoucher: async (data: any, id?: string): Promise<any> => {
        if (id) {
            const updatedItem = await api.put(`${path}/${id}`, data)
            return updatedItem.data
        }
        const itemCreated = await api.post(path, data)
        return itemCreated.data
    },
    getAllVoucher: async (params: paramVoucher): Promise<IRespone> => {
        return await api.get(path, { params });
    },
    getProductByVoucherCode: async (code?: any): Promise<any> => {
        return api.get(`${path}/search_products?voucherCode=${code}`);
    },
    postVoucher: async (data: any) => {
        return api.post(path, data);
    }
}

export default VoucherServices