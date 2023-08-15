import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "@services/orderServices";
import { paramOrder } from "commons/contannt";


export const ThunkGetListOrder = createAsyncThunk('get/order', async(param:paramOrder)=> {
    return await OrderService.getOrder(param)
})