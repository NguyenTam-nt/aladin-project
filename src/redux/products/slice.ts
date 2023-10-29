import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IProducts {
    id: any,
    promo?: number,
    productNameVn?: string,
    productNameKr?: string,
    totalSoldQuantity?: number,
    images: {
        url: string;
    }[],
    categoryId: any,
    subCategoryId: any,
    price: number,
}

export interface IPopupState {
    watchedProducts: IProducts[]
}

const initialState: IPopupState = {
    watchedProducts: []
}

export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: initialState,
    reducers: {
        addItemToProducts: (state, action: PayloadAction<IProducts>) => {
            const { id } = action.payload;
            if (state.watchedProducts.length >= 10) {
                state.watchedProducts.slice(state.watchedProducts.length - 1, 1)
                state.watchedProducts.unshift(action.payload);
                return;
            } else if (state.watchedProducts.length > 0 && state.watchedProducts.length < 10) {
                state.watchedProducts.filter((it) => it.id != id);
                state.watchedProducts.unshift(action.payload);
                return;
            } else {
                state.watchedProducts.push(action.payload);
                return;
            }
        }
    }
})

export const { addItemToProducts } = productsSlice.actions;
export default productsSlice.reducer