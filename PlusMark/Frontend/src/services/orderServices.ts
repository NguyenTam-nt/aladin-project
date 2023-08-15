import { OrderType, paramOrder } from "commons/contannt"
import api from "./api"
import queryString from "query-string"

const path = '/payment'
const OrderService = {
    getAllOrder: async():Promise<any>=> {
        const result = await api.get(path)
        return result.data
    },
    getOrder: async(param: paramOrder):Promise<any>=> {
        const result = await api.get(`${path}?${queryString.stringify(param,{skipNull: true})}`)
        return result.data
    },
    getOrderByCode :async(codeId: string) : Promise<OrderType>=> {
      return  (await api.get(`${path}/${codeId}`)).data
    }
}

export default OrderService