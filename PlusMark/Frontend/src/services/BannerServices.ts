import { some } from "@utility/helper";
import api from "./api";

export interface Banner {
    id: string,
    images: Array<{id?: number, url: string}>,
    label: string,
    max: number,
}
const apiBanner = "/banner"

const BannerServices = {
    get: async () => {
        return api.get(apiBanner);
    },
    put : async (id: string, data: some) => {
        return api.put(`${apiBanner}/${id}`, data);
    },
    getBanner: async (type: string) => {

        return api.get(apiBanner + "/" + type).then(data => data.data)
    },
    getBannerTrademark: async (trademarkName: string) => {

        return api.get("/trademark" + "/" + trademarkName).then(data => data.data)
    },
}


export default BannerServices;