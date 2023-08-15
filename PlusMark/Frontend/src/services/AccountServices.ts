import { some } from "@utility/helper";
import api from "./api";

const apiAccount = "/keycloak"

type AccountType = {
    id: string,
    login: string,
    firstName: string,
    lastName: string,
    email: string,
    imageUrl: string,
    role: string
} 

export type AccountResponse = {
    data: AccountType[],
    total: number
}

const AccountServices = {
    getAllAccounts: async (username: string, page: number, size: number): Promise<AccountResponse> => {
        return api.get(apiAccount + `/searchuser?username=${username}&page=${page}&size=${size}`).then(data => data.data)
    },
    addAccountToAdmin: async (id: string): Promise<any> => {
        return api.put(apiAccount + `/addAdmin/${id}`).then(data => data.data)
    },
    removeAccountFromAdmin: async (id: string): Promise<any> => {
        return api.put(apiAccount + `/removeAdmin/${id}`).then(data => data.data)
    },
    removeAccount: async (ids: string[]): Promise<any> => {
        return api.delete(apiAccount + `/deletelist`, { data: ids }).then(data => data.data)
    },
    // post: async (data: Array<HomeContent>) => {
    //     return api.post('/homepagelist', data);
    // }
}


export default AccountServices;