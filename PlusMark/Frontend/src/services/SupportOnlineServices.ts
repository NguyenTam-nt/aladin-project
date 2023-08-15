import { some } from "@utility/helper";
import api from "./api";
import { SUPPORT_ONLINE } from "@utility/constants";

const apiSupportAppname = "/supportAppname";
const apiSupportOnline = "/supportOnline";

export type SupportOnlineInfo = {
    id?: string,
    appName: string,
    script: string,
    fullname: string
}

const SupportOnlineServices = {
    get: async () => {
        return api.get(apiSupportOnline)
    },

    post: async (data: SupportOnlineInfo) => {
        return api.post(apiSupportOnline, data)
    },

    put: async (id: string, data: SupportOnlineInfo) => {
        return api.put(`${apiSupportOnline}/${id}`, data)
    },

    delete: async (id: string) => {
        return api.delete(`${apiSupportOnline}/${id}`)
    },
 
    getDataPhone: async (): Promise<SupportOnlineInfo[]> => {

        return api.get(apiSupportAppname + "?appName=" + SUPPORT_ONLINE.PHONE ).then(data => data.data).then(data => data.data)
    }, 

    getDataZalo: async (): Promise<SupportOnlineInfo[]> => {

        return api.get(apiSupportAppname  + "?appName=" + SUPPORT_ONLINE.ZALO ).then(data => data.data).then(data => data.data)
    }, 

    getDataFace: async (): Promise<SupportOnlineInfo[]> => {

        return api.get(apiSupportAppname + "?appName=" + SUPPORT_ONLINE.FACEBOOK).then(data => data.data).then(data => data.data)
    },
}


export default SupportOnlineServices;