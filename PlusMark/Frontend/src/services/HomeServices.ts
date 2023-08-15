import { some } from "@utility/helper";
import api from "./api";

const apiHome = "/homepage"

export interface HomeContent {
    id?: string,
    title: string,
    content: string,
    icon?: JSX.Element
}

const HomeServices = {
    getUtil: async () => {
        return api.get(apiHome)
    },
    post: async (data: Array<HomeContent>) => {
        return api.post('/homepagelist', data);
    }
}


export default HomeServices;