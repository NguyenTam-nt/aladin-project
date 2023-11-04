import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface IProducts {
  id: any;
  promo?: number;
  productNameVn?: string;
  productNameKr?: string;
  totalSoldQuantity?: number;
  images: {
    url: string;
  }[];
  categoryId: any;
  subCategoryId: any;
  price: number;
}

export interface IPopupState {
  watchedProducts: IProducts[];
}

const initialState: IPopupState = {
  watchedProducts: [],
};

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState: initialState,
  reducers: {
    addItemToProducts: (state, action: PayloadAction<IProducts>) => {
      const {id} = action.payload;
      if (state.watchedProducts.length >= 10) {
        const index = state.watchedProducts.findIndex(it => it.id == id);
        if (index >= 0) {
          const newData = state.watchedProducts.filter(it => it.id != id);
          state.watchedProducts = [action.payload, ...newData];
          return;
        } else {
          const newData = state.watchedProducts;
          newData.pop();
          newData.unshift(action.payload);
          state.watchedProducts = newData;
          return;
        }
      } else if (
        state.watchedProducts.length > 0 &&
        state.watchedProducts.length < 10
      ) {
        const newData = state.watchedProducts.filter(it => it.id != id);
        state.watchedProducts = [action.payload, ...newData];
        return;
      } else {
        state.watchedProducts.push(action.payload);
        return;
      }
    },
    removeProductList: state => {
      if (state.watchedProducts.length > 0) {
        state.watchedProducts = [];
      }
    },
    removeProductByyId: (state, action: PayloadAction<number>) => {
      const dataCheck = [...state.watchedProducts];
      const index = state.watchedProducts.findIndex(
        item => item.id === action.payload,
      );
      if (index >= 0) {
        dataCheck.splice(index, 1);
        state.watchedProducts = dataCheck;
      }
    },
  },
});

export const {addItemToProducts, removeProductList, removeProductByyId} =
  productsSlice.actions;
export default productsSlice.reducer;
