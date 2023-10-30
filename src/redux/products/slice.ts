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
  },
});

export const {addItemToProducts, removeProductList} = productsSlice.actions;
export default productsSlice.reducer;

const data = [
  {
    categoryId: 401,
    id: 21863,
    images: [[Object], [Object]],
    price: 27000,
    productNameKr: '한국의 구운 쌀수 비락식혜 238ml- 진정한 수입품',
    productNameVn:
      'Nước Gạo Rang PALDO HÀN QUỐC 비락식혜 238ML - HÀNG NHẬP KHẨU CHÍNH HÃNG',
    promo: 10,
    subCategoryId: 407,
    totalSoldQuantity: null,
  },
  {
    categoryId: 401,
    id: 21695,
    images: [[Object], [Object]],
    price: 26000,
    productNameKr: '얼음 토크 수박, 녹색 포도, 한국 레몬 190ml- 수입품',
    productNameVn:
      'Nước Ice Talk Các Vị Dưa Hấu ,Nho Xanh, Chanh Hàn Quốc 190ml- hàng nhập khẩu chính hãng',
    promo: 1,
    subCategoryId: 407,
    totalSoldQuantity: 10,
  },
  {
    categoryId: 401,
    id: 21863,
    images: [[Object], [Object]],
    price: 27000,
    productNameKr: '한국의 구운 쌀수 비락식혜 238ml- 진정한 수입품',
    productNameVn:
      'Nước Gạo Rang PALDO HÀN QUỐC 비락식혜 238ML - HÀNG NHẬP KHẨU CHÍNH HÃNG',
    promo: 10,
    subCategoryId: 407,
    totalSoldQuantity: null,
  },
  {
    categoryId: 4392,
    id: 22294,
    images: [[Object]],
    price: 340000,
    productNameKr: '요리 레이어의 편리한 비 스틱 냄비',
    productNameVn: 'Nồi chống dính dày lớp nấu ăn tiện lợi',
    promo: 12,
    subCategoryId: 4394,
    totalSoldQuantity: 1,
  },
];
