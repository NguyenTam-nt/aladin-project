import api from "./api";

const apiFooter = "/footer"

export type ResponseFooter = {
    status: string,
    data: ContentFooter
}

export type ContentFooter = {
    id?: string,
    comanyName: string,
    address:string[],
    phoneNumber: string[],
    email: string,
    facebook: string,
    instagram: string,
    youtube: string,
    tiktok: string
}

const FooterServices = {
    get: async (): Promise<ContentFooter> => {
        return api.get(apiFooter).then(data => data.data)
    },
    put: async (data: ContentFooter) => {
        return api.put(apiFooter, data)
    }
}


export default FooterServices;