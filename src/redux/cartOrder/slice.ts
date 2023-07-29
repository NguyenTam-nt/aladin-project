import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IMenuItem } from 'src/api/products';

export interface IITemCart {
  id: number
  quantity: number
  data : IMenuItem
}


interface IPopupState {
  itemInCart: IITemCart[]
}

const initialState: IPopupState = {
  itemInCart: [],
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
    removeCartList: state => {
      if (state.itemInCart.length > 0) {
        state.itemInCart = [];
      }
    },
  },
});
export const {addItemToCart ,removeCartList} = cartOrderSlice.actions;
export default cartOrderSlice.reducer;
