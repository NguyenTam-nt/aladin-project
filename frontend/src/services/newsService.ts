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
    getById: (id: number):Promise<ICategory> => {
        return HttpService.axiosClient.get(pathCategory+`/${id}`)
    },
    getParent: (params?:IParams):Promise<IResponseData<ICategory>> => {
        const api = getApi("news-categories/parent")
        return HttpService.axiosClient.get(api, {params})
    },
    postCategory: (data:ICategory):Promise<ICategory> => {
        const api = getApi("news-categories/list-children")
        return HttpService.axiosClient.post(api, data)
    },
    putCategory: (data:ICategory):Promise<ICategory> => {
        const api = getApi("news-categories/with-children")
        return HttpService.axiosClient.put(`${api}/${data.id}`, data)
    },
    getNews: (params?:IParams):Promise<IResponseData<INews>> => {
        return HttpService.axiosClient.get(pathNews, {params})
    },
    getNewsById: (id:number):Promise<INews> => {
        return HttpService.axiosClient.get(`${pathNews}/${id}`)
    },
    getBySearch: (params:IParams, query: string):Promise<IResponseData<INews>> => {
        return HttpService.axiosClient.get(`${pathNews}/${query}`, {params})
    },
    deleteCategory: (id:number):Promise<void> => {
        return HttpService.axiosClient.delete(`${pathCategory}/${String(id)}`)
    },
    gewNewCategory: (params:IParams, query = "", categoriesId = '0'):Promise<IResponseData<INews>> => {
        const api = getApi("news/categories")
        return HttpService.axiosClient.get(api, {params: {...params, keyword: query, categoriesId}})
    },
    postNews: (data:INews):Promise<INews> => {
        return HttpService.axiosClient.post(pathNews, data)
    },
    putNews: (data:INews):Promise<INews> => {
        return HttpService.axiosClient.put(`${pathNews}/${data.id}`, data)
    },
    deleteNews: (ids:string):Promise<INews> => {
        return HttpService.axiosClient.delete(`${pathNews}/allid`, {params: {ids}})
    }
}