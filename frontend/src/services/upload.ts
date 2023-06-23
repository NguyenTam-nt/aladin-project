import { apis } from "@constants/list-api"
import { getMicroService, microServices } from "./getMicroService"
import HttpService from "@configs/api"
import type { IDataImage, IImage } from "@typeRules/index"

export const uploadService = {
    postImage: (data:FormData):Promise<IDataImage> => {
        const api = getMicroService(apis.image, microServices.media)
        return HttpService.axiosClient.post(api, data)
    },
    postVideo: (data:FormData):Promise<IImage> => {
        const api = getMicroService(apis.video, microServices.media)
        return HttpService.axiosClient.post(api, data)
    }
}