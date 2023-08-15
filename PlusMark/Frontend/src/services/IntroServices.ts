import { some } from "@utility/helper";
import api from "./api";

const apiContact = "/introduce"

const IntroServices = {
    post: async (content: string)  => {
        return api.post(apiContact , content)
    },
    get: async () => {

        return api.get(apiContact)
    },
    getById: async (id:some) => {

        return api.get(apiContact + `/${id}`)
    }
    ,
    put: async (data: some) => {
        return api.put(apiContact, data)
    },
    delete: async (id:some) => {
        return api.delete(apiContact + `/${id}`)
    }
}


export default IntroServices;