import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IProductOrder} from 'src/api/order';

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
    valueKr: string;
    attributeNameVn: string;
    attributeNameKr: string;
  }[];
}

export interface IVoucherApply {
  totalPrice: number;
  voucherCode: string;
  voucherPrice: number;
}

export interface IPopupState {
  itemInCart: IITemCart[];
  itemCartOrder: IProductOrder[];
  voucherApply: IVoucherApply | null;
}
const initialState: IPopupState = {
  itemInCart: [],
  itemCartOrder: [],
  voucherApply: null,
};

export const cartOrderSlice = createSlice({
  name: 'cartOrderSlice',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<IITemCart>) => {
      const {productId, productDetailId} = action.payload;
      const index = state.itemInCart.findIndex(
        item =>
          item.productId === productId &&
          item.productDetailId === productDetailId,
      );
      if (index < 0) {
        //@ts-ignore
        state.itemInCart.push(action.payload);
      }
    },
    addArrayItemTocart: (state, action: PayloadAction<IITemCart[]>) => {
      //@ts-ignore
      state.itemInCart = action.payload;
      return;
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
    removeItemById: (state, action: PayloadAction<number>) => {
      const dataCheck = [...state.itemInCart];
      const index = state.itemInCart.findIndex(
        item => item.productDetailId === action.payload,
      );
      if (index >= 0) {
        dataCheck.splice(index, 1);
        state.itemInCart = dataCheck;
      }
    },
    addVoucherApply: (state, action: PayloadAction<IVoucherApply>) => {
      state.voucherApply = action.payload;
    },
    addProductOrder: (state, action: PayloadAction<IProductOrder[]>) => {
      state.itemCartOrder = action.payload;
    },
  },
});

export const {
  addItemToCart,
  removeCartList,
  setChooseItem,
  setChooseAll,
  updatequantitySelectedInCart,
  removeItemById,
  addVoucherApply,
  addProductOrder,
  addArrayItemTocart,
} = cartOrderSlice.actions;
export default cartOrderSlice.reducer;
