import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ListOrdersType, OrderType } from "commons/contannt";
import { ThunkGetListOrder } from "redux/thunk/orderAction";

interface initialProps {
    isloading: boolean,
    currentPage: number,
    totalElement: number,
    listOrders: OrderType[], 
    error: string | null
}

const initialState:initialProps ={
    isloading: false,
    currentPage: 1,
    totalElement: 0,
    listOrders: [], 
    error: null
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setCurrentPage: (state,actions: PayloadAction<number>)=> {
            state.currentPage = actions.payload
        },
        setListByOneOrder: (state,actions: PayloadAction<OrderType>) => {
            state.isloading = false
            state.currentPage = 1;
            state.totalElement = 1;
            state.listOrders = actions.payload? [actions.payload] : []
        },
        setLoading: (state,actions: PayloadAction<boolean>) => {
            state.isloading = actions.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(ThunkGetListOrder.fulfilled,  (state,actions:PayloadAction<ListOrdersType>)=> {
            const {data,total} = actions.payload
            state.isloading = false;
            state.totalElement = total;
            state.listOrders = data? data : []
            state.error = null
        })
        builder.addCase(ThunkGetListOrder.rejected,  (state,actions:PayloadAction<any>)=> {
            state.isloading = false;
            state.error = "Có lỗi"
        })
        builder.addCase(ThunkGetListOrder.pending,  (state,actions:PayloadAction<any>)=> {
            state.isloading = true;
        })
    },
})

export const {setLoading,setListByOneOrder,setCurrentPage} = orderSlice.actions
export default orderSlice.reducer