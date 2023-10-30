import {useDispatch, useSelector} from 'react-redux';
import {
  IITemCart,
  addItemToCart,
  setChooseItem,
  setChooseAll,
  updatequantitySelectedInCart,
  addVoucherApply,
  IVoucherApply,
  addProductOrder,
  addArrayItemTocart,
} from './slice';
import {useCallback} from 'react';
import {RootState} from '..';
import {IProductOrder} from 'src/api/order';

export const useHandleAddItemToCart = () => {
  const dispatch = useDispatch();
  return useCallback((data: IITemCart) => {
    dispatch(addItemToCart(data));
  }, []);
};

export const useHandleAddArrayItemToCart = () => {
  const dispatch = useDispatch();
  return useCallback((data: IITemCart[]) => {
    dispatch(addArrayItemTocart(data));
  }, []);
};

export const useListItemCart = () => {
  const listItemCart = useSelector(
    (appState: RootState) => appState.cartOrderSlice,
  );
  return listItemCart;
};

export const useHandleSetChooseAll = () => {
  const dispatch = useDispatch();
  return useCallback((data?: IITemCart[]) => {
    if (data) {
      dispatch(setChooseAll(data));
    }
  }, []);
};

export const useHandleSetChoose = () => {
  const dispatch = useDispatch();
  return useCallback((data: {productDetailId: number; choose: boolean}) => {
    dispatch(setChooseItem(data));
  }, []);
};

export const useHandleUpdateQuantitySelectedInCart = () => {
  const dispatch = useDispatch();
  return useCallback(
    (data: {productDetailId: number; quantitySelected: number}) => {
      dispatch(updatequantitySelectedInCart(data));
    },
    [],
  );
};

export const useHandleAddVoucherApply = () => {
  const dispatch = useDispatch();
  return useCallback((data: IVoucherApply) => {
    dispatch(addVoucherApply(data));
  }, []);
};

export const useHandleProductOrder = () => {
  const dispatch = useDispatch();
  return useCallback((data: IProductOrder[]) => {
    dispatch(addProductOrder(data));
  }, []);
};

