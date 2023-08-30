import { some } from "@utility/helper";
import api from "./api";
import { Introduce } from "@pages/AdminPage/ManagerIntroduce";

const apiContact = "/introduction"

const IntroServices = {
    post: async (intro: any)  => {
        return api.post(apiContact , intro)
    },
    get: async () => {
        return api.get(apiContact)
    },
    getById: async (id:some) => {

        return api.get(apiContact + `/${id}`)
    }
    ,
    put: async (id: number ,data: some) => {
        return api.put(apiContact + `/${id}`, data)
    },
    delete: async (id:some) => {
        return api.delete(apiContact + `/${id}`)
    }
}


export default IntroServices;