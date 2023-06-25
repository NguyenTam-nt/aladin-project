import { apis } from "@constants/list-api"
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService"
import HttpService from "@configs/api"
import type { IParams } from "@typeRules/index"
import type { book_table } from "@typeRules/tableReservation"


const pathUser = getMicroService(`${apis.books}`, microServices.restaurant)
// const pathSearch = getMicroService(`${apis.searchNew}`, microServices.infor)
// const pathAddmin = getMicroServiceAdmin(`${apis.new}`, microServices.infor)


export const reservationTableSvice = {
    reserTable: async(data: book_table): Promise<any>=> {
        return HttpService.axiosClient.post(pathUser, data)
    }
}