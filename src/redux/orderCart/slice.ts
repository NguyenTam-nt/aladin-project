import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

export interface IITemCart {
  productDetailId: number;
  priceDetail: number;
  promoDetail: number;
  actualPriceDetail: number;
  stockQuantity: number;
  soldQuantity: number;
  addressWarehouse: string;
  imageDetailUrl: string;
  productDetailNameVn: string;
  productDetailNameKr: string;
  choose: boolean;
  quantitySelected: number;
  productId: number;
  attributes: {
    valueVn: string;
    attributeNameVn: string;
  }[];
  attributesKr: {
    valueKr: string;
    attributeNameKr: string;
  }[];
}

interface IPopupState {
  itemInCart: IITemCart[];
}
const initialState: IPopupState = {
  itemInCart: [],
};

export const cartOrderSlice = createSlice({
  name: 'cartOrderSlice',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<IITemCart>) => {
      const {productId, productDetailId} = action.payload;
      //   const dataCheck = [...state.itemInCart];
      const index = state.itemInCart.findIndex(
        item =>
          item.productId === productId &&
          item.productDetailId === productDetailId,
      );
      console.log('index', index);

      if (index < 0) {
        //@ts-ignore
        state.itemInCart.push(action.payload);
      }
      //   if (index >= 0) {
      //     dataCheck[index] = action.payload;
      //     state.itemInCart = dataCheck;

      //     // Toast.show({
      //     //   type: 'tomatoToast',
      //     //   props: {
      //     //     status: 'warning',
      //     //     uuid: 'messages.warning.add-to-cart',
      //     //   },
      //     // });
      //   } else {
      //     //@ts-ignore
      //     state.itemInCart.push(action.payload);
      //   }
    },
    removeCartList: state => {
      if (state.itemInCart.length > 0) {
        state.itemInCart = [];
      }
    },
    setChooseAll: (state, action: PayloadAction<IITemCart[]>) => {
      state.itemInCart = action.payload;
    },
    updatequantitySelectedInCart: (
      state,
      action: PayloadAction<{
        productDetailId: number;
        quantitySelected: number;
      }>,
    ) => {
      const {productDetailId, quantitySelected} = action.payload;
      const dataCheck = [...state.itemInCart];
      const index = state.itemInCart.findIndex(
        it => it.productDetailId === productDetailId,
      );
      if (index >= 0) {
        dataCheck[index].quantitySelected = quantitySelected;
        state.itemInCart = dataCheck;
      }
    },
    setChooseItem: (
      state,
      action: PayloadAction<{productDetailId: number; choose: boolean}>,
    ) => {
      const {productDetailId, choose} = action.payload;
      const dataCheck = [...state.itemInCart];
      const index = state.itemInCart.findIndex(
        it => it.productDetailId === productDetailId,
      );
      if (index >= 0) {
        dataCheck[index].choose = choose;
        state.itemInCart = dataCheck;
      }
    },
  },
});

export const {
  addItemToCart,
  removeCartList,
  setChooseItem,
  setChooseAll,
  updatequantitySelectedInCart,
} = cartOrderSlice.actions;
export default cartOrderSlice.reducer;
