import { getApi } from "@commons/getAPi"
import HttpService from "@configs/api"

// const 
export const viewPageService = {
    putView:  ():Promise<number> => {
        const api = getApi("view-pages/increment")
        return HttpService.axiosClient.put(api)
    }
}