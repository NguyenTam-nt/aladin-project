import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IMenuItem, IProductInCart } from 'src/api/products';

export interface IITemCart extends IMenuItem  {
  quantity: number
}

interface IPopupState {
  itemInCart: IITemCart[]
  idBill : number | undefined
  itemCartOrder : IProductInCart[]
}

const initialState: IPopupState = {
  itemInCart: [],
  idBill  : undefined,
  itemCartOrder : [],
};

export const cartOrderSlice = createSlice({
  name: 'cartOrderSlice',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<IITemCart>) => {
      const {id, quantity} = action.payload;
      const dataCheck = [...state.itemInCart];
      if (id) {
        //@ts-ignore
        const index = state.itemInCart.findIndex(item => item.id === id);
        if (index >= 0) {
          if (quantity === 0) {
            dataCheck.splice(index, 1);
            state.itemInCart = dataCheck;
          } else {
            dataCheck[index] = action.payload;
            state.itemInCart = dataCheck;
          }
        } else {
          //@ts-ignore
          state.itemInCart.push(action.payload);
        }
      }
    },
    updateItemProductInCart: (state, action: PayloadAction<IProductInCart>) => {
      const {id} = action.payload;
      const dataCheck = [...state.itemCartOrder];
      if (id) {
        //@ts-ignore
        const index = state.itemCartOrder.findIndex(item => item.id === id);
        if (index >= 0) {
          dataCheck[index] = action.payload;
          state.itemCartOrder = dataCheck;
        }
      }
    },
    setItemProductInCart: (state, action: PayloadAction<IProductInCart[]>) => {
      state.itemCartOrder = action.payload;
    },
    removeCartList: state => {
      if (state.itemInCart.length > 0) {
        state.itemInCart = [];
      }
    },
    removeItemById: (state, action: PayloadAction<number>) => {
      const dataCheck = [...state.itemInCart];
      const index = state.itemInCart.findIndex(
        item => item.id === action.payload,
      );
      if (index >= 0) {
        dataCheck.splice(index, 1);
        state.itemInCart = dataCheck;
      }
    },
    setIdBill: (state, action: PayloadAction<number>) => {
      state.idBill = action.payload;
    },
  },
});
export const {
  addItemToCart,
  removeCartList,
  setIdBill,
  removeItemById,
  updateItemProductInCart,
  setItemProductInCart,
} = cartOrderSlice.actions;
export default cartOrderSlice.reducer;
