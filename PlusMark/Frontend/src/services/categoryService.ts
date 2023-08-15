import {  categoryType, lisCategoryType } from "commons/contannt";
import api from "./api";
import queryString from "query-string";


const pathName = '/category'

const  categoryServices = {
    getAllCategory: async(param ?: {page: number, size:number}): Promise<lisCategoryType>=> {
        let categoryPath = pathName
        if(param){
            categoryPath = `${categoryPath}?${queryString.stringify(param)}`;
        }
         const result = await api.get(categoryPath);
         return result.data
    },
    getCategoryById: async(id:string | number): Promise<categoryType>=> {
         const result = await api.get(`${pathName}/${id}`);
         return result.data
    },
    deleteCategory: async(id:number): Promise<any>=> {
       return await api.delete(`${pathName}/${id}`)
    },
    addOrEditCategory: async(data:any, id?:string): Promise<any>=> {
        if(id){
            const result= await api.put(`${pathName}/${id}`,data)
            return result.data
        }
        const result= await api.post(`${pathName}`,data)
        return result.data
    },
}

export default categoryServices