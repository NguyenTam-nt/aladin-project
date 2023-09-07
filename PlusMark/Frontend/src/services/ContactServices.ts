import { some } from "@utility/helper";
import api from "./api";
import { type } from "os";
import queryString from "query-string";

const apiContact = "/contact"

export type ContactStoreInfo = {
    address: string,
    linkGgMap: string
}

export type DataContactInfo = {
    id?: number,
    workingTime: string,
    stores: ContactStoreInfo[]
}

export type ResponseContactStoreInfo = {
    data: DataContactInfo
}

export type DataContactPage = {
    id?: string
    method: string
    information: string
    fullname: string
}

const ContactServices = {
    post: async (data: some) => {
        return api.post(apiContact, data)
    },
    get: async (option: some) => {

        return api.get(apiContact, { params: { page: option.page - 1, size: option.limit } })
    },
    getById: async (id: some) => {

        return api.get(apiContact + `/${id}`)
    },
    getContactFilter: async(param:some)=> {
        return  await api.get(`${apiContact}?${queryString.stringify(param,{ arrayFormat: "comma", skipNull: true })}`)
    }
    ,
    put: async (id: some | string, data: some) => {

        return api.put(apiContact + `/${id}`, data)
    },
    delete: async (id: some) => {
        return api.delete(apiContact + `/${id}`)
    },
    deleteManyContact : async(data: any) => {
        return await api.delete(`${apiContact}?${queryString.stringify({ids: data},{ arrayFormat: "comma", skipNull: true })}`)
    },
    getInfo: async (): Promise<ResponseContactStoreInfo> => {
        return api.get("/contactstore").then(data => data)
    },
    putInfo: async (data: DataContactInfo) => {
        return api.put("/contactstore", data)
    },
    getContactPage: () => {
        return api.get('/contactpage');
    },
    getByIdContactPage: (id: string) => {
        return api.get(`/contactpage/${id}`);
    },
    postContactPage: (data: DataContactPage) => {
        return api.post('/contactpage', data);
    },
    putContactPage: (id: string, data: DataContactPage) => {
        return api.put(`/contactpage/${id}`, data);
    },
    deleteContactPage: (id: string) => {
        return api.delete(`/contactpage/${id}`);
    }
}


export default ContactServices;