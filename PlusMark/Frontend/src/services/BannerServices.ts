import { some } from "@utility/helper";
import api from "./api";
import axios from "axios";

export interface Banner {
    id: string,
    name: string,
    images: Array<{ id?: number, url: string }>,
    label: string,
    max: number,
}
const apiBanner = "/banner"

const BannerServices = {
    get: async () => {
        return api.get(apiBanner);
    },
    post: async (data: some) => {
        return api.post(apiBanner, data)
    },
    put: async (id: string, data: some) => {
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