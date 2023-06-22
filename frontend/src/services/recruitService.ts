import HttpService from "@configs/api"
import { apis } from "../constants/list-api"
import { getMicroService, getMicroServiceAdmin, microServices } from "./getMicroService"
import type { Data_Recruit, Recruit_type } from "@typeRules/recruit"
import type { IParams } from "@typeRules/index"

const pathName = getMicroService(`${apis.recruit}`, microServices.recruit)
const pathNameAdmin = getMicroServiceAdmin(`${apis.recruit}`, microServices.recruit)


export const recruitService = {
    getRecruit: async(params: IParams): Promise<Data_Recruit> =>{
        return HttpService.axiosClient.get(`${pathName}`,{params})
    },
    getRecruitById: async(id:number): Promise<Recruit_type> =>{
        return HttpService.axiosClient.get(`${pathName}/${id}`)
    },
    postOrUpdateRecruit: async(data: any, id?:number):Promise<Recruit_type> => {
        if(id){
            return await HttpService.axiosClient.put(`${pathNameAdmin}`, data)
        }
        return await HttpService.axiosClient.post(pathNameAdmin, data)
    },
    deleteRecruit : async(id:number) : Promise<any>=> {
        return await HttpService.axiosClient.delete(`${pathNameAdmin}/${id}`)
    }
}