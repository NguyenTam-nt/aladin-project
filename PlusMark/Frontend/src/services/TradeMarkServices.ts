import { TradeMarkType, lisTradeMarkType } from "commons/contannt";
import api from "./api"


const pathName = '/trademark'

const  TradeMarkServices = {
    getAllTradeMark: async(): Promise<lisTradeMarkType>=> {
         const result = await api.get(pathName);
         return result.data
    },
    getTradeMarkById: async(id:string): Promise<TradeMarkType> => {
       const result = await api.get(`${pathName}/${id}`)
         return result.data
    },
    deleteTradeMark : async(id:string):Promise<any> => {
        return await api.delete(`${pathName}/${id}`)
    },
    addOrUpdateTradeMark : async(data:any, id?:string | number):Promise<TradeMarkType> => {
        if(id){
            const result = await api.put(`${pathName}/${id}`, data)
            return result.data
        }
        const result = await api.post(pathName, data)
        return result.data
    }
}

export default TradeMarkServices