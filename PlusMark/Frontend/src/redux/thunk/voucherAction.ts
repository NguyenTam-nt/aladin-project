import { ThunkAction, createAsyncThunk } from "@reduxjs/toolkit";
import ProductServices from "@services/ProductServices";
import VoucherServices from "@services/voucherService";
import { some } from "@utility/helper";
import { SomeType, paramVoucher } from "commons/contannt";
import { RootState } from "redux/store";


export const ThunkGetvoucher = createAsyncThunk('get/voucher', async (param: paramVoucher) => {
    return await VoucherServices.getVoucher(param)
})