import { createAsyncThunk } from "@reduxjs/toolkit";
import TradeMarkServices from "@services/TradeMarkServices";
import categoryServices from "@services/categoryService";
import { paramType } from "commons/contannt";


export const ThunkgetAllCategory = createAsyncThunk('get/category', async(param?:paramType)=> {
    const result = param ? await categoryServices.getAllCategory(param) : await categoryServices.getAllCategory()
    return result
})

export const ThunkGetAllTradeMark = createAsyncThunk('get/tradeMark', async()=> {
    return await TradeMarkServices.getAllTradeMark()
})