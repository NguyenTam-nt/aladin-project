import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootCategory, TradeMarkType, lisCategoryType, lisTradeMarkType } from 'commons/contannt'
import { ThunkGetAllTradeMark, ThunkgetAllCategory } from 'redux/thunk/categoryAction'

interface InitialType {
    isloading: boolean,
    error: string| null,
    totalElement: number,
    totalTradeMard: number,
    categorylist: RootCategory[],
    tradeMarkList: TradeMarkType[],
    
}

const initialState:InitialType ={
    isloading: false,
    totalElement:0,
    totalTradeMard:0,
    error: null,
    categorylist: [],
    tradeMarkList: []
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategoryList: (state, actions: PayloadAction<number>)=> {
            const newCategory = state.categorylist.filter((item)=> {
                return item.categorySId != actions.payload
            })
            state.categorylist = newCategory
            state.isloading = false
        },
        setTradeMarkList: (state, actions: PayloadAction<string>)=> {
            const newCategory = state.tradeMarkList.filter((item)=> {
                return item.id != actions.payload
            })
            state.tradeMarkList = newCategory
            state.isloading = false
        },
        setInital: (state)=>{
            state.categorylist = [];
            state.isloading = false;
            state.totalElement = 0
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(ThunkgetAllCategory.fulfilled, (state, actions: PayloadAction<lisCategoryType>)=> {
            const {data,total} = actions.payload
            state.isloading = false
            state.categorylist = [...state.categorylist,...data]
            state.totalElement = total
        })
        builder.addCase(ThunkgetAllCategory.pending, (state, actions: PayloadAction<any>)=> {
            state.isloading = true
        })
        builder.addCase(ThunkgetAllCategory.rejected, (state, actions: PayloadAction<any>)=> {
            state.isloading = false
            state.error = 'có lỗi hệ thống không thể lấy danh sách'
        })

        builder.addCase(ThunkGetAllTradeMark.fulfilled, (state, actions: PayloadAction<lisTradeMarkType>)=> {
            const {data,total} = actions.payload
            state.isloading = false
            state.tradeMarkList = data
            state.totalTradeMard = total
        })
        builder.addCase(ThunkGetAllTradeMark.pending, (state, actions: PayloadAction<any>)=> {
            state.isloading = true
        })
        builder.addCase(ThunkGetAllTradeMark.rejected, (state, actions: PayloadAction<any>)=> {
            state.isloading = false
            state.error = 'có lỗi hệ thống không thể lấy danh sách'
        })
    }
})

export const {setCategoryList,setTradeMarkList,setInital} = categorySlice.actions
export default categorySlice.reducer;