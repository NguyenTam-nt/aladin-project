import { getApi } from "@commons/getAPi"
import HttpService from "@configs/api"


export const uploadService = {
    postImage: (data:any):Promise<any> => {
        const api = getApi("image")
        return HttpService.axiosClient.post(api, data)
    },
    postVideo: (data:any):Promise<any> => {
        const api = getApi("video")
        return HttpService.axiosClient.post(api, data)
    },
}