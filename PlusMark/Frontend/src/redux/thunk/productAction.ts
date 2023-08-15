import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductServices from "@services/ProductServices";
import { SomeType } from "commons/contannt";

export const ThunkProduclist = createAsyncThunk('fetchProducts', async(data: SomeType)=> {
    return await ProductServices.getListProduct(data);
})

export const ThunkProduclistFilter = createAsyncThunk('fetchRemainning', async(param:SomeType)=> {
    return await ProductServices.getListProductFilter(param)
})