import { getApi } from "@commons/getAPi";
import HttpService from "@configs/api";
import type { IHistory } from "@typeRules/history";
import type { IParams } from "@typeRules/pagination";
import type { IResponseData } from "@typeRules/responsive";

const api = getApi("histories")

export const historySevice = {
    post: (data:IHistory):Promise<IHistory> => {
        return HttpService.axiosClient.post(api, data)
    },
    put: (data:IHistory):Promise<IHistory> => {
        return HttpService.axiosClient.put(`${api}/${data.id}`, data)
    },
    get: (params:IParams):Promise<IResponseData<IHistory>> => {
        return HttpService.axiosClient.get(api, {params})
    },
    delete: (id: number) => {
        return HttpService.axiosClient.delete(`${api}/${id}`)
    }
}