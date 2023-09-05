import {  categoryType, lisCategoryType } from "commons/contannt";
import api from "./api";
import queryString from "query-string";
import { pathService } from "./pathService";
import { CategoryType } from "./Types/category";




const pathName = pathService.category
type Param ={
    page:number,
    size: number,
    sort?:string,
    [key:string]: any
}

const  categoryServices = {
    getAllCategory: async(): Promise<CategoryType[]>=> {
        // let categoryPath = pathName
        // if(param){
        //     categoryPath = `${categoryPath}?${queryString.stringify(param)}`;
        // }
        return await api.get(pathName);
    },
    getCategoryById: async(id:string | number): Promise<CategoryType>=> {
         const result = await api.get(`${pathName}/${id}`);
         return result.data
    },
    deleteCategory: async(id:number): Promise<any>=> {
       return await api.delete(`${pathName}/${id}`)
    },
    addOrEditCategory: async(data:any, id:number | undefined ): Promise<any>=> {
        if(id){
            const result= await api.put(`${pathName}/${id}`,data)
            return result
        }
        const result= await api.post(`${pathName}`,data)
        return result
    },
}

export default categoryServices