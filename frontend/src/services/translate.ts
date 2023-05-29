import { getApi } from "@commons/getAPi"
import HttpService from "@configs/api"


export const translateService = {
    post: (content: string):Promise<string> => {
        const api = getApi("translate")
        if(content.trim() === "") return Promise.resolve("")
        return HttpService.axiosClient.post(api, {content})
    }
}