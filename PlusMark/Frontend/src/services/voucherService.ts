import { ListVoucherType, VoucherType, paramVoucher } from "commons/contannt";
import queryString from "query-string";
import api from "./api";

const path = '/voucher'
const VoucherServices = {
    getVoucher: async(param: paramVoucher): Promise<ListVoucherType> => {
        const result =  await api.get(`${path}?${queryString.stringify(param,{skipNull: true})}`)
        return result.data
    },
    getVoucherById: async(id:string): Promise<VoucherType> => {
        const result =  await api.get(`${path}/${id}`)
        return result.data
    },
    deleteVoucher: async(id:string) :Promise<any> => {
        return await api.delete(`${path}/${id}`)
    },
    addOrUpdateVoucher: async(data:any, id?:string):Promise<any>=> {
        if(id){
            const updatedItem =  await api.put(`${path}/${id}`, data)
            return updatedItem.data
        }
        const itemCreated =  await api.post(path, data)
        return itemCreated.data
    }
}

export default VoucherServices