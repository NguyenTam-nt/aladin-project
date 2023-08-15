import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ListProductType, Product } from "commons/contannt";
import { ThunkProduclist, ThunkProduclistFilter } from "redux/thunk/productAction";

interface initialProps {
    filter: boolean,
    isloading: boolean,
    currentPage: number,
    totalElement:number,
    listProducts: Product[],
    error: string | null
}
const initialState :initialProps ={
    filter: true,
    isloading: false,
    currentPage: 1,
    totalElement: 0,
    listProducts: [],
    error: null
}

const produtcSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setCurrenPage: (state, actions:PayloadAction<number>) => {
            state.currentPage = actions.payload
        },
        setFilter: (state, actions:PayloadAction<boolean>) => {
            state.filter = actions.payload
            state.currentPage = 1
        },
        setLisProduct: (state, actions:PayloadAction<any>) =>{
            const {data, total} = actions.payload
            // state.currentPage = 1
            // state.filter = true
            state.listProducts = data
            state.totalElement = total
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(ThunkProduclist.fulfilled, (state,actions:PayloadAction<ListProductType>)=> {
            const {data,total} = actions.payload
            state.isloading = false;
            state.totalElement = total;
            state.listProducts = data
            state.error = null
        }) 
        builder.addCase(ThunkProduclist.pending, (state,actions:PayloadAction<any>)=> {
            state.isloading = true
        })
        builder.addCase(ThunkProduclist.rejected, (state,actions:PayloadAction<any>)=> {
            state.isloading = false
            state.error = "Có lỗi không thể lấy dữ liệu"
        })

        builder.addCase(ThunkProduclistFilter.fulfilled, (state, actions:PayloadAction<ListProductType>)=> {
            const {data,total} = actions.payload
            state.isloading = false;
            state.totalElement = total;
            state.listProducts = data
            state.error = null
        })
        builder.addCase(ThunkProduclistFilter.pending, (state,actions:PayloadAction<any>)=> {
            state.isloading = true
        })
        builder.addCase(ThunkProduclistFilter.rejected, (state,actions:PayloadAction<any>)=> {
            state.isloading = false
            state.error = "Có lỗi không thể lấy dữ liệu"
        })
    }
});

export const {setCurrenPage, setFilter,setLisProduct} = produtcSlice.actions
export default produtcSlice.reducer