import { getApi } from "@commons/getAPi";
import HttpService from "@configs/api";
import type { ICategory, INews } from "@typeRules/news";
import type { IParams } from "@typeRules/pagination";
import type { IResponseData } from "@typeRules/responsive";


const pathCategory = getApi("news-categories")
const pathNews = getApi("news")

export const newsService = {
    get: (params?:IParams):Promise<IResponseData<ICategory>> => {
        return HttpService.axiosClient.get(pathCategory, {params})
    },
    postCategory: (data:ICategory):Promise<ICategory> => {
        return HttpService.axiosClient.post(pathCategory, data)
    },
    getNews: (params?:IParams):Promise<IResponseData<INews>> => {
        return HttpService.axiosClient.get(pathNews, {params})
    },
    getBySearch: (params:IParams, query: string):Promise<IResponseData<INews>> => {
        return HttpService.axiosClient.get(`${pathNews}/${query}`, {params})
    }
}