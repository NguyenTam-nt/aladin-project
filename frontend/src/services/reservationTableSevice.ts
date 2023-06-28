import { apis } from "@constants/list-api"
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService"
import HttpService from "@configs/api"
import type { IParams } from "@typeRules/index"
import type { Data_ReserTable, book_table } from "@typeRules/tableReservation"


const pathUser = getMicroService(`${apis.books}`, microServices.restaurant)
const pathSearch = getMicroServiceAdmin(`${apis.searchBooks}`, microServices.restaurant)
const pathAddmin = getMicroServiceAdmin(`${apis.books}`, microServices.restaurant)


export const reservationTableSvice = {
    reserTable: async(data: book_table): Promise<any>=> {
        return HttpService.axiosClient.post(pathUser, data)
    },
    getRequestReserTable: async(params: IParams):Promise<Data_ReserTable>=> {
        return await HttpService.axiosClient.get( `${pathAddmin}?page=${params.page}&size=${params.size}&id=${params.id}&date=${params.date}&sort=${params.sort}&sort=${params.sort1}`)
    },
    getReserTableById: async(id:number) :Promise<book_table> => {
        return  await HttpService.axiosClient.get(`${pathAddmin}/${id}`);
    },
    deleteListReserTable: async(ids: {id:number}[]):Promise<any> => {
        return await HttpService.axiosClient.delete(pathAddmin, {data: ids})
    },
    putReservationTable: async(data: book_table, id?: number) :Promise<book_table>=> {
        if(id){
            return await HttpService.axiosClient.patch(`${pathAddmin}/${id}`, data)
        }
        return await HttpService.axiosClient.put(pathAddmin, data)
    },
    searchReservationTable: async(params:IParams):Promise<Data_ReserTable>=> {
        return await HttpService.axiosClient.get(`${pathSearch}?query=*${params.query}*&page=${params.page}&size=${params.size}&id=${params.id}&date=${params.date}&sort=${params.sort}&sort=${params.sort1}` )
    },
}