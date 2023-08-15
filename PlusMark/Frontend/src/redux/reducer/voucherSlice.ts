import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ListVoucherType, VoucherType } from "commons/contannt";
import { ThunkGetvoucher } from "redux/thunk/voucherAction";


interface initialProps{
    filter: string,
    isloading: boolean,
    currentPage: number,
    totalElement:number,
    listVoucher: VoucherType[],
    error: string | null
}
const initialState: initialProps = {
    filter: 'all',
    isloading: false,
    currentPage: 1,
    listVoucher: [],
    totalElement:0,
    error: null,
}


const voucherSlice = createSlice({
    name: 'voucher',
    initialState,
    reducers:{
        setCurrentPage : (state, actions:PayloadAction<number>)=> {
            state.currentPage = actions.payload
        },
    },
    extraReducers: (builder)=> {
        builder.addCase(ThunkGetvoucher.fulfilled, (state, actions: PayloadAction<ListVoucherType>)=> {
            const {data,total} = actions.payload
            state.isloading = false
            state.listVoucher = data
            state.totalElement = total
            state.error= null
        })
        builder.addCase(ThunkGetvoucher.pending, (state, actions: PayloadAction<any>)=> {
            state.isloading = true
        })
        builder.addCase(ThunkGetvoucher.rejected, (state, actions: PayloadAction<any>)=> {
            state.isloading = false
            state.error = 'có lỗi hệ thống không thể lấy danh sách'
        })
    }
})

export const {setCurrentPage} = voucherSlice.actions
export default voucherSlice.reducer