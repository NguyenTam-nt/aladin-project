import { some } from "@utility/helper";
import api from "./api";

const apiPolicy = "/policy"

const PolicyServices = {
    post: async (data: some) => {
        return api.post(apiPolicy, data)
    },
    // get: async (option: some) => {
    //     return api.get(apiPolicy, {
    //         params: {
    //             page: option.page - 1 >= 0 ? option.page - 1 : 0,
    //             size: option.limit,
    //             key: option.key,
    //             sort: `createdAt,${option.sort ? option.sort : 'desc'}`
    //         }
    //     })
    // },
    get: async (option: some) => {
        return api.get(apiPolicy)
    },
    getById: async (id: string | undefined) => {
        return api.get(apiPolicy + `/${id}`)
    }
    ,
    put: async (id: string, data: some) => {
        return api.put(apiPolicy + `/${id}`, data)
    },
    delete: async (id: string) => {
        return api.delete(apiPolicy + `/${id}`)
    }
}


export default PolicyServices;