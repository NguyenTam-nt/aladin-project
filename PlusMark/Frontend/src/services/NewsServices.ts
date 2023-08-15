import { some } from "@utility/helper";
import api from "./api";

const apiNews = "/news"


const NewsServices = {
    post: async (data: some) => {
        return api.post(apiNews, data)
    },
    get: async (option: some) => {
        return api.get(apiNews, {
            params: {
                page: option.page - 1 >= 0 ? option.page - 1 : 0,
                size: option.limit,
                key: option.key,
                sort: `createdAt,${option.sort ? option.sort : 'desc'}`
            }
        })
    },
    getById: async (id: string | undefined) => {
        return api.get(apiNews + `/${id}`)
    },
    put: async (id: string, data: some) => {
        return api.put(apiNews + `/${id}`, data)
    },
    delete: async (id: string) => {
        return api.delete(apiNews + `/${id}`)
    }
}


export default NewsServices;