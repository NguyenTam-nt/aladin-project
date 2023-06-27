import { apis } from "@constants/list-api"
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService"
import HttpService from "@configs/api"
import type { IParams } from "@typeRules/index"
import type { Data_ReserTable, book_table } from "@typeRules/tableReservation"


const pathUser = getMicroService(`${apis.books}`, microServices.restaurant)
const pathSearch = getMicroService(`${apis.books}`, microServices.restaurant)
const pathAddmin = getMicroServiceAdmin(`${apis.books}`, microServices.restaurant)


export const reservationTableSvice = {
    reserTable: async(data: book_table): Promise<any>=> {
        return HttpService.axiosClient.post(pathUser, data)
    },
    getRequestReserTable: async(params: IParams):Promise<Data_ReserTable>=> {
        return await HttpService.axiosClient.get(pathAddmin, {params})
    },
    deleteListReserTable: async(ids: {id:number}[]):Promise<any> => {
        return await HttpService.axiosClient.delete(pathAddmin, {data: ids})
    }
}